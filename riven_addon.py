"""Streaming-site (tube) scrapers, as a Riven add-on.

Everything this feature is lives in this repository: the scraper contract, the
ranking that decides which of a site's results actually match the title you
are looking at, the search/resolve/playback API, the scrapers themselves, and
its settings. The host knows only what the manifest below declares.

WHAT THIS ADD-ON DELIBERATELY DOES NOT HAVE

It owns no tables and no Postgres schema. Direct scraping is stateless -- a
query goes out, results come back, nothing is written down -- so there is
nothing for an uninstall to clean up beyond the folder itself. ``metadata()``
and ``migrations_dir()` staying at their ``None`` defaults is the accurate
description of that, not an omission.

It also has no page. Its whole user interface is a *section on a title's
page*, which is why the manifest declares a ``slots`` entry instead of a
``nav`` one: the host's details page offers a "details" slot, this add-on
fills it, and when the add-on is absent or disabled the host renders nothing
there at all rather than an empty panel explaining what is missing.

WHY THE IMPORTS AT THE TOP ARE EAGER

The host puts this folder on ``sys.path`` only while this file is executing,
then removes it so two add-ons cannot shadow each other's packages. Any
submodule imported lazily *after* that -- inside a request handler, say --
would fail to resolve. Importing everything here puts them all in
``sys.modules`` permanently, where the lazy imports inside the service find
them. Do not make these imports lazy to save startup time.
"""

from program.addons import Addon, AddonManifest

from tubescraper_addon import base, config, models, plugins, ranking, router, service
from tubescraper_addon.settings import TubeScraperModel


class TubeScraperAddon(Addon):
    manifest = AddonManifest(
        key="tubescraper",
        name="Tube Scraper",
        description=(
            "Finds a title on free streaming sites and plays it back through "
            "Riven, as a section on the title's own page. Ships a maintained "
            "set of twenty site scrapers; more can be dropped in."
        ),
        version="1.0.0",
        # No `nav`: this add-on has no page of its own. It fills the slot the
        # details page offers instead.
        slots=("details",),
    )

    def settings_model(self):
        return TubeScraperModel

    def router(self):
        return router.router

    def start(self) -> None:
        # Dropped rather than warmed. The add-on may be starting because it
        # was just updated or re-enabled, in which case whatever the registry
        # was holding was built by the previous version -- including the
        # scraper classes themselves, which ship inside this repository and
        # therefore change when it does.
        service.reset()

    def stop(self) -> None:
        service.reset()

    def status(self):
        """What the management page shows about this add-on.

        Deliberately includes the error count as well as the loaded count. A
        scraper that fails to import is invisible in "5 loaded" and is the
        single most common thing to go wrong here, since every one of them is
        a bet on one site's markup.
        """

        infos = service.describe_scrapers()

        return {
            "plugin_dir": str(config.plugin_dir()),
            "scrapers": len(infos),
            "enabled": sum(1 for info in infos if info.enabled),
            "errors": sum(1 for info in infos if info.error),
        }


ADDON = TubeScraperAddon()
