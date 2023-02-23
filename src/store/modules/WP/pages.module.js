import { VUE_WP_INSTANCE, getPathByURL } from "@/api/helpers.js";

const instance = VUE_WP_INSTANCE().state.pages;

export default {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      routeBase: instance.route_base,
      params: instance.params,
      single_params: instance.single_params,
    },
    requests: instance.requests,

    items: instance.items,
  }),

  getters: {
    menu:
      (state) => ({ name }) => state.menus[name],
    pageBySlug: (state, getters, rootState, rootGetters) => (slug) =>
      // console.log(rootGetters);
      rootGetters.itemBySlug({
        type: state.basedRequest.type,
        slug,
      }),
    /**
     *
     * @param {String} fullPath - полный путь компанента. (прим.) /personal/wushlist
     * @returns
     */
    pageByLink: (state) => (fullPath) => {
      for (const key in state.items) {
        if (Object.hasOwnProperty.call(state.items, key)) {
          const element = state.items[key];
          if (getPathByURL(element.link) === fullPath) {
            return element;
          }
        }
      }
    },
  },
};
