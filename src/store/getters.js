import { isEqual, has } from "lodash-es";

export default {
  total: (state, getters) => ({ type, params }, property) => {
    const request = getters.request({ type, params });
    return request ? request[property] : 0;
  },

  settings: (state) => (type) => state[type].settings,

  /**
   * Функция ищет правильный объект request в store
   *
   * @param {*} state
   * @returns {Boolean} - найден ли request в requests
   */
  request: (state) => ({ type, params }) => state[type].requests.find((req) => isEqual(req.params, params)),

  /**
   *
   * @param {*} state
   * @returns request
   */
  requestByParam: (state) => ({ type }, { param, value }) => state[type].requests.find((req) => req.params[param] === value),

  /**
   *
   * @param {*} state
   * @returns
   */
  singleBySlug: (state) => ({ type, slug }) => {
    let item = null;
    for (const id in state[type].items) {
      if (state[type].items[id].slug === slug) {
        item = state[type].items[id];
      }
    }
    return item;
  },

  /**
   * get item by id
   * @param {*} state
   * @param {*} getters
   * @returns
   */
  singleById: (state) => ({ type, id }) => state[type].items[id],

  /**
   * Каждому id из request.data присваивается объект из state[type]
   *
   * @param {*} state
   * @param {*} getters
   * @returns
   */
  resultItems: (state, getters) => ({ type, params }) => {
    const request = getters.request({ type, params });
    return request
      ? request.data.map((id) => state[type].items[id])
      : {};
  },

  /**
   *
   * @param {*} state
   * @param {*} getters
   * @returns
   */
  itemsBased: (state) => ({ type }) => state[type].items || [],

  /**
   * Получить items с фильтрацией - найти все предметы с совпадающим
   * значением ОДНОГО из свойств
   *
   * @param {*} state
   * @param {*} getters
   * @param {Object} Payload
   * @param {Object} Payload.params - входные параметры, по которым происходит поиск соответствия
   * @returns
   */
  itemsMatchedOneProperty: (state) => ({ type }, params) => {
    const items = {};
    const paramsKeys = Object.keys(params);
    for (const key in state[type].items) {
      if (has(state[type].items, key)) {
        const element = state[type].items[key];
        paramsKeys.forEach((paramKey) => {
          if (element[paramKey] === params[paramKey]) {
            items[key] = element;
          }
        });
      }
    }
    return items;
  },

  /**
   * Получить items с фильтрацией - найти все предметы с совпадающим
   * значением ОДНОГО из свойств
   *
   * @param {*} state
   * @param {*} getters
   * @param {Object} Payload
   * @param {Object} Payload.params - входные параметры, по которым происходит поиск соответствия
   * @param {Function} Payload.callback - коллбэк возвращает true/false - таким образом
   * предмет добавляется или нет. При возвращении undefined цикл прерывается (это может быть полезно
   * например, если необходимо лимитировать набор)
   * @returns
   */
  itemsMatchedByCallback: (state) => ({ type }, params, callback) => {
    const items = [];
    const keys = Object.keys(params);
    for (const key in state[type].items) {
      if (has(state[type].items, key)) {
        const element = state[type].items[key];
        const callbackResult = callback(element, keys, params, items);
        if (callbackResult) items.push(element);
        else if (callbackResult === null) {
          break;
        }
      }
    }
    return items;
  },

  itemsInclude: (state) => ({ type }, includeArray = []) => {
    const items = {};
    for (const key in state[type].items) {
      if (has(state[type].items, key)) {
        const element = state[type].items[key];
        includeArray.forEach((includeId) => {
          if (element.id === includeId) {
            items[element.id] = element;
          }
        });
      }
    }
    return items;
  },

  /**
   * Получает значение свойства, записывает в массив
   * @param {*} state
   * @param {*} getters
   * @returns array ids
   */
  mapItemsByKey: (state) => ({ type }, inputKey) => {
    const ids = [];
    for (const key in state[type].items) {
      if (has(state[type].items, key)) {
        const element = state[type].items[key];
        ids.push(element[inputKey]);
      }
    }
    return ids;
  },

  /**
   * Метод был создан для получения параметра реквеста для передачи его в CatalogSidebarNode.
   * Получение total по параметру - id категории
   * @param {*} state
   * @param {*} getters
   * @returns
   */
  requestByItemParam: (state) => ({ type, param, value }) => state[type].requests.find((req) => req.params[param] === value),

  itemsByIds: (state) => (type, ids) => {
    const items = {};
    ids.forEach((id) => {
      const item = state[type].items?.[id];
      if (item) {
        items[id] = item;
      }
    });
    return items;
  },

  search: (state) => ({ str, type }) => {
    const { items } = state[type];
    const outputItems = {};
    if (!str || str.length < 3) return outputItems;
    for (const key in items) {
      if (has(items, key)) {
        const item = items[key];
        const regexp = new RegExp(str, "i");
        if (item.name.match(regexp)) {
          outputItems[key] = item;
        }
      }
    }
    return outputItems;
  },

  universalItem: (state, getters) => ({ type, value }) => {
    let item;
    switch (typeof value) {
    case "object":
      item = value;
      break;
    case "number":
      item = state[type].items[value];
      break;
    case "string":
      item = getters.singleBySlug({ type, slug: value });
      break;
    default:
      break;
    }
    return item;
  },
};
