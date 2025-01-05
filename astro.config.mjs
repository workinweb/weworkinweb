import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

export default defineConfig({
  integrations: [react(), tailwind()],
  site: "https://workinweb.kbueno-studio.com",
  compressHTML: true,
  output: "hybrid",
  adapter: vercel(),
  functionPerRoute: true,
  includeFiles: ["./src/pages/api/**/*"],
  deploymentUrl: "workinweb.kbueno-studio.com",
  routeRules: {
    "/api/*": { prerender: false },
  },
});
