import Cookies from "js-cookie";
import __VUE_WORDPRESS__ from '@/json/vuewp.json'

export function fullName(value) {
  return `${value.slug + "-" + value.id}`;
}

export function idOnli(value) {
  return Number(value.slice(value.lastIndexOf("-") + 1));
}

/**
 * Функция ищет и заменяет <SLOT> в route_base (rest_base), например в: products/<SLOT>/variations
 * @param {string | number} value - значение, которое используется для замены <SLOT>
 */
export function replaceSlotRoutePath(route_base, value) {
  return route_base.replace("<SLOT>", value);
}

export function getNonceToken(obj = {}) {
  let nonceToken = Cookies.get("nonce-token");
  if (!nonceToken) {
    throw "Nonce token undefined";
  }
  obj["Nonce"] = nonceToken;
  return obj;
}

/**
 * Переключатель stop позволяет получить длину строки целиком
 * @param {*} str
 * @param {*} separator
 * @returns
 */
export function findAllPositions(str, separator) {
  let stop = false;
  let pos = 0;
  let foundPositions = [];
  while (true) {
    let foundPos = str.indexOf(separator, pos);
    if (foundPos == -1 && !stop) {
      foundPositions.push(str.length);
      stop = true;
    } else {
      foundPositions.push(foundPos);
      pos = foundPos + 1;
    }
    if (stop) break;
  }
  return foundPositions;
}

export default function separateStringByArrayPositions(str, foundPositions) {
  let subStrs = [];
  let start = 0;
  for (let index = 0; index < foundPositions.length; index++) {
    let end = foundPositions[index];
    let substr = str.slice(start, end);
    subStrs.push(substr);
    start += substr.length + 1;
  }
  return subStrs;
}

export function createNewDate(value) {
  let separator = value.indexOf("T");
  let yearMonthDate = value.slice(0, separator);
  let hoursMinutesSeconds = value.slice(separator + 1);
  yearMonthDate = separateStringByArrayPositions(
    yearMonthDate,
    findAllPositions(yearMonthDate, "-")
  );
  hoursMinutesSeconds = separateStringByArrayPositions(
    hoursMinutesSeconds,
    findAllPositions(hoursMinutesSeconds, ":")
  );
  return new Date(...yearMonthDate, ...hoursMinutesSeconds);
}

export function items_array_to_object(value) {
  for (let index = 0; index < value.length; index++) {
    const element = value[index];
    element.findAllPositions;
  }
}

export function VUE_WP_INSTANCE() {
  return __VUE_WORDPRESS__
  // if ("__VUE_WORDPRESS__" in window) {
  //   return window.__VUE_WORDPRESS__;
  // } else {
  //   return window.__VUE_WORDPRESS__ = __VUE_WORDPRESS__;
  // }
}
/**
 * Создание в actions универсального метода, который принимает название одного из методов actions
и имеет общий функционал
 * @param {Object} config axios config
 */
export function actionParentMethod(config) {
  // let configKeys = ['headers', 'params']
  // let configKeys.forEach(element => {
      
  // });
}
