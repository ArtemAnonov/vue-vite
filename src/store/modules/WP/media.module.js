import { VUE_WP_INSTANCE } from "@/api/helpers";

const instance = VUE_WP_INSTANCE().state.media;

export default {
  namespaced: true,

  state: () => ({
    settings: instance?.settings ? instance.settings : {},
    requests: instance.requests,
    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      routeBase: instance.route_base,
      params: instance.params,
    },

    items: instance.items,
  }),
};
