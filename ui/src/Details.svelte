<!--
    Search streaming sites for this title and play a result directly.

    This is the whole user interface of the tube-scraper add-on. It is a
    section on a title's page rather than a page of its own, because it only
    means anything in the context of a specific title -- and because the
    question it answers ("can I watch this right now?") belongs beside the
    candidate releases, not a click away from them.

    Deliberately a separate path from those releases. They go through a
    torrent, a debrid provider and the VFS before anything can be watched;
    these are already-hosted files that play immediately and are never added to
    the library. When a scene has no seeded release anywhere -- which for this
    catalogue is common -- this is the difference between watching it and not.

    Collapsed until asked for, because each search hits twenty sites live.
    Nothing runs on page load except the two cheap reads below.
-->
<script>
    import { get, postJson, streamUrl, url } from "./api.js";
    import { getVpnStatus, routeState } from "./vpn.js";
    import { listBookmarks, addBookmark, removeBookmark } from "./bookmarks.js";
    import { formatBytes, formatDuration } from "./format.js";
    import VpnBanner from "./VpnBanner.svelte";

    let {
        /** Shown in the trigger and the player's title bar. */
        title = "",
        /*
            Riven item id, when the title is in the library. Passed in
            preference to the raw title so the backend can read the cast and
            studio: the sites rarely carry the exact scene under the exact
            name, and a credited performer in an upload's title is what tells
            the right series apart from unrelated clips.

            Absent for a title that has not been added yet, which still gets a
            search -- just one matched on the title alone.
        */
        itemId = null,
        /** The host's player. The one thing this add-on cannot do for itself:
         *  it is in-page state owned by the host's Svelte runtime, and this
         *  bundle carries a different one. */
        host
    } = $props();

    let open = $state(false);
    let loading = $state(false);
    let searched = $state(false);

    /*
        A search term the user typed, used instead of the title (or the item's
        cast and studio) when set. The sites carry the same scene under wildly
        inconsistent names, so when the automatic search finds nothing the
        difference between watching a title and not is usually one hand-typed
        phrase.
    */
    let customQuery = $state("");
    let results = $state([]);
    let siteErrors = $state({});
    let failure = $state(null);

    /*
        Progress across the streamed run. `pendingSites` is how many the
        backend said it would search, `completedSites` how many have reported
        either results or a failure -- the difference is what is still out.
    */
    let pendingSites = $state(0);
    let completedSites = $state(0);
    let eventSource = null;

    /*
        Fetched on mount rather than only when the panel opens: whether search
        is blocked has to be known before the trigger and the custom-search row
        render, since those are visible (and have to be disabled) even while
        the panel itself is collapsed.
    */
    let vpnStatus = $state(null);

    async function refreshVpnStatus() {
        vpnStatus = await getVpnStatus();
    }

    const scrapeRoute = $derived(routeState(vpnStatus, "scraping"));
    const streamRoute = $derived(routeState(vpnStatus, "streaming"));

    let bookmarks = $state([]);
    let pendingRemoval = $state(null);
    let bookmarkBusy = $state(new Set());

    const bookmarkKey = (site, videoId) => `${site}:${videoId}`;
    const bookmarkedKeys = $derived(new Set(bookmarks.map((b) => bookmarkKey(b.site, b.videoId))));

    async function loadBookmarks() {
        const saved = await listBookmarks(title);
        // Null means the read failed. Bookmarks are a convenience layered on
        // top of search, not a blocking dependency, so the panel keeps working
        // and simply shows none rather than reporting an error over the top of
        // a search that is fine.
        if (saved) bookmarks = saved;
    }

    /*
        Both run once, when the section is first mounted into the host's page.
        `$effect` with no reactive reads is the equivalent of `onMount` here
        and avoids importing the lifecycle just for this.
    */
    $effect(() => {
        refreshVpnStatus();
        loadBookmarks();
    });

    /*
        A bookmark saved as "pending" gets its resolution and size filled in by
        a background fetch on the host's server. Polling is the only way this
        component finds out that finished: there is no push channel from a
        one-off background task to a browser tab. It stops itself once nothing
        is pending, so an idle panel with all-resolved bookmarks costs nothing.
    */
    $effect(() => {
        if (!bookmarks.some((b) => b.metadataStatus === "pending")) return;

        const timer = setInterval(loadBookmarks, 4000);
        return () => clearInterval(timer);
    });

    async function busyWith(key, action) {
        bookmarkBusy = new Set(bookmarkBusy).add(key);
        try {
            if (await action()) await loadBookmarks();
        } finally {
            const next = new Set(bookmarkBusy);
            next.delete(key);
            bookmarkBusy = next;
        }
    }

    const save = (result) =>
        busyWith(bookmarkKey(result.site, result.video_id), () =>
            addBookmark({
                site: result.site,
                videoId: result.video_id,
                contextTitle: title,
                title: result.title,
                pageUrl: result.page_url,
                thumbnail: result.thumbnail,
                duration: result.duration,
                resolution: result.resolution,
                size: result.size
            })
        );

    async function confirmRemove() {
        const key = pendingRemoval;
        if (!key) return;
        pendingRemoval = null;

        // Split on the FIRST colon only: a site key cannot contain one but a
        // video id can, and splitting on every colon would truncate the id and
        // delete nothing.
        const [site, videoId] = key.split(/:(.+)/);
        await busyWith(key, () => removeBookmark(site, videoId));
    }

    /*
        Tiers a site's row sorts by ahead of relevance -- has to match the
        backend's `SITE_TIERS` exactly, or the same search would look
        differently prioritised depending on which list you looked at. A site
        not listed here falls back to tier 2, the same as the backend.
    */
    const SITE_TIERS = {
        tnaflix: 0,
        eporner: 0,
        hqporner: 1,
        paradisehill: 1,
        tubepornclassic: 1
    };
    const siteTier = (site) => SITE_TIERS[site] ?? 2;

    /*
        Results grouped into one row per site.

        A single ranked list hid which site a result came from until you read
        the badge, and made a site that returned nothing indistinguishable from
        one that was never searched. Row order follows the best result each
        site produced, so the strongest source is still at the top -- except
        that a lower-tier site's row always comes first, whatever its relevance.
    */
    const rows = $derived.by(() => {
        const grouped = new Map();

        for (const result of results) {
            // Already saved -- shown in the bookmarks section above, which
            // renders unconditionally. Listing it again here would be the same
            // video twice on one panel.
            if (bookmarkedKeys.has(bookmarkKey(result.site, result.video_id))) continue;

            const row = grouped.get(result.site) ?? { name: result.site_name, items: [] };
            row.items.push(result);
            grouped.set(result.site, row);
        }

        return [...grouped.entries()]
            .map(([site, row]) => ({ site, ...row }))
            .sort((a, b) => {
                const tierDiff = siteTier(a.site) - siteTier(b.site);
                if (tierDiff) return tierDiff;
                return (b.items[0]?.relevance ?? 0) - (a.items[0]?.relevance ?? 0);
            });
    });

    /*
        Runs the search as a stream, showing each site the moment it lands.

        Measured against the live deployment: nine of ten sites answer in under
        half a second, and one (hqporner) spends its full 20s timeout. Waiting
        for all of them meant every result appeared 20s late because of the one
        site that had nothing to give.
    */
    function search() {
        eventSource?.close();

        loading = true;
        failure = null;
        results = [];
        siteErrors = {};
        pendingSites = 0;
        completedSites = 0;

        /*
            A typed term wins over item_id. Passing both would let the backend
            keep matching on the item's cast and studio, which is exactly the
            matching the user is overriding by typing something else.
        */
        const typed = customQuery.trim();
        const params = typed
            ? { query: typed }
            : itemId
              ? { item_id: itemId }
              : { query: title };

        // No explicit limit: the backend falls back to this add-on's
        // "Results per site" setting, which is what should be adjustable
        // without a code change.
        const source = new EventSource(url("/search_stream", params));
        eventSource = source;

        source.onmessage = (event) => {
            let data;

            try {
                data = JSON.parse(event.data);
            } catch {
                return;
            }

            if (data.total_sites) pendingSites = data.total_sites;

            if (data.event === "site") {
                completedSites = data.sites_completed ?? completedSites + 1;
                searched = true;

                if (data.results?.length) results = [...results, ...data.results];

                // A site being down is normal here and must be visible,
                // otherwise "fewer results than usual" is indistinguishable
                // from "that site has nothing".
                if (data.error && data.site) siteErrors[data.site] = data.error;

                return;
            }

            if (data.event === "error") failure = data.error ?? "Search failed";

            // "complete" or "error" both end the run.
            searched = true;
            loading = false;
            source.close();
            eventSource = null;
        };

        source.onerror = () => {
            /*
                EventSource retries by itself, which is wrong here: this is a
                one-shot search, not a subscription, and letting it reconnect
                would silently re-run all twenty sites. Only report a failure
                if nothing arrived at all -- a drop after the last site is just
                the stream ending.
            */
            source.close();
            eventSource = null;

            if (!searched) failure = "Search failed";
            loading = false;
        };
    }

    $effect(() => () => eventSource?.close());

    /** What the last or next search actually looks for -- the typed term wins. */
    const searchedFor = $derived(customQuery.trim() || title);

    function runCustomSearch() {
        if (scrapeRoute.blocked) return;
        open = true;
        // Always re-runs, unlike opening the panel: the user typed a new term
        // and is asking for it to be tried. Reusing the previous results
        // because a search had already happened would look like the button did
        // nothing.
        if (!loading) search();
    }

    function toggle() {
        // Belt and braces alongside the trigger's own `disabled`: a stale
        // click queued just as the tunnel drops must not still open the panel
        // and fire a search that is about to be refused server-side too.
        if (!open && scrapeRoute.blocked) return;

        open = !open;
        // Search on first open rather than on mount: twenty live site requests
        // is not something to spend on every page view.
        if (open && !searched && !loading) search();
    }

    function play(video) {
        // Belt and braces alongside the button's own `disabled`: nothing here
        // should ever reach the player while streaming is routed through a
        // tunnel that is not up.
        if (streamRoute.blocked) return;

        host.play({
            src: streamUrl(video.site, video.videoId),
            title: video.title,
            // The real type is not known until the backend resolves the
            // source, and the proxy reports it on the response. MP4 is the
            // right opening guess; the player falls back if the element
            // rejects it.
            mimeType: "video/mp4",
            poster: video.thumbnail ?? undefined,
            site: video.site,
            videoId: video.videoId,
            contextTitle: title,
            duration: video.duration,
            resolution: video.resolution,
            size: video.size
        });
    }

    const playResult = (r) =>
        play({
            site: r.site,
            videoId: r.video_id,
            title: r.title,
            thumbnail: r.thumbnail,
            duration: r.duration,
            resolution: r.resolution,
            size: r.size
        });

    const playBookmark = (b) => play(b);
</script>

<div class="tbx">
    <div class="tbx-head">
        <button
            type="button"
            class="tbx-trigger"
            class:tbx-disabled={scrapeRoute.blocked}
            disabled={scrapeRoute.blocked}
            onclick={toggle}>
            <span class="tbx-globe" aria-hidden="true"></span>
            <span class="tbx-trigger-text">
                <span class="tbx-trigger-title">Watch from a site</span>
                <span class="tbx-trigger-sub">
                    {#if loading}
                        <!-- Counts while streaming: the panel may be collapsed,
                             so this line is the only progress the user sees,
                             and "Searching…" alone cannot say how much is left. -->
                        Searching{#if pendingSites}&nbsp;— {completedSites}/{pendingSites} sites{/if}{#if results.length},
                            {results.length} so far{/if}…
                    {:else if searched}
                        {results.length} found{#if rows.length}
                            · {rows.map((r) => `${r.name} ${r.items.length}`).join(", ")}{/if}
                    {:else}
                        Search streaming sites and play without downloading
                    {/if}
                </span>
            </span>
            <span class="tbx-chevron" class:tbx-open={open} aria-hidden="true"></span>
        </button>

        <!-- Beside the trigger rather than inside the panel: when the
             automatic search misses, the user needs to retype without first
             opening a panel full of the wrong results. -->
        <div class="tbx-custom">
            <input
                type="search"
                bind:value={customQuery}
                onkeydown={(e) => e.key === "Enter" && !scrapeRoute.blocked && runCustomSearch()}
                placeholder="Custom search term"
                aria-label="Custom search term for streaming sites"
                disabled={scrapeRoute.blocked} />
            <button
                type="button"
                class="tbx-btn"
                disabled={loading || !customQuery.trim() || scrapeRoute.blocked}
                onclick={runCustomSearch}>
                Search
            </button>
        </div>
    </div>

    <!-- Below the trigger unconditionally, not inside the collapsed panel: a
         bookmarked video should be reachable without opening (or re-running) a
         search, since the whole point of bookmarking one is not having to find
         it again. -->
    {#if bookmarks.length}
        <div class="tbx-section">
            <div class="tbx-section-head tbx-saved">Bookmarked ({bookmarks.length})</div>
            <div class="tbx-grid">
                {#each bookmarks as bookmark (bookmarkKey(bookmark.site, bookmark.videoId))}
                    {@const key = bookmarkKey(bookmark.site, bookmark.videoId)}
                    <div class="tbx-card tbx-card-saved">
                        <button
                            type="button"
                            class="tbx-card-body"
                            class:tbx-disabled={streamRoute.blocked}
                            disabled={streamRoute.blocked}
                            onclick={() => playBookmark(bookmark)}>
                            <span class="tbx-thumb">
                                {#if bookmark.thumbnail}
                                    <img
                                        src={bookmark.thumbnail}
                                        alt=""
                                        loading="lazy"
                                        referrerpolicy="no-referrer" />
                                {/if}
                                {#if formatDuration(bookmark.duration)}
                                    <span class="tbx-duration">
                                        {formatDuration(bookmark.duration)}
                                    </span>
                                {/if}
                            </span>
                            <span class="tbx-meta">
                                <span class="tbx-title">{bookmark.title}</span>
                                <span class="tbx-badges">
                                    {#if bookmark.metadataStatus === "pending"}
                                        <span class="tbx-muted">Fetching quality…</span>
                                    {:else}
                                        {#if bookmark.resolution}
                                            <span class="tbx-badge">{bookmark.resolution}</span>
                                        {/if}
                                        {#if bookmark.size}
                                            <span class="tbx-badge">{formatBytes(bookmark.size)}</span>
                                        {/if}
                                    {/if}
                                </span>
                            </span>
                        </button>

                        <button
                            type="button"
                            class="tbx-mark tbx-mark-on"
                            disabled={bookmarkBusy.has(key)}
                            aria-label={`Remove ${bookmark.title} from bookmarks`}
                            onclick={() => (pendingRemoval = key)}>★</button>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    {#if pendingRemoval}
        <!-- A plain inline confirmation rather than a modal. The host's dialog
             is its own component and its own focus trap; borrowing one across
             the bundle boundary would mean shipping a second one that fights
             the host's for the page. -->
        <div class="tbx-confirm" role="alertdialog" aria-label="Remove this bookmark?">
            <span>
                Remove this bookmark? It stays reachable from the site's own search
                results if you look for it again.
            </span>
            <span class="tbx-confirm-actions">
                <button type="button" class="tbx-btn" onclick={() => (pendingRemoval = null)}>
                    Cancel
                </button>
                <button type="button" class="tbx-btn tbx-btn-danger" onclick={confirmRemove}>
                    Remove
                </button>
            </span>
        </div>
    {/if}

    <!-- One line saying how the search itself is routed. -->
    <VpnBanner
        purpose="scraping"
        route={scrapeRoute}
        gerund="Searching"
        base="Search"
        size="sm"
        onDisabled={refreshVpnStatus} />

    {#if open}
        <div class="tbx-panel">
            <!-- Bigger and at the top: this is the moment that decides whether
                 clicking a result below will actually play anything, so it has
                 to be seen before the results, not discovered by clicking a
                 faded-out thumbnail. -->
            {#if searched && !loading}
                <VpnBanner
                    purpose="streaming"
                    route={streamRoute}
                    gerund="Streaming"
                    base="Stream"
                    size="lg"
                    onDisabled={refreshVpnStatus} />
            {/if}

            {#if loading && !results.length}
                <p class="tbx-muted tbx-pad">
                    Searching{#if pendingSites} {pendingSites} sites{/if} for “{searchedFor}”…
                </p>
            {:else if failure}
                <div class="tbx-pad">
                    <p class="tbx-error">{failure}</p>
                    <button type="button" class="tbx-btn" onclick={search}>Try again</button>
                </div>
            {:else if searched && !loading && !results.length}
                <div class="tbx-pad">
                    <p class="tbx-muted">No site had anything for “{searchedFor}”.</p>
                    <button type="button" class="tbx-btn" onclick={search}>Search again</button>
                </div>
            {:else if rows.length}
                <div class="tbx-rows">
                    {#each rows as row (row.site)}
                        <div class="tbx-section">
                            <div class="tbx-section-head">
                                {row.name} <span class="tbx-muted">top {row.items.length}</span>
                            </div>
                            <div class="tbx-grid">
                                {#each row.items as result, index (`${result.site}:${result.video_id}`)}
                                    {@const key = bookmarkKey(result.site, result.video_id)}
                                    <div class="tbx-card">
                                        <button
                                            type="button"
                                            class="tbx-card-body"
                                            class:tbx-disabled={streamRoute.blocked}
                                            disabled={streamRoute.blocked}
                                            onclick={() => playResult(result)}>
                                            <span class="tbx-thumb">
                                                {#if result.thumbnail}
                                                    <img
                                                        src={result.thumbnail}
                                                        alt=""
                                                        loading="lazy"
                                                        referrerpolicy="no-referrer" />
                                                {/if}
                                                {#if formatDuration(result.duration)}
                                                    <span class="tbx-duration">
                                                        {formatDuration(result.duration)}
                                                    </span>
                                                {/if}
                                                {#if index === 0}
                                                    <span class="tbx-best">Best match</span>
                                                {/if}
                                            </span>
                                            <span class="tbx-meta">
                                                <span class="tbx-title">{result.title}</span>
                                                <span class="tbx-badges">
                                                    <!-- Resolution and size only where
                                                         the site actually reported them.
                                                         Most advertise a vague "HD" that
                                                         covers 720p through 4K, and
                                                         printing that as a resolution
                                                         would be a claim the data cannot
                                                         support. -->
                                                    {#if result.resolution}
                                                        <span class="tbx-badge">{result.resolution}</span>
                                                    {:else if result.hd}
                                                        <span class="tbx-badge">HD</span>
                                                    {/if}
                                                    {#if result.size}
                                                        <span class="tbx-badge">{formatBytes(result.size)}</span>
                                                    {/if}
                                                </span>
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            class="tbx-mark"
                                            disabled={bookmarkBusy.has(key)}
                                            aria-label={`Bookmark ${result.title}`}
                                            onclick={() => save(result)}>☆</button>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}

            <!-- After the rows that have landed, not in place of them. Named
                 counts rather than a bare spinner: "3 sites still searching" is
                 the difference between "this is still going" and "this is all
                 there is", which is exactly what an end-of-run spinner could
                 not say. -->
            {#if loading && results.length}
                <p class="tbx-muted tbx-still">
                    {#if pendingSites}
                        {pendingSites - completedSites} of {pendingSites} sites still searching…
                    {:else}
                        Still searching…
                    {/if}
                </p>
            {/if}

            {#if Object.keys(siteErrors).length}
                <div class="tbx-errors">
                    {#each Object.entries(siteErrors) as [site, message] (site)}
                        <p><span class="tbx-error">{site}</span>: {message}</p>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</div>
