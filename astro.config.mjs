import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercelAdapter from "@astrojs/vercel";

export default defineConfig({
  integrations: [react(), tailwind()],
  site: "https://workinweb.dev",
  compressHTML: true,
  output: "hybrid",
  adapter: vercelAdapter(),
  routeRules: {
    "/api/**": { prerender: false },
  },
});
