"""pornone.com -- not a KVS tube; renditions are plain, dimensioned <source>s.

The most accurate title matcher in this batch: searching a library entry
returns the release itself, numbered as the studio numbered it ("Slut Puppies
#12"). Worth keeping near the front of a multi-site search for that reason.

Unlike the KVS sites here there is no player block, no ``license_code`` and no
obfuscation. The video page carries ordinary ``<source>`` tags on a signed CDN
host, and -- unusually for these sites -- the filename states the full
dimensions and bitrate (``..._1920x1080_4000k.mp4``), so a real resolution can
be reported for every rendition instead of a vague "HD".

**A video is addressed by a multi-segment path**, not an id:
``/group-sex/slut-puppies/600614/``. The category segment is part of the
address and a request without it does not resolve, so ``video_id`` carries the
whole path and ``resolve()`` rebuilds the URL from it verbatim.

The CDN URLs are signed and time-limited, so nothing here may be cached.
"""

import re
from urllib.parse import urljoin, urlparse

from loguru import logger
from lxml import html as lxml_html

from tubescraper_addon.scraper_api.base import (
    DirectScraper,
    DirectSource,
    DirectVideo,
    parse_count,
    parse_duration,
    resolution_from_dimensions,
)


_DIMENSIONS_RE = re.compile(r"_(\d{3,4}x\d{3,4})_")


class PornOneScraper(DirectScraper):
    key = "pornone"
    name = "PornOne"
    base_url = "https://pornone.com"

    def search(self, query: str, limit: int = 20) -> list[DirectVideo]:
        response = self._get(f"{self.base_url}/search", params={"q": query})
        tree = lxml_html.fromstring(response.text)

        videos: list[DirectVideo] = []
        seen: set[str] = set()
        for card in tree.xpath(
            "//a[contains(concat(' ', normalize-space(@class), ' '), ' videocard ')]"
        ):
            path = urlparse(card.get("href") or "").path.strip("/")
            if not path or path in seen:
                continue
            seen.add(path)

            # Pick the image by data-path, not by class or position. Cards
            # above the fold render the thumbnail eagerly as
            # ``img.thumbimg[src]``; the rest lazy-load it, dropping that class
            # and leaving ``src`` empty with the real URL in ``data-src``. The
            # only other images in a card are the "HD" and "add to" icons, so
            # falling back to the first ``img`` silently returned an icon as
            # the thumbnail. ``data-path`` is on the real thumbnail in both
            # states and on neither icon.
            images = card.xpath(".//img[@data-path]")
            thumbnail = ""
            if images:
                thumbnail = images[0].get("src") or images[0].get("data-src") or ""

            # The view count is the span carrying the views icon; its sibling
            # holds the uploader's name and would otherwise parse as a number.
            counts = card.xpath(
                ".//span[.//i[contains(@class, 'viewsIcon')]]"
            )

            videos.append(
                DirectVideo(
                    site=self.key,
                    video_id=path,
                    title=_text(card, "videotitle") or "Untitled",
                    page_url=urljoin(self.base_url + "/", path + "/"),
                    thumbnail=thumbnail or None,
                    duration=parse_duration(_text(card, "durlabel")),
                    # Stated only on the video page, in the source filenames.
                    resolution=None,
                    views=parse_count(counts[0].text_content() if counts else None),
                    # The badge is an <img> of hd.svg rather than text.
                    hd=bool(card.xpath(".//img[contains(@src, '/hd.svg')]")),
                )
            )
            if len(videos) >= limit:
                break

        return videos

    def resolve(self, video_id: str) -> list[DirectSource]:
        response = self._get(f"{self.base_url}/{video_id.strip('/')}/")
        tree = lxml_html.fromstring(response.text)

        sources: list[DirectSource] = []
        seen: set[str] = set()
        for tag in tree.xpath("//video//source | //source[@type='video/mp4']"):
            url = (tag.get("src") or "").strip()
            if not url.startswith("http") or url in seen:
                continue
            seen.add(url)
            dimensions = _DIMENSIONS_RE.search(url)
            resolution = (
                resolution_from_dimensions(dimensions.group(1)) if dimensions else None
            )
            sources.append(
                DirectSource(
                    url=url,
                    label=resolution or "Source",
                    resolution=resolution,
                    headers={"Referer": self.base_url + "/"},
                )
            )

        sources.sort(key=_rank, reverse=True)
        if not sources:
            logger.debug(f"pornone: no <source> tag on video {video_id}")
        return sources


def _text(element, class_name: str) -> str:
    found = element.xpath(
        f".//*[contains(concat(' ', normalize-space(@class), ' '), ' {class_name} ')]"
    )
    return found[0].text_content().strip() if found else ""


def _rank(source: DirectSource) -> int:
    match = re.search(r"(\d{3,4})p", source.resolution or "")
    return int(match.group(1)) if match else 0
