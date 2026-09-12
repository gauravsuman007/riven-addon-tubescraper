# riven-addon-tubescraper — agent notes

Tube-site scrapers for riven-tpdb, packaged as an add-on: search a streaming
site and play from its own CDN, with no torrent, debrid step or infohash.
`README.md` documents the scraper contract; this file covers working on the
add-on and the traps that have cost time.

Several Claude Code sessions work across these repos at once. Before changing
anything: `git log --oneline -10`.

## The shape of this add-on

- `riven_addon.py` is the whole contract with the host: a manifest, a settings
  model, a router, and nothing else.
- `tubescraper_addon/` is what is actually about tube sites: `ranking.py`
  (which of a site's results actually match the title asked for),
  `service.py` (the registry and the merge), `router.py` (the API),
  `settings.py` and `config.py`.
- `tubescraper_addon/scraper_api/` is the scraper contract -- `DirectScraper`,
  the VPN-routed session, the result models, the plugin loader. **This
  repository is its canonical copy**, and riven-addon-onlyfans carries an
  identical one under its own package name, because add-ons cannot import
  each other: either can be disabled or removed underneath the other.
  `scripts/sync-scraper-api.sh` moves changes across; never hand-edit the
  other copy.

  **The copies are checked, not trusted.** `scraper_api/drift.py` compares
  them on the deployed machine, where both are installed under `/riven/addons`
  side by side, and both add-ons' test suites call it. That matters because
  `_RoutedSession` lives in this package: two copies that disagree break
  nothing visible, they just send one add-on's scraper traffic out of the
  wrong address. The checker is inside the synced package deliberately -- kept
  beside the tests it would be one more pair of files free to rot, and the
  first thing to rot would be the rot detector.
- `scrapers/` is the maintained set of sites, loaded from wherever the add-on
  is installed.
- `ui/` is a prebuilt ESM bundle the host imports at runtime.

**It owns no tables and no Postgres schema.** Direct scraping is stateless, so
`metadata()` and `migrations_dir()` staying at their `None` defaults is the
accurate description of that rather than an omission.

## It has no page. It fills slots.

The manifest declares `slots=("details", "settings")` instead of a `nav`
entry. The host's details page and each add-on's settings tab each offer a
named slot; this add-on's bundle exports `slots` keyed by those names.

**The absent case is the requirement, not a side effect.** When the add-on is
missing or disabled the host renders *nothing* in that slot -- no empty panel,
no placeholder. `AddonSlot` in the frontend keeps its wrapper `display: none`
until something has actually mounted, because a zero-height element still
collects the surrounding layout's gap, which turns "the section does not show
up" into "the section is invisible and the page has a hole in it".

## Rebuild the UI bundle, or your change does not ship

`ui/addon.js` and `ui/addon.css` are **committed build output**. The host
serves those files; it does not build anything. Editing `ui/src/` and
committing without running the build ships the previous bundle, and everything
looks fine -- the add-on loads, the section renders, and none of the change is
in it.

    cd ui && npm install && npm run build && npm run smoke

`npm run smoke` mounts the built bundle in a real DOM with a stubbed fetch and
EventSource and drives both slots, including a streamed search and a click
through to the player bridge. It exists for one failure in particular: `$state`
in a plain `.js` compiles to nothing and dies with "$state is not defined" at
mount, while the build succeeds silently. That is why the entry point is
`main.svelte.js`.

## The host bridge is one function, on purpose

A slot gets `{ target, api, props, navigate, host }`. `host` carries exactly
one thing: `play()`.

Everything else reachable over HTTP the add-on fetches for itself -- VPN
status and bookmarks are same-origin host endpoints. The player is the
exception because it is in-page reactive state owned by the host's Svelte
runtime, and this bundle carries a different one; there is no way to hand that
across except as a call. Resist growing the bridge: every method added to it
is a thing the host must keep working for every future add-on.

## VPN routing must keep failing closed

The host's VPN service raises rather than falling back when a routed purpose
has no tunnel, and this add-on mirrors that in two places: the backend router
refuses with 503, and the UI disables the trigger and the play buttons before
the click.

**Never soften either into a direct connection.** Someone routing scraper
traffic is controlling where it appears to come from; quietly using the host's
own address instead defeats the only reason the setting exists, invisibly --
the scraper still works and the video still plays.

The session-level hook is the subtle half, and it is guarded by a test in
`tests/test_tube_scrapers.py` that MOVED HERE from the host's `test_vpn.py`
when `base.py` did. Applying the proxy in `_get` looks equivalent and is not:
`iporntv` calls `self.session.head` directly to probe a rendition, and that
request would go out around the tunnel while everything else went through it.
Overriding `_RoutedSession.request` covers every verb and every future call
site by construction.

## Running the tests

Like the host's suites, this is a plain script with a local `check()` harness,
not pytest. It prints `SKIP:` and exits 0 when its dependencies are absent, so
run it where they are:

    docker exec riven-tpdb env PYTHONPATH=/riven/src:/riven/addons/tubescraper \
      /riven/.venv/bin/python /riven/addons/tubescraper/tests/test_tube_scrapers.py

It covers the shared parsing helpers, the matching and ranking every scraper's
results run through, plugin discovery, and -- added with the extraction -- that
every bundled scraper in `scrapers/` still imports and claims a distinct key.
That last one matters because the add-on can be present, its settings tab can
render and its API can answer while every search quietly returns nothing.

## Deploying a scraper change

This is the part the extraction simplified. It used to be three steps across
two repositories with a `scp` in the middle. Now:

1. Commit here and push.
2. Settings → Plugins → Add-ons → **Check for updates**, then **Update**.

The update pulls the repo and reloads the add-on, scrapers included. There is
no folder on the server to keep in sync and no restart. If a scraper stops
appearing after an update, look at the settings tab's broken-scraper list
before anything else -- an import error is reported there, per file.

## There is still nothing to build for a scraper itself

Each file in `scrapers/` is a standalone plugin whose imports come from
`tubescraper_addon`, and it is only ever executed inside a running riven-tpdb
container. Iterating on live HTML with `docker exec riven-tpdb python3 ...`,
using the scraper's own `self.session`, is usually faster than reasoning about
the markup from a browser's view-source -- the site often serves us something
different.

## What a change to a scraper has to preserve

- **One file, one `DirectScraper` subclass.** `key` is unique and is what
  `/resolve` is keyed on; changing it orphans anything already pointing at it,
  bookmarks included.
- **Use `self.session` / `self._get(url)`.** It carries a real browser
  User-Agent and, when the user has enabled it, routes through their VPN. A
  bare `requests.get` bypasses both.
- **Never import another plugin's internals.** One scraper did (for a shared
  decoder) and it broke as soon as that plugin moved; the decoder was inlined
  instead. Duplicate the helper.
- **Explain *why* the site needed this approach**, in the file. Several of
  these sites need genuinely odd handling -- a media URL reassembled from
  JavaScript fragments, homoglyph obfuscation, a Cloudflare TLS-fingerprint
  gate needing `curl_cffi` rather than a headless browser. The next similar
  site is where that comment pays for itself.
- **A scraper that returns nothing is normal; one that raises is not.** Real
  failures must stay distinguishable from an empty result -- that distinction
  is surfaced in the UI, and swallowing an exception into `[]` hides a dead
  site behind "no results".

## Most of these sites are the same CMS (KVS), and that is the shortcut

Eight of the plugins here (`porntrex`, `watchporn`, `whoreshub`, `xxxtube`,
`pornwex`, `yespornvip`, `inxxx`, `saintporn`, plus the older `fpoxxx`) are
Kernel Video Sharing deployments. Recognising it saves most of the work on the
next tube site:

- The player block holds `video_url` plus numbered `video_alt_url` renditions,
  each with a matching `video_alt_url<N>_text` label.
- Media lives under `/get_file/...`, often with a short-lived `v-acctoken`.
- The search grid is `div.item` / `a.item` with `.duration`, `.views` and an
  `.is-hd` or `.qualtiy` badge (that misspelling is the CMS's, not a typo).

**The trap: some deployments scramble the media URL.** `video_url` comes back
as `function/0/https://.../get_file/N/<hash>/...`. Strip the prefix and
request what is left and you get a **404 from a perfectly well-formed URL** --
which reads as "the site changed" rather than "this needs decoding". The first
32 characters of the hash segment are permuted, and the permutation is derived
from the page's own `license_code`. `pornwex.py` and `yespornvip.py` need this
today; `_unscramble` in any of the eight is the working implementation.

Whether a deployment scrambles is a per-site setting that flips on a version
bump, so every KVS plugin here carries the decoder even when its site
currently serves plain URLs. `_unscramble` returns the URL untouched when
there is no `function/0/` prefix, so carrying it costs nothing.

Two things measured across this batch, worth not rediscovering:

- **Do not trust a `<source>` tag's `label`.** xxxfiles serves two sources
  labelled "720p" and "480p" pointing at the *same* 480p file. The filename
  (`_480m.mp4`, `_720p.mp4`) is the honest statement of height.
- **A site returning nothing is usually not broken.** `DirectScraperService`
  filters each site's results centrally with `best_matches()` against the
  library entry, so a scraper can return thirty rows and the API still shows
  zero. Check `search()` in isolation before hunting a parsing bug -- the
  API's `errors: {}` with empty results means your scraper ran fine and the
  ranker discarded everything.

## WordPress "full movie" sites are a dead end

Sites that look ideal by their listing -- bananamovies, pandamovies, euroxxx,
hdporn92, bestporn4free, freeomovie, fullxxxmovie, speedporn, perverzija,
pornhoarder -- turned out to embed third-party hosters (dood, streamtape,
filemoon, rapidgator, hqq) rather than serve their own media. There is no
direct URL to hand a player, so they cannot satisfy this contract. They were
evaluated and rejected; do not re-add them without checking the video page
actually carries a playable URL.

Likewise **pornslash** and **veporn** were rejected: pornslash exposes only
`/p/` preview clips (the real URL is fetched by JS), and veporn is a Next.js
app whose results live in the RSC flight payload.

## Scraped sites move

Expect breakage without warning: markup changes, a JSON endpoint disappears, a
CDN starts gating. When fixing, prefer the documented path the site actually
serves (some have a JSON fallback worth using) over a more clever parse of the
HTML that will rot again.

## Related repos

`riven-tpdb` (the host that loads this; its `AGENTS.md` documents the add-on
framework and the direct-play handoff), `riven-tpdb-frontend` (the details
page this fills a slot in, the player, and bookmarks), and
`riven-addon-onlyfans` (the other add-on, which has a page rather than slots
and is the reference for one).

`riven-tpdb-scrapers` was this repository's `scrapers/` folder until the
extraction and is now **archived**. Its unique documentation -- the KVS
decoder, the rejected-site findings above -- was brought here first.

## Never block the event loop

`/stream` is `async def` and the scrapers are synchronous (requests/urllib3).
Calling `resolve()` directly from it ran the scrape ON THE EVENT LOOP, where
blocking stops every request the backend is serving -- not just this one --
for as long as the site takes to answer. A site that has gone away hangs
rather than refusing, so that is minutes.

Measured: six concurrent requests for a video on an unreachable site took the
whole Riven API offline (library, playback, settings) at 0.4% CPU, while
Docker still reported the container healthy because the healthcheck does not
probe the API -- so nothing restarts it. It presents as "the external player
opens and buffers forever", which looks like a playback bug and is not.

`/sources` and `/handoff` are plain `def`, which FastAPI already runs in a
threadpool. **A plain `def` is the safe default for any endpoint here.** Where
an endpoint must be async, wrap the scrape in `run_in_threadpool`.

## One stream, one rendition

The rendition fallback exists because a site can advertise a rendition its CDN
does not hold. It must run ONLY on a request with no Range -- that is the
request actually choosing. Renditions are different files with different
lengths, so serving a Range out of a shorter one splices two videos together,
or, far more often, answers 416 for every smaller rendition.

And 416 is passed through, never rebranded 502: a player told 416 re-requests
from a valid offset, while a player told 502 retries the same request forever.

## Our CSS is outranked by the host unless the build says otherwise

`ui/postcss.config.js` prefixes every rule this add-on ships with four
`:not(#\#)` compounds. It is not decoration and it must not be removed.

The host downlevels its Tailwind v4 stylesheet for LG webOS
(`postcss.config.js` there, `chrome >= 94`), and postcss-preset-env emulates
`@layer` ordering with **specificity**: Tailwind's preflight, whose subject is
`*`, comes out at **(4,0,0)** because `:not()` takes its argument's specificity
and `#\#` is an id. Class-level CSS cannot reach that, so without the prefix
every declaration of ours that preflight also sets — padding, margin, border, a
button's background, a heading's font-size — is reset away, while colours and
`border-radius` survive.

That half-applied state looks precisely like a stylesheet that failed to load,
and was diagnosed as one twice. It is not: check
`getComputedStyle(el).padding` against the rule that sets it rather than the
network tab.

The host cannot fix this for us — it serves `ui/addon.css` verbatim — and it
cannot stop downleveling either, or webOS 23 renders it with no styles at all.

Keep authoring plain class selectors. The one rule the build must never touch
is a `@keyframes` selector: prefixing `0%` produces a keyframe that matches
nothing and kills the animation with no error.


## The television is a third surface, and it reads data not markup

`riven-tv` renders for sets running engines from about 2016 and **cannot run
`ui/addon.js`** — dynamic `import()` is Chromium 63, that target is 53. So
this add-on answers `tv/title` with plain JSON (`tubescraper_addon/tv.py`) and
a generic renderer over there draws it. The full contract is `docs/tv.md`.

Two things about it that are easy to undo by accident:

**Send the sections already grouped and already ordered.** The television
draws them in the order it receives them and sorts nothing. Ranking used to
happen there, from a copy of `SITE_TIERS` — the third copy, and they drifted,
and it could never see the site order the user set in the Plugins tab.
`site_tier()` is the one source now. Do not "helpfully" sort on the other
side.

**Never raise for a search that went badly.** `riven-tv` treats a non-200 as
"this section does not appear", so a 502 for three sites out of four failing
hides the failure completely — the viewer sees nothing and cannot tell it
from a title no site has. Answer 200 with empty `sections` and a populated
`problems`.

`browse` stays false in the manifest. There is nothing here to browse: this
add-on has no catalogue, it searches other people's sites when asked.
