import { has } from "lodash-es";
import __INST__ from "@/json/vuewp.json";

const instance = __INST__.state.productsAttributes;
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
  getters: {
    attributesSlugs(state) {
      const slugs = [];
      for (const key in state.items) {
        if (has(state.items, key)) {
          const element = state.items[key];
          slugs.push(element.slug);
        }
      }
      return slugs;
    },
  },
};
