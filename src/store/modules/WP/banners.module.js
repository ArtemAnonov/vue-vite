import { VUE_WP_INSTANCE } from "@/api/helpers.js";
const instance = VUE_WP_INSTANCE().state.banners;
export const bannersModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      route_base: instance.route_base,
      params: Object.assign({}, instance.params),
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
