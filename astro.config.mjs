import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import partytown from "@astrojs/partytown";

export default defineConfig({
  site: "https://weworkinweb.com",
  integrations: [
    react(),
    tailwind(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  compressHTML: true,
  adapter: vercel({
    webAnalytics: true,
  }),
});
