import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: path.resolve(__dirname, "./dist/"), // 新增
  server: {
    port: 8888,
    cors: true, // 允许跨域
    hmr: true, // 开启热更新
  },
});
