// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://cho-ice.xyz",

  vite: {
    plugins: [tailwindcss()],
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
