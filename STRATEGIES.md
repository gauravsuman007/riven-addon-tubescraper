# Scraper strategies

Every reverse-engineering technique, recurring gate shape and dead end learned
in the sibling repositories (`stremio-tv-scrapers-live-tv`, `stremio-tv-scrapers-web-vod`)
while getting hard sources to work. [AGENTS.md](AGENTS.md) says what is
allowed (everything here is); this file is the *how*. Add a technique or a
confirmed dead end here whenever you learn one.

Reading notes for this repo:

- The techniques were worked out on live-TV and VOD sources and are written
  with Node/TypeScript in mind (the research tools are Node and Playwright).
  They are tools for FINDING the recipe. The plugin you ship here is Python:
  port the recovered algorithm into plain Python (`hashlib`, `hmac`,
  `cryptography`/`pycryptodome` for AES-GCM, `base64`, `curl_cffi` for the
  TLS fingerprint). Where the text below says "port into TypeScript", read
  "port into Python".
- Where it says "the contract cannot carry X" (cookies, per-request signing,
  headers), that is the live-TV contract's limit. A scraper here
  returns a playable URL for the add-on's player, so check what THAT
  hand-off can carry before treating the same gate as a dead end.
- "Resolver", "handle", "ScrapedStream" and "host relay" are live-TV
  vocabulary; the equivalent here is resolving at play time (`/resolve`).
- Research tools (Playwright, jsdom, wabt, FlareSolverr, Node itself) belong
  in a scratch directory or a throwaway container, not in the plugin's
  imports.

## Order of attack (cheapest first)

1. **Look at the real page's requests before assuming a gate.** Several sources written off as "needs a browser" were a JSON API behind a click, or the stream list already inlined in the server-rendered HTML (Next.js flight data: `self.__next_f.push([1,"..."])` string chunks, concatenated; or an inline `window.x = {...}` / `rawLinks` array). Log every request *and* response of the real page first.
2. **Grep the bundle for the endpoint** when nothing crypto shows in the network log. A static key (`x-player-key`, an AES key hex constant next to `crypto.subtle.importKey`) is usually a literal in `assets/index-*.js`; re-read it from there when decryption starts failing.
3. **Run the site's code to learn, don't decode it** (AGENTS.md: `node:vm`, WASM in Node). Instrument, then port the result into clean TypeScript.
4. **Check whether the result is even deliverable** (AGENTS.md: "What this scraper contract cannot do") *before* going deep. A gate that repeats on every segment, a cookie, a per-request signature, a stream bound to the caller's IP -- recognise these early.

## Techniques, in the order they paid off

- **Real Playwright with `context.addInitScript`**, never a sandboxed MCP/agent browser: those inject after the page's own scripts ran and silently drop network history. Playwright is research-only here -- install it in a scratch directory, never as a dependency of the repo or a scraper.
- **Hook `crypto.subtle` and log a stack trace on every call** (args *and* results, `exportKey` too). The stack names the bundle and column of each crypto step: "where does this come from" becomes a lookup, and a "random" field turns out to be an XOR key.
- **Log requests with `request.allHeaders()`** (includes cookies) and log *all* requests, not just `/api/`: half of one protocol was a Next.js **server action** (`POST` to the page URL with a `next-action` header, answer `text/x-component`), invisible to an `/api/` filter. Action ids come from `createServerReference)("<id>",...,"getStream")` in the page's chunks.
- **Hand the page a substitute WASM instance.** `instance.exports` is frozen -- assigning a wrapper into it does nothing. Wrap `WebAssembly.instantiate`/`instantiateStreaming` and *return a different object* `{ module, instance: { exports: { ...wrapped } } }`; dump linear memory at every pointer argument before and after the call to see an opaque export's plaintext in and out.
- **Splice test in a real session.** Let the browser build a request, then in `page.route` replace one component with your Node-built one and see whether the server still accepts. Isolates the single rejected field in a few runs (it was a custom hash, the rest being replayed constants).
- **Instrument a WASM-internal function without renumbering anything.** `wasm2wat`, find the function by a constant (SHA-256's `K[0]` = `i32.const 1116352408`; an AES fixslice has no S-box but ~100 `i32.rotr`), insert at its entry `local.get 0..n; f64.const -12345; ...; call <an existing import of matching type that is dead on this path>`, `wat2wasm`, and let that import's JS side dump memory when it sees the sentinel. Logging every SHA-256 compression block reads a key derivation off directly.
- **Find a derived AES key by brute force over memory.** After the module decrypts once in a Node harness, try every 4-byte-aligned 32-byte window of linear memory as an AES-256 key over the first ciphertext block (and the obvious IV layouts); JSON-looking plaintext gives key and counter convention in seconds.
- **Vary the clock before trusting a "random" constant.** A salt hard-coded from one run died at the top of the hour; it was `salt[i] = (i+1) ^ (hour >> (i & 7))`. Re-run the harness at other times/hours before porting.
- **A module's import list is not evidence it uses those imports on your path.** Canvas/navigator/`localStorage` imports often only feed anti-bot checks (page age from `performance.now()`, a time bucket) around a pure key schedule. Trace before giving up; stub `performance.now()` so the page looks several seconds old.
- **Isolate missing dependencies one at a time.** If glue calls `libsodium`/`crypto.subtle`/a hash, install the equivalent Node package or use Node's built-in `crypto`, rather than polyfilling browser globals generically.
- **Run an obfuscated JS VM in `node:vm` for instrumentation.** Stub `document`/`canvas`/`navigator`, shim `Worker` if it spawns blob-URL workers, wrap in `with (Proxy)` to log every global read that the sandbox lacks, then patch opcode handlers (found by grepping the source) to log operands -- that exposes a custom hash's constants.
- **Replay an observed request verbatim with `curl`** before porting anything: write the body to a file and use `--data-binary @file` (shell quoting mangles base64's `+`/`/`).
- **Observe a front-end instead of reading it.** For a site whose providers live in a blocked or minified library, open a working front-end, let it search, and read `performance.getEntriesByType('resource')`: many apps push every upstream call through their own relay with the destination URL-encoded in a query parameter, so the real APIs and parameters are visible (hex-obfuscated destinations: ignore). Then probe those upstreams directly from Node. Do not hunt for the blocked library's code or mirrors.
- **Test where you will run.** A resolve that works on a laptop can return nothing from the host's datacentre IP (providers are chosen by address; the `asn=` baked into a URL ties it to the resolving network). Use a resolver (resolved where it plays) and, when you can, test inside the real container before calling it fixed. The symptom of a changed player is always a bare `null`/empty result -- make failures empty, never thrown.
- **When curl works and Node 403s with identical headers, suspect the TLS handshake, not the request.** Measured on the Streamed CDN: `https.request`/`fetch` with every header/UA/ALPN combination = 403, curl = 200, Node capped at `maxVersion: "TLSv1.2"` = 200. A real browser racing your request over the same one-time-looking token will mislead you into a "single-use token" theory: abort the browser's own request (`page.route(..., r => r.abort())`) and test the fresh URL from the tool you care about. Matrix to run: default, ALPN http/1.1, TLS 1.2 only, TLS 1.3 only, raw socket with byte-exact curl headers, python, ffmpeg.
- **Read a wasm-bindgen player's data instead of its code.** Hook the imports (`instantiateStreaming` returns a substitute whose `./<name>_bg.js` functions are wrapped to log call names and snapshot linear memory around `fetch`/`arrayBuffer`/`prototypesetcall`); the call sequence names the steps and the snapshot after the decode has the plaintext sitting beside the ciphertext, the key material, and (searched by 4-byte-aligned windows) any table. Crate names in the module's strings (`chacha20-0.9.1`, `base64-0.22.1`) say which primitives it uses. To recover a custom base64 alphabet: align the encoded text with the decoded buffer in memory and solve symbol -> 6-bit value; five runs without a conflict = fixed. To confirm a stream-cipher key: XOR ciphertext with the known plaintext (the next request's URL) and compare to the keystream of each candidate (key = a response header, nonce = first 12 decoded bytes, counter 1 was it).
- **A family of embeds shares a handshake, not a header name.** PPV.ST's player (`embedindia.st`, `gasm.wasm`) is Streamed's (`embed.st`, `lock.wasm`) with the same alphabet and cipher, but the key header is `island` instead of `goat` and the request has one string instead of three. Look at the real request once (Playwright, `page.on('request')` + `postDataBuffer()`, the response headers) and replay it with curl before assuming a new scheme; then try the OLD decoder on the NEW response. Keying on the header's shape (32 letters) rather than its name survives the next rename.
- **Never trust a plausible playlist.** A source can answer an outdated handshake with a decoy video, a master whose segments all 403 (an ad CDN: `domain forbidden`), or segments that are really PNG images with the video hidden in the pixels. Check what the address actually serves: first segment, durations, a real decode.

## Recurring shapes

- **Encrypted JSON envelope, static key.** `base64(iv[12] ‖ ciphertext ‖ tag)` or hex, AES-256-GCM, key a hex literal in the client bundle (url fields prefixed e.g. `ns_`; no prefix = plaintext). Node: `crypto.subtle.importKey("raw", Buffer.from(KEY,"hex"), "AES-GCM", false, ["decrypt"])`, then `decrypt({name:"AES-GCM", iv}, key, rest)`. When it fails, the key rotated: re-read it from the bundle.
- **Key derived from the request.** `SHA-256("<label>|<path>|<token>")` used directly as the AES-GCM key; the label (a build id) is a constant inside an obfuscated player script -- run its string-array decoder in `node:vm` to read it. `HMAC-SHA256(key, "key:t:nonce:path")` request signatures: the server often accepts any random key string.
- **Custom base64 alphabet** (decode with the alphabet substituted, then UTF-8 -> JSON) and **ROT13 + marker deletion + char-code shift + reverse** wrappers: ten lines each; find them next to the `fetch`.
- **XOR then encrypt** (plaintext XORed with the AES key before GCM) and **keystreams from a seed** (FNV-1a + murmur3 `fmix32`): found by the `crypto.subtle` hook showing a key used twice, or by a magic header on the decoded body (`mvm1`).
- **Proof-of-work gates.** Often named SHA-256 but not: check the real hash (a memory-hard ChaCha-quarter-round mix, ported natively). The solution is the first counter with N leading zero bits; ~65k tries, 0.5-3 s in Node. A different gate (Anubis) can look transiently cleared before it actually finishes -- confirm the real page loaded.
- **Device attestation endpoints** that only *score* a client profile: a made-up desktop profile with random hashes and a fresh ECDSA key passes. Try that before assuming real-browser fingerprinting.
- **Single-use challenges** (sign a nonce, wrap a key with an RSA public key fetched from the site): every attempt repeats the whole handshake; budget ~1.5 s each and don't loop providers carelessly -- fresh seeds per call got later ones rejected for a minute; reuse one seed across parallel providers.
- **Rotating embed domains** and **cookies from the embed's own API** (`byse_viewer_id`-style): send them on every later call of that handshake.
- **Zero-import WASM that only computes** (a Rust `seal_request`, a PoW solver): ship it as a black box, after `WebAssembly.Module.imports(module).length === 0` at load. A module *with* imports: recover the algorithm and reimplement, never ship it.
- **Several URLs for one catalogue.** Different fronts often sit on the same CDN/encode (identical rendition ladder and duration give it away). Triage by *pool*, not by front-end count: one working source of a pool is worth building, its siblings add nothing.

- **Read the front-end's own constants before tracing its player.** A site's bundle names the APIs it wraps (`COLA_API = 'https://api.cdnlivetv.is/api/v1'`, `BASE_URL + '/api/matches/all'`, a `/api` docs page): Fantastic Soda turned out to be three covered backends, StreamFree's `/api` page documents a public JSON API, WatchFooty's bundle holds `api.watchfooty.st`. A `data-links` JSON or iframe list on a match page (SportsindX, FalconStreams) names the real hosts at once: if they are all families already covered, reject the front-end in one request.
- **"Listed" is not "live".** Shared 24/7 restreams (RoxieStreams' `fs2`/`fubo`/`tudn`) get listed under every fixture they might carry, and an event API lists every channel that could (CDN Live TV: 28 for one NFL game, most off air). Decide on-air by fetching the newest segment, with a build-time budget (try a bounded number of channels, stop at enough, give up the list after a deadline) and again in the resolver. A `status` field can lie (`NS` on a game in progress): use the start/end window.
- **A playlist is a master only if it says so.** `#EXT-X-STREAM-INF` marks a master; without it the first non-comment line is a SEGMENT, and fetching it as a "variant" reads video as text. Follow a variant only when there is one (the `onAir` copies in cdnlive/thetvapp do).
- **A User-Agent gate that lets browsers through.** TheTVApp's playlist host 403s Node's UA and a bare `Mozilla/5.0` but takes a full Chrome string; name one in `userAgent` so the host sends it on every request, and use it in the scraper's own fetches too.
- **A per-page signed token is a resolver, not a header.** StreamFree's player page carries `_t/_e/_n` for ~8 hours per quality; read it at play time from the embed page, by shape (`const _0x = {...}`), and answer null if the shape is gone.
- **"Cloudflare-blocked from this sandbox" can be the ISP's DNS.** RoxieStreams was filed that way; with the DoH patch it plays with no header at all. Retest a blocked source over DoH before keeping the note.

## Dead ends: how they looked, so you stop early

- A CDN that refuses every requester except the site's own undocumented internal client (`428`, `requiresProxy`, no request ever visible in the page's own network log): not a header or signature you are missing. Park it with the date.
- Segments behind a per-request signature (`403 bad signature`), PNG-prefixed segments that no demuxer handles, ad-CDN segments that answer `domain forbidden`.
- A bytecode VM whose key, base path and CSRF token are constants of one deploy, held only in the bytecode. Native reimplementation breaks on the next release; only AGENTS.md's "Running a site's own code" route applies, with its safeguards and the maintainer's approval.
- A real Cloudflare managed challenge / Turnstile against stock headless Chromium (no timeout clears it; FlareSolverr's patched browser does) -- and then only for research, since the stream itself needs `cf_clearance` which the contract cannot carry.
- A **bait front-end**: pages that open "install this extension to unlock the content" popups or redirect to an unrelated installer on load. Malvertising, not a source. Skip on sight and don't interact.
- A host that does not resolve at all (NXDOMAIN) or a decommissioned route that returns the same landing-page HTML for every id.
- **A zero-import WASM is a function, not a lock** (WatchFooty/`sportsembed.su`, solved 2026-10-04 after being parked as a dead end): `WebAssembly.Module.imports(module).length === 0` and four exports means it only computes. Wrap `instantiateStreaming` in Playwright with a substitute instance whose exports log each call's i32 arguments and the memory they point at (dump the *whole* input buffer for the call that takes `(ret, ptr, len)`), find the wasm-bindgen shape (stack adjust, alloc, process, dealloc), then replay the captured input in Node and compare to the captured output. Recover the input layout by diffing: the nonce showed up verbatim, the first byte was an op code the module checks, and a length prefix before each field; vary one field at a time and scan the one checked value (here `op` and the body length) rather than guessing a checksum. Any fresh random nonce was accepted, so nothing needs a browser. Ship it by fetching the site's own module at resolve time (cap size, require zero imports, take the exports by position because their names carry a build hash).
- A blind sweep of front-ends guessing `/watch/<id>` and clicking captured nothing: players mount only on real interaction, so each needs its own look. Diminishing returns after a handful of forks -- stop unless something genuinely new surfaces.

Record the working recipe (or the dead end, with what was tried and the date) in the scraper's docstring and update SOURCES.md. A source that was blocked "because it needs a browser for WASM" is worth retrying when its bundle changes or a technique above becomes applicable -- note the last attempt date so retriage knows when it is stale.
- **An "IP lock" is not a dead end when the host does the fetching.** TimStreams' player page said "Access Denied (IP Lock)" to a second egress, so it was rejected; but a resolver runs on the host's own address, so the page, the signed address and the playlist all see one IP. Test the whole chain from the machine that will run it, not by moving a URL between machines.
- **Check the cheap decode before reaching for `vm`.** An inline `var _x = [numbers]` plus `String.fromCharCode(((a[i] ^ K) - S + 256) % 256)` is two integers and an array: read `K` and `S` by the variable names in the loop and decode in plain TypeScript.
- **A playlist that 404s to Node and 200s to curl may only want a browser User-Agent** (TimStreams, TheTVApp), not TLS tricks: change the UA first.
- **A nickname is not a team.** A source writing "Chiefs @ Raiders" cannot merge with "Las Vegas Raiders" by trimming words; the block expands US nicknames per league, only when the source states the sport, because Giants/Panthers/Cardinals/Rangers/Kings/Jets belong to two leagues each.
- **A CDN host's name can state its country** (Plex's Amagi playouts: `...-plex-gb-10225.playouts.now.amagi.tv`): read the segment host from the playlist and tag `country` from it, instead of tagging a whole list or guessing through proxies. Headers do not lift a CDN's address check (403 under every set), so only the tagged streams need the pool.
- **A shared anonymous token still rate-limits.** Plex answers 429 above about four requests a second: space the calls, honour `retry-after`, and keep answers in memory so each build finishes what the last could not.
- **A geoblock may answer 200 with a decoy** (Rai's `video_no_available.mp4`): the resolver should accept only the shape of a real answer (an `.m3u8` end address), not a status.
- **A layered base64 config is a few lines, not a lock** (SportsOnline `_econfig`): deobfuscate the page's own script by running only its string-table function and substituting every `_0x....(0x..)` call with the literal, then read the one function that consumes the blob. Here it was split into four parts, a character dropped from each, reordered, and base64'd twice more. Port the steps; evaluate nothing.
- **A schedule can be in a time zone nobody names** (SportsOnline, UK time): compare one fixture against a source that states its zone (TimStreams' US Eastern) before guessing.
- **"Team x Team"** (Portuguese/Spanish listings) is a versus; the block reads a lowercase " x " only, so "Formula X Grand Prix" stays one name.
- **A live playlist that answers 200 can be days old** (xyzstreams, 2026-10-05): read `#EXT-X-PROGRAM-DATE-TIME` and fetch the newest segment before building; a frozen playlist lists signed CDN segments that already 403.

## A decoy that is a live stream, and the header that gates it (zlive, 2026-10-05)

`/resolve` answered 200 with a perfect `location` for a request missing only `Origin: https://zlive.st`; the address was `https://iptv.zlive.st/main/secure/<hash>/<time>/<12 hex>.m3u8`, a LIVE playlist (no `ENDLIST`, advancing sequence) of a "scrapers go away" card. The earlier `ENDLIST`/duration test missed it. How it was found: hook `fetch` + `crypto.subtle` (digest/importKey/sign/encrypt, with stacks) in the real page, replay the same envelope from the browser (real host) and from Node (decoy host), then diff headers -- only `Origin` mattered. Lessons: (1) when a replayed envelope works in the browser and not in Node, bisect HEADERS before suspecting the crypto; (2) classify a resolved address by its shape (real streams sit on another host) and by segment bytes, never only by playlist flags; (3) the card's loop rotates segments, so a fixed byte hash does not hold -- learn them.
- **A short-lived token is a resolver's job, not a reason to reject** (Matchora, 10-minute `?t=` on the playlist): mint it when someone plays. A start-on-demand feed answers `ready:false, reason:"warming"` first: poll a few times, then give up with `null`. The API may also answer `reason:"bot"` to a non-browser User-Agent and `"limit"` per IP, so keep build-time checks few.
- **A channel list is not a 24/7 list** (Matchora): 2,746 feeds, but a feed only starts while its fixture is on. Sample before listing, and list only what answers; here that is the live fixtures.

## Appendix: running an obfuscated bundle in Node to recover a crypto/signing scheme

The worked procedure that found zlive.st's AES-GCM envelope (the channel list
was plain JSON; resolving a key into a stream needed a POST whose body only the
site's minified JS could produce):

1. **Download the real bundle** (`curl` the `<script src>` the page loads) and
   confirm it is self-contained (no further chunk imports).
2. **Load it in `node:vm`** (`vm.createContext` + `vm.runInContext`) with
   browser globals stubbed just enough to parse and start: `document`,
   `window`/`self`/`globalThis` all pointing at the sandbox, `TextEncoder`/
   `TextDecoder`, `crypto` = Node's `require("crypto").webcrypto` (a stub object
   has no `.subtle`), no-op `MutationObserver`/`ResizeObserver`/
   `IntersectionObserver`, `URL`/`URLSearchParams`/`Headers`/`Request`/
   `Response`/`Blob` copied from Node's globals, and a `fetch` stub that
   **throws an error containing the full request** (url, method, headers, body)
   instead of going to the network. Top-level `function` declarations become
   sandbox properties even if the script throws partway; `const`/`let` do not.
3. **Call the function that builds the request directly**, `.catch()` the
   thrown fetch stub's message: that is the exact request the real client would
   send. Replay it with `curl --data-binary @file`.
4. **If step 2 throws first** (a bundled React app bootstrapping against
   `document.getElementById` returning null): accept the partial failure
   (declarations are hoisted) or use `jsdom` for a DOM that really mounts.
   jsdom's `window.crypto` is read-only: use
   `Object.defineProperty(window, "crypto", { value: webcrypto, configurable: true })`.
5. **Instrument, do not decode.** Wrap `crypto.subtle.digest/importKey/encrypt`
   (and sign/exportKey) to log arguments before delegating. It found the exact
   key derivation (SHA-256 of a fixed salt plus the date, used as a raw AES-GCM
   key, no HKDF) in one run.
6. **Port the recovered algorithm** into clean code in the plugin, using the
   language's own crypto, not the site's minified functions.

## Appendix: WASM-gated sources

- Load the `.wasm` in Node with `WebAssembly.instantiate` and the site's glue
  (`wasm_exec.js` for Go; thinner for Rust/AssemblyScript), stubbing only the
  two or three browser globals it touches.
- Disassemble with `wasm2wat`/wabt when the entry point is not obvious; compare
  with the JS wrapper to see how arguments are encoded (pointer + length into
  linear memory is the common case).
- Reproduce one captured input/output pair in Node first; then treat the module
  as a black box.
- `instance.exports` is frozen. Wrap `WebAssembly.instantiate`/
  `instantiateStreaming` and return `{ module, instance: { exports: {...} } }`
  with logging wrappers; dump linear memory at each pointer argument before
  and after.
- Imports into canvas/`navigator`/`localStorage` often only feed anti-bot
  checks around a pure key schedule: run the module in a Node harness with
  `performance.now()` looking like an old page until it decrypts once, then
  recover the algorithm (scan memory for the key, instrument SHA-256 compress by
  its `K[0]` constant through a dead import of matching type). Rebuild natively;
  if you do ship a module, only a zero-import one
  (`WebAssembly.Module.imports(module).length === 0`).
- If a library like libsodium is called, install its Node/Python equivalent;
  do not polyfill browser globals generically.
- Note the date of every failed attempt; retry when the bundle changes.

## Appendix: getting past Cloudflare/Turnstile

- Order: `curl_cffi` impersonation, then a patched browser (Patchright, nodriver,
  Camoufox, undetected-chromedriver), then FlareSolverr
  (`docker run -p 8191:8191 ghcr.io/flaresolverr/flaresolverr`, `POST /v1`
  `{"cmd":"request.get","url":"...","maxTimeout":60000}` returns cookies, the
  solving User-Agent and the body).
- Stock headless Chromium clears a simple/legacy JS challenge in a second or
  two, but never a managed challenge or Turnstile (it fingerprints CDP and
  `navigator.webdriver`).
- `cf_clearance` is tied to the solving IP and User-Agent. If only the page/API
  is gated and the media URLs are cookie-free (signed, token in the query),
  FlareSolverr is just a research tool. If the media itself needs the cookie,
  fetch it from the same egress with the same UA and cookie jar.
- A different proof-of-work gate (Anubis) can look transiently cleared before it
  finishes: confirm the real page loaded.
- "Cloudflare-blocked" can be the ISP's DNS: retest over DoH.

## Appendix: running a site's own code inside a plugin (safeguards)

For a player that seals requests inside a bytecode VM whose key, base path and
CSRF token are constants of one deploy: download the player code at resolve
time and execute it. Same-origin scripts of the one site only, with a count and
byte cap and a timeout per script; run it in a subprocess with an explicit
whitelist of globals (never the app's secrets, `process`, `require`, real
console); its `fetch` resolves against the site's origin and rejects other
hosts. Locate entry points by shape (`indexOf` on a stable string anchor plus a
small regex on a short slice, never a regex over megabytes). Return empty the
moment a shape is missing. Serialise runs (player code keeps module state),
cache the built runtime per script-URL set for a few hours, fetch short-lived
tokens fresh. Present a normal browser surface (no `webdriver`, native-looking
functions) but do not patch the site's checks. Treat the output as untrusted
(http(s) URLs only, verified). Document in the docstring what runs, how it is
found, and what would make it return empty.
