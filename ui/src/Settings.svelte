<!--
    Live control for this add-on's scraper registry, rendered in its settings
    tab alongside the generated form.

    "Which scrapers are enabled" is a toggle against a running registry, not a
    value to save: the folder can gain a file at any time from outside this
    page entirely -- an update to this add-on refreshes every scraper in it --
    so this polls for a fresh list rather than trusting what was true when the
    tab was opened.

    It is a SLOT rather than a page for the same reason the search panel is:
    this belongs beside the add-on's own settings, and a separate screen to
    reach it would put two halves of one decision in two places.
-->
<script>
    import { get, post, postJson } from "./api.js";

    let status = $state(null);
    let busyKey = $state(null);
    let rescanning = $state(false);
    let reordering = $state(false);
    let failure = $state(null);

    function apply(next, message) {
        if (next) {
            status = next;
            failure = null;
        } else {
            failure = message;
        }
    }

    const refresh = async () => apply(await get("/plugins"), "Could not read the scraper registry");

    async function rescan() {
        rescanning = true;
        apply(await post("/plugins/rescan"), "Rescan failed");
        rescanning = false;
    }

    async function toggle(key, enabled) {
        busyKey = key;
        apply(
            await postJson(`/plugins/${encodeURIComponent(key)}/enabled`, { enabled }),
            `Could not switch ${key} ${enabled ? "on" : "off"}`
        );
        busyKey = null;
    }

    /*
        A dropped-in file has no event to announce itself, so this notices one
        by asking again every few seconds. Cheap -- a handful of files on local
        disk, not a network call.
    */
    $effect(() => {
        refresh();
        const poller = setInterval(refresh, 5000);
        return () => clearInterval(poller);
    });

    /*
        Every working scraper in the order its results appear.

        Sites the user has placed come first in their stated order; everything
        else follows, so a scraper that arrived with an update appears at the
        bottom rather than silently landing above a deliberate choice. Broken
        files are left out -- they produce no results to order.
    */
    const ordered = $derived.by(() => {
        const usable = (status?.scrapers ?? []).filter((s) => !s.error);
        const byKey = new Map(usable.map((s) => [s.key, s]));

        const placed = (status?.site_order ?? [])
            .map((key) => byKey.get(key))
            .filter((s) => s !== undefined);
        const placedKeys = new Set(placed.map((s) => s.key));

        return [...placed, ...usable.filter((s) => !placedKeys.has(s.key))];
    });

    async function move(index, delta) {
        const next = ordered.map((s) => s.key);
        const target = index + delta;

        if (target < 0 || target >= next.length) return;

        [next[index], next[target]] = [next[target], next[index]];

        reordering = true;
        // The whole list is sent rather than a "move up" instruction, so the
        // server never has to reconstruct what the user was looking at -- and
        // two tabs open on this page cannot interleave two half-applied moves.
        apply(await postJson("/plugins/order", { order: next }), "Could not save the scraper order");
        reordering = false;
    }

    const broken = $derived((status?.scrapers ?? []).filter((s) => s.error));
</script>

<div class="tbx tbx-settings">
    <div class="tbx-box">
        <div class="tbx-box-head">
            <div>
                <p class="tbx-box-title">Site scrapers</p>
                <p class="tbx-muted">
                    Loaded from <code>{status?.plugin_dir ?? "…"}</code>. This is the add-on's own
                    bundled folder unless you have pointed it elsewhere, so updating the add-on
                    refreshes every scraper in it.
                </p>
            </div>
            <button type="button" class="tbx-btn" disabled={rescanning} onclick={rescan}>
                {rescanning ? "Rescanning…" : "Rescan folder"}
            </button>
        </div>

        {#if failure}
            <p class="tbx-error">{failure}</p>
        {/if}

        {#if broken.length}
            <!-- Broken files are listed first and separately. A scraper that
                 failed to import is invisible in a count of what loaded, and
                 it is the single most common thing to go wrong here: every one
                 of them is a bet on one site's markup. -->
            <div class="tbx-broken">
                {#each broken as scraper (scraper.key)}
                    <p><span class="tbx-error">{scraper.key}</span>: {scraper.error}</p>
                {/each}
            </div>
        {/if}

        <ul class="tbx-list">
            {#each ordered as scraper, index (scraper.key)}
                <li>
                    <span class="tbx-rank">{index + 1}</span>
                    <span class="tbx-list-main">
                        <span class="tbx-list-name">{scraper.name}</span>
                        <span class="tbx-muted">{scraper.base_url}</span>
                    </span>
                    <span class="tbx-list-actions">
                        <button
                            type="button"
                            class="tbx-icon"
                            aria-label={`Move ${scraper.name} up`}
                            disabled={reordering || index === 0}
                            onclick={() => move(index, -1)}>↑</button>
                        <button
                            type="button"
                            class="tbx-icon"
                            aria-label={`Move ${scraper.name} down`}
                            disabled={reordering || index === ordered.length - 1}
                            onclick={() => move(index, 1)}>↓</button>
                        <button
                            type="button"
                            class="tbx-btn tbx-btn-small"
                            disabled={busyKey === scraper.key}
                            onclick={() => toggle(scraper.key, !scraper.enabled)}>
                            {scraper.enabled ? "On" : "Off"}
                        </button>
                    </span>
                </li>
            {/each}
        </ul>

        {#if status && !ordered.length && !broken.length}
            <p class="tbx-muted">No scrapers loaded.</p>
        {/if}
    </div>
</div>
