<!--
    The VPN, controlled from where its consequences are.

    WHY THESE CONTROLS ARE NOT ONLY IN SETTINGS
    -------------------------------------------
    They are in settings, and they stay there. But the decision "should this
    search go out through the tunnel" is made while looking at a search, not
    while looking at a settings page in another tab -- and the failure it
    prevents is silent: a routed purpose with the tunnel down returns nothing
    and reads as "none of the sites had it".

    So the state is shown and changed here, and it is the SAME state. Every
    control below writes to the host's own settings and the host's own VPN
    service; nothing is stored in this add-on. A change made here is on the
    settings page when it is next opened, and the other way round.

    RED AND GREEN, AND WHY BOTH ARE COLOURED
    ----------------------------------------
    Off is red rather than grey. Grey would read as "not configured", and the
    whole point of this panel is that off is a STATE somebody chose and can
    see -- a search going out from the household's own address is a fact worth
    colouring, not an absence.

    IT DISAPPEARS WHEN THERE IS NO VPN
    ----------------------------------
    Not disabled, not greyed: absent. A deployment that never configured one
    -- the default -- should not carry a dead panel about a feature it does
    not use, and "enabled" is the host's answer, not a guess from whether a
    tunnel happens to be up.
-->
<script>
    import { getVpnStatus, setRoute, setExitNode } from "./vpn.js";

    let {
        /** Called after any change, so the page can re-read what it depends on. */
        onchange
    } = $props();

    let status = $state(null);
    let busy = $state(null);
    let picking = $state(false);
    /** A refusal the host explained -- Gluetun's server is fixed by its own
     *  container's environment, and pretending otherwise would leave a choice
     *  on screen that never took effect. */
    let note = $state(null);

    async function refresh() {
        status = await getVpnStatus();
    }

    $effect(() => {
        refresh();
    });

    async function toggle(purpose) {
        const next = purpose === "scraping" ? !status.route_scraping : !status.route_streaming;

        busy = purpose;
        note = null;

        if (await setRoute(purpose, next)) {
            await refresh();
            await onchange?.();
        }

        busy = null;
    }

    async function choose(nodeId) {
        busy = "exit";
        picking = false;

        const result = await setExitNode(nodeId);

        if (result) {
            status = result;
            // The host says so when a provider cannot honour the choice.
            note = result.detail ?? null;
            await onchange?.();
        }

        busy = null;
    }
</script>

{#if status?.enabled}
    <div class="tbx-vpn">
        <span class="tbx-vpn-label">VPN</span>

        {#each [["scraping", "Scraping", status.route_scraping], ["streaming", "Video streaming", status.route_streaming]] as [purpose, label, on] (purpose)}
            <button
                type="button"
                class="tbx-toggle"
                class:tbx-toggle-on={on}
                role="switch"
                aria-checked={on}
                disabled={busy !== null}
                onclick={() => toggle(purpose)}>
                <span class="tbx-toggle-track"><span class="tbx-toggle-knob"></span></span>
                <span>{label}</span>
            </button>
        {/each}

        <!--
            The destination, and only when there is a choice to make. A
            provider that reports no nodes has none to offer, and an empty
            dropdown is worse than no dropdown.
        -->
        {#if status.exit_nodes?.length}
            <div class="tbx-picker">
                <button
                    type="button"
                    class="tbx-picker-button"
                    aria-haspopup="listbox"
                    aria-expanded={picking}
                    disabled={busy !== null}
                    onclick={() => (picking = !picking)}>
                    {status.exit_node_name ?? "No exit node"}
                    <span class="tbx-caret" aria-hidden="true"></span>
                </button>

                {#if picking}
                    <ul class="tbx-picker-list" role="listbox">
                        <li>
                            <button
                                type="button"
                                role="option"
                                aria-selected={!status.exit_node}
                                onclick={() => choose(null)}>
                                No exit node
                            </button>
                        </li>
                        {#each status.exit_nodes as node (node.id)}
                            <li>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={node.active}
                                    disabled={!node.online}
                                    onclick={() => choose(node.id)}>
                                    {node.name}{node.country ? ` · ${node.country}` : ""}
                                    {#if !node.online}<span class="tbx-dim">offline</span>{/if}
                                </button>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
        {/if}

        {#if !status.connected && (status.route_scraping || status.route_streaming)}
            <!--
                Stated where the switches are. A routed purpose with the
                tunnel down does not fall back to a direct connection -- the
                host refuses the request -- and from a results page that is
                indistinguishable from the sites having nothing.
            -->
            <span class="tbx-vpn-down">tunnel down · routed traffic is blocked</span>
        {/if}
    </div>

    {#if note}
        <p class="tbx-vpn-note">{note}</p>
    {/if}
{/if}
