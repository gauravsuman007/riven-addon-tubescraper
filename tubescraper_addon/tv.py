"""What a television draws for this add-on.

`riven-tv` is a second, JavaScript-free renderer for sets running engines from
about 2016. It cannot run this add-on's ``ui/addon.js`` any more than it can
run the main app's own bundle -- dynamic ``import()`` is Chromium 63 and the
target is 53 -- so an add-on reaches that surface the only way anything does
there: it answers plain JSON and one generic renderer over there draws it.

The contract is documented in ``docs/tv.md``. Two things about it shape this
file:

* **The cards are already grouped and already ordered here.** The television
  draws sections in the order it receives them and sorts nothing. That is
  deliberate: ranking these sites against each other used to be a copy of
  ``SITE_TIERS`` inside ``riven-tv`` -- the third copy, and they drifted, which
  is what the note in that repository's AGENTS.md was complaining about. The
  code that owns the sites owns the order again.

* **There is no browse screen.** This add-on has no catalogue; it searches
  other people's sites on demand. So it declares ``title`` and not ``browse``,
  and its whole television presence is a section on a library title's page --
  which is also where it sits in the main app, as a slot rather than a page.
"""

from typing import Annotated, Any
from urllib.parse import quote

from fastapi import APIRouter, HTTPException, Query
from loguru import logger
from starlette.concurrency import run_in_threadpool

from tubescraper_addon import config
from tubescraper_addon.service import site_tier

router = APIRouter(prefix="/tv", tags=["tubescraper-tv"])


def _gigabytes(size: int | None) -> str:
    value = int(size or 0)

    return f"{value / 1e9:.2f} GB" if value > 0 else ""


def _badges(video: Any) -> list[str]:
    """Resolution and size where the site reported them, and not otherwise.

    Most of these sites advertise a bare "HD" that covers 720p through 4K.
    Printing that as a resolution would be a claim the data does not support,
    so it stays the word it was.
    """

    out = [
        str(video.resolution) if video.resolution else ("HD" if video.hd else ""),
        _gigabytes(video.size),
        f"{int(video.views):,} views" if video.views else "",
    ]

    return [value for value in out if value]


@router.get("/title", operation_id="tubescraper_tv_title")
async def tv_title(
    item_id: Annotated[int, Query(ge=1)],
) -> dict[str, Any]:
    """The "where else can I watch this" section for one library title.

    Blocking work off the event loop, for the reason recorded in AGENTS.md:
    a synchronous scrape called from an ``async def`` stops every other
    request this process is serving, and a site that hangs then takes the
    whole API down while Docker still reports the container healthy.

    Never raises for a search that went badly. A television asked this
    because somebody pressed a button, and the useful answers are "here is
    what was found" and "here is which sites failed" -- an error page is
    neither, and the renderer on the other side treats a non-200 as "this
    section does not appear", which would hide the failure entirely.
    """

    # Imported here rather than at module scope: `router.py` owns these
    # helpers and importing it at import time would be circular.
    from tubescraper_addon.router import _build_target, _require_vpn

    target = _build_target(None, item_id)
    _require_vpn()

    from tubescraper_addon.service import service as direct_service

    direct = direct_service()

    try:
        per_site = config.settings().results_per_site
        results, errors = await run_in_threadpool(
            direct.search, target, limit_per_site=per_site
        )
    except HTTPException:
        raise
    except Exception as exc:
        logger.warning(f"Tube TV search failed for item {item_id}: {exc}")
        return {
            "heading": "Nothing found online",
            "problems": ["the search could not be run"],
            "sections": [],
        }

    grouped: dict[str, list[Any]] = {}

    for video in results:
        grouped.setdefault(video.site, []).append(video)

    # Tier first, then the best score any of the site's own results reached.
    # `site_tier` reads the user's own ordering where they have set one, so a
    # television agrees with the Plugins tab rather than with a constant.
    order = sorted(
        grouped.items(),
        key=lambda pair: (site_tier(pair[0]), -(pair[1][0].relevance or 0)),
    )

    sections = []

    for index, (site, videos) in enumerate(order):
        name = direct.services[site].name if site in direct.services else site

        sections.append(
            {
                "title": f"{name} — top {len(videos)}",
                "cards": [
                    {
                        # Opaque to the television, handed back to `tv/play`
                        # verbatim. A colon is safe: the id travels in a query
                        # string, never as a path segment.
                        "id": f"{site}:{video.video_id}",
                        "title": video.title,
                        "image": video.thumbnail or "",
                        "duration": int(video.duration or 0),
                        "badges": _badges(video),
                        # A claim about ordering across the whole search, so
                        # exactly one card carries it: the first of the first.
                        "flag": "Best match" if index == 0 and position == 0 else "",
                        "action": "play",
                    }
                    for position, video in enumerate(videos)
                ],
            }
        )

    return {
        "heading": "Found online",
        "note": (
            "These play straight from the site, through this server. "
            "Nothing is downloaded or added to the library."
        ),
        "problems": [f"{site}: {why}" for site, why in (errors or {}).items()],
        "empty": "Nothing found online",
        "sections": sections,
    }


@router.get("/play", operation_id="tubescraper_tv_play")
def tv_play(id: Annotated[str, Query(min_length=3, max_length=256)]) -> dict[str, Any]:
    """Where the bytes for one card are.

    It answers with a PATH on this add-on's own mount, not with the provider's
    URL. Two reasons, and the second is the one that bites: these URLs expire
    and are bound to whoever fetched them, so a television handed one plays
    for a while and then stops with a 403 and nothing on screen to explain it.
    The proxy re-resolves on every range request, which is also what makes a
    seek work an hour in.

    No title and no duration. Resolving a video here is a live fetch that
    yields a URL and a MIME type and knows nothing about what the video is
    called -- so the television keeps the title from the card that was
    pressed, which is the one it already showed the viewer.
    """

    site, _, video_id = id.partition(":")

    if not site or not video_id:
        raise HTTPException(status_code=404, detail="No such video")

    return {
        # Quoted: a site key is a folder name and an id is whatever the site
        # uses, and neither is guaranteed to be free of characters a query
        # string reads as structure.
        "stream": (
            "/api/v1/x/tubescraper/stream"
            f"?site={quote(site, safe='')}&video_id={quote(video_id, safe='')}&index=0"
        ),
        "content_type": "video/mp4",
    }
