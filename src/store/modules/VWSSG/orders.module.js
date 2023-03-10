import __INST__ from "@/json/vuewp.json";
import { handleWPDate } from "@/api/helpers";

const instance = __INST__.state.orders;
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

  actions: {
    handleItemsResponse: ({ state, commit, rootState }, itemsResponse) => {
      for (let index = 0; index < itemsResponse.length; index++) {
        const order = itemsResponse[index];
        order.date_created = handleWPDate(order.date_created);
        for (let i = 0; i < order.line_items.length; i++) {
          const el = order.line_items[i];
          const product = rootState.products.items[el.product_id];
          [el.image] = product.images;
          el.slug = product.slug;
        }
        commit("ADD_ITEM", { type: state.basedRequest.type, item: order }, { root: true });
      }
    },
  },

  mutations: {
    setItems(state, value = {}) {
      state.items = value;
    },
  },

};
