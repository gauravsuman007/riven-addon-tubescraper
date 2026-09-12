import { mount as svelteMount, unmount } from "svelte";

import Details from "./Details.svelte";
import Settings from "./Settings.svelte";
import { configure } from "./api.js";
import "./styles.css";

/*
    The contract with the host.

    This add-on has no page, so unlike a page bundle there is no default
    export. It exports `slots` instead: an object keyed by the host's slot
    names, each a mount function taking the same shape a page mount does --
    a bare element, this add-on's API prefix, and a way to navigate.

    Keying by name rather than exporting one function is what lets the host
    offer more slots later without every add-on having to guess which one it
    was just handed.
*/
// `.svelte.js`, not `.js`: runes outside a component are only compiled in a
// file with this extension. As a plain `.js` the `$state` below survives into
// the bundle as an undefined call and the section dies on mount -- and it
// builds cleanly either way, so nothing warns you.
function slot(Component, extra = () => ({})) {
    return ({ target, api, props, navigate, host }) => {
        configure(api);

        const state = $state({ ...props, navigate, host, ...extra() });
        const app = svelteMount(Component, { target, props: state });

        return {
            /*
                Updated in place rather than remounted. Moving between two
                titles client-side should refresh this section, not tear it
                down -- a rebuild would drop the results already fetched and
                re-run twenty live site requests for a panel the user may not
                even have open.
            */
            update(next) {
                Object.assign(state, next ?? {});
            },
            destroy() {
                unmount(app);
            }
        };
    };
}

export const slots = {
    details: slot(Details),
    settings: slot(Settings)
};
