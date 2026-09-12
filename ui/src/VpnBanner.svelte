<!--
    One line saying how this traffic is routed, and what to do when it cannot
    be. Replaces the host's `vpn-route-banner.svelte`, which this bundle
    cannot import.

    It renders nothing at all when the purpose is not routed. A banner saying
    "not routed through a VPN" on every title's page would be noise on a
    deployment that never turned routing on -- which is the default.
-->
<script>
    import { disableRoute } from "./vpn.js";

    let { purpose, route, gerund, base, size = "sm", onDisabled } = $props();

    let working = $state(false);

    async function turnOff() {
        working = true;
        if (await disableRoute(purpose)) await onDisabled?.();
        working = false;
    }
</script>

{#if route.blocked}
    <div class="tbx-banner tbx-banner-blocked" class:tbx-banner-lg={size === "lg"}>
        <span>
            {base} is routed through the VPN, and the tunnel is down.
            {gerund} is blocked rather than falling back to a direct connection.
        </span>
        <button type="button" class="tbx-link" disabled={working} onclick={turnOff}>
            {working ? "Turning off…" : "Turn off routing"}
        </button>
    </div>
{:else if route.routed}
    <div class="tbx-banner" class:tbx-banner-lg={size === "lg"}>
        <span class="tbx-dot"></span>
        {gerund} through the VPN{route.exitNodeName ? ` via ${route.exitNodeName}` : ""}.
    </div>
{/if}
