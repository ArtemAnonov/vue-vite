import Cookies from "js-cookie";
import { isEmpty, has } from "lodash-es";
import __VUE_WORDPRESS__ from "@/json/vuewp.json";
import router from "@/router";
import { prefixes } from "@/router/routes";
import store from "@/store";

export function fullName(value) {
  return `${`${value.slug}-${value.id}`}`;
}

export function idOnli(value) {
  return Number(value.slice(value.lastIndexOf("-") + 1));
}

/**
 * Функция ищет и заменяет <SLOT> в routeBase (rest_base), например в: products/<SLOT>/variations
 * @param {String|Number} value - значение, которое используется для замены <SLOT>
 */
export function replaceSlotRoutePath(routeBase, value) {
  return routeBase.replace("<SLOT>", value);
}

export function getNonceToken(obj = {}) {
  const objHandled = obj;
  const nonceToken = Cookies.get("nonce-token");
  if (!nonceToken) {
    throw new Error("Nonce token undefined");
  }
  objHandled.Nonce = nonceToken;
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
  const foundPositions = [];
  while (true) {
    const foundPos = str.indexOf(separator, pos);
    if (foundPos === -1 && !stop) {
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
  const subStrs = [];
  let start = 0;
  for (let index = 0; index < foundPositions.length; index++) {
    const end = foundPositions[index];
    const substr = str.slice(start, end);
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
  const separator = value.indexOf("T");
  let yearMonthDate = value.slice(0, separator);
  let hoursMinutesSeconds = value.slice(separator + 1);
  yearMonthDate = separateStringByArrayPositions(
    yearMonthDate,
    findAllPositions(yearMonthDate, "-"),
  );
  yearMonthDate[1] -= 1;
  hoursMinutesSeconds = separateStringByArrayPositions(
    hoursMinutesSeconds,
    findAllPositions(hoursMinutesSeconds, ":"),
  );
  return new Date(...yearMonthDate, ...hoursMinutesSeconds);
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
  const str = email;
  return str.slice(0, str.indexOf("@"));
}

export function actionJWTResolver({ type, config = {} }) {
  const { JWTRequestConfig: { JWTReqired, JWTMaintain } } = store.state[type].settings;
  const handledConfig = config;
  let JWTToken;
  if (JWTReqired && JWTMaintain === false) {
    throw new Error("Использование флага \"JWTReqired\" подразумевает установку JWTMaintain = true");
  }
  if (JWTMaintain) {
    JWTToken = Cookies.get("jwt-token");
    if (JWTToken) {
      if (!has(handledConfig, "headers")) {
        handledConfig.headers = {};
      }
      handledConfig.headers.Authorization = `Bearer ${JWTToken}`;
    } else if (JWTReqired) {
      throw new Error(`Для выполнения для ${type} запроса необходим токен`);
    }
  }
  return handledConfig;
}

/**
 *
 * @param {*} category - (reqired: {parent, slug}) категория (родительская(базовая) или одна из дочерних)
 * @param {*} parentCategorySlug - передаётся при переходе к одной из дочерних категорий
 * @returns
 */
export function routeToSingleProductCategory(category) {
  if (isEmpty(category)) throw new Error("Не передана категория");
  let routerObject = {};
  if (category.parent === 0) {
    //
    routerObject = router.push({
      name: "SingleCategory",
      params: { mainCategorySlug: category.slug },
    });
  } else {
    const parentCategorySlug = store.state.productsCategories.items?.[category.parent].slug;
    routerObject = router.push({
      name: "SingleSubCategory",
      params: {
        mainCategorySlug: parentCategorySlug,
        categorySlug: category.slug,
      },
    });
  }
  store.dispatch("common/updateAllOpeningTypeItems", {});
  // store.commit("common/setScrollFlag", { value: true });
  return routerObject;
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
  replacementProps,
) {
  const mutableObjectHandled = mutableObject;
  const replacementKeys = Object.keys(replacementProps);
  replacementKeys.forEach((key) => {
    if (has(mutableObjectHandled, key)) {
      mutableObjectHandled[key] = replacementProps[key];
    }
  });
  return mutableObjectHandled;
}

export function getWishListKeyFromCookieKey() {
  if (store.state.auth.userAuth) {
    return Cookies.get("tinv_wlk_log");
  }
  return Cookies.get("tinv_wishlistkey");
}

export function siteURL() {
  let { url } = VUE_WP_INSTANCE().routing.returned;
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
  let pathName;
  if (str.indexOf(siteURL()) === 0) {
    pathName = str.slice(siteURL().length - 1); // exm. '/orders/'
  } else {
    pathName = str;
  }
  switch (returnType) {
  case "string":
    return `${pathName}`;
  case "array": {
    let handled = {
      items: pathName.split("/").filter((el) => el),
    };
    const [first] = handled.items;
    if (!Object.keys(prefixes).includes(first)) {
      return handled;
    }
    handled.prefix = first;
    handled.items.splice(0, 1);

    if (prefixes[first]) {
      handled = prefixes[first](handled);
    }

    return handled;
  }
  default:
    return null;
  }
}

/**
 * Вызывает action/mutation, если такой метод существует
 * @param {String} methodName - название метода в формате 'type/MethodName'
 * @param {*} methodType - dispatch/commit/?
 * @param {*} payload - Полезная нагрузка для метода
 * @param {*} callback - колбэк, вызывается если передан. Вместо несуществущего метода
 */
export function callStoreMethod(methodName, methodType = "dispatch", payload = undefined, callback = null) {
  // const handlerFunctionName = `${type}/handleItemsResponse`;
  // console.log(methodName, methodType, payload, callback);
  let typeStore;
  switch (methodType) {
  case "dispatch":
    typeStore = "_actions";
    break;
  case "commit":
    typeStore = "_mutations";
    break;
  default:
    throw new Error("Wrong methodType");
  }
  // eslint-disable-next-line no-underscore-dangle
  const methodExists = Object.keys(store[typeStore]).findIndex((key) => key === methodName) !== -1;
  if (methodExists) {
    // console.log("е");
    store[methodType](methodName, payload);
  } else if (callback) {
    // console.log("nE");

    callback(payload);
  }
}

// export function generateRandomString() {
//   return String.fromCharCode(97 + Math.floor(Math.random() * 26));
// }

// /** (?) - не сделал генерацию сторки
//  * Функция была написана для идентификатора для слайдеров - стрелки итц требуют
//  * разных классов для корректной работы (? мб есть варик прописывать им классы в
//  * формате ".родительский_класс .дочерний_класс", как это есть в ванильном свайпере,
//  * но я не заморачивался).
//  * Так передавая [слагКатегории, пропИзSliderProductsSectionNode, random] устанавливается
//  * какой-нибудь класс
//  *
//  * @param {Array} params - массив значений в порядке значимости
//  * @returns
//  */
// export function getIdentificator(params = []) {
//   const result = params.find((el) => typeof el === "string" && !isEmpty(el));
//   if (!result) {

//   }
//   return result;
// }
