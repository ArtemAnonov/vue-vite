import Cookies from "js-cookie";
import { VUE_WP_INSTANCE, setNonceToken } from "@/api/utils";
const instance = VUE_WP_INSTANCE().state.cart;
export const cartModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance.basedRequest.apiType,
      type: instance.basedRequest.type,
      route_base: instance.basedRequest.route_base,
      // params: instance.params,
      // single_params: instance.single_params,
    },
    store: {},
    aditionalStore: {},
  }),
  getters: {},

  actions: {
    async getCart({ state, getters, commit, dispatch }) {
      try {
        const requested = await dispatch(
          "mainFetchRequest",
          {
            route_base: state.basedRequest.route_base,
            apiType: state.basedRequest.apiType,
            maintainJWT: true,
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
        config.headers = setNonceToken()
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
