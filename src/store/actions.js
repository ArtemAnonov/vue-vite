import { mainFetch } from "@/api";
import { callStoreMethod } from "@/api/helpers";

export default {
  // updateDocTitle({ state, commit }, { parts = [], sep = " – " }) {
  //   commit("SET_DOC_TITLE", parts.join(sep));
  //   document.title = state.site.docTitle;
  // },

  /**
   *
   * @param {*} param0 - дестрктуризация commit
   * @param {*} param1
   * @returns
   */
  async getSingleById(
    { getters, commit },
    { basedRequest: { routeBase, type, apiType }, params },
  ) {
    if (getters.singleById({ type, id: params.id })) return;
    // let response;
    try {
      const response = await mainFetch({
        id: params.id,
        routeBase,
        config: { params },
        apiType,
      });
      commit("ADD_ITEM", { type, item: response.data });
    } catch (error) {
      console.error(error, { type });
    }
    // return response;
  },

  async getSingleBySlug(
    { state, getters, commit },
    { basedRequest, slug },
  ) {
    if (getters.singleBySlug({ type: basedRequest.type, slug })) return;
    try {
      const response = await mainFetch({ basedRequest, config: { params: { slug, pre_page: 1 } } });
      commit("ADD_ITEM", { type: basedRequest.type, item: response.data[0] });
    } catch (error) {
      console.error(error, basedRequest);
    }
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
    { state, getters, commit, dispatch },
    {
      basedRequest,
      config,
    },
  ) {
    let response;
    let payload;

    try {
      payload = { basedRequest, config };
      response = await mainFetch(payload);

      callStoreMethod(`${basedRequest.type}/handleItemsResponse`, "dispatch", response.data, () => {
        response.data.forEach((item) => commit("ADD_ITEM", { type: basedRequest.type, item }));
      });
    } catch (error) {
      console.error(error, payload);
    }

    return response;
  },

};
