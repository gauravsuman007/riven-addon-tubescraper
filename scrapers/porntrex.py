"""porntrex.com -- KVS (Kernel Video Sharing) tube, large full-length catalogue.

PornTrex is the biggest site in this batch and the one that most often carries
a whole studio release rather than a trimmed scene. It is a stock KVS
deployment, so the playable URLs sit in the player block as ``video_url`` plus
numbered ``video_alt_url`` renditions, each with a matching ``_text`` label
("720p HD").

Two things are worth knowing before editing this file.

**The search grid reuses the class name ``item``.** So does the category
dropdown in the header, which renders dozens of ``div.item.dropdown-item``
tiles linking to ``/categories/...``. Selecting on ``item`` alone pulls those
in as results; the video cards are specifically ``div.video-item``.

**The card states a real resolution.** ``span.quality`` carries "1080p" or
"1440p" -- an actual figure from the file, not the "HD" badge sitting next to
it -- so it is reported as ``resolution`` while the badge only sets ``hd``.

The ``function/0/`` unscrambler below is not needed by this site *today*: its
``video_url`` arrives as a plain URL. It is kept because that is a
per-deployment KVS setting which flips on a version bump, and when it flips
the URL becomes a well-formed 404 rather than failing loudly -- surfacing much
later as "this scraper quietly stopped working". Inlined rather than shared:
plugins must not import each other (see this repo's AGENTS.md).
"""

import re
from urllib.parse import urljoin, urlparse, urlunparse

from loguru import logger
from lxml import html as lxml_html

from tubescraper_addon.scraper_api.base import (
    DirectScraper,
    DirectSource,
    DirectVideo,
    parse_count,
    parse_duration,
)


_RESOLUTION_RE = re.compile(r"(\d{3,4})p", re.IGNORECASE)
_FILENAME_HEIGHT_RE = re.compile(r"(?<=_)\d{3,4}p(?=\.)", re.IGNORECASE)
_HASH_LENGTH = 32
_MEDIA_PATH = "/get_file/"


class PornTrexScraper(DirectScraper):
    key = "porntrex"
    name = "PornTrex"
    base_url = "https://www.porntrex.com"

    def search(self, query: str, limit: int = 20) -> list[DirectVideo]:
        response = self._get(f"{self.base_url}/search/", params={"q": query})
        tree = lxml_html.fromstring(response.text)

        videos: list[DirectVideo] = []
        for item in tree.xpath(
            "//div[contains(concat(' ', normalize-space(@class), ' '), ' video-item ')]"
        ):
            numeric_id = (item.get("data-item-id") or "").strip()
            links = item.xpath(".//p[contains(@class, 'inf')]//a[@href]")
            if not numeric_id or not links:
                continue

            # THE ID CARRIES THE SLUG, and it has to.
            #
            # Every other KVS deployment here redirects a placeholder slug
            # onto the canonical URL, so the numeric id is enough to resolve
            # from. PornTrex does not, and fails in three different ways --
            # measured on /video/2031785: with the exact slug and no trailing
            # slash the page carries the player; with a trailing slash the
            # same page comes back WITHOUT `video_url` or `license_code`; and
            # the bare id answers 200 with an EMPTY BODY. None of those is an
            # error the scraper could notice, which is why this read as "the
            # site works, playback does not".
            slug = urlparse(links[0].get("href") or "").path.strip("/").split("/")
            video_id = f"{numeric_id}/{slug[-1]}" if len(slug) > 2 else numeric_id

            title = (links[0].get("title") or links[0].text_content()).strip()

            videos.append(
                DirectVideo(
                    site=self.key,
                    video_id=video_id,
                    title=title or "Untitled",
                    page_url=urljoin(self.base_url, links[0].get("href") or ""),
                    thumbnail=_thumbnail(item, self.base_url),
                    duration=parse_duration(_first_text(item, "durations")),
                    resolution=_normalise_resolution(_first_text(item, "quality")),
                    views=parse_count(_first_text(item, "viewsthumb")),
                    hd=bool(
                        item.xpath(
                            ".//*[contains(concat(' ', normalize-space(@class), ' '),"
                            " ' hd-text-icon ')]"
                        )
                    ),
                )
            )
            if len(videos) >= limit:
                break

        return videos

    def resolve(self, video_id: str) -> list[DirectSource]:
        # `video_id` is "<numeric id>/<slug>" -- see the note in `search`. No
        # trailing slash: adding one costs the player block.
        response = self._get(f"{self.base_url}/video/{video_id.strip('/')}")
        return _kvs_sources(response.text, self.base_url, self.key)


def _thumbnail(item, base_url: str) -> str | None:
    """First card image, as an absolute URL.

    ``src`` is a lazy-load placeholder on every card and the real image lives
    in ``data-src`` -- which is also protocol-relative
    (``//ptx.cdntrex.com/...``), so it has to be joined against the base
    rather than used as it stands.
    """

    images = item.xpath(".//img[contains(@class, 'cover')]") or item.xpath(".//img")
    if not images:
        return None
    source = images[0].get("data-src") or images[0].get("src") or ""
    return urljoin(base_url + "/", source) if source else None


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
