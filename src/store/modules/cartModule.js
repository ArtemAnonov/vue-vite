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
      // params: instance.params,
      // single_params: instance.single_params,
    },
    store: {},
    /**
     * Параметры запроса, которые должны быть в запросе POST, но не добавляются
     */
    aditionalStore: {},
  }),
  getters: {},

  actions: {
    async getCart({ state, getters, commit, dispatch }) {

      try {
        let requested = {}
        requested = await dispatch(
          "mainFetchRequest",
          {
            route_base: state.basedRequest.route_base,
            apiType: state.basedRequest.apiType,
            maintainJWT: true,
            reqiredJWT: false,
          },
          { root: true }
        );
        const headers = requested.response.headers;
        Cookies.set("nonce-token", headers.nonce);
        commit("setAditionalStoreProperty", {
          key: "customer_id",
          value: Number(headers["user-id"]),
        });
        commit("setCart", requested.response.data);
        return requested;
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
      // if (!config.headers) config.headers = {};
      try {
        config.headers = getNonceToken();
        const requested = await dispatch(
          "mainFetchRequest",
          {
            apiType: state.basedRequest.apiType,
            route_base,
            config,
            method: "post",
            maintainJWT: true,
            reqiredJWT: false,
          },
          { root: true }
        );

        commit("setCart", requested.response.data);
        return requested;
      } catch (error) {
        console.log(error);
      }
    },
  },

  mutations: {
    setCart(state, value) {
      state.store = value;
    },
    setAditionalStoreProperty(state, { key, value }) {
      state.aditionalStore[key] = value;
    },
  },
};
