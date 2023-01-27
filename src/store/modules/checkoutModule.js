import { VUE_WP_INSTANCE } from "@/api/helpers.js";
const instance = VUE_WP_INSTANCE().state.checkout;
export const checkoutModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType:  instance.apiType,
      type:  instance.type,
      route_base:  instance.route_base,
    },

  }),
  getters: {},

  actions: {},

  mutations: {

  },
};
