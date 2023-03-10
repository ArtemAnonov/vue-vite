import __INST__ from "@/json/vuewp.json";

const instance = __INST__.state.paymentGateways;
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
