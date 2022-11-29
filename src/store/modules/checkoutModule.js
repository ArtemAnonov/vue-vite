import { VUE_WP_INSTANCE } from "@/api/utils";
const instance = VUE_WP_INSTANCE().state.checkout;
export const checkoutModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance.basedRequest.apiType,
      type: instance.basedRequest.type,
      route_base: instance.basedRequest.route_base,
    },

  }),
  getters: {},

  actions: {},

  mutations: {

  },
};
