import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { ssr } from "vite-plugin-ssr/plugin";

/**
 * config.command - Vite's API the command value is serve during dev (in the cli vite, vite dev, and vite serve are aliases), and build when building for production (vite build)
 *
 * note: for access to .env variables need use loadEnv
 */
export default defineConfig(({ mode, command, ssrBuild }) => {
  console.log(mode, command, ssrBuild);

  return {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    // envDir: '/',
    /**
     * Дефолтное значение ("/") определяет путь файлов в index.html на выходе как абсолютный;
     * Для генерации нужен длинный путь: "/wp-content/themes/logotype-ssr/vue-vite-ssg/dist/static/",
     */
    base: mode === "production" ? "/wp-content/themes/logotype-ssr/vue-vite-ssg/dist/static/" : "/",
    build: {
      outDir: "../dist",
      // sourcemap: true,
      // commonjsOptions: {
      //   /**
      //    * Setting to make prod-build working with vue-slider-component
      //    **/
      //   requireReturnsDefault: "preferred",
      // },
    },

    server: {
      // hmr: false,
      port: 8080,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import \"@/assets/styles/variables.scss\";",
        },
      },
    },
    plugins: [vue(),
      {
        name: "singleHMR",
        handleHotUpdate({ modules }) {
          modules.map((m) => {
            m.importedModules = new Set();
            m.importers = new Set();
          });
          return modules;
        },
      },

    ],
  };
});
