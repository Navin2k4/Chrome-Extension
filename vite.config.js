import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "public/manifest.json",
          dest: ".",
        },
      ],
    }),
  ],
  server: {
    proxy: {
      "/leetcode": {
        target: "https://leetcode.com/graphql",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/leetcode/, ""),
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            proxyReq.setHeader("Origin", "https://leetcode.com");
            proxyReq.setHeader("Referer", "https://leetcode.com");
            proxyReq.setHeader("User-Agent", "Mozilla/5.0");
            proxyReq.setHeader("Accept", "application/json");
            proxyReq.setHeader("Content-Type", "application/json");
          });
        },
      },
    },
  },
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
});
