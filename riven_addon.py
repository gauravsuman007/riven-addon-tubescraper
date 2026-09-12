"""Streaming-site (tube) scrapers, as a Riven add-on.

Everything this feature is lives in this repository: the scraper contract, the
ranking that decides which of a site's results actually match the title you
are looking at, the search/resolve/playback API, the scrapers themselves, and
its settings. The host knows only what the manifest below declares.

WHAT IT TAKES FROM THE HOST

The scraper contract itself -- ``DirectScraper``, the routed session, the
result models and the plugin loader -- is the HOST's
(``tubescraper_addon.scraper_api``), not this add-on's. Two add-ons write
scrapers against it, and neither may own what the other depends on: an add-on
can be disabled or removed, and a dependency between two of them would make
that removal break something else. What this add-on owns is everything that is
actually about tube sites -- the ranking, the registry, the API and the
scrapers themselves.

WHAT THIS ADD-ON DELIBERATELY DOES NOT HAVE

It owns no tables and no Postgres schema. Direct scraping is stateless -- a
query goes out, results come back, nothing is written down -- so there is
nothing for an uninstall to clean up beyond the folder itself. ``metadata()``
and ``migrations_dir()`` staying at their ``None`` defaults is the accurate
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

from program.addons import Addon, AddonManifest, AddonTv

from tubescraper_addon import config, ranking, router, service, tv
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
        # "settings" puts the live scraper list, its order and its toggles in
        # this add-on's own settings tab, beside the generated form -- which
        # can only express values to save, not actions against a running
        # registry.
        slots=("details", "settings"),
        # The television gets the same thing the details page gets: a section
        # on a title, not a screen. `browse` stays false because there is
        # nothing here to browse -- this add-on has no catalogue, it searches
        # other people's sites when asked.
        tv=AddonTv(title=True),
    )

    def settings_model(self):
        return TubeScraperModel

    def router(self):
        """One router, with the television's routes mounted inside it.

        Mounted here rather than returned separately so the host keeps a
        single mount point per add-on: everything this add-on serves lives
        under `/api/v1/x/tubescraper/`, which is also the prefix `riven-tv`
        refuses to let a stream path escape from.
        """

        # Idempotent. `router()` is called once per load today, but mounting
        # is a side effect and a second call would duplicate every television
        # route -- which FastAPI accepts silently and answers from whichever
        # it matches first.
        if not any(getattr(route, "path", "").startswith("/tv/") for route in router.router.routes):
            router.router.include_router(tv.router)

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
