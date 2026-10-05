"""trendyporn.com -- studio releases at full scene length, one signed mp4 each.

Listed on theporndude's full-movies page and verified 2026-10-05: results run
18-55 minutes (whole releases, titled "Performer - Scene Title <date>"), which
is what makes it worth having next to the KVS sites.

Two things that cost time:

* **The search box lies.** ``/?s=`` and ``/?q=`` both answer 200 with the
  same "latest uploads" list whatever the query, which reads as "the site
  returns nothing relevant". The form posts to ``searchgate.php``, which
  302s to ``/search/<hyphenated-query>/`` -- that is the real search, so it is
  requested directly.
* **The slug in a video URL is ignored.** ``/video/x-<id>.html`` serves the
  page, so ``video_id`` is just the numeric id.

The player is a single ``<source>`` pointing at ``videos.trendyporn.com`` with
``?md5=...&expires=...``. The token is minted per page view, so it is resolved
at play time rather than stored. The CDN honours Range and does not check the
Referer. No renditions are offered, so ``resolution`` stays unset and the
card's ``HD`` badge sets only ``hd`` -- the badge states no height.
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


_VIDEO_ID_RE = re.compile(r"-(\d+)\.html")
_SOURCE_RE = re.compile(r"<source[^>]+src=[\"']([^\"']+)[\"']", re.IGNORECASE)


class TrendyPornScraper(DirectScraper):
    key = "trendyporn"
    name = "TrendyPorn"
    base_url = "https://www.trendyporn.com"

    def search(self, query: str, limit: int = 20) -> list[DirectVideo]:
        slug = re.sub(r"[^a-z0-9]+", "-", query.lower()).strip("-")
        if not slug:
            return []
        response = self._get(f"{self.base_url}/search/{slug}/")
        tree = lxml_html.fromstring(response.text)

        videos: list[DirectVideo] = []
        seen: set[str] = set()
        for card in tree.xpath("//div[contains(@class, 'vid')][.//a[@class='video-link']]"):
            link = card.xpath(".//a[@class='video-link']")[0]
            match = _VIDEO_ID_RE.search(link.get("href") or "")
            if not match or match.group(1) in seen:
                continue
            seen.add(match.group(1))

            images = card.xpath(".//img")
            thumbnail = ""
            if images:
                thumbnail = images[0].get("data-original") or ""
                if thumbnail:
                    thumbnail = urljoin(self.base_url + "/", thumbnail)

            durations = card.xpath(".//div[@class='duration']")
            views = card.xpath(".//div[contains(@class, 'video-views')]")
            videos.append(
                DirectVideo(
                    site=self.key,
                    video_id=match.group(1),
                    title=(link.get("title") or "").strip() or "Untitled",
                    page_url=urljoin(self.base_url, link.get("href") or ""),
                    thumbnail=thumbnail or None,
                    duration=parse_duration(
                        durations[0].text_content() if durations else None
                    ),
                    resolution=None,
                    views=parse_count(views[0].text_content() if views else None),
                    hd=bool(card.xpath(".//*[contains(@class, 'hd-text-icon')]")),
                )
            )
            if len(videos) >= limit:
                break

        return videos

    def resolve(self, video_id: str) -> list[DirectSource]:
        response = self._get(f"{self.base_url}/video/x-{video_id}.html")
        match = _SOURCE_RE.search(response.text)
        if not match:
            logger.debug(f"{self.key}: no <source> on the page for {video_id}")
            return []
        url = match.group(1).replace("&amp;", "&")
        if not url.startswith("http"):
            return []
        return [
            DirectSource(
                url=url,
                label="Source",
                resolution=None,
                headers={"Referer": self.base_url + "/"},
            )
        ]
