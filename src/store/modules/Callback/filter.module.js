import { handleWPDate } from "@/api/helpers";
import router from "@/router";
import __INST__ from "@/json/vuewp.json";

const instance = __INST__.state.filter.returned;

/**
 * Для устранения проблем необходимо для данного модуля поддерживать аналогичную структуру
 * как в модуле products
 *
 * (!&) - не стоит держать /pa/ в params
 */
export default {
  namespaced: true,
  settings: {},
  state: () => ({ ...{ settings: {} }, ...instance }),
  getters: {
    params(state, getters, rootState) {
      return state.params;
    },

    /**
     * Для всех сортировщиков:
     * @returns
     */
    sortDefault: () => (one, two) => {
      const dateOne = handleWPDate(one.date_created).getTime();
      const dateTwo = handleWPDate(two.date_created).getTime();
      if (dateOne > dateTwo) return -1;
      if (dateOne < dateTwo) return 1;
      return 0;
    },
    sortPriceMinToMax: (state, getters, rootState) => (one, two) => {
      if (one.price < two.price) return -1; // one меньше two по некоторому критерию сортировки
      if (one.price > two.price) return 1; // one больше two по некоторому критерию сортировки
      return 0; // равны
    },
    // /**
    //  * Смена знаков не приводила к правильной сортировке. Смена -1 и 1
    //  * даёт нужный резудьтат
    //  *
    //  * @returns
    //  */
    sortPriceMaxToMin: () => (one, two) => {
      if (one.price < two.price) return 1;
      if (one.price > two.price) return -1;
      return 0;
    },
  },
  mutations: {
    setCategoryId(state, value) {
      state.params.category = value;
    },

    setMinPrice(state, value) {
      state.params.min_price = value;
    },
    setMaxPrice(state, value) {
      state.params.max_price = value;
    },
    setMinCost(state, value) {
      state.minCost = value;
    },
    setMaxCost(state, value) {
      state.maxCost = value;
    },

    setAttributeTerms(state, { type, value }) {
      const foundItem = state.params[type].options.find((el, index, array) => {
        const condition = el.id === value.id;
        if (condition) array.splice(index, 1);
        return condition;
      });
      if (foundItem) return;
      state.params[type].options.push(value);
    },
    setOrderAndOrderBy(state, value) {
      state.params.orderAndOrderBy = value; //
    },

    setPage(state, value) {
      state.params.page = Number(value);
    },

    unsetDefaultAttributeOptions(state, atrrSlug) {
      state.params[atrrSlug].options = [];
    },

    setDefaultPrices(state) {
      state.params.min_price = state.minCost;
      state.params.max_price = state.maxCost;
    },
  },
  actions: {
    setDefaultFilter({
      state, commit, getters, rootGetters,
    }) {
      commit("setDefaultPrices");

      const attrs = rootGetters["productsAttributes/attributesSlugs"];
      attrs.forEach((element) => {
        commit("unsetDefaultAttributeOptions", element);
      });
    },
    validateValues({
      state, dispatch, commit, getters, rootGetters,
    }) {
      if (state.params.min_price < state.minCost) {
        commit("setMinPrice", state.minCost);
      }
      if (state.params.max_price > state.maxCost) {
        commit("setMaxPrice", state.maxCost);
      }
    },
    async updateFilter({
      state, dispatch, commit, getters, rootGetters,
    }) {
      router.push(await dispatch("products/changePage", 1, { root: true }));
      dispatch("validateValues");
      dispatch("products/updateRequestParams", null, { root: true });
      dispatch("products/filterAndPaginate", null, { root: true });
    },
  },
};
