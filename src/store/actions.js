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
    { basedRequest: { routeBase, type, apiType }, params }
  ) {
    if (getters.itemById({ type, id: params.id })) return;
    let request;
    let response;
    try {
      response = await mainFetch({
        id: params.id,
        routeBase,
        config: { params },
        apiType,
      });
      commit("ADD_ITEM", { type, item: response.data });
    } catch (error) {
      console.log(error, { type });
    }
    return { request, response };
  },

  async getSingleBySlug(
    { state, getters, commit },
    { basedRequest: { routeBase, type, apiType }, params }
  ) {
    if (getters.itemBySlug({ type, slug: params.slug })) return;
    let request;
    let response;
    try {
      response = await mainFetch({ routeBase, config: { params }, apiType });
      commit("ADD_ITEM", { type, item: response.data[0] });
    } catch (error) {
      console.log(error, { type });
    }
    return { request, response };
  },

  /**
   * (*) - копирование объекта параметров (params), а не присвоение позволяет
   * поддерживать уникальность объекта параметров (params) в компоненте,
   * таким образом при новых передоваемых параметрах (page) в компонент,
   * удается изменять request компонета, как следствие выполнять новый запрос
   *
   * (!) - копирование basedRequest иногда происходит, тем не менее в теле функции
   * происходит глубокое клонирование параметров. Неплохо бы было подвести это к
   * одной операции... (мб передавать коллбэк для тех запросов, которые должны как-то
   * обрабатываться (а передавать в функцию можно только type))
   *
   * @param {*} state
   * @param {*} request from component
   * @returns
   */
  async getItems(
    { state, getters, commit },
    {
      basedRequest,
      onDownloadProgress = null,
      JWTRequestConfig = {
        JWTMaintain: true,
        JWTReqired: true,
      },
    }
  ) {
    let response;
    let payload;
    let request = getters.request({
      type: basedRequest.type,
      params: basedRequest.params,
    });
    /**
     * Валидация параметров, выкидывает null, "" и т.п.
     */
    const { type, params } = basedRequest;
    let prepParams = pickBy(params, identity);

    let config = {
      onDownloadProgress,
      params,
    };

    if (!request) {
      try {
        config = actionJWTResolver({ JWTRequestConfig, type, config });
        payload = { basedRequest, config };
        response = await mainFetch(payload);
        if (!response) {
          throw "Response Undefined";
        }
        response.data.forEach((item) => commit("ADD_ITEM", { type, item }));

        if (state[type].hasOwnProperty("requests")) {
          prepParams = cloneDeep(prepParams); // (*)
          let ids = response.data.map((i) => i.id);
          request = {
            prepParams,
            total: Number(response.headers["x-wp-total"]),
            totalPages: Number(response.headers["x-wp-totalpages"]),
            data: ids,
          };
          commit("ADD_REQUEST", {
            type: type,
            request: request,
          });
        }
      } catch (error) {
        console.log(error, payload);
      }
    } else {
      console.log("Попытка вызова запроса с такими же параметрами");
    }

    return response;
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
   * флаг. Так как установка JWTMaintain = true флага для любого запроса по дефолту
   * заставляет работать ту логику, которая не нуждается в этом.
   * Например, было решено, что WCProducts будут доступны без авторизации, следовательно 
   * добавление лишнего header-а неприемлемо 
   *
   * @param {*} param0
   * @param {Object} Payload
   * @param {Boolean} Payload.JWTRequestConfig.JWTMaintain допустим ли JWT
   * @param {Boolean} Payload.JWTRequestConfig.JWTReqired обязателен ли JWT
   * @returns
   */
  async mainFetchRequest(
    { getters, commit, rootState },
    {
      basedRequest,
      method,
      data,
      config = {},
      JWTRequestConfig = {
        JWTMaintain: true,
        JWTReqired: true,
      },
      onDownloadProgress = null,

    }
  ) {
    let response;
    let payload = { basedRequest, config, method, data, onDownloadProgress };
    try {
      config = actionJWTResolver({
        JWTRequestConfig,
        type: basedRequest.type,
        config,
      });
      response = await mainFetch(payload);
    } catch (error) {
      console.log(error, payload);
      // throw {error, payload}
    }
    return response;
  },


};
