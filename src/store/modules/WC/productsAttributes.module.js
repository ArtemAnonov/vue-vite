import { VUE_WP_INSTANCE } from "@/api/helpers.js";

const instance = VUE_WP_INSTANCE().state.productsAttributes;
export default {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      routeBase: instance.route_base,
      params: instance.params,
    },
    requests: instance.requests,

    items: instance.items,
  }),
  getters: {
    attributesSlugs(state) {
      const slugs = [];
      for (const key in state.items) {
        if (Object.hasOwnProperty.call(state.items, key)) {
          const element = state.items[key];
          slugs.push(element.slug);
        }
      }
      return slugs;
    },
  },
};
