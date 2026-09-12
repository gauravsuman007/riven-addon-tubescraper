/*
    OUTRANK THE HOST'S PREFLIGHT.

    The host's stylesheet is Tailwind v4, and the host downlevels it for LG
    webOS with `postcss-preset-env` targeting Chromium 94 -- below the 99 that
    `@layer` needs. The downlevel does not drop the layers, it EMULATES their
    ordering with specificity, rewriting every rule in `@layer base` (which is
    Tailwind's preflight, and its subject is `*`) as

        :not(#\#):not(#\#):not(#\#):not(#\#)

    `:not()` takes the specificity of its argument and `#\#` is an id, so that
    reset lands at (4,0,0). An add-on stylesheet is plain class-level CSS, so
    EVERY rule in it loses to the reset on every property the reset sets --
    padding, margin, border, background on a button, heading font-size. The
    page still gets its colours and its border-radius and looks, precisely,
    like a stylesheet that failed to load. It did not: the tube add-on's section was
    reported as "picture and text overlapping" while its CSS was being served
    200 and parsed into 64 rules.

    The host cannot fix this for us -- it serves `ui/addon.css` verbatim out of
    the add-on's own folder -- and it cannot stop downleveling either, because
    an un-downleveled stylesheet renders webOS 23 completely unstyled.

    So every rule this add-on ships is prefixed with the same construct. It
    changes what a selector MATCHES not at all (`#\#` is an id no element can
    have, so `:not(#\#)` is true of everything) and lifts it to (4,n,m), which
    clears the reset while leaving the add-on's own rules in their authored
    order relative to one another.

    Keep authoring plain `.tsx-*` selectors; this is a build step, not a
    convention to remember.
*/
const OUTRANK = ":not(#\\#)".repeat(4);

const outrankHostPreflight = {
    postcssPlugin: "addon-outrank-host-preflight",
    Rule(rule) {
        // `0%` / `from` inside @keyframes are not selectors and must not be
        // touched -- prefixing one produces a keyframe that never matches and
        // silently kills the animation.
        if (rule.parent?.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;
        if (rule.__outranked) return;
        rule.__outranked = true;
        // Prefixed to the FIRST compound, so a descendant selector keeps its
        // shape: `.tbx-card img` stays a card's image.
        rule.selectors = rule.selectors.map((selector) => OUTRANK + selector);
    }
};

export default { plugins: [outrankHostPreflight] };
