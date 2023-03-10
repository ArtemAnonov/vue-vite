/**
 * (#) ошибочно генерирует category.html, которая является родительской
 *  и homepage
 */
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import { getPathName } from "./src/api/uni.js";
import { prefixes } from "./src/router/prefixes.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);
const staticFolder = "dist/static";

const manifest = JSON.parse(
  fs.readFileSync(toAbsolute(`${staticFolder}/ssr-manifest.json`), "utf-8"),
);
const template = fs.readFileSync(toAbsolute(`${staticFolder}/index.html`), "utf-8");
const { render } = await import("./dist/server/entry-server.js");

const __INST__ = JSON.parse(
  fs.readFileSync(toAbsolute("src/json/vuewp.json"), "utf-8"),
);

// Home, etc.
const pagesRoutes = [];
const singlePageRoutes = [];

const models = {
  singleproductpage: {
    fileName: "singleproductpage",
    items: __INST__.state.products.items,
  },
  singlecategorypage: {
    fileName: "singlecategorypage",
    items: __INST__.state.productsCategories.items,
  },
};

/**
 * Создает соответствующие папки для категорий и продуктов.
 * Каждая категория, которая имеет подкатегории находится в папке вместе с
 * подпапкой с именем, равным слагу этой категории, в которой располагаются подкатегории.
 * Продукты располагаются в соответствии с категориями - продукт помещается в папку
 * со слагом самой последней его категории (наибольшей вложенности).
 */
const makeFolders = () => {
  // создаем папку pages
  if (fs.existsSync(path.join(__dirname, `${staticFolder}/pages/`)) === false) fs.mkdirSync(path.join(__dirname, `${staticFolder}/pages/`));
  const modelItems = models.singlecategorypage.items;
  const fullPath = Object.keys(prefixes).map((el) => `${staticFolder}/pages/${el}`);
  fullPath.forEach((prefix) => {
    if (fs.existsSync(path.join(__dirname, prefix)) === false) fs.mkdirSync(path.join(__dirname, prefix));
  });
  for (const key in modelItems) {
    if (Object.hasOwnProperty.call(modelItems, key)) {
      const category = modelItems[key];
      const handledPath = getPathName(category.permalink, "array").items;
      fullPath.forEach((prefix) => {
        const pathSubFolder = `/${prefix}/${handledPath.join("/")}/`;
        if (fs.existsSync(path.join(__dirname, pathSubFolder)) === false) {
          fs.mkdirSync(path.join(__dirname, pathSubFolder));
        }
      });
    }
  }
};

/**
 *
 */
const routesHandler = () => {
  const singleRoutesHandler = (fileName) => {
    const model = models[fileName];
    for (const key in model.items) {
      if (Object.hasOwnProperty.call(model.items, key)) {
        const item = model.items[key];
        const handledPath = getPathName(item.permalink);
        singlePageRoutes.push(handledPath.slice(0, -1));
      }
    }
  };
  const handler = (pathName, callback = singleRoutesHandler) => {
    fs.readdirSync(toAbsolute(pathName), { withFileTypes: true }).filter((dirent) => dirent.isFile()).forEach((dirent) => {
      const fileName = dirent.name.replace(/\.vue$/, "").toLowerCase();
      callback(fileName);
    });
  };

  handler("src/pages/common", (fileName) => {
    if (fileName.match(/^single*./)) {
      singleRoutesHandler(fileName);
    } else {
      pagesRoutes.push(fileName === "homepage" ? "/" : `/${fileName}`);
    }
  });
  // handler("src/pages/common/category");
};

(async () => {
  makeFolders();
  routesHandler();
  // url - путь в виде строки типа /product/cat1/cat2/product-slug
  for (const url of [...singlePageRoutes, ...pagesRoutes]) {
    const [appHtml, preloadLinks] = await render(url, manifest);

    const html = template
      // .replace(`<!--preload-links-->`, preloadLinks)
      .replace("<!--app-html-->", appHtml);

    const filePath = `${staticFolder}/pages/${url === "/" ? "/homepage" : url}.html`;
    fs.writeFileSync(toAbsolute(filePath), html);
    // console.log("pre-rendered:", filePath);
  }

  // done, delete ssr manifest
  // fs.unlinkSync(toAbsolute(`${staticFolder}/ssr-manifest.json`));
})();
