import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";
import { gzipAsync } from "@gfx/zopfli";

export default defineConfig({
  plugins: [
    // templateとして使うときに使うので・・・
    // react(),
    // compression(),
    // // Zopfil for gzip
    // compression({
    //   algorithm: (content) =>
    //     gzipAsync(Buffer.from(content), { numiterations: 15 }),
    // }),
    // compression({ algorithm: "brotliCompress" }),
  ],
  // plugins: [react()],
  build: {
    outDir: "_site",
    minify: false,
    rollupOptions: {
      input: {
        render_index: "/src/client/render_index.js",
        render_url: "/src/client/render_url.js",
      },
      output: {
        entryFileNames: "vite-[name].js",
      },
    },
  },
});
