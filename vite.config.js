import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import electron from "vite-plugin-electron";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      entry: path.resolve(__dirname, "./dist-electron/main.js"),
    }),
  ],
  // base: path.resolve(__dirname, "./dist/"), // 新增
  server: {
    port: 8888,
    cors: true, // 允许跨域
    hmr: true, // 开启热更新
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 新增
    },
  },
  build: {
    outDir: path.resolve(__dirname, "./dist/"), // 新增
    assetsDir: "assets", // 新增
    sourcemap: true, // 新增
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "./index.html"),
        // nested: path.resolve(__dirname, "nested/index.html"),
        // about: path.resolve(__dirname, "about/index.html"),
      },
    },
  },
});
