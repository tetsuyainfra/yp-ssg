import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
export default defineConfig({
  // plugins: [react()],
  build: {
    outDir: "_site",
    minify: false,
    rollupOptions: {
      input: {
        main: "/src/client/main.js",
        index_show: "/src/client/index_show.js",
      },
      output: {
        entryFileNames: "vite-[name].js",
      },
    },
  },
});
