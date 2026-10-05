"""pornxp.ph (serves from pxp.news) -- long studio releases, three direct renditions.

Listed on theporndude's full-movies page and verified 2026-10-05: results
include hour-long releases (a 1:03:40 LegalPorno scene in the first page of
a search), and the video page carries plain ``<source>`` tags for 360p, 720p
and 1080p on ``sd.pornxp.sh``.

Notes for the next person:

* ``pornxp.ph`` redirects to ``pxp.news``; the canonical host is used
  directly so a domain rotation costs one redirect, not a failed request.
* The search field is named ``q``. ``/?s=`` is accepted and answers 200 with
  the unfiltered front page, which looks like a search that matches
  everything.
* ``<source src>`` is **protocol-relative** (``//sd.pornxp.sh/...``). Used
  as-is it is a URL with no scheme, which curl rejects outright.
* Each ``<source>`` carries a ``title`` of "720p" etc.; unlike some KVS sites
  these labels are the file's real height (the 1080 file is ten times the size
  of the 360 one). The CDN honours Range and needs no Referer.
* Cast and studio are listed as ``/tags/<name>`` links beside each card, not
  in the title, so they are appended to it -- the central ranker matches on
  title and a bare scene name would never match a library entry by studio.
"""

import re
from urllib.parse import urljoin

from loguru import logger
from lxml import html as lxml_html

from tubescraper_addon.scraper_api.base import (
    DirectScraper,
    DirectSource,
    DirectVideo,
    parse_duration,
    resolution_from_height,
)


_VIDEO_ID_RE = re.compile(r"/videos/(\d+)")
_HEIGHT_RE = re.compile(r"(\d{3,4})p?", re.IGNORECASE)


class PornXPScraper(DirectScraper):
    key = "pornxp"
    name = "PornXP"
    base_url = "https://pxp.news"

    def search(self, query: str, limit: int = 20) -> list[DirectVideo]:
        response = self._get(f"{self.base_url}/", params={"q": query})
        tree = lxml_html.fromstring(response.text)

        videos: list[DirectVideo] = []
        seen: set[str] = set()
        for container in tree.xpath("//div[@class='item_cont']"):
            links = container.xpath(".//a[contains(@href, '/videos/')]")
            if not links:
                continue
            match = _VIDEO_ID_RE.search(links[0].get("href") or "")
            if not match or match.group(1) in seen:
                continue
            seen.add(match.group(1))

            titles = container.xpath(".//div[@class='item_title']")
            title = titles[0].text_content().strip() if titles else ""
            tags = [t.text_content().strip() for t in container.xpath(".//div[@class='item_tags']/a")]
            if tags:
                title = f"{title} - {', '.join(tags)}" if title else ", ".join(tags)

            images = container.xpath(".//img[@class='item_img']")
            thumbnail = urljoin(self.base_url + "/", images[0].get("src")) if images else ""
            durations = container.xpath(".//div[@class='item_dur']")

            videos.append(
                DirectVideo(
                    site=self.key,
                    video_id=match.group(1),
                    title=title or "Untitled",
                    page_url=urljoin(self.base_url, links[0].get("href") or ""),
                    thumbnail=thumbnail or None,
                    duration=parse_duration(
                        durations[0].text_content() if durations else None
                    ),
                    resolution=None,
                    views=None,
                    hd=False,
                )
            )
            if len(videos) >= limit:
                break

        return videos

    def resolve(self, video_id: str) -> list[DirectSource]:
        response = self._get(f"{self.base_url}/videos/{video_id}")
        tree = lxml_html.fromstring(response.text)

        sources: list[DirectSource] = []
        seen: set[str] = set()
        for element in tree.xpath("//video//source[@src]"):
            raw = element.get("src") or ""
            url = "https:" + raw if raw.startswith("//") else raw
            if not url.startswith("http") or url in seen:
                continue
            seen.add(url)
            match = _HEIGHT_RE.search(element.get("title") or "")
            height = int(match.group(1)) if match else None
            resolution = resolution_from_height(height)
            sources.append(
                DirectSource(
                    url=url,
                    label=resolution or "Source",
                    resolution=resolution,
                    headers={"Referer": self.base_url + "/"},
                )
            )

        sources.sort(key=lambda s: int((s.resolution or "0p")[:-1] or 0), reverse=True)
        if not sources:
            logger.debug(f"{self.key}: no <source> on the page for {video_id}")
        return sources
