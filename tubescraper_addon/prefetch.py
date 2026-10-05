"""Searches that start when a title's page opens and are joined when asked for.

A search is twenty-odd live requests to other people's websites. Run on the
click, the viewer waits for the slowest site; run when the page opens, most of
that time has already passed by the time the button is pressed.

So there are two separate clocks, and keeping them separate is the point:

* **The run has no deadline.** `prefetch` starts it in a background thread
  when the title page opens and nothing cuts it short -- a site that takes
  forty seconds is allowed forty seconds. (Each scraper's own HTTP calls are
  still bounded by `requests`, so "no deadline" cannot mean "forever".)
* **The wait has one, and it starts at the click.** `follow` joins a run --
  already finished, half done, or not yet started -- and replays what it has
  found. Only then does `search_timeout_seconds` begin counting. Sites that
  have not answered by then are reported as timed out for *this* viewer; the
  run itself keeps going, so opening the page again, or a second device,
  finds them.

A run is keyed by what was searched (the title and everything the matcher
knows about it), the per-site limit and the site selection, so the click finds
the run the page-open started. A typed custom search is a different key and is
simply run on demand.

Prefetching has to stay cheap enough to leave on. Four things bound it:

* the same title is never searched twice at once, or again within
  ``CACHE_SECONDS`` (a result worth showing is worth keeping);
* a run in which every site failed is not kept, so a transient outage is
  retried rather than remembered;
* at most ``MAX_PREFETCHING`` runs started *by a page opening* are in flight
  at once. A further request is declined, not queued -- somebody flicking
  through twenty titles should not leave twenty searches behind them -- and
  the click that does want a search simply starts one;
* the VPN rule is not bypassed: a purpose routed through a tunnel that is
  down starts nothing (see `router._require_vpn`).
"""

import threading
import time
from collections import OrderedDict
from collections.abc import Iterator

from loguru import logger

from tubescraper_addon.ranking import MatchTarget
from tubescraper_addon.scraper_api.models import DirectVideo
from tubescraper_addon.service import DirectScraperService, _merge_ranked, site_tier

#: How long a finished run is reused.
CACHE_SECONDS = 15 * 60
#: Runs kept in memory, finished or not. Oldest finished ones go first.
MAX_RUNS = 40
#: Concurrent runs that a page opening may have started.
MAX_PREFETCHING = 2

Event = tuple[str, str, list[DirectVideo], str | None]


class SearchRun:
    """One search across the selected sites, running in its own thread."""

    def __init__(
        self,
        service: DirectScraperService,
        target: MatchTarget,
        limit_per_site: int,
        sites: list[str] | None,
        prefetched: bool,
    ) -> None:
        self.service = service
        self.target = target
        self.limit_per_site = limit_per_site
        self.sites = sites
        self.prefetched = prefetched

        self.names = {
            key: scraper.name
            for key, scraper in service.services.items()
            if not sites or key in sites
        }
        self.events: list[Event] = []
        self.done = False
        self.failure: str | None = None
        self.finished_at: float | None = None

        self._changed = threading.Condition()
        threading.Thread(
            target=self._work, name="tubescraper-search", daemon=True
        ).start()

    def _work(self) -> None:
        try:
            for event in self.service.search_streaming(
                self.target, limit_per_site=self.limit_per_site, sites=self.sites
            ):
                with self._changed:
                    self.events.append(event)
                    self._changed.notify_all()
        except Exception as exc:  # noqa: BLE001
            logger.warning(f"Background search failed: {exc}")
            self.failure = str(exc)
        finally:
            with self._changed:
                self.done = True
                self.finished_at = time.monotonic()
                self._changed.notify_all()

    @property
    def total(self) -> int:
        return len(self.names)

    def usable(self) -> bool:
        """Whether this run is worth handing to a new request."""

        if not self.done:
            return True
        if self.failure or self.finished_at is None:
            return False
        if time.monotonic() - self.finished_at > CACHE_SECONDS:
            return False
        # Every site failed or found nothing *and* said why: an outage, not
        # an answer. Retry it instead of serving the failure for 15 minutes.
        return not (self.events and all(error for _, _, _, error in self.events))

    def follow(self, timeout: float) -> Iterator[Event]:
        """Everything found so far, then the rest as it arrives.

        ``timeout`` counts from THIS call -- the moment somebody asked --
        not from when the run started. Sites still out at the deadline are
        yielded as an error so the caller can say so, and the run carries on.
        """

        deadline = time.monotonic() + timeout
        index = 0
        seen: set[str] = set()

        while True:
            with self._changed:
                while index >= len(self.events) and not self.done:
                    remaining = deadline - time.monotonic()
                    if remaining <= 0:
                        break
                    self._changed.wait(remaining)

                batch = self.events[index:]
                index = len(self.events)
                finished = self.done and index >= len(self.events)

            for event in batch:
                seen.add(event[0])
                yield event

            if finished:
                return

            if time.monotonic() >= deadline and not batch:
                for key, name in self.names.items():
                    if key not in seen:
                        yield key, name, [], f"no answer within {int(timeout)}s"
                return


_runs: "OrderedDict[tuple, SearchRun]" = OrderedDict()
_lock = threading.Lock()


def _key(
    service: DirectScraperService,
    target: MatchTarget,
    limit_per_site: int,
    sites: list[str] | None,
) -> tuple:
    return (
        id(service),
        target.title,
        target.performers,
        target.studio,
        limit_per_site,
        tuple(sorted(sites)) if sites else (),
    )


def run_for(
    service: DirectScraperService,
    target: MatchTarget,
    limit_per_site: int,
    sites: list[str] | None = None,
    prefetch: bool = False,
) -> tuple[SearchRun | None, str]:
    """The run for this search, starting one if there is none worth reusing.

    Returns ``(run, state)``; ``state`` is ``"started"``, ``"joined"`` or --
    only for a prefetch that was declined -- ``"busy"`` with no run.
    """

    key = _key(service, target, limit_per_site, sites)

    with _lock:
        existing = _runs.get(key)
        if existing is not None and existing.usable():
            _runs.move_to_end(key)
            return existing, "joined"

        if prefetch:
            running = sum(
                1 for run in _runs.values() if run.prefetched and not run.done
            )
            if running >= MAX_PREFETCHING:
                return None, "busy"

        run = SearchRun(service, target, limit_per_site, sites, prefetch)
        _runs[key] = run
        _runs.move_to_end(key)

        # Make room by dropping the oldest runs that are no longer working.
        for stale in [k for k, r in _runs.items() if r.done]:
            if len(_runs) <= MAX_RUNS:
                break
            del _runs[stale]

        return run, "started"


def best_first(events: list[Event]) -> list[Event]:
    """Sites ordered by how well their best result matches the query.

    Used when a run had already finished before anyone asked, so there is
    nothing left to wait for and nothing to be re-sorted under the viewer --
    the whole answer can be put in its final order up front. A site's score is
    its top result's relevance. Relevance is coarse (several exact matches
    all score 1.0), so ties go to the site preference, `site_tier`, which is
    where a user's own ordering in the Plugins tab still counts. Sites that
    found nothing, or failed, come last.
    """

    def order(event: Event) -> tuple[float, int]:
        videos = event[2]
        best = max((v.relevance or 0.0 for v in videos), default=-1.0)
        return (-best, site_tier(event[0]))

    return sorted(events, key=order)


def search_blocking(
    service: DirectScraperService,
    target: MatchTarget,
    limit_per_site: int,
    sites: list[str] | None,
    timeout: float,
) -> tuple[list[DirectVideo], dict[str, str], bool]:
    """`DirectScraperService.search`, answered from the shared run.

    Same shape as the original, plus whether the run had already finished
    when this call arrived -- in which case the list is ordered best match
    first (see `best_first`) instead of by site preference first. What also
    differs is that a run already under way (or finished) is joined instead
    of repeated, and the wait is bounded by ``timeout`` from now.
    """

    run, _ = run_for(service, target, limit_per_site, sites)
    assert run is not None
    ready = run.done

    results: dict[str, list[DirectVideo]] = {key: [] for key in run.names}
    errors: dict[str, str] = {}

    for key, _name, videos, error in run.follow(timeout):
        results[key] = videos
        if error:
            errors[key] = error

    selected = {key: service.services[key] for key in run.names}
    merged = _merge_ranked(selected, results)

    if ready:
        # Stable, so equal scores keep the preference order the merge gave.
        merged = sorted(merged, key=lambda v: -(v.relevance or 0.0))

    return merged, errors, ready


def reset() -> None:
    """Forget every run -- a settings change or a new plugin invalidates them."""

    with _lock:
        _runs.clear()
