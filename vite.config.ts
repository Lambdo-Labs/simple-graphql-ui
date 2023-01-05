import { fileURLToPath, URL } from "url";
import AutoImport from "unplugin-auto-import/vite";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import graphql from "graphql";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: true,
      // targets to transform
      include: [
        /\.vue\??/, // .vue
      ],

      // global imports to register
      imports: [
        // presets
        "vue",
        // { "@vue-router": VueRouterExports },
        "@vueuse/core",
        // custom
      ],

      // custom resolvers
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
