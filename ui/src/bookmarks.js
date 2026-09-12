/*
    Saved videos, stored by the HOST.

    They stay on the host's side of the boundary deliberately. They live in the
    frontend's own database, and the rule that makes add-ons removable is that
    the host never depends on an add-on -- a host table keyed to an add-on's
    vocabulary is fine, a host table the add-on owns is not.

    The cost is stated rather than hidden: removing this add-on leaves its
    bookmark rows behind. They stop being rendered, because nothing renders
    them, and they come back if it is reinstalled. That is the better failure
    of the two available -- the alternative is a page that cannot list what it
    saved because the thing that owned the list was uninstalled.
*/

const base = "/api/bookmarks";

export async function listBookmarks(contextTitle) {
    try {
        const response = await fetch(`${base}?contextTitle=${encodeURIComponent(contextTitle)}`);
        if (!response.ok) return null;
        return (await response.json()).bookmarks ?? [];
    } catch {
        return null;
    }
}

export async function addBookmark(entry) {
    try {
        const response = await fetch(base, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(entry)
        });
        return response.ok;
    } catch {
        return false;
    }
}

export async function removeBookmark(site, videoId) {
    try {
        const response = await fetch(
            `${base}?site=${encodeURIComponent(site)}&videoId=${encodeURIComponent(videoId)}`,
            { method: "DELETE" }
        );
        return response.ok;
    } catch {
        return false;
    }
}
