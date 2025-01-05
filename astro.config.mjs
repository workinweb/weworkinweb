import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  integrations: [react(), tailwind()],
  site: "https://workinweb.kbueno-studio.com",
  compressHTML: true,
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
    functionPerRoute: true, // This ensures each API route gets its own function
    maxDuration: 60, // Gives more time for email operations
  }),
  routeRules: {
    "/api/*": { prerender: false },
  },
});
