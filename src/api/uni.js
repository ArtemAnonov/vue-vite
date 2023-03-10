import { isEmpty, has, last } from "lodash-es";
// eslint-disable-next-line import/no-useless-path-segments
import { prefixes } from "../../src/router/prefixes.js";
// eslint-disable-next-line import/no-useless-path-segments
import __INST__ from "../../src/json/vuewp.json" assert { type: "json" };

export function siteURL() {
  let { url } = __INST__.routing.returned;
  url = new URL(url);
  url = `${url.protocol}//${url.hostname}/`;
  return url;
}

/**
 * Позволяет получать развёрнутый путь. Поддерживает возврат объекта,
 * который может содержать префикс (/product/) и последний элемент,
 * розволяющий отделять элементы в виде: /prefix/cat1/cat2/product-slug
 *
 * @param {String} str - полный адрес или путь
 * @param {String} returnType
 * @param {Boolean} prefix - результирующий набор становится объектом и отделяет префикс
 * @returns {Object|String}
 */
export function getPathName(str, returnType = "string") {
  let path;
  if (str.indexOf(siteURL()) === 0) {
    path = str.slice(siteURL().length - 1); // exm. '/orders/'
  } else {
    path = str;
  }
  switch (returnType) {
  case "string":
    return `${path}`;
  case "array": {
    path = {
      items: path.split("/").filter((el) => el),
    };
    const [first] = path.items;
    if (!Object.keys(prefixes).includes(first)) {
      return path;
    }
    path.prefix = first;

    path.items.shift();

    if (prefixes[first]) {
      path = prefixes[first](path);
    }

    return path;
  }
  default:
    return null;
  }
}

export function lastSlugParam(path) {
  return last(getPathName(path, "array").items);
}
