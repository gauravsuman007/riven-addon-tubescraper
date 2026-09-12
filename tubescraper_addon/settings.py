"""This add-on's settings.

Stored by the host under ``settings.addons["tubescraper"]`` and rendered as
its own Settings tab straight from this model's JSON Schema, so the tab costs
the add-on no frontend code at all. Field descriptions below are what the user
reads in the form, which is why several read as prose rather than as comments.

These fields were ``settings.direct_scraping`` in the host before the
extraction. The names are deliberately unchanged so that the migration is a
move rather than a translation, and so anything documented against the old
names still reads true.
"""

from pydantic import BaseModel, Field


class TubeScraperModel(BaseModel):
    """Which streaming-site scrapers run, and in what order.

    A scraper is just a Python file defining a ``DirectScraper`` subclass --
    see the README for the interface. None are built in: every site is a
    plugin, discovered from ``plugin_dir`` at startup and on rescan, and the
    add-on ships a maintained set in its own ``scrapers/`` folder.
    """

    plugin_dir: str = Field(
        default="",
        description=(
            "Folder holding the scraper plugins. Empty means the add-on's own "
            "bundled `scrapers/` folder, which is what you want unless you "
            "keep your own copies elsewhere -- installing or updating the "
            "add-on then brings the scrapers with it, with no folder to keep "
            "in sync by hand."
        ),
    )
    disabled: list[str] = Field(
        default_factory=list,
        description=(
            "Scraper keys switched off. Written by the add-on's own toggle, "
            "not meant to be edited here directly."
        ),
    )
    site_order: list[str] = Field(
        default_factory=list,
        description=(
            "Scraper keys in the order their results should appear. A site "
            "listed earlier always outranks a later one, whatever the two "
            "results' relevance scores say -- this is a stated preference, "
            "not a measurement. Anything not listed sorts after everything "
            "that is. Written by the reorder controls, not meant to be "
            "edited here directly."
        ),
    )
    results_per_site: int = Field(
        default=3,
        ge=1,
        le=20,
        description=(
            "How many results to keep per site, after ranking, when no "
            "explicit limit is given in the search request. The search box on "
            "a title's page always uses this value; the raw API still accepts "
            "a one-off `limit` query param that overrides it for a single "
            "call."
        ),
    )
