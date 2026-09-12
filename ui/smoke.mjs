/*
    Does the built bundle actually mount and render?

    The host imports `addon.js` at runtime and hands it a DOM node, so nothing
    in the main application's build or typecheck ever looks at this file. The
    failure that matters -- it loads, exports what it should, and then throws
    on mount -- is invisible until someone opens a title's page. This runs both
    slots in a real DOM with a stubbed fetch and EventSource.

    The trap it exists for: `$state` in a plain `.js` compiles to nothing and
    dies with "$state is not defined" at mount, while the build succeeds
    silently. The entry is `main.svelte.js` for exactly that reason.

        npm run build && npm run smoke
*/
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><body><div id=root></div></body>", {
    url: "http://localhost/details/riven/1",
    pretendToBeVisual: true
});

for (const key of [
    "window", "document", "Node", "Text", "Comment", "DocumentFragment",
    "Element", "HTMLElement", "Event", "CustomEvent", "requestAnimationFrame",
    "cancelAnimationFrame", "getComputedStyle", "MutationObserver", "CSS"
]) {
    try {
        globalThis[key] = dom.window[key];
    } catch {
        // Getter-only on newer Node; the bundle does not need them.
    }
}

let failures = 0;

function check(name, condition) {
    console.log(`  ${condition ? "ok  " : "FAIL"} ${name}`);
    if (!condition) failures += 1;
}

const calls = [];

globalThis.fetch = async (url, init) => {
    const href = String(url);
    calls.push(`${init?.method ?? "GET"} ${href}`);

    const body = href.includes("/vpn/status")
        ? { connected: false, route_scraping: false, route_streaming: false, exit_node_name: null }
        : href.includes("/api/bookmarks")
          ? { bookmarks: [] }
          : href.includes("/plugins")
            ? {
                  plugin_dir: "/riven/addons/tubescraper/scrapers",
                  site_order: ["tnaflix"],
                  scrapers: [
                      { key: "tnaflix", name: "TnaFlix", base_url: "https://tnaflix.com", kind: "plugin", enabled: true, source_file: "tnaflix.py", error: null },
                      { key: "broken", name: "broken", base_url: "", kind: "plugin", enabled: true, source_file: "broken.py", error: "SyntaxError: bad" }
                  ]
              }
            : {};

    return { ok: true, json: async () => body };
};

/*
    The search is an EventSource, which jsdom has none of. Stubbed so the
    stream path is exercised for real: the component's onmessage handler is
    what turns frames into rows, and it is the part most likely to break.
*/
let lastStream = null;

globalThis.EventSource = class {
    constructor(url) {
        calls.push(`SSE ${String(url)}`);
        lastStream = this;
        this.onmessage = null;
        this.onerror = null;
        this.closed = false;
    }
    emit(payload) {
        this.onmessage?.({ data: JSON.stringify(payload) });
    }
    close() {
        this.closed = true;
    }
};
dom.window.EventSource = globalThis.EventSource;

const played = [];
const host = { play: (options) => played.push(options) };

const { slots } = await import(process.argv[2]);
const settle = () => new Promise((r) => setTimeout(r, 120));

console.log("\nbundle");
check("exports a slots object", slots && typeof slots === "object");
check("fills the details slot", typeof slots?.details === "function");
check("fills the settings slot", typeof slots?.settings === "function");

// --- the details slot -------------------------------------------------------
console.log("\ndetails slot");
const target = dom.window.document.getElementById("root");
const mounted = slots.details({
    target,
    api: "/api/v1/x/tubescraper",
    props: { title: "Some Scene", itemId: 42 },
    navigate: () => {},
    host
});

await settle();

check("renders the trigger", target.innerHTML.includes("Watch from a site"));
check("renders collapsed (no results panel yet)", !target.innerHTML.includes("tbx-panel"));
check("reads VPN status before offering to search", calls.some((c) => c.includes("/vpn/status")));
check("loads bookmarks for this title", calls.some((c) => c.includes("contextTitle=Some%20Scene")));
check("does not search on mount", !calls.some((c) => c.startsWith("SSE")));

// Opening the panel is what starts a search -- twenty live site requests is
// not something to spend on every page view.
target.querySelector(".tbx-trigger").click();
await settle();

check("opening searches", calls.some((c) => c.startsWith("SSE")));
check("searches by item_id, not title", calls.some((c) => c.includes("item_id=42")));

lastStream.emit({
    event: "site",
    site: "tnaflix",
    site_name: "TnaFlix",
    total_sites: 2,
    sites_completed: 1,
    results: [
        {
            site: "tnaflix", site_name: "TnaFlix", video_id: "v1",
            title: "A Result", page_url: "https://x/1", thumbnail: "https://x/1.jpg",
            duration: 3661, resolution: "1080p", size: 1048576, views: 1, hd: true, relevance: 1
        }
    ],
    error: null
});
await settle();

check("renders a streamed result", target.innerHTML.includes("A Result"));
check("shows the site's row", target.innerHTML.includes("TnaFlix"));
check("marks the top result", target.innerHTML.includes("Best match"));
check("formats duration over an hour", target.innerHTML.includes("1:01:01"));
check("shows the reported resolution", target.innerHTML.includes("1080p"));

// A site that fails must be visible, or "fewer results than usual" is
// indistinguishable from "that site had nothing".
lastStream.emit({ event: "site", site: "eporner", site_name: "ePorner", sites_completed: 2, total_sites: 2, error: "timed out" });
await settle();
check("shows a failing site's error", target.innerHTML.includes("timed out"));

lastStream.emit({ event: "complete", sites_completed: 2, total_sites: 2 });
await settle();
check("closes the stream when complete", lastStream.closed);

// Playback goes through the HOST's player -- the one thing this add-on
// cannot do for itself.
target.querySelector(".tbx-card-body").click();
await settle();

check("clicking a result calls the host player", played.length === 1);
check("plays through this add-on's stream endpoint",
    played[0]?.src?.includes("/api/v1/x/tubescraper/stream"));
check("passes the site and video id", played[0]?.site === "tnaflix" && played[0]?.videoId === "v1");
check("passes the title as context", played[0]?.contextTitle === "Some Scene");

// --- the settings slot ------------------------------------------------------
console.log("\nsettings slot");
const panel = dom.window.document.createElement("div");
dom.window.document.body.append(panel);

const settings = slots.settings({
    target: panel,
    api: "/api/v1/x/tubescraper",
    props: {},
    navigate: () => {},
    host
});

await settle();

check("lists a loaded scraper", panel.innerHTML.includes("TnaFlix"));
check("shows where scrapers load from", panel.innerHTML.includes("/riven/addons/tubescraper/scrapers"));
check("surfaces a broken scraper's error", panel.innerHTML.includes("SyntaxError: bad"));
check("keeps a broken scraper out of the ordered list", !panel.innerHTML.includes("2</span>"));

// --- teardown ---------------------------------------------------------------
console.log("\nteardown");
mounted.destroy();
settings.destroy();
check("details slot unmounts cleanly", target.innerHTML.trim() === "");
check("settings slot unmounts cleanly", panel.innerHTML.trim() === "");

console.log(`\n${failures ? `${failures} failed` : "all passed"}`);
process.exit(failures ? 1 : 0);
