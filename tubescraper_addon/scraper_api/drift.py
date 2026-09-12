"""Check this vendored copy against every other add-on's copy.

THE PROBLEM THIS EXISTS FOR

Two add-ons carry an identical copy of this package, because neither may
depend on the other. The dangerous failure is not that a copy goes missing --
that raises immediately -- but that they quietly diverge. ``_RoutedSession``
is where the VPN proxy is applied, so a divergence there does not break
anything visible: one add-on's scraper traffic simply starts leaving from the
wrong address, which is the whole thing VPN routing exists to prevent.

WHY THE CHECK LIVES HERE RATHER THAN IN A TEST FILE

Because this module is itself part of what gets synced. A checker kept beside
the tests in each repository would be one more pair of files free to drift,
and the first thing to rot would be the thing meant to detect rot. Copied
along with what it checks, it cannot be stale without the check itself being
stale in a way the comparison then reports.

WHAT COUNTS AS A DIFFERENCE

Only the owning package name may differ -- ``tubescraper_addon.scraper_api``
against ``onlyfans_addon.scraper_api`` -- since each copy has to import
itself. That token is normalised away before comparing; everything else is
compared byte for byte.

WHERE IT LOOKS

The installed add-ons directory, i.e. this package's own grandparent: on a
deployment that is ``/riven/addons/<key>/<package>/scraper_api``. Finding no
sibling is not a failure. An add-on is legitimately installed on its own, and
a check that failed when it was alone would just teach people to ignore it.
"""

from __future__ import annotations

import re
from pathlib import Path

#: Files that must be identical across copies. `drift.py` includes itself --
#: a checker that exempted itself could be edited in one repo and never
#: report it.
TRACKED = ("__init__.py", "base.py", "models.py", "plugins.py", "drift.py")

_OWNER = re.compile(r"\b[a-z_]+_addon\.scraper_api\b")


def _normalise(path: Path) -> str:
    """The file's text with the owning package name neutralised."""

    return _OWNER.sub("<addon>.scraper_api", path.read_text())


def _copies(here: Path) -> list[Path]:
    """Every other add-on's `scraper_api` directory under the same root.

    `here` is `<addons>/<key>/<package>/scraper_api`, so the add-ons directory
    is three levels up. Globbed rather than assuming a package name, because
    an add-on names its own package whatever it likes.
    """

    addons_dir = here.parent.parent.parent

    if not addons_dir.is_dir():
        return []

    found = []

    for candidate in sorted(addons_dir.glob("*/*/scraper_api")):
        if candidate.resolve() != here.resolve() and (candidate / "base.py").is_file():
            found.append(candidate)

    return found


def compare() -> list[str]:
    """Differences against every sibling copy. Empty means agreement.

    Returns descriptions rather than raising, so the caller decides whether a
    divergence is a failing test or a logged warning. Nothing here should ever
    take an add-on down at import time: a mismatch is a serious maintenance
    problem, not a reason to stop serving.
    """

    here = Path(__file__).resolve().parent
    problems: list[str] = []

    for other in _copies(here):
        owner = other.parent.parent.name

        for name in TRACKED:
            mine, theirs = here / name, other / name

            if not theirs.is_file():
                problems.append(f"{owner} is missing scraper_api/{name}")
                continue

            if _normalise(mine) != _normalise(theirs):
                problems.append(
                    f"scraper_api/{name} differs from the copy in {owner!r} -- "
                    "re-sync with scripts/sync-scraper-api.sh; the VPN-routed "
                    "session lives in this package and a divergence there is "
                    "invisible at runtime"
                )

    return problems


def siblings() -> list[str]:
    """Names of the other add-ons carrying a copy, for a test to report."""

    return [other.parent.parent.name for other in _copies(Path(__file__).resolve().parent)]
