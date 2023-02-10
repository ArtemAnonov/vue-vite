import { isEqual } from "lodash-es";

export default {
  total:
    (state, getters) =>
    ({ type, params }, property) => {
      let request = getters.request({ type, params });
      return request ? request[property] : 0;
    },

  settings: (state, getters) => (type) => {
    return state[type]["settings"];
  },

  /**
   * Функция ищет правильный объект request в store
   *
   * @param {*} state
   * @returns {Boolean} - найден ли request в requests
   */
  request:
    (state) =>
    ({ type, params }) => {
      return state[type].requests.find((req) => {
        return isEqual(req.params, params);
      });
    },

  /**
   *
   * @param {*} state
   * @returns request
   */
  requestByParam:
    (state) =>
    ({ type, params }, { param, value }) => {
      return state[type].requests.find((req) => {
        return req.params[param] == value;
      });
    },

  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * decodeURI()
   *
   * @param {*} state
   * @returns
   */
  itemBySlug:
    (state) =>
    ({ type, slug }) => {
      let item;
      for (let id in state[type]["items"]) {
        if (state[type]["items"][id].slug === slug) {
          item = state[type]["items"][id];
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
  itemById:
    (state, getters) =>
    ({ type, id }) => {
      return state[type]["items"][id];
    },

  ///////////////////////////////////////////////////////////////////////////////////////
  /**
   * Каждому id из request.data присваивается объект из state[type]
   *
   * @param {*} state
   * @param {*} getters
   * @returns
   */
  resultItems:
    (state, getters) =>
    ({ type, params }) => {
      let request = getters.request({ type, params });
      return request ? request.data.map((id) => state[type]["items"][id]) : {};
    },

  /**
   *
   * @param {*} state
   * @param {*} getters
   * @returns
   */
  itemsBased:
    (state, getters) =>
    ({ type }) => {
      return state[type]["items"] || [];
    },

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
  itemsMatchedOneProperty:
    (state, getters) =>
    ({ type }, params) => {
      let items = [];
      let keys = Object.keys(params);
      for (const key in state[type]["items"]) {
        if (Object.hasOwnProperty.call(state[type]["items"], key)) {
          const element = state[type]["items"][key];
          keys.forEach((key) => {
            if (element[key] == params[key]) {
              items.push(element);
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
  itemsMatchedByCallback:
    (state, getters) =>
    ({ type }, params, callback) => {
      let items = [];
      let approved = false;
      let keys = Object.keys(params);
      for (const key in state[type]["items"]) {
        if (Object.hasOwnProperty.call(state[type]["items"], key)) {
          const element = state[type]["items"][key];
          let callbackResult = callback(element, keys, params, items, approved);
          if (callbackResult === true) items.push(element);
        } else if (callbackResult === undefined) {
          break;
        }
      }
      return items;
    },

  itemsInclude:
    (state, getters) =>
    ({ type, params }, includeArray = []) => {
      let items = {};
      for (const key in state[type]["items"]) {
        if (Object.hasOwnProperty.call(state[type]["items"], key)) {
          const element = state[type]["items"][key];
          includeArray.forEach((include_id) => {
            if (element.id == include_id) {
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
  mapItemsByKey:
    (state, getters) =>
    ({ type, params }, inputKey) => {
      let ids = [];
      for (const key in state[type]["items"]) {
        if (Object.hasOwnProperty.call(state[type]["items"], key)) {
          const element = state[type]["items"][key];
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
  requestByItemParam:
    (state, getters) =>
    ({ type, param, value }) => {
      return state[type].requests.find((req) => req.params[param] == value);
    },

  itemsByIds: (state) => (type, ids) => {
    const items = {};
    ids.forEach((id) => {
      const item = state[type].items?.[id];
      if (item) {
        items[id] = item;
      }
    });
    return items
  },

  ///////////////////////////////////////////////////////////////////////////////////////
};
