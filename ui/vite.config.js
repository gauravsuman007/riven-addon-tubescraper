import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

/*
    One self-contained ES module, plus one stylesheet.

    The host fetches `addon.js` at runtime and hands it a DOM node, so this
    must not depend on anything the host happens to have loaded. In particular
    Svelte is BUNDLED here rather than externalised: two Svelte runtimes on a
    page are only a problem if they share a component tree, and this one owns
    an element the host gives it and nothing above it. Externalising would buy
    ~15KB and cost a hard coupling to the host's exact Svelte version -- which
    would turn every host upgrade into a coordinated release of every add-on.
*/
export default defineConfig({
    plugins: [svelte()],
    build: {
        lib: { entry: "src/main.svelte.js", formats: ["es"], fileName: () => "addon.js" },
        outDir: ".",
        emptyOutDir: false,
        cssCodeSplit: false,
        rollupOptions: {
            output: { assetFileNames: "addon.[ext]" }
        }
    }
});
