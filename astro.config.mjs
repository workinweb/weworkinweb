import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless"; // Change this line

export default defineConfig({
  integrations: [react(), tailwind()],
  site: "https://workinweb.kbueno-studio.com",
  compressHTML: true,
  output: "hybrid",
  adapter: vercel(), // This should be using the serverless adapter
  routeRules: {
    "/api/**": { prerender: false },
  },
});
