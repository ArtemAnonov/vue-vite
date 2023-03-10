import { getPathName } from "@/api/uni";
import router from "@/router";
import __INST__ from "@/json/vuewp.json";

const instance = __INST__.state.productsCategories;
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
    categoryPage: (state, getters, rootState, rootGetters) => (slug) => {
      const pagesType = rootState.pages.basedRequest.type;
      const templatePage = rootGetters.singleBySlug({ type: pagesType, slug });
      const category = rootGetters.singleBySlug({ type: state.basedRequest.type, slug });
      return {
        templatePage,
        category,
      };
    },
  },
  actions: {
    /**
   *
   * @param {*} category - (reqired: {parent, slug}) категория (родительская(базовая) или одна из дочерних)
   * @param {*} parentCategorySlug - передаётся при переходе к одной из дочерних категорий
   * @returns
   */
    routeToSingleProductCategory({ state, rootGetters, dispatch }, value) {
      const category = rootGetters.universalItem({ type: state.basedRequest.type, value });
      const handledPath = getPathName(category.permalink, "array");
      const mainPath = handledPath.items;
      dispatch("common/updateAllOpeningTypeItems", {}, { root: true });
      if (category.parent === 0) {
        return router.push({
          name: "CategoryMain",
          params: { mainPath: mainPath[0] },
        });
      }
      return router.push({
        name: "CategorySub",
        params: { mainPath },
      });
    },

  },
};
