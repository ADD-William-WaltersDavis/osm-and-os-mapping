import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  base: "/osm-and-os-mapping/",
  plugins: [svelte()],
});
