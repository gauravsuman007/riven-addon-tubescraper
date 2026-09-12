#!/usr/bin/env bash
#
# Pull the scraper ABI across from the canonical copy.
#
# riven-addon-tubescraper holds it; every other add-on that writes scrapers
# carries a byte-identical copy under its own package name, because add-ons
# may not import each other. Run this from the repo that needs updating:
#
#     ./scripts/sync-scraper-api.sh ../riven-addon-tubescraper
#
# Then run the test suite: the drift check compares the copies and is what
# actually catches a mistake here. Do NOT hand-edit a copy -- `_RoutedSession`
# is where the VPN proxy is applied, and a divergence in it does not fail, it
# just sends this add-on's traffic out of the wrong address.
set -euo pipefail

SOURCE_REPO="${1:-../riven-addon-tubescraper}"
SOURCE="$SOURCE_REPO/tubescraper_addon/scraper_api"

HERE="$(cd "$(dirname "$0")/.." && pwd)"
# The one package in this repo that already carries a copy.
TARGET="$(find "$HERE" -type d -name scraper_api -not -path '*/node_modules/*' | head -1)"

if [ ! -d "$SOURCE" ]; then
    echo "No canonical copy at $SOURCE" >&2
    echo "Pass the path to a riven-addon-tubescraper checkout." >&2
    exit 1
fi

if [ -z "$TARGET" ]; then
    echo "This repo has no scraper_api package to update." >&2
    exit 1
fi

PACKAGE="$(basename "$(dirname "$TARGET")")"
echo "syncing $SOURCE -> $TARGET (package: $PACKAGE)"

for f in __init__.py base.py models.py plugins.py drift.py; do
    # The owning package name is the ONE thing that legitimately differs: each
    # copy has to import itself. The drift check normalises exactly this token
    # away before comparing, so rewriting it here keeps the two in agreement.
    sed "s/tubescraper_addon\.scraper_api/${PACKAGE}.scraper_api/g" \
        "$SOURCE/$f" > "$TARGET/$f"
    echo "  $f"
done

echo "done -- now run the test suite to confirm the copies agree"
