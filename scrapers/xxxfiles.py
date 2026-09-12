"""xxxfiles.com -- video.js player, renditions named by the file, not the tag.

Matched every library title this batch was tested against, which makes it the
most reliable *finder* in the set even though its result pages are small.

This is not a KVS site: there is no ``flashvars`` block, no ``license_code``
and no scrambling. The player is plain video.js and the ``get_file`` URLs sit
in ``<source>`` tags, unsigned and directly playable.

**The ``label`` attributes on those tags cannot be trusted.** A page is served
with two sources labelled "720p" and "480p" that point at the *same*
``_480m.mp4`` file, while the genuine ``_720m.mp4`` appears elsewhere in the
markup. Believing the label therefore offers a 720p entry that plays 480p.
The filename suffix (``_480m``/``_720m``) is the only honest statement of
height on the page, so renditions are collected from every ``get_file`` URL in
the document and labelled from that suffix.

**A video needs two path components**, an id and a hash
(``/videos/155979/5766.../``), and neither works without the other. They are
carried through as a single ``video_id`` joined by "_" -- unambiguous here
because the id is digits and the hash is hex.
"""

import re
from urllib.parse import urljoin

from loguru import logger
from lxml import html as lxml_html

from program.services.directscrapers.base import (
    DirectScraper,
    DirectSource,
    DirectVideo,
    parse_count,
    parse_duration,
    resolution_from_height,
)


_VIDEO_RE = re.compile(r"/videos/(\d+)/([0-9a-f]+)")
_GET_FILE_RE = re.compile(r"https?://[^\s\"'<>]*?/get_file/[^\s\"'<>]+")
_HEIGHT_RE = re.compile(r"_(\d{3,4})m\.mp4")


class XXXFilesScraper(DirectScraper):
    key = "xxxfiles"
    name = "XXXFiles"
    base_url = "https://www.xxxfiles.com"

    def search(self, query: str, limit: int = 20) -> list[DirectVideo]:
        response = self._get(f"{self.base_url}/search/", params={"q": query})
        tree = lxml_html.fromstring(response.text)

        videos: list[DirectVideo] = []
        seen: set[str] = set()
        for link in tree.xpath(
            "//a[contains(concat(' ', normalize-space(@class), ' '), ' thumb__top ')]"
        ):
            match = _VIDEO_RE.search(link.get("href") or "")
            if not match:
                continue
            video_id = f"{match.group(1)}_{match.group(2)}"
            if video_id in seen:
                continue
            seen.add(video_id)

            images = link.xpath(".//img")
            thumbnail = images[0].get("src") if images else ""

            # Views sit in the sibling div.thumb__info, outside the anchor.
            counts = link.xpath(
                "following-sibling::div[contains(@class, 'thumb__info')]"
                "//*[contains(concat(' ', normalize-space(@class), ' '),"
                " ' thumb__text ')][contains(text(), 'view')]"
            )

            badge = _text(link, "thumb__bage")

            videos.append(
                DirectVideo(
                    site=self.key,
                    video_id=video_id,
                    title=_text(link, "thumb__title") or "Untitled",
                    page_url=urljoin(self.base_url, link.get("href") or ""),
                    thumbnail=thumbnail or None,
                    duration=parse_duration(_text(link, "thumb__duration")),
                    # The card badge is a stated height ("720p"), unlike the
                    # per-source labels on the video page, which are wrong.
                    resolution=badge if re.fullmatch(r"\d{3,4}p", badge) else None,
                    views=parse_count(counts[0].text_content() if counts else None),
                    hd=badge in ("720p", "1080p", "1440p", "2160p"),
                )
            )
            if len(videos) >= limit:
                break

        return videos

    def resolve(self, video_id: str) -> list[DirectSource]:
        parts = video_id.split("_", 1)
        if len(parts) != 2:
            logger.debug(f"xxxfiles: malformed video_id {video_id!r}")
            return []

        response = self._get(f"{self.base_url}/videos/{parts[0]}/{parts[1]}/")

        sources: list[DirectSource] = []
        seen: set[str] = set()
        for url in _GET_FILE_RE.findall(response.text):
            if "preview" in url or url in seen:
                continue
            seen.add(url)
            height = _HEIGHT_RE.search(url)
            resolution = resolution_from_height(int(height.group(1))) if height else None
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
            logger.debug(f"xxxfiles: no get_file URL on video {video_id}")
        return sources


def _text(element, class_name: str) -> str:
    found = element.xpath(
        f".//*[contains(concat(' ', normalize-space(@class), ' '), ' {class_name} ')]"
    )
    return found[0].text_content().strip() if found else ""


def _rank(source: DirectSource) -> int:
    match = re.search(r"(\d{3,4})p", source.resolution or "")
    return int(match.group(1)) if match else 0
