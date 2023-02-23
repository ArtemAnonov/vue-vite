import { cloneDeep } from "lodash-es";
import Cookies from "js-cookie";
import { VUE_WP_INSTANCE, getNonceToken } from "@/api/helpers.js";

const instance = VUE_WP_INSTANCE().state.cart;
export default {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      routeBase: instance.route_base,
    },
    store: {},
    /**
     * Параметры запроса, которые должны быть в запросе POST, но не добавляются
     */
    aditionalStore: {},
    JWTRequestConfig: {
      JWTMaintain: true,
      JWTReqired: false,
    },
  }),
  getters: {},

  actions: {
    async getCart({
      state, getters, commit, dispatch,
    }) {
      try {
        const response = await dispatch(
          "mainFetchRequest",
          { basedRequest: state.basedRequest },
          { root: true },
        );
        const { headers } = response;
        Cookies.set("nonce-token", headers.nonce);
        commit("setCart", response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     *
     * @param {*} param0
     * @param {Object} Payload
     * @param {Object} Payload.routeBase
     * @returns
     */
    async updateCart(
      {
        state, getters, commit, dispatch,
      },
      { routeBase, params },
    ) {
      const config = {
        headers: getNonceToken(),
        params: {},
      };
      // пока что демо логика
      // if (
      //   dispatch("validationVariations", config.params.variations) === false
      // ) {
      //   dispatch("common/updateMessage", "notSelectProductSize", { root: true });
      //   return;
      // }
      // чистим для упрощения
      config.params = cloneDeep(params);
      config.params.variations = [];
      //

      const basedRequest = { ...{}, ...state.basedRequest };
      basedRequest.routeBase = routeBase;
      try {
        const response = await dispatch(
          "mainFetchRequest",
          {
            basedRequest,
            config,
            method: "post",
          },
          { root: true },
        );
        commit("setCart", response.data);
        switch (routeBase) {
          case "cart/add-item":
            dispatch("common/updateMessage", "productAddedToCart", { root: true });
            break;
          default:
            break;
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Валидатор params.variations (в проекте единственным обязательным выборным
     * атрибутом является размер)???
     */
    validationVariations(variations) {
      let valid = false;
      for (let index = 0; index < variations.length; index++) {
        const element = variations[index];
        if (element.value) {
          continue;
        } else {
          valid = false;
          break;
        }
      }
      return valid;
    },
  },

  mutations: {
    setCart(state, value) {
      state.store = value;
    },
  },
};
