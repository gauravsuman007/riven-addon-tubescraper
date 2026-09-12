"""The scraper plugin ABI: what a site scraper is, and how one is loaded.

**This is a vendored copy, and it is deliberately not the host's.** The host
owns no scraper code at all: everything to do with scraping belongs to the
add-ons that scrape. That is the rule, and this package existing here rather
than in ``program/services/`` is what keeps it true.

TWO ADD-ONS CARRY AN IDENTICAL COPY OF THIS PACKAGE

riven-addon-tubescraper and riven-addon-onlyfans both write scrapers against
it. They cannot import each other -- either can be disabled or removed
underneath the other -- so each carries its own, under its own package name,
which also means each gets its own entry in ``sys.modules`` and neither can
shadow the other on reload.

THE RISK, STATED PLAINLY, AND WHAT GUARDS IT

``_RoutedSession`` below is where the VPN proxy is applied. If the two copies
drift, nothing breaks visibly -- one add-on's scraper traffic simply starts
leaving from the wrong address, which is the entire thing VPN routing exists
to prevent.

So drift is checked rather than hoped for. Each add-on's test suite compares
this package against the other add-on's copy **on the deployed machine**,
where both are installed side by side, and fails if they differ. It skips
when the other add-on is not installed, because then there is nothing to
disagree with. See ``tests/`` and ``scripts/sync-scraper-api.sh``.

To change the contract: edit it in riven-addon-tubescraper, which is the
canonical copy, then run that script from the other repo to pull it across.
Never edit the two independently.
"""

from tubescraper_addon.scraper_api.base import (
    BROWSER_HEADERS,
    DirectScraper,
    parse_count,
    parse_duration,
    resolution_from_dimensions,
    resolution_from_height,
)
from tubescraper_addon.scraper_api.models import DirectSource, DirectVideo
from tubescraper_addon.scraper_api.plugins import discover_plugins

__all__ = [
    "BROWSER_HEADERS",
    "DirectScraper",
    "DirectSource",
    "DirectVideo",
    "discover_plugins",
    "parse_count",
    "parse_duration",
    "resolution_from_dimensions",
    "resolution_from_height",
]
