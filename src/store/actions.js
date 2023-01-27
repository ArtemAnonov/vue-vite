// import _ from 'lodash-es';
import Cookies from "js-cookie";
import { cloneDeep, pickBy, identity } from "lodash-es";
import { mainFetch } from "@/api";
import { actionJWTResolver } from "@/api/helpers.js";

/**
 * Основные два метода это getItems() и mainFetchRequest()
 * Первый используется для получения (метод GET) и записи в хранилище айтемов
 * Второй - для различных запросов, которым необходимы дополнительные конфиги itc
 */
export default {
  updateDocTitle({ state, commit }, { parts = [], sep = " – " }) {
    commit("SET_DOC_TITLE", parts.join(sep));
    document.title = state.site.docTitle;
  },

  /**
   *
   * @param {*} param0 - дестрктуризация commit
   * @param {*} param1
   * @returns
   */
  async getSingleById(
    { getters, commit },
    { basedRequest: { route_base, type, apiType }, params }
  ) {
    if (getters.itemById({ type, id: params.id })) return;
    let request;
    let response;
    try {
      response = await mainFetch({
        id: params.id,
        route_base,
        config: { params },
        apiType,
      });
      commit("ADD_ITEM", { type, item: response.data });
    } catch (error) {
      console.log(error, type);
    }
    return { request, response };
  },

  async getSingleBySlug(
    { state, getters, commit },
    { basedRequest: { route_base, type, apiType }, params }
  ) {
    if (getters.itemBySlug({ type, slug: params.slug })) return;
    let request;
    let response;
    try {
      response = await mainFetch({ route_base, config: { params }, apiType });
      commit("ADD_ITEM", { type, item: response.data[0] });
    } catch (error) {
      console.log(error, type);
    }
    return { request, response };
  },

  /**
   * Для получения базовых вещей типа атрибутов, категорий, меток
   * @param {*} param0
   * @param {*} param1
   */
  async getItemsBased(
    { getters, commit },
    { route_base, type, params, apiType }
  ) {
    try {
      const response = await mainFetch({ route_base, params, apiType });
      response.data.forEach((item) => commit("ADD_ITEM", { type, item }));
    } catch (error) {
      console.log(error, type);
    }
  },
  /**
   * (*) - копирование объекта параметров (params), а не присвоение позволяет
   * поддерживать уникальность объекта параметров (params) в компоненте,
   * таким образом при новых передоваемых параметрах (page) в компонент,
   * удается изменять request компонета, как следствие выполнять новый запрос
   *
   * @param {*} state
   * @param {*} request from component
   * @returns
   */
  async getItems(
    { state, getters, commit },
    {
      route_base,
      type,
      apiType,
      params,
      onDownloadProgress = null,
      maintainJWT = true,
      reqiredJWT = true,
    }
  ) {
    let response;
    let request = getters.request({ type, params });
    /**
     * Валидация параметров, выкидывает null, "" и т.п.
     */
    params = pickBy(params, identity);

    let config = {
      onDownloadProgress,
      params,
    };

    if (!request) {
      try {
        config = actionJWTResolver({maintainJWT, reqiredJWT, config})
        response = await mainFetch({ route_base, config, apiType }); //: Object.assign({}, optionalParams, params)
        if (!response) {
          throw "Response Undefined";
        }
        response.data.forEach((item) => commit("ADD_ITEM", { type, item }));

        if (state[type].hasOwnProperty("requests")) {
          params = cloneDeep(params); // (*)
          let ids = response.data.map((i) => i.id);
          /**
           * Переопределение реквеста
           */
          request = {
            params,
            total: Number(response.headers["x-wp-total"]),
            totalPages: Number(response.headers["x-wp-totalpages"]),
            data: ids,
          };
          commit("ADD_REQUEST", {
            type,
            request: request,
          });
        }
      } catch (error) {
        console.log(error, type);
      }
    } else {
      console.log("Попытка вызова запроса с такими же параметрами");
    }

    return { request, response };
  },

  /**
   * Несколько сценариев для работы метода (не нужен(*), возможен(**), обязателен(***)):
   * 1) Без JWT - обычный запрос                          (*)
   * 2) С JWT
   *  1.1) JWT получен и добавлен                         (**), (***)
   *  1.2) JWT не получен -> не добален                   (**)
   *  1.3) JWT не получен -> не добавлен (с ошибкой)      (***)
   * 
   * 
   * прим. Для получения корзины использование токена не обязательно
   * 
   * Добавление headers в config, а также других свойств
   *        VS
  //  * Определено так, что вызовы метода должны быть независимыми от свойств config:
  //  * Указание params, но не указание headers не должно вести к ошибке.
  //  * Поэтому проверка и добавление отсутсвующих свойств присутствует - так как
  //  * некоторые блоки, например, добавление header.Authorization может выдавать ошибку
   *   
   * Определяющим значением выполнения или невыполнения блока должен служить соответсвующий
   * флаг. Так как установка maintainJWT = true флага для любого запроса по дефолту
   * заставляет работать ту логику, которая не нуждается в этом.
   * Например, было решено, что WCProducts будут доступны без авторизации, следовательно 
   * добавление лишнего header-а неприемлемо 
   *
   * @param {*} param0
   * @param {Object} Payload
   * @param {Boolean} Payload.maintainJWT поддержка JWT
   * @param {Boolean} Payload.reqiredJWT обязателен ли JWT
   * @returns
   */
  async mainFetchRequest(
    { getters, commit, rootState },
    {
      route_base,
      apiType,
      method,
      data,
      config = {},
      maintainJWT = true,
      reqiredJWT = true,
    }
  ) {
    let response;
    let request;

    try {
      config = actionJWTResolver({maintainJWT, reqiredJWT, config})
      response = await mainFetch({ route_base, config, apiType, method, data });
    } catch (error) {
      console.log(error, { route_base, config, apiType, method, data });
    }
    return { request, response };
  },
};
