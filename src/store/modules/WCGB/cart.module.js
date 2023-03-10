import { cloneDeep } from "lodash-es";
import Cookies from "js-cookie";
import { getNonceToken } from "@/api/helpers";
import { mainFetch } from "@/api";
import __INST__ from "@/json/vuewp.json";

const instance = __INST__.state.cart;
export default {
  namespaced: true,

  state: () => ({
    settings: instance?.settings ? instance.settings : {},
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
  }),
  getters: {},

  actions: {
    async getCart({
      state, getters, commit, dispatch,
    }) {
      let response;
      try {
        response = await mainFetch(
          { basedRequest: state.basedRequest },
        );
        const { headers } = response;
        Cookies.set("nonce-token", headers.nonce);
        commit("setCart", response.data);
      } catch (error) {
        console.error(error);
      }
      return response;
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
      let response;
      const config = {
        headers: getNonceToken(),
        params: {},
      };
      // чистим для упрощения
      config.params = cloneDeep(params);
      config.params.variations = [];
      //

      const basedRequest = { ...{}, ...state.basedRequest };
      basedRequest.routeBase = routeBase;
      try {
        response = await mainFetch({ basedRequest, config, method: "post" });
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
        console.error(e);
      }
      return response;
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
