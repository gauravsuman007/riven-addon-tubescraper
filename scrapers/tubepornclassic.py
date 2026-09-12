"""tubepornclassic.com -- the same platform as upornia, different catalogue.

Confirmed rather than assumed: its search and file-resolution endpoints are
byte-for-byte the same shape as upornia's (``/api/videos2.php``,
``/api/videofile.php``), and a captured ``video_url`` decodes correctly
through upornia's homoglyph-substitution logic unchanged.

The decoder is duplicated from upornia.py rather than imported, deliberately:
each file here is loaded as an independent plugin (see riven-tpdb's
`scraper_plugins/plugins.py`), each getting its own isolated module
namespace with a generated name -- there is no stable `import
tubescraper_addon.scraper_api.upornia` to reach across to any more once
neither file ships with the app itself. Confirmed live: exactly that import
is what broke this file the day both became plugins, with
`ModuleNotFoundError` for a module name the app database never had a
built-in registered under in the first place.
"""

import base64
from urllib.parse import urljoin

from loguru import logger

from tubescraper_addon.scraper_api.base import (
    DirectScraper,
    DirectSource,
    DirectVideo,
    parse_count,
    parse_duration,
    resolution_from_dimensions,
)

#: Cyrillic letters that render identically to Latin ones, used to corrupt the
#: base64 payload -- see upornia.py, where this decoder originates.
_HOMOGLYPHS = str.maketrans(
    "АВЕКМНОРСТХ"
    "аеорсух"
    ",",
    "ABEKMHOPCTXaeopcyx"
    "/",
)


def _deobfuscate(value: str) -> str:
    """Undo the homoglyph substitution and decode the base64 path."""

    if not value:
        return ""
    normalised = value.translate(_HOMOGLYPHS).replace("~", "=")
    normalised += "=" * (-len(normalised) % 4)
    try:
        decoded = base64.b64decode(normalised).decode("utf-8", "replace")
    except Exception:
        logger.debug("tubepornclassic: video_url did not decode as base64")
        return ""

    if not decoded.startswith("/"):
        logger.debug("tubepornclassic: decoded video_url is not a path")
        return ""
    return decoded


def _best_size(file_formats: str | None) -> int | None:
    """Pull the largest byte count out of the packed ``file_formats`` string.

    Pipe-delimited groups of ``|<suffix>|<dimensions>|<bitrate>|<bytes>|...``,
    one per rendition including the short preview clip. The largest figure is
    the full video; the rest are trailers.
    """

    if not file_formats:
        return None
    sizes = [
        int(part)
        for part in file_formats.split("|")
        if part.isdigit() and int(part) > 1_000_000
    ]
    return max(sizes) if sizes else None


class TubePornClassicScraper(DirectScraper):
    key = "tubepornclassic"
    name = "TubePornClassic"
    base_url = "https://tubepornclassic.com"

    def search(self, query: str, limit: int = 20) -> list[DirectVideo]:
        payload = self._get(
            f"{self.base_url}/api/videos2.php",
            params={
                "params": f"86400/str/relevance/{max(limit, 20)}/search..1.all..",
                "s": query,
            },
            headers={"Accept": "application/json", "Referer": f"{self.base_url}/"},
        ).json()

        videos: list[DirectVideo] = []
        for entry in payload.get("videos", []):
            video_id = str(entry.get("video_id") or "")
            if not video_id:
                continue

            videos.append(
                DirectVideo(
                    site=self.key,
                    video_id=video_id,
                    title=(entry.get("title") or "Untitled").strip(),
                    page_url=urljoin(
                        self.base_url, f"/videos/{video_id}/{entry.get('dir', '')}/"
                    ),
                    thumbnail=entry.get("scr") or None,
                    duration=parse_duration(entry.get("duration")),
                    resolution=resolution_from_dimensions(
                        entry.get("file_dimensions")
                    ),
                    size=_best_size(entry.get("file_formats")),
                    views=parse_count(str(entry.get("video_viewed") or "")),
                )
            )
            if len(videos) >= limit:
                break

        return videos

    def resolve(self, video_id: str) -> list[DirectSource]:
        formats = self._get(
            f"{self.base_url}/api/videofile.php",
            params={"video_id": video_id, "lifetime": 864000},
            headers={"Accept": "application/json", "Referer": f"{self.base_url}/"},
        ).json()

        sources: list[DirectSource] = []
        for entry in formats or []:
            path = _deobfuscate(entry.get("video_url") or "")
            if not path:
                continue
            sources.append(
                DirectSource(
                    url=urljoin(self.base_url, path),
                    label=(entry.get("format") or "").lstrip(".").upper() or "Source",
                    headers={"Referer": f"{self.base_url}/"},
                )
            )

        if not sources:
            logger.debug(f"tubepornclassic: no playable format for video {video_id}")
        sources.sort(key=lambda s: s.label != "MP4")
        return sources
