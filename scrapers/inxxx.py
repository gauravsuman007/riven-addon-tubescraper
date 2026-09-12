"""inxxx.com -- large KVS tube, addressed by slug rather than numeric id.

A broad catalogue that matched most of the library titles this batch was
tested against. Runtimes are more mixed than the other sites here (roughly
half the results run past twenty minutes), so it is useful for coverage
rather than as a first choice for a full release.

**Videos are addressed by slug**, and an unusual one: ``/v/<slug>.xxx-video``,
with the ``.xxx-video`` suffix part of the path rather than a file extension.
``video_id`` is therefore the whole trailing segment, passed back to
``resolve()`` untouched.

The ``title`` attribute on a card is prefixed with "Porn Video " by the site's
own templating; ``div.video-title`` holds the clean title, so that is
preferred and the attribute is only a fallback.

The ``function/0/`` unscrambler is inlined rather than shared -- plugins must
not import each other (see this repo's AGENTS.md).
"""

import re
from urllib.parse import urljoin, urlparse, urlunparse

from loguru import logger
from lxml import html as lxml_html

from program.services.scraper_plugins.base import (
    DirectScraper,
    DirectSource,
    DirectVideo,
    parse_count,
    parse_duration,
)


_RESOLUTION_RE = re.compile(r"(\d{3,4})p", re.IGNORECASE)
_FILENAME_HEIGHT_RE = re.compile(r"(?<=_)\d{3,4}p(?=\.)", re.IGNORECASE)
_VIDEO_SLUG_RE = re.compile(r"/v/([^/?#]+)")
_HASH_LENGTH = 32
_MEDIA_PATH = "/get_file/"


class InXXXScraper(DirectScraper):
    key = "inxxx"
    name = "inXXX"
    base_url = "https://www.inxxx.com"

    def search(self, query: str, limit: int = 20) -> list[DirectVideo]:
        response = self._get(f"{self.base_url}/search/", params={"q": query})
        tree = lxml_html.fromstring(response.text)

        videos: list[DirectVideo] = []
        seen: set[str] = set()
        for link in tree.xpath(
            "//a[contains(concat(' ', normalize-space(@class), ' '), ' item ')]"
            "[contains(@href, '/v/')]"
        ):
            match = _VIDEO_SLUG_RE.search(link.get("href") or "")
            if not match or match.group(1) in seen:
                continue
            seen.add(match.group(1))

            images = link.xpath(".//img")
            thumbnail = ""
            if images:
                thumbnail = images[0].get("src") or images[0].get("data-src") or ""
                if thumbnail.startswith("data:"):
                    thumbnail = ""

            # div.video-title is clean; @title is prefixed with "Porn Video ".
            title = _first_text(link, "video-title") or (link.get("title") or "")

            videos.append(
                DirectVideo(
                    site=self.key,
                    video_id=match.group(1),
                    title=title.strip() or "Untitled",
                    page_url=urljoin(self.base_url, link.get("href") or ""),
                    thumbnail=thumbnail or None,
                    duration=parse_duration(_first_text(link, "duration")),
                    resolution=None,
                    views=parse_count(_first_text(link, "video-views")),
                )
            )
            if len(videos) >= limit:
                break

        return videos

    def resolve(self, video_id: str) -> list[DirectSource]:
        response = self._get(f"{self.base_url}/v/{video_id}")
        return _kvs_sources(response.text, self.base_url, self.key)


def _first_text(element, class_name: str) -> str:
    """Text of the first descendant carrying `class_name`.

    XPath rather than a CSS selector: lxml's cssselect support is an optional
    dependency that is not installed in the runtime image.
    """

    found = element.xpath(
        f".//*[contains(concat(' ', normalize-space(@class), ' '), ' {class_name} ')]"
    )
    return found[0].text_content().strip() if found else ""


def _normalise_resolution(text: str | None) -> str | None:
    """Map a quality the site actually printed onto the project's label scale.

    Only a stated figure is accepted -- "4K"/"2160p" and plain heights. A bare
    "HD" badge carries no height and must never be guessed at; that is what
    the `hd` flag exists for.
    """

    if not text:
        return None
    cleaned = text.strip().lower()
    if cleaned in ("4k", "uhd", "2160"):
        return "2160p"
    if cleaned in ("fhd",):
        return "1080p"
    match = _RESOLUTION_RE.search(cleaned)
    return f"{match.group(1)}p" if match else None


def _license_token(code: str) -> str:
    """The digit sequence KVS derives from ``license_code`` to shuffle a hash."""

    modified = code.replace("$", "").replace("0", "1")
    centre = len(modified) // 2
    modified = str(4 * abs(int(modified[: centre + 1]) - int(modified[centre:])))
    return "".join(
        str((int(code[offset + i]) + int(modified[offset])) % 10)
        for offset in range(centre + 1)
        for i in range(1, 5)
    )


def _unscramble(url: str, code: str | None, key: str) -> str:
    """Undo the ``function/0/`` hash shuffle KVS applies to a media URL.

    Only the first 32 characters of the path's hash segment are permuted; the
    rest of the URL is untouched. A scrambled URL used as-is is a perfectly
    well-formed 404, so every failure path here returns "" rather than handing
    back a string that would fail later as an opaque playback error.
    """

    if not url.startswith("function/0/"):
        return url
    if not code:
        logger.debug(f"{key}: scrambled video_url but no license_code on the page")
        return ""

    parsed = urlparse(url[len("function/0/") :])
    parts = parsed.path.split("/")
    if len(parts) < 4:
        return ""
    try:
        token = _license_token(code)
        if len(token) < _HASH_LENGTH:
            return ""
        digest = parts[3][:_HASH_LENGTH]
        order = list(range(_HASH_LENGTH))
        accumulator = 0
        for src in reversed(range(_HASH_LENGTH)):
            accumulator += int(token[src])
            dest = (src + accumulator) % _HASH_LENGTH
            order[src], order[dest] = order[dest], order[src]
        parts[3] = "".join(digest[i] for i in order) + parts[3][_HASH_LENGTH:]
    except (IndexError, ValueError):
        logger.debug(f"{key}: license_code did not decode the media URL")
        return ""
    return urlunparse(parsed._replace(path="/".join(parts)))


def _kvs_sources(page: str, base_url: str, key: str) -> list[DirectSource]:
    """Every rendition in a KVS player block, best quality first.

    The primary ``video_url`` and the numbered ``video_alt_url`` entries have
    to be collected separately even though both can carry an empty numeric
    suffix: ``video_alt_url`` (unnumbered) has its own ``video_alt_url_text``
    label, and keying both on "" would attribute that label to the primary and
    leave the alternate unlabelled -- losing the only resolution the page
    states.
    """

    code_match = re.search(r"license_code:\s*'([^']+)'", page)
    code = code_match.group(1) if code_match else None

    alt_labels = dict(re.findall(r"video_alt_url(\d*)_text:\s*'([^']+)'", page))
    primary_label = re.search(r"video_url_text:\s*'([^']+)'", page)

    entries: list[tuple[str | None, str]] = [
        (None, raw) for raw in re.findall(r"video_url:\s*'([^']+)'", page)
    ]
    entries += re.findall(r"video_alt_url(\d*):\s*'([^']+)'", page)

    sources: list[DirectSource] = []
    seen: set[str] = set()
    for suffix, raw in entries:
        url = _unscramble(raw, code, key)
        if not url or url in seen:
            continue
        # A rendition the site reserves for members is SUBSTITUTED, not left
        # out: the entry keeps its "1080p" label and its ``_text`` alongside
        # it, and only the URL is swapped for the login page. Published as-is
        # it is the top-ranked source, so the player is handed an HTML
        # document to render as video -- which fails as a decode error with
        # nothing to say the rendition was never available.
        #
        # Every playable file on these deployments is served by the
        # ``/get_file/`` handler, so a URL that does not go through it is the
        # gate rather than the video.
        if _MEDIA_PATH not in url:
            continue
        seen.add(url)
        label = (
            (primary_label.group(1) if primary_label else "")
            if suffix is None
            else alt_labels.get(suffix, "")
        )
        # Several of these deployments ship no ``_text`` labels at all, but
        # still name the rendition in the file (``..._720p.mp4``). Falling
        # back to the filename is what keeps those sites from reporting every
        # rendition as an unlabelled "Source" with no height.
        named = _FILENAME_HEIGHT_RE.search(url)
        resolution = _normalise_resolution(label) or _normalise_resolution(
            named.group(0) if named else None
        )
        sources.append(
            DirectSource(
                url=url,
                label=label or resolution or "Source",
                resolution=resolution,
                # KVS checks Referer on the get_file handler and 403s without it.
                headers={"Referer": base_url + "/"},
            )
        )

    sources.sort(key=_rank, reverse=True)
    if not sources:
        logger.debug(f"{key}: no playable rendition in the player block")
    return sources


def _rank(source: DirectSource) -> int:
    match = _RESOLUTION_RE.search(source.resolution or source.label or "")
    return int(match.group(1)) if match else 0
