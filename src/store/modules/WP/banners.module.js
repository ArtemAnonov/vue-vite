import __INST__ from "@/json/vuewp.json";

const instance = __INST__.state.banners;
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

  getters: {},

  mutations: {
    setBannerCategoriesIds(state, value) {
      state.params.banner_categories = value;
    },
  },
};
