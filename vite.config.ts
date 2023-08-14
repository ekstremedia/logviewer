import { defineConfig } from "vite";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": "/src", // Alias '@' to the '/src' directory
        },
    },
    plugins: [
        vue(),
        electron([
            {
                // Main-Process entry file of the Electron App.
                entry: "electron/main.ts",
            },
            {
                entry: "electron/preload.ts",
                onstart(options) {
                    // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
                    // instead of restarting the entire Electron App.
                    options.reload();
                },
            },
        ]),
        renderer(),
    ],
});
