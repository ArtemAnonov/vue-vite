// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const manifest = JSON.parse(
  fs.readFileSync(toAbsolute("dist/static/ssr-manifest.json"), "utf-8")
);
const template = fs.readFileSync(toAbsolute("dist/static/index.html"), "utf-8");
const { render } = await import("./dist/server/entry-server.js");

//
const vuewp = JSON.parse(
  fs.readFileSync(toAbsolute("src/json/vuewp.json"), "utf-8")
);

const singleRoutesSubfolders = [
  "dist/static/product-category",
  "dist/static/product",
];

const singleRoutes = [];
let models = {
  singlecategory: {
    fileName: "singlecategory",
    type: "productsCategories",
    base: "/product-category/",
    items: {},
  },
  singlesubcategory: {
    fileName: "singlesubcategory",
    type: "productsCategories",
    base: "/product-category/",
    items: {},
  },
  singleproduct: {
    fileName: "singleproduct",
    type: "products",
    base: "/product/",
    items: vuewp.state.products.items,
  },
};
const productsCategories = vuewp.state.productsCategories.items;
for (const key in productsCategories) {
  if (Object.hasOwnProperty.call(productsCategories, key)) {
    const item = productsCategories[key];
    if (item.parent == 0) {
      models.singlecategory.items[key] = item;
      singleRoutesSubfolders.push(
        `dist/static/product-category/${item.slug}`
      );
    } else {
      models.singlesubcategory.items[key] = item;
    }
  }
}

let singleRoutesHandler = function (fileName) {
  let model = models[fileName];
  for (const key in model.items) {
    if (Object.hasOwnProperty.call(model.items, key)) {
      const item = model.items[key];
      let fullURI;
      if (model.fileName === "singlesubcategory") {
        // all parents
        let parentsCategorySlug;
        let nearestParent = productsCategories[item.parent];
        if (nearestParent.parent == 0) {
          parentsCategorySlug = nearestParent.slug;
        } else {
          parentsCategorySlug =
            productsCategories[nearestParent.parent].slug
        }
        fullURI = model.base + parentsCategorySlug + "/" + item.slug;
      } else {
        // for category and prooduct
        fullURI = model.base + item.slug;
      }
      singleRoutes.push(fullURI);
    }
  }
};
const pagesRoutes = fs.readdirSync(toAbsolute("src/pages")).map((file) => {
  const fileName = file.replace(/\.vue$/, "").toLowerCase();
  if (fileName.match(/^single*./)) {
    singleRoutesHandler(fileName);
  } else {
    return fileName === "home" ? `/` : `/${fileName}`;
  }
});

singleRoutesSubfolders.forEach((element) => {
  if (fs.existsSync(path.join(__dirname, element)) === false) {
    fs.mkdirSync(path.join(__dirname, element));
  }
});

(async () => {
  // pre-render each route...
  for (const url of [...singleRoutes, ...pagesRoutes]) {
    const [appHtml, preloadLinks] = await render(url, manifest);

    const html = template
      // .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml);

    const filePath = `dist/static${url === "/" ? "/index" : url}.html`;
    fs.writeFileSync(toAbsolute(filePath), html);
    console.log("pre-rendered:", filePath);
  }

  // done, delete ssr manifest
  // fs.unlinkSync(toAbsolute("dist/static/ssr-manifest.json"));
})();
