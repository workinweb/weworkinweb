import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  integrations: [react(), tailwind()],
  compressHTML: true,
  output: "hybrid",
  adapter: vercel({
    webAnalytics: true,
  }),
});
