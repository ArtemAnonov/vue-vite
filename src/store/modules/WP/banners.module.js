import { VUE_WP_INSTANCE } from "@/api/helpers.js";

const instance = VUE_WP_INSTANCE().state.banners;
export default {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      routeBase: instance.route_base,
      params: instance.params,
      slug: null,
    },
    requests: instance.requests,

    items: instance.items,
  }),

  getters: {},

  mutations: {
    setBannerCategoriesIds(state, value) {
      state.params.banner_categories = value;
    },
  },
};
