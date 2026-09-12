/*
    Every request goes through the host's add-on proxy at the prefix it gave
    us, so this never needs to know the backend's address and the API key
    never reaches the browser.

    Two host endpoints are called directly rather than through that prefix --
    VPN status and bookmarks. Both are the host's own, not this add-on's, and
    routing them through here would mean pretending they belong to it.
*/

let base = "";

export function configure(prefix) {
    base = prefix;
}

/** This add-on's own API. */
export function url(path, params) {
    const target = new URL(`${base}${path}`, window.location.origin);

    for (const [key, value] of Object.entries(params ?? {})) {
        if (value !== undefined && value !== null && value !== "") {
            target.searchParams.set(key, String(value));
        }
    }

    return target;
}

async function request(method, path, params) {
    try {
        const response = await fetch(url(path, params), { method });
        if (!response.ok) return null;
        return await response.json();
    } catch {
        // Null rather than thrown: every caller renders into a panel with
        // other parts still working, and an exception would take all of them
        // down to report that one list did not load.
        return null;
    }
}

export const get = (path, params) => request("GET", path, params);
export const post = (path, params) => request("POST", path, params);

export async function postJson(path, body) {
    try {
        const response = await fetch(url(path), {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body)
        });
        if (!response.ok) return null;
        return await response.json();
    } catch {
        return null;
    }
}

/** The playback URL for one scraped video. Handed to the host's player as-is;
 *  it is cookie-authenticated against this origin and supports Range. */
export const streamUrl = (site, videoId) =>
    String(url("/stream", { site, video_id: videoId }));
