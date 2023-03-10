import { getNonceToken } from "@/api/helpers";
import { mainFetch } from "@/api";
import router from "@/router";
import __INST__ from "@/json/vuewp.json";

const instance = __INST__.state.checkout;
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
    draftOrder: {},
  }),
  getters: {},

  actions: {
    async getCheckout({ state }) {
      let result = {};
      try {
        result = await mainFetch({
          basedRequest: state.basedRequest,
          method: "get",
          data: {},
          config: { headers: getNonceToken() },

        });
        if (result?.data) {
          // this.draftOrderLoaded = true;
          state.draftOrder = result.data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async postCheckout({ state, dispatch, commit }) {
      if (!state.draftOrder.payment_method) {
        dispatch("common/updateMessage", "notSelectPaymentMethod", { root: true });
        return;
      }
      let result = {};
      try {
        result = await mainFetch({
          basedRequest: state.basedRequest,
          method: "post",
          data: state.draftOrder,
          config: { headers: getNonceToken() },
        });
      } catch (error) {
        // (~)
        dispatch("common/updateMessage", "orderingError", { root: true });
        console.error(error);
      }
      commit("setCurrentURLPayment", result.data.payment_result.redirect_url);
      router.push({ name: "OrderingPayment" });
      dispatch("cart/getCart", null, { root: true });
    },
  },

  mutations: {
    setCurrentURLPayment(state, value = "") {
      state.currentURLPayment = value;
    },
    /**
     * (#) При обундении чувствительных данных пытается установить значение.
     * При этом оно undefined и не устанавляивается (видимо) по этому...
     *
     * @param {*} value
     */
    changePaymentMethod(state, value) {
      state.draftOrder.payment_method = value;
    },
    setDraftOrder(state, value = {}) {
      state.draftOrder = value;
    },
  },
};
