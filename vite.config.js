import { defineConfig } from "vite";
export default defineConfig({
  build: {
    outDir: "_site",
    rollupOptions: {
      input: "/src/client/main.js",
      output: {
        entryFileNames: "main.js",
      },
    },
  },
});
