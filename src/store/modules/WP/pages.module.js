import { has } from "lodash-es";
import { getPathName } from "@/api/uni";
import __INST__ from "@/json/vuewp.json";

const instance = __INST__.state.pages;

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
    menu:
      (state) => ({ name }) => state.menus.items[name],
    pageBySlug: (state, getters, rootState, rootGetters) => (slug) => rootGetters.singleBySlug({
      type: state.basedRequest.type,
      slug,
    }),

    /**
     *
     * (~)
     * Было бы неплохо переписать так, чтобы составные части fullPath и element.link
     * были преобразованы в массив или проходили валидацию по слешам (получается '/personal/wishlist/' '/personal/wishlist')
     *
     *
     * @param {String} fullPath - полный путь компанента. (прим.) /personal/wushlist
     * @returns
     */
    pageByLink: (state) => (fullPath) => {
      for (const key in state.items) {
        if (has(state.items, key)) {
          const element = state.items[key];
          if (getPathName(element.link) === `${fullPath}/`) {
            return element;
          }
        }
      }
      return null;
    },
  },
};
