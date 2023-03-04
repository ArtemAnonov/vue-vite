import { VUE_WP_INSTANCE } from "@/api/helpers";

const instance = VUE_WP_INSTANCE().state.paymentGateways;
export default {
  namespaced: true,

  state: () => ({
    settings: instance?.settings ? instance.settings : {},
    requests: instance.requests,
    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      params: instance.params,
      routeBase: instance.route_base,
    },

    items: instance.items,
  }),
};
