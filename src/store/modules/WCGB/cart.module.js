import Cookies from "js-cookie";
import { VUE_WP_INSTANCE, getNonceToken } from "@/api/helpers.js";
const instance = VUE_WP_INSTANCE().state.cart;
export const cartModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      route_base: instance.route_base,
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
    async getCart({ state, getters, commit, dispatch }) {
      try {
        const response = await dispatch(
          "mainFetchRequest",
          { basedRequest: state.basedRequest },
          { root: true }
        );
        const headers = response.headers;
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
     * @param {Object} Payload.route_base prop for component CartBtnNode ex: 'cart/add-item'
     * @returns
     */
    async updateCart(
      { state, getters, commit, dispatch },
      { route_base, config }
    ) {
      config.headers = getNonceToken();
      const basedRequest = { ...{}, ...state.basedRequest };
      basedRequest.route_base = route_base;
      const response = await dispatch(
        "mainFetchRequest",
        {
          basedRequest,
          config,
          method: "post",
        },
        { root: true }
      );

      commit("setCart", response.response.data);
      return response;
    },
  },

  mutations: {
    setCart(state, value) {
      state.store = value;
    },
  },
};
