# Raising performer coverage

Written 2026-09-12, after a session where a performer with several hundred
videos on their OnlyFans profile turned up a handful here. This records why,
and the plan, so the diagnosis does not have to be redone.

## This add-on answers a different question

Everything in `service.py` is built to answer "can I watch *this scene* right
now?". Pointing it at a performer and expecting their catalogue asks it a
question it was not shaped for, and four caps compound before any site is even
at fault:

- **`limit_per_site=3`** (`service.py`) -- at most three videos per site
  survive, whatever came back. Twenty sites is a ceiling of sixty, before
  ranking discards anything.
- **`CANDIDATE_POOL = 30`** -- one search page per phrasing. There is no
  pagination anywhere in the contract.
- **`query_ladder()` is title-shaped**: title, title + lead performer, series.
  A redistributed OnlyFans clip has no scene title -- it is called "Jane Doe
  OnlyFans leak #47" -- so every rung is the wrong question.
- **`best_matches()` scores over distinctive tokens.** When the performer's
  name is the only distinctive token, near-everything scores the same, and the
  bucketed sort drops the tail without saying so.

So a better site list alone moves the number by very little. Fix the pipeline
first.

## The plan, in the order worth doing it

1. **A performer-catalogue mode, separate from scene search.** Most KVS
   deployments (eight of the bundled scrapers) expose `/models/<slug>/` and
   `/categories/<tag>/` as *listings*, not searches. Enumerate those and
   **skip the ranker entirely**: on `…/models/jane-doe/`, the URL has already
   established attribution, and scoring a name against a title that contains
   that name is noise. This is the largest single win.

2. **Let `resolve()` be the filter.** In performer mode a card that resolves
   is a card worth showing; there is nothing else to decide.

3. **Paginate.** `search(query, CANDIDATE_POOL)` becomes page-aware. These
   sites go twenty to fifty pages deep on a model tag. This changes
   `DirectScraper`, so it is a `scripts/sync-scraper-api.sh` round trip to
   riven-addon-onlyfans and a `drift.py` concern -- not a local edit.

4. **Add the OnlyFans username as its own rung.** Uploads are titled by handle
   (`@janedoe`), not by stage name. `460e652` already carries the username
   through the scraper API; this spends it.

5. **Two site classes worth adding, both enumeration-first.** The Bunkr /
   Cyberdrop family serves direct `.mp4` from its own CDN behind album pages
   that enumerate cleanly, and Coomer/Kemono-style aggregators expose a JSON
   post feed per creator with direct attachment URLs and no captcha. Both fit
   `DirectScraper`; neither fits *search*, which is why they pair with (1)
   rather than standing alone.

## The ceiling is real, and the UI should say so

A profile with hundreds of videos has perhaps five to fifteen percent of it
redistributed anywhere at all. Parity is not reachable, and a panel that
implies it is reads as broken. "142 found across 6 sites" is the honest
statement.

## What was ruled out

Forum and DDL siterip indexes -- the `0xxx.ws` shape already documented in
`AGENTS.md` -- are captcha-per-article with premium file hosts at the end of
them. That verdict covers the whole class, not just the one site measured.
