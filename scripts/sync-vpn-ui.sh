#!/usr/bin/env bash
#
# Pull the VPN panel across from the canonical copy.
#
# riven-addon-tubescraper holds it; every add-on that shows VPN controls
# carries a copy, because add-on bundles are built separately and cannot
# import each other's source. Run this from the repo that needs updating:
#
#     ./scripts/sync-vpn-ui.sh ../riven-addon-tubescraper
#
# WHY A COPY AND NOT A DIVERGENT PANEL. These controls write to the HOST's
# settings and the host's VPN service -- there is one tunnel and one pair of
# switches. Two hand-maintained panels drift into two answers to the same
# question, and the expensive version of that is a switch that looks off
# while the traffic is routed.
#
# The CSS PREFIX is the one thing that legitimately differs: each add-on
# namespaces its classes so the host's stylesheet cannot reach them and so
# two add-ons on the same page cannot collide. It is rewritten below.
set -euo pipefail

SOURCE_REPO="${1:-../riven-addon-tubescraper}"
SOURCE="$SOURCE_REPO/ui/src"

HERE="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="$HERE/ui/src"

if [ ! -f "$SOURCE/VpnControls.svelte" ]; then
    echo "No canonical copy at $SOURCE/VpnControls.svelte" >&2
    echo "Pass the path to a riven-addon-tubescraper checkout." >&2
    exit 1
fi

if [ ! -d "$TARGET" ]; then
    echo "This repo has no ui/src to update." >&2
    exit 1
fi

# Taken from this repo's existing classes rather than configured, so a new
# add-on gets it right without editing this script.
PREFIX="$(grep -ho '\b[a-z]\{2,4\}x\?-btn\b' "$TARGET"/*.svelte 2>/dev/null |
    head -1 | sed 's/-btn$//')"
PREFIX="${PREFIX:-tbx}"

echo "syncing $SOURCE -> $TARGET (class prefix: $PREFIX)"

for f in VpnControls.svelte vpn.js VpnBanner.svelte; do
    sed "s/\btbx-/${PREFIX}-/g" "$SOURCE/$f" > "$TARGET/$f"
    echo "  $f"
done

echo
echo "The stylesheet is NOT copied -- each add-on's styles.css is its own."
echo "Copy the 'THE VPN PANEL' block from $SOURCE/styles.css if this repo"
echo "does not have it yet, rewriting the prefix the same way."
