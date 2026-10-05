"""pornoflix.com -- episodes and full releases, one direct mp4 each.

Listed on theporndude's full-movies page and verified 2026-10-05. It is a
front for the same catalogue as veporn, which AGENTS.md records as rejected
because its results sit in a Next.js RSC flight payload. That does not apply
here: this front is also a Next.js app, but it **server-renders** both the
result grid (``/search?q=``) and the player data, so plain HTML parsing is
enough and no flight data has to be decoded.

* ``/?s=`` and ``/search?s=`` answer 200 with the homepage carousels, not
  results -- the parameter that actually searches is ``q`` on ``/search``.
* A video's media is ``https://cdn.veporn.com/<slug>.mp4``, present in the
  page's JSON-LD (``contentUrl``) and in the inlined player props, the latter
  with trailing escaped backslashes that must be stripped. The CDN honours
  Range, needs no Referer, and the file is the whole episode (a 48-minute
  episode is a 900 MB file).
* The grid's resolution badge ("1080p") is a stated height, so it is used.

``video_id`` is the page slug (the path after ``/``) because that is the only
identifier the site has.
"""

import re
from urllib.parse import urljoin

from loguru import logger
from lxml import html as lxml_html

from tubescraper_addon.scraper_api.base import (
    DirectScraper,
    DirectSource,
    DirectVideo,
    parse_count,
    parse_duration,
)


_MEDIA_RE = re.compile(r"https://cdn\.veporn\.com/[A-Za-z0-9._~%!$&'()*+,;=:@/-]+?\.mp4")
_BADGE_RE = re.compile(r"^(\d{3,4})p$")
_SLUG_RE = re.compile(r"^/([A-Za-z0-9._~%-]+)$")


class PornoFlixScraper(DirectScraper):
    key = "pornoflix"
    name = "PornoFlix"
    base_url = "https://pornoflix.com"

    def search(self, query: str, limit: int = 20) -> list[DirectVideo]:
        # The site ANDs every token literally, and punctuation counts: the
        # title "Brazzers house 4, episode 1" is not found by "brazzers house
        # 4 episode 1". A library title is usually wordier than the site's,
        # so when nothing matches, drop trailing words (never below two) and
        # let the central ranker discard what is not the title asked for.
        words = query.split()
        while True:
            videos = self._search_once(" ".join(words), limit)
            if videos or len(words) <= 2:
                return videos
            words.pop()

    def _search_once(self, query: str, limit: int) -> list[DirectVideo]:
        response = self._get(f"{self.base_url}/search", params={"q": query})
        tree = lxml_html.fromstring(response.text)

        videos: list[DirectVideo] = []
        seen: set[str] = set()
        for link in tree.xpath("//a[contains(concat(' ', @class, ' '), ' group ')][.//h3]"):
            match = _SLUG_RE.match(link.get("href") or "")
            if not match or match.group(1) in seen:
                continue
            seen.add(match.group(1))

            spans = [s.text_content().strip() for s in link.xpath(".//span")]
            duration = next((parse_duration(s) for s in spans if re.fullmatch(r"\d+:\d{2}(:\d{2})?", s)), None)
            badge = next((s for s in spans if _BADGE_RE.match(s)), None)
            views = next((parse_count(s) for s in spans if re.fullmatch(r"[\d.,]+[KkMm]?", s)), None)

            images = link.xpath(".//img[@src]")
            thumbnail = urljoin(self.base_url + "/", images[0].get("src")) if images else ""
            heading = link.xpath(".//h3")[0].text_content().strip()

            videos.append(
                DirectVideo(
                    site=self.key,
                    video_id=match.group(1),
                    title=heading or "Untitled",
                    page_url=urljoin(self.base_url, link.get("href")),
                    thumbnail=thumbnail or None,
                    duration=duration,
                    resolution=badge,
                    views=views,
                    hd=bool(badge and int(badge[:-1]) >= 720),
                )
            )
            if len(videos) >= limit:
                break

        return videos

    def resolve(self, video_id: str) -> list[DirectSource]:
        response = self._get(f"{self.base_url}/{video_id}")
        found = _MEDIA_RE.search(response.text.replace("\\/", "/"))
        if not found:
            logger.debug(f"{self.key}: no cdn.veporn.com media on the page for {video_id}")
            return []
        return [DirectSource(url=found.group(0), label="Source", resolution=None, headers={})]
