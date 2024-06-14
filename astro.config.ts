import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
	site: "https://www.xuer.tech",
	markdown: {
		shikiConfig: {
			theme: "one-dark-pro",
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
			wrap: false,
		},
	},
	integrations: [
		mdx({}),
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		sitemap(),
		prefetch(),
	],
	vite: {
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
	server: {
		host: "0.0.0.0"
	},
});
