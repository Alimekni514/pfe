import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import replace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactRefresh(),
    replace({
      "process.env": JSON.stringify({
        ADMIN_TOKEN: process.env.ADMIN_TOKEN,
      }),
    }),
  ],
  server: {
    port: 3000,
    historyApiFallback: true,
  },
  base: "/",
});
