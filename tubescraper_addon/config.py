"""Reading this add-on's settings, live.

Always read through ``settings()``; never bind the result to an attribute. A
settings save replaces the object these values live in, so anything holding a
copy goes on using what it was built with until the process restarts.

Note the shape change the extraction brought with it, because it is the one
thing most likely to be got wrong when porting code that used to read
``settings_manager.settings.direct_scraping``: that was a live, mutable
object, and assigning to one of its fields was a real write. ``settings()``
returns a **validated copy**, so mutating what it hands back changes nothing.
Anything that writes has to come back through ``save()``.
"""

from pathlib import Path

from program.settings import settings_manager

from tubescraper_addon.settings import TubeScraperModel


KEY = "tubescraper"

#: Where this file is, so the add-on can find the scrapers it ships with. Not
#: a configured path by default: an add-on that had to be told where its own
#: bundled files are is one more thing to get wrong on install.
ROOT = Path(__file__).resolve().parent.parent


def settings() -> TubeScraperModel:
    return TubeScraperModel.model_validate(
        settings_manager.settings.addons.get(KEY) or {}
    )


def plugin_dir() -> Path:
    """The scraper folder: the configured one, or the bundled one."""

    configured = settings().plugin_dir.strip()
    return Path(configured) if configured else ROOT / "scrapers"


def save(model: TubeScraperModel) -> None:
    """Write this add-on's settings back."""

    settings_manager.settings.addons[KEY] = model.model_dump()
    settings_manager.save()
