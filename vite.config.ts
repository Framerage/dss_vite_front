import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: "/src/assets",
      api: "/src/api",
      components: "/src/components",
      hooks: "/src/hooks",
      modules: "/src/modules",
      pages: "/src/pages",
      styles: "/src/styles",
      store: "/src/store",
      types: "/src/types",
      utils: "/src/utils",
    },
  },
  base: "/",
  // server: {
  //   open: "/",
  // },
});
