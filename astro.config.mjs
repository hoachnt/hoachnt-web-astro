import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import robotsTxt from "astro-robots-txt";
import icon from "astro-icon";

import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

import svelte from "@astrojs/svelte";

import vercel from "@astrojs/vercel";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://hoachnt.com/",
	integrations: [
		sitemap(),
		robotsTxt({
			sitemap: [
				"https://hoachnt.com/sitemap-index.xml",
				"https://hoachnt.com/sitemap-0.xml",
			],
		}),
		solidJs(),
		icon(),
		svelte(),
	],
	markdown: {
		remarkPlugins: [remarkReadingTime],
	},
	output: "server",
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
	vite: {
		assetsInclude: "**/*.riv",
		plugins: [tailwindcss()],
	},
});
