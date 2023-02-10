import Cookies from "js-cookie";
import __VUE_WORDPRESS__ from "@/json/vuewp.json";
import router from "@/router";
import store from "@/store";
import { isEmpty } from "lodash-es";

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

export function separateStringByArrayPositions(str, foundPositions) {
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

/**
 * прим. JS отсчитывает месяцы с 0, поэтому для корректного отображения значение месяца изменяется
 *
 * @param {String} value - значение из WP типа '2022-12-28T15:16:04'
 * @returns
 */
export function handleWPDate(value) {
  let separator = value.indexOf("T");
  let yearMonthDate = value.slice(0, separator);
  let hoursMinutesSeconds = value.slice(separator + 1);
  yearMonthDate = separateStringByArrayPositions(
    yearMonthDate,
    findAllPositions(yearMonthDate, "-")
  );
  yearMonthDate[1] = yearMonthDate[1] - 1;
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
  return __VUE_WORDPRESS__;
}

export function togglerOpening(name, prop, value, state, type) {
  const element = state.openings[type][name];
  if (value === null) {
    element[prop] = !element[prop];
  } else {
    state.openings[type][element.name][prop] = value;
  }
}

export function loginFromMail(email) {
  let str = email;
  return str.slice(0, str.indexOf("@"));
}

export function actionJWTResolver({ JWTRequestConfig, type, config = {} }) {
  // var relevantJWTRC
  if (store.state[type].hasOwnProperty('JWTRequestConfig')) {
    JWTRequestConfig = store.state[type].JWTRequestConfig
    // JWTRequestConfig = relevantJWTRC
  }
  // JWTRequestConfig = relevantJWTRC ? relevantJWTRC : JWTRequestConfig
  const { JWTReqired, JWTMaintain } = JWTRequestConfig
  let JWTToken;
  if (JWTReqired && JWTMaintain === false) {
    throw 'Использование флага "JWTReqired" подразумевает установку JWTMaintain = true';
  }
  if (JWTMaintain) {
    JWTToken = Cookies.get("jwt-token");
    if (JWTToken) {
      if (!config.hasOwnProperty("headers")) {
        config["headers"] = {};
      }
      config.headers["Authorization"] = "Bearer " + JWTToken;
    } else {
      if (JWTReqired) {
        throw "Для выполнения запроса необходим токен";
      }
    }
  }
  return config;
}

/**
 *
 * @param {*} category - категория (родительская(базовая) или одна из дочерних)
 * @param {*} parentCategorySlug - передаётся при переходе к одной из дочерних категорий
 * @returns
 */
export function routeToCategory(category, parentCategorySlug = null) {
  if (isEmpty(category)) throw "Не передана категория";

  let routerObject = {};
  if (category.parent == 0 || category.slug === parentCategorySlug) {
    //
    routerObject = router.push({
      name: "SingleCategory",
      params: { mainCategorySlug: category.slug },
    });
  } else {
    routerObject = router.push({
      name: "SingleSubCategory",
      params: {
        mainCategorySlug: parentCategorySlug,
        categorySlug: category.slug,
      },
    });
  }
  store.commit("common/setPopup", { name: "headerMenu", active: false });
  store.commit("common/setScrollFlag", { value: true });
  return routerObject;
}
/**
 * Не уверен в нужности этой функции, но оставил
 */
export function itemsLoadHandler(callback, quantity = 4) {
  let items = [];
  items = callback;
  if (isEmpty(items)) {
    // this.itemsLoaded = false;
    items.length = quantity;
  } else {
    // this.itemsLoaded = true;
  }
  return items;
}

/**
 * Функция переопределяет те свойства, ключи которых имеются в объекте с заменяющими значниями
 * (Написана была для переопределения per_page в productsModule - для SSG, так как реквест,
 * возвращаемый запросом из бэка per_page определял как 100)
 *
 * @param {Object} mutableObject
 * @param {Object} replacementProps
 * @returns
 */
export function mutateObjectForReplaceProperty(
  mutableObject,
  replacementProps
) {
  const replacementKeys = Object.keys(replacementProps);
  replacementKeys.forEach((key) => {
    if (mutableObject.hasOwnProperty(key)) {
      mutableObject[key] = replacementProps[key];
    }
  });
  return mutableObject;
}

export function getWishListKeyFromCookieKey() {
  if (store.state.auth.userAuth) {
    return Cookies.get("tinv_wlk_log");
  } else {
    return Cookies.get("tinv_wishlistkey");
  }
}
