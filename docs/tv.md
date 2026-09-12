# The television contract

`riven-tv` is a second, JavaScript-free renderer over `riven-tpdb-frontend`,
for televisions running engines from about 2016. It **cannot run an add-on's
`ui/addon.js`** — dynamic `import()` is Chromium 63, the target is 53, and the
bundle carries a Svelte runtime that needs a great deal more than that. There
is no version of "run the add-on's UI" available on that surface, now or
later.

So an add-on reaches a television the way everything does there: it answers
plain JSON, and one generic renderer in `riven-tv` draws it. **No file in
`riven-tv` knows the name of any add-on.** An add-on written next year appears
on a set as soon as it is installed, with no release of `riven-tv` and none of
the frontend.

## Declaring it

In `riven_addon.py`:

```python
from program.addons import AddonManifest, AddonTv

manifest = AddonManifest(
    key="example",
    ...
    tv=AddonTv(browse=True, title=False),
)
```

`browse` promises `tv/browse`, `tv/detail` and `tv/play`: a screen of the
add-on's own, reached from the rail. `title` promises `tv/title`: a section
inside the television's own page for a library title. They are separate
because they are separate features — an add-on with a catalogue wants the
first, one that searches for a given title wants the second, and an add-on may
offer both or neither. `None` (the default) is no TV presence at all.

Mount the routes inside the add-on's existing router, so everything stays
under the one prefix `/api/v1/x/<key>/`:

```python
def router(self):
    if not any(getattr(r, "path", "").startswith("/tv/") for r in router.router.routes):
        router.router.include_router(tv.router)
    return router.router
```

The guard matters: mounting is a side effect, and a second call would
duplicate every route, which FastAPI accepts silently.

## The shapes

Everything is optional except where stated. A field the renderer does not
understand is ignored; a card it cannot use is dropped and its neighbours
survive.

### `GET tv/browse?q=&cursor=`

```jsonc
{
  "title": "Example",           // the screen's heading
  "searchable": true,           // draw a search box; the query returns as ?q=
  "placeholder": "Search…",
  "sections": [{ "title": "", "note": "", "cards": [Card] }],
  "cursor": "60",               // opaque; handed straight back as ?cursor=
  "empty": "Nothing here yet."  // shown instead of an empty screen
}
```

`cursor` is **opaque**. The television stores it and hands it back, so the
encoding stays private to the add-on — an offset today, a keyset tomorrow,
with nobody told.

### `GET tv/detail?id=<card id>`

```jsonc
{
  "title": "Someone",
  "subtitle": "@someone",
  "image": "https://…",
  "lines": ["a line of fact", "another"],   // at most 8, drawn as written
  "sections": [{ "title": "a site", "cards": [Card] }]
}
```

### `GET tv/play?id=<card id>`

```jsonc
{
  "stream": "/api/v1/x/<key>/stream?…",  // MUST be under your own mount
  "content_type": "video/mp4",
  "title": "",                            // optional; the card's wins if absent
  "duration": 0                           // optional; likewise
}
```

Answer with a **path, not the provider's URL**. These URLs expire and are
bound to whoever fetched them, so a television handed one plays for a while
and then stops with a 403 and nothing on screen to explain it. The proxy
re-resolves per range request, which is also what makes a seek work an hour
in.

`title` and `duration` may be omitted. Resolving a video is usually a live
fetch that yields a URL and a MIME type and knows nothing about what the video
is called, so the television keeps what was on the card the viewer pressed.

### `GET tv/title?item_id=<riven item id>`

```jsonc
{
  "heading": "Found online",
  "note": "These play straight from the site.",
  "problems": ["asite: timed out"],   // named failures
  "empty": "Nothing found online",
  "sections": [{ "title": "A Site — top 3", "cards": [Card] }]
}
```

**Send the sections already grouped and already ordered.** The television
draws them in the order it receives them and sorts nothing — ranking belongs
to the code that owns the sources. `problems` exists because "nothing found"
and "four of the eight sites timed out" look identical otherwise, and only one
of them is worth trying again.

### `Card`

```jsonc
{
  "id": "site:12345",        // required, opaque, comes back verbatim
  "title": "A video",        // required
  "subtitle": "3 sites",
  "image": "https://… | /api/v1/x/<key>/…",
  "duration": 4215,          // seconds; drawn as a clock on the still
  "badges": ["1080p", "12 views"],   // at most 4
  "flag": "Best match",      // one highlighted word on the artwork
  "action": "play" | "open"  // "open" goes to tv/detail; default is "play"
}
```

A card with no `id` cannot be pressed and one with no `title` cannot be read;
either is dropped.

## What the television checks rather than trusts

An add-on is third-party code the viewer installed from a git URL, and its
answers become markup and fetches on a device carrying the viewer's session.

* **A `stream` path must be under your own mount.** Anything else is refused
  and the video simply does not play. An add-on that could name any path could
  have the rest of the frontend streamed out to whoever is watching.
* **An `image` must be absolute `http(s)`, or a path under your own mount.** A
  `data:` URI, a protocol-relative `//host`, or another route's path is
  dropped and the card draws without a picture. Your own paths are fetched
  back through `riven-tv`, because the set has no cookies to send.
* **`content_type` must be `video/*`** or it is replaced with `video/mp4`. A
  `<video>` handed `application/octet-stream` never reaches its demuxer and
  fails silently.
* **Every call has a deadline** — about 12 seconds, and 40 for `tv/title`,
  which is a live search by design. A television waiting on an add-on is a
  black screen with no explanation.

## Degrading

Anything the renderer does not fully understand becomes **nothing**: a missing
section, a card that is not drawn, a screen that says the add-on could not be
reached and offers the way back. Never an error page, and never a television
that will not draw its library because something unrelated is unhappy.

That is also what a **disabled** add-on looks like. The frontend filters the
list it sends — installed, enabled, loaded without error — so a switched-off
add-on never arrives, its rail entry is absent, and its section on a title's
page is not offered. Nothing is left behind and nothing is greyed out.

## Do not return an error for a bad result

A television asked because somebody pressed a button. `riven-tv` treats a
non-200 as "this section does not appear", so raising on a search that found
nothing, or on three sites out of four failing, **hides the failure entirely**.
Answer 200 with empty `sections` and a populated `problems`.

## Testing it

`riven-tv`'s `npm run contract` walks every add-on the app offers and checks
each shape it declared, against the live server:

```bash
FRONTEND_URL=http://192.168.2.100:3001 npm run contract
```

Nothing else can catch this drift. A renamed field does not throw — it makes a
card lose its still, or a section vanish, and a missing section is
indistinguishable from an add-on that found nothing.
