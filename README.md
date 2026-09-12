# riven-addon-tubescraper

Find a title on free streaming sites and play it back through Riven, as a
**Riven add-on**. No torrent, no debrid step, no infohash: the scraper resolves
a URL the site's own CDN will serve, and the backend proxies it to the player.

Install it from Settings → Plugins → Add-ons by pasting this repository's git
URL. Private repositories work too -- paste a personal access token alongside
the URL and it is used for the clone and for every later update check.

## It has no page, and that is deliberate

Every other add-on gets a screen of its own at `/x/<key>`. This one would be
useless there: the question it answers is "can I watch *this* right now?",
which only means anything next to a specific title.

So it fills a **slot** instead. The host's details page offers one, this
add-on declares `slots=("details",)` in its manifest, and its section appears
inside the page the host already renders. The consequence worth stating
plainly: **when this add-on is not installed, or is disabled, that section
does not appear at all.** Not an empty panel, not a placeholder -- the host
renders nothing there. Uninstalling takes its section away with it.

It fills a second slot, `settings`, which is where the live scraper list,
its ordering and its on/off toggles are rendered, beside the generated
settings form in this add-on's own tab.

## The scrapers come with it

`scrapers/` in this repository holds the maintained set -- twenty sites as of
writing -- and the add-on loads them from wherever it is installed. There is
**no separate repository and no mounted volume to keep in step**: installing
the add-on installs the scrapers, and updating it refreshes them. The old
`riven-tpdb-scrapers` repo was absorbed into this one and archived.

To add a site of your own, either open a pull request here or point
`plugin_dir` at a folder you keep yourself, which turns the bundled set off.

## What it owns, and what it borrows

It owns no database tables and no Postgres schema. Direct scraping is
stateless -- a query goes out, results come back, nothing is written down --
so there is nothing for an uninstall to clean up beyond the folder.

Two things it borrows from the host, because they are genuinely the host's:

- **The player.** In-page reactive state belonging to the host's Svelte
  runtime, which this bundle cannot share. The slot contract passes a
  `host.play()` function; that is the whole bridge.
- **Bookmarks.** Saved videos live in the host frontend's own database. The
  rule that makes add-ons removable is that the host never depends on an
  add-on, so the dependency runs this way round rather than the other. The
  cost, stated rather than hidden: removing this add-on leaves its bookmark
  rows behind. They stop being rendered, and they come back if it is
  reinstalled.

It also asks the host's VPN service how traffic is routed, and **refuses to
search or play when a routed tunnel is down** rather than falling back to a
direct connection -- see AGENTS.md.

## The contract

A plugin is one Python file with exactly one `DirectScraper` subclass:

```python
from tubescraper_addon.base import DirectScraper
from tubescraper_addon.models import DirectVideo, DirectSource


class MySiteScraper(DirectScraper):
    key = "mysite"          # unique; also what /resolve is keyed on
    name = "My Site"        # shown in the UI
    base_url = "https://mysite.example"

    def search(self, query: str, limit: int = 20) -> list[DirectVideo]:
        ...  # hit the site's search page/API, return up to `limit` results

    def resolve(self, video_id: str) -> list[DirectSource]:
        ...  # given one of your own video_ids, return its playable renditions
```

`tubescraper_addon.base` and `.models` are part of THIS repository, and that
is the change from when these scrapers lived on their own: a scraper's imports
used to come from the host application, so a file could only be reasoned about
inside a running container. They now come from the add-on it ships in.

A scraper is still only ever *executed* inside a riven-tpdb container -- the
add-on's own code reaches the host for settings and VPN routing -- so there is
still nothing to install here and no local test run for a single site. What
changed is that the contract a scraper is written against now lives beside it,
and a change to that contract is a change to this repository rather than a
version skew between two of them.

`DirectScraper.__init__` gives you `self.session`, a `requests.Session` with
a real browser User-Agent and, if the user has turned it on, automatic
routing through their configured VPN. Use it (`self._get(url)` is the
`session.get` + `raise_for_status()` shortcut every built-in scraper uses)
instead of calling `requests` directly, so your traffic honours that setting.
`noodlemagazine.py` is the one exception in this repo -- see its own section
below for why.

### `search(query, limit)` -> `list[DirectVideo]`

Best match first, at most `limit` items.

| Field | Type | Meaning |
| --- | --- | --- |
| `site` | `str` | Your scraper's `key` |
| `video_id` | `str` | Whatever identifies this video on your site -- passed back to `resolve()` unchanged |
| `title` | `str` | As the site wrote it. Matching against the library happens centrally, later; do not pre-filter here |
| `page_url` | `str` | Link to the video's page on the site |
| `thumbnail` | `str \| None` | |
| `duration` | `int \| None` | Seconds. `None`, never `0`, when the site does not say |
| `resolution` | `str \| None` | One of `"2160p"`, `"1440p"`, `"1080p"`, `"720p"`, `"576p"`, `"480p"`, `"360p"`, or `None` if genuinely unknown -- do not guess from an "HD" badge, that is what `hd` is for |
| `size` | `int \| None` | Bytes, if the site states it up front |
| `views` | `int \| None` | |
| `hd` | `bool` | The site showed an HD badge -- a claim, not a measurement |
| `relevance` | `float \| None` | Filled in later by the ranker; leave it `None` |

Do not filter or rank results yourself. `DirectScraperService` runs your
`search()` for several phrasings of the same query and scores everything
centrally against the library's title, cast and studio. A naive title-only
filter lets a lot of false positives through on these sites -- release
filenames on tube sites routinely embed unrelated site names, tag soup, and
cast lists for videos that are not actually a match.

### `resolve(video_id)` -> `list[DirectSource]`

Best quality first. Called fresh on every playback request -- these URLs are
frequently short-lived or IP-bound, so nothing here is cached, and nothing
you compute in `resolve()` should be either.

| Field | Type | Meaning |
| --- | --- | --- |
| `url` | `str` | The actual media URL |
| `label` | `str` | Shown in a quality picker, e.g. `"1080p"` or `"HD"` |
| `resolution` | `str \| None` | Same scale as above |
| `size` | `int \| None` | Bytes |
| `mime_type` | `str` | Defaults to `"video/mp4"` -- set it explicitly if your site serves HLS (`"application/vnd.apple.mpegurl"`) or anything else |
| `headers` | `dict[str, str]` | Extra headers the URL needs to actually load -- most commonly `Referer`. Travels with the URL rather than being reconstructed by whoever plays it |

### Helpers worth knowing about

`tubescraper_addon.base` also exports:

- `parse_duration(text)` -- turns `"30:30"`, `"1:02:03"`, `"37m"`, `"12 min"`
  into seconds. Handles the fact that most sites use more than one format
  across different pages of the same site.
- `parse_count(text)` -- turns `"1.1K"`, `"43K"`, `"115 000"` into an int.
- `resolution_from_height(px)` -- maps a pixel height (`720`) onto the
  project's label scale (`"720p"`).
- `resolution_from_dimensions("1280x720")` -- same, from a `WIDTHxHEIGHT`
  string.

Use these instead of writing your own parser; they already handle the format
variance these sites tend to have.

### Rules a plugin must follow

- **One `DirectScraper` subclass per file.** A file can define helper
  functions and classes freely; only the first `DirectScraper` subclass is
  registered as a scraper (a second is reported as an error, not silently
  ignored).
- **`key` cannot collide with a built-in.** riven-tpdb ships eight built-in
  scrapers whose keys are reserved: `tnaflix`, `eporner`, `hqporner`,
  `paradisehill`, `tubepornclassic`, `xfreehd`, `upornia`, `iporntv`. A plugin
  using one of those keys is rejected with a visible error in Settings ->
  Plugins rather than silently overriding a tested scraper.
- **Never raise out of `search()` or `resolve()` for an ordinary "no
  results."** Return an empty list. Raise only for something the caller
  should actually surface as an error (the site being unreachable, for
  instance) -- `DirectScraperService` already treats one scraper failing as
  normal and keeps the others' results.
- **A broken plugin cannot take the app down.** A syntax error, a missing
  import, a constructor that raises -- all of it is caught at load time,
  recorded as a per-file error visible in Settings -> Plugins, and the rest
  of the scrapers keep working. Fix the file and click "Rescan folder" again.

## How to find and write a new one

The two new scrapers in this repo (`fpoxxx.py`, `noodlemagazine.py`) were
both built the same way, and it is the reliable order to do it in:

1. **Confirm the search page works without JavaScript first.** Load the
   site's search results in a real browser with JS disabled, or just `curl`
   the URL your browser's address bar shows after searching. Most tube sites
   are still server-rendered HTML underneath, even when the page looks
   dynamic -- see `xfreehd.py`/`hqporner.py`/`fpoxxx.py`. If the page is
   empty without JS, check the Network tab for an XHR call returning JSON
   before reaching for a headless browser -- `upornia.py` is a Vue SPA that
   turned out to have exactly that.
2. **Never trust a site's own `<form action>`.** `noodlemagazine.py`'s
   biggest trap: the visible search box's declared form action
   (`/home?story=<query>`) silently ignores the query and renders the
   homepage's popular list instead -- indistinguishable from a genuine
   zero-result search unless you already know what "no results" looks like
   on that template. The real endpoint (`/video/<query>`) was only found by
   actually submitting the box in a browser and reading the address bar
   afterwards, not by reading the form markup.
3. **If you get a Cloudflare/challenge page, check whether it is a TLS
   fingerprint check before reaching for a headless browser.** A JS
   challenge that actually runs code needs a real browser (or something like
   Playwright). Many "Just a moment..." pages are actually gating on the TLS
   handshake's fingerprint (JA3), which a plain `requests` call cannot fake
   but a library like `curl_cffi` can, in one HTTP request, for a fraction of
   the weight of headless Chromium. `noodlemagazine.py` is this case --
   confirm which one you're facing before you commit to the heavier fix.
4. **Look at the video page's raw HTML before assuming the URL is
   obfuscated.** Search for `.mp4`, `m3u8`, `sources`, `playlist`, or
   `flashvars` in the page source. Several sites (`fpoxxx.py`,
   `noodlemagazine.py`) hand you a completely plain, unobfuscated JSON blob
   or JS object literal with the real media URL already in it -- no crypto,
   no reassembly. Only reach for pattern-matching across scattered JS
   variables (`iporntv.py`) or de-obfuscation (`upornia.py`'s homoglyph
   swap) once you've confirmed the plain version genuinely isn't there.
5. **Verify the resolved URL actually plays** with a byte-range request
   (`curl -H "Range: bytes=0-1023" <url> -o test.mp4 && file test.mp4`)
   before wiring up the scraper class. It should come back `206 Partial
   Content` with `Accept-Ranges: bytes` and the output should say
   `ISO Media, MP4` (or your site's actual container) -- not an HTML error
   page saved with an `.mp4` name.
6. **Write the class**, following the shape of whichever existing scraper is
   closest to the pattern you found. Return `[]` for no results, not an
   exception; raise only for the site being genuinely unreachable.
7. **Drop it in `plugins/` and check Settings -> Plugins.** A load error
   shows up there immediately, scoped to your file -- fix and rescan, no
   restart needed.

## `noodlemagazine.py` and the `curl_cffi` dependency

Every request to noodlemagazine.com, including the search page, is gated by
a Cloudflare Turnstile challenge that blocks on TLS fingerprint, not on
JavaScript execution. `curl_cffi`, which impersonates a real Chrome build's
TLS handshake, gets a normal `200` with real markup on the first request --
no cookie dance, no ~110 MB headless Chromium. This is the only scraper in
either repo that needs a dependency beyond what riven-tpdb already ships with
`requests`/`lxml`; it builds its own `curl_cffi.requests.Session` instead of
using the base class's `self.session`; and it re-applies the app's VPN
routing policy manually (`program.services.vpn.vpn().proxies_for(...)`) since
that policy normally lives in `_RoutedSession`, which this plugin doesn't use.

**To use this plugin, `curl_cffi` must be a dependency of the riven-tpdb
image itself** (add `"curl-cffi>=0.16.0,<0.17"` to `pyproject.toml`, update
`uv.lock`, rebuild) -- a plugin file cannot bring its own Python dependencies
along, since it runs inside the app's existing virtualenv. Every other
scraper in this repo needs nothing beyond what riven-tpdb already ships.

## License

Same as riven-tpdb: GPL-3.0.
