import { defineConfig } from "vite";
import { generateSW } from "rollup-plugin-workbox";
import { PORT_CLIENT } from "./config";
import react from "@vitejs/plugin-react";
import { BACKEND_URL } from "./config";
import { ViteMinifyPlugin } from "vite-plugin-minify";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				parserOpts: {
					plugins: ["decorators-legacy", "classProperties"],
				},
			},
		}),
		ViteMinifyPlugin({}),
		generateSW({
			swDest: "./dist/sw.js",
			globDirectory: "dist",
			globPatterns: ["**/*.{js,css,html,webp}"],
			clientsClaim: true,
			skipWaiting: true,
			sourcemap: false,
			inlineWorkboxRuntime: false,
		}),
	],
	server: {
		port: PORT_CLIENT,
		proxy: {
			"/api/": {
				target: BACKEND_URL,
				changeOrigin: true,
				secure: false,
				ws: true,
			},
		},
	},
	preview: {
		port: PORT_CLIENT,
	},
});
