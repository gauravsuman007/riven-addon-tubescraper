"""noodlemagazine.com -- behind Cloudflare, needs a TLS fingerprint, not a browser.

Every request to this host, including the search page itself, is gated by a
Cloudflare Turnstile challenge. That sounds like it needs a real browser, but
it does not: the block is on the TLS handshake's fingerprint (JA3), not on
running the challenge's JavaScript. `curl_cffi` speaks TLS as a real Chrome
build would and gets a normal 200 with real markup on the first request, no
cookie dance, no headless Chromium (~110 MB) the way a genuine JS-challenge
site would force -- see `upornia.py` for the project's usual answer to "this
needs a browser", which is to find the plain API underneath instead. There
is no such API here to find; the fingerprint check is the whole obstacle, so
this plugin depends on `curl_cffi` rather than `self.session` -- the only
other scraper in the app with a dependency import guard (`plugins.py`
tolerates it) beyond the shared `requests`.

Two more traps found only by trying real queries in a real browser first:

* The obvious search URL, ``/home?story=<query>`` (the visible search box's
  own `<form>` action), silently ignores the query and renders the homepage's
  popular list instead -- indistinguishable from a genuine zero-result search
  unless you already know what "no results" looks like on this template.
  The real endpoint, found by submitting the box and reading the browser's
  address bar rather than the form's declared action, is
  ``/video/<query>`` (spaces and all, not query-string encoded).
* The video page's playable URLs are not obfuscated at all: they sit in a
  plain ``window.playlist = {...}`` JSON blob, already split by quality label,
  needing no Referer to actually load.
* The duration/sort/HD filters are NOT honoured on a GET. ``?len=long`` on the
  search URL renders the unfiltered page -- the same silent-ignore failure as
  ``/home?story=``. Changing the select POSTs the filters back to the current
  URL (query string included) and swaps the result list for the HTML fragment
  that comes back. So a filtered search is: GET once for the CSRF token and
  cookies, then POST ``len``/``p`` to ``<search url>?len=long&p=N``. Measured
  on a query full of short clips: shortest result went from 2:41 to 10:18,
  and nothing under ten minutes survived.
* Attribute values are HTML-ESCAPED, and the thumbnail URLs on
  ``img.pvvstream.pro`` (about one in five) carry a query string -- so an
  un-unescaped ``data-src`` asks for ``&amp;idx=14`` and the CDN answers 403.
  This is the whole of the "some thumbnails never load" bug: nothing was
  missing from the markup and nothing failed to parse, the URLs were simply
  wrong. ``cdn2.pvvstream.pro`` has no query string, which is why most
  thumbnails were fine and the breakage looked random.
"""

import html
import json
import re
from urllib.parse import quote

from curl_cffi import requests as curl_requests
from loguru import logger

from tubescraper_addon.scraper_api.base import (
    DirectScraper,
    DirectSource,
    DirectVideo,
    parse_count,
    parse_duration,
    resolution_from_height,
)

_IMPERSONATE = "chrome124"

_PLAYLIST_RE = re.compile(r"window\.playlist\s*=\s*(\{.*?\});", re.DOTALL)
_CSRF_RE = re.compile(r'name="csrfmiddlewaretoken"\s+value="([^"]+)"')

#: The site offers any/long/short. Short clips are not what this library is
#: for, and "long" is the site's own threshold (measured at ten minutes), not
#: something this plugin has to define or keep in step.
_LENGTH = "long"

#: 24 items per page, fixed by the template; `limit` is satisfied by asking
#: for more pages, not by asking for a bigger one.
_PAGE_SIZE = 24


class NoodleMagazineScraper(DirectScraper):
    key = "noodlemagazine"
    name = "NoodleMagazine"
    base_url = "https://noodlemagazine.com"

    def __init__(self) -> None:
        super().__init__()
        # Not `self.session`: that is a `requests.Session` (see base.py), and
        # `curl_cffi`'s TLS layer is the entire point of using it here -- a
        # plain `requests` call gets Cloudflare's challenge page, not the site.
        self._http = curl_requests.Session()

    def _fetch(self, url: str) -> str:
        from program.services.vpn import SCRAPING, vpn

        proxies = vpn().proxies_for(SCRAPING)
        response = self._http.get(
            url,
            impersonate=_IMPERSONATE,
            proxies=proxies or None,
            timeout=20,
        )
        response.raise_for_status()
        return response.text

    def _fetch_filtered(self, url: str, page: int, token: str | None) -> str:
        """One page of the filtered result list.

        POST rather than GET, and to the URL *with* the query string, because
        that is what the site's own filter control does -- it writes the
        filters into `location.search` and then posts the same values back to
        the URL it just wrote. A GET carrying them renders the unfiltered
        page, which looks like a working filter that simply matched
        everything.
        """

        from program.services.vpn import SCRAPING, vpn

        proxies = vpn().proxies_for(SCRAPING)
        target = f"{url}?len={_LENGTH}&p={page}"
        body = {"len": _LENGTH, "p": str(page)}

        if token:
            body["csrfmiddlewaretoken"] = token

        response = self._http.post(
            target,
            data=body,
            impersonate=_IMPERSONATE,
            proxies=proxies or None,
            timeout=20,
            headers={
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Referer": target,
            },
        )
        response.raise_for_status()
        return response.text

    def _parse_items(self, html_text: str, limit: int) -> list[DirectVideo]:
        """Videos from a result list, whether a whole page or a POST fragment.

        The fragment the filter POST returns is the same `<div class="item">`
        markup the full page carries, so one parser serves both.
        """

        videos: list[DirectVideo] = []

        for item_html in html_text.split('<div class="item">')[1:]:
            href_match = re.search(r'href="(/watch/[^"]+)"', item_html)
            if not href_match:
                continue
            href = href_match.group(1)
            video_id = href.rsplit("/", 1)[-1]

            title_match = re.search(
                r'<div class="title">([^<]*)</div>', item_html
            )
            thumb_match = re.search(r'data-src="([^"]+)"', item_html)
            duration_match = re.search(
                r'class="m_time">.*?</svg>\s*([\d:]+)', item_html, re.DOTALL
            )
            views_match = re.search(
                r'class="m_views">.*?</svg>\s*([\d.,\s]+[KMkm]?)', item_html, re.DOTALL
            )

            # `html.unescape`, not the raw attribute. A thumbnail on
            # img.pvvstream.pro carries a query string, and asking for
            # `&amp;idx=14` gets a 403 from the CDN -- see the module
            # docstring. Titles need it for the same reason, less visibly.
            videos.append(
                DirectVideo(
                    site=self.key,
                    video_id=video_id,
                    title=html.unescape(
                        title_match.group(1).strip() if title_match else ""
                    )
                    or "Untitled",
                    page_url=self.base_url + href,
                    thumbnail=(
                        html.unescape(thumb_match.group(1)) if thumb_match else None
                    ),
                    duration=parse_duration(
                        duration_match.group(1) if duration_match else None
                    ),
                    views=parse_count(
                        views_match.group(1) if views_match else None
                    ),
                    hd='class="hd_mark"' in item_html,
                )
            )
            if len(videos) >= limit:
                break

        return videos

    def search(self, query: str, limit: int = 20) -> list[DirectVideo]:
        # Not query-string encoded -- the site's own search box puts the raw
        # phrase, spaces included, straight into the path. `quote` still runs
        # so a query with a slash or `?` in it can't reshape the path.
        url = f"{self.base_url}/video/{quote(query, safe=' ')}"
        page_html = self._fetch(url)

        token_match = _CSRF_RE.search(page_html)
        token = token_match.group(1) if token_match else None

        videos: list[DirectVideo] = []
        seen: set[str] = set()

        # One POST per page of 24. The unfiltered page already in hand is not
        # used for results -- it is full of the short clips the filter exists
        # to remove -- only for the token and the session cookies.
        for page in range((limit + _PAGE_SIZE - 1) // _PAGE_SIZE):
            try:
                fragment = self._fetch_filtered(url, page, token)
            except Exception as exc:  # noqa: BLE001
                # Degrade rather than raise: an unfiltered first page of
                # results is worth more than an error, and every later page
                # is a bonus on top of one that already worked.
                logger.debug(f"noodlemagazine: filtered page {page} failed: {exc}")

                if not videos:
                    logger.debug("noodlemagazine: falling back to unfiltered results")
                    return self._parse_items(page_html, limit)

                break

            batch = self._parse_items(fragment, limit)

            # A page that adds nothing new is the end of the results; the
            # site keeps answering 200 past the last one.
            fresh = [video for video in batch if video.video_id not in seen]

            if not fresh:
                break

            seen.update(video.video_id for video in fresh)
            videos.extend(fresh)

            if len(videos) >= limit:
                break

        return videos[:limit]

    def resolve(self, video_id: str) -> list[DirectSource]:
        # `page_html`, not `html`: this module imports the stdlib `html` for
        # unescaping, and a local of that name shadows it for the rest of the
        # function -- harmless here, a bug the moment anyone adds an
        # `html.unescape` call below.
        page_html = self._fetch(f"{self.base_url}/watch/{video_id}")

        match = _PLAYLIST_RE.search(page_html)
        if not match:
            logger.debug(f"noodlemagazine: no playlist config for {video_id}")
            return []

        try:
            playlist = json.loads(match.group(1))
        except json.JSONDecodeError:
            logger.debug(f"noodlemagazine: unparsable playlist config for {video_id}")
            return []

        sources: list[DirectSource] = []
        for entry in playlist.get("sources", []):
            url = entry.get("file")
            if not url:
                continue

            label = entry.get("label") or ""
            height = int(label) if label.isdigit() else None

            sources.append(
                DirectSource(
                    url=url,
                    label=f"{label}p" if label else "Video",
                    resolution=resolution_from_height(height),
                    mime_type="video/mp4",
                )
            )

        # Highest resolution first -- the label is a plain integer height on
        # this template, unlike xfreehd's named tiers.
        sources.sort(
            key=lambda s: int(s.label.rstrip("p")) if s.label.rstrip("p").isdigit() else 0,
            reverse=True,
        )
        return sources
