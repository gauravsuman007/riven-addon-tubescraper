/*
    VPN routing, read from the HOST's API.

    This add-on does not own the VPN and must not appear to: it asks the same
    endpoint the host's own settings panel does. What it owns is the
    consequence -- refusing to search or play when a routed tunnel is down.

    Read directly before an action rather than baked in at render time. Whether
    the tunnel is up can change between opening a title's page and clicking a
    result on it -- another device disconnecting Tailscale, an exit node going
    offline -- and a stale "connected" is exactly the state that sends traffic
    out of the wrong address.
*/

export async function getVpnStatus() {
    try {
        const response = await fetch("/api/v1/vpn/status");
        if (!response.ok) return null;
        return await response.json();
    } catch {
        return null;
    }
}

/*
    `blocked` is the load-bearing field, and it is deliberately
    `routed && !connected` rather than anything involving a fallback.

    The host's VPN service fails CLOSED: if a purpose is routed and the tunnel
    is down, the backend returns 503 rather than going out directly. This
    mirrors that in the UI so the user is told before they click, instead of
    after. What it must never do is treat "down" as "go direct anyway" --
    someone routing scraper traffic is controlling where it appears to come
    from, and quietly using the host's own address instead defeats the only
    reason the setting exists, invisibly.
*/
export function routeState(status, purpose) {
    const routed = status
        ? purpose === "scraping"
            ? status.route_scraping
            : status.route_streaming
        : false;
    const connected = status?.connected ?? false;

    return {
        routed,
        connected,
        blocked: routed && !connected,
        exitNodeName: status?.exit_node_name ?? null
    };
}

/**
 * Route one purpose through the tunnel, or stop.
 *
 * Written to the HOST's settings, not to anything this add-on owns. There is
 * one VPN and one pair of switches; a copy here would be a second answer to
 * the same question, and the settings page and this panel would each be
 * right about a different one.
 */
export async function setRoute(purpose, routed) {
    const path = purpose === "scraping" ? "vpn.route_scraping" : "vpn.route_streaming";

    try {
        const response = await fetch(`/api/v1/settings/set/${path}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ [path]: routed })
        });
        return response.ok;
    } catch {
        return false;
    }
}

/** Turn routing off for one purpose -- the escape hatch offered when a routed
 *  tunnel is down and the user would rather search than fix it. */
export const disableRoute = (purpose) => setRoute(purpose, false);

/**
 * Choose where routed traffic leaves from, and return the host's new status.
 *
 * The answer is used rather than discarded because it is the only place a
 * refusal appears: Gluetun's server is fixed by its own container's
 * environment, and the host says so in `detail` instead of accepting a choice
 * that would never take effect.
 */
export async function setExitNode(nodeId) {
    try {
        const response = await fetch("/api/v1/vpn/exit-node", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ node_id: nodeId })
        });
        return response.ok ? await response.json() : null;
    } catch {
        return null;
    }
}
