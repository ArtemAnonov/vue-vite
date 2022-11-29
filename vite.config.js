import { fileURLToPath, URL } from "node:url";
import path from 'node:path'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { ssr } from "vite-plugin-ssr/plugin";

export default defineConfig((command, ssrBuild) => {
  return {
    /**
     * Дефолтное значение определяет путь файлов в index.html на выходе как абсолютный
     */
    base: '',
    build: {
      outDir: "../dist",
    },

    server: {
      port: 8080,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/variables.scss";`,
        },
      },
    },
    plugins: [vue(), 
 
    ],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
