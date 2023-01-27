import Cookies from "js-cookie";
// import { useRouter, useRoute } from 'vue-router'
import router from "@/router/index.js";

import { VUE_WP_INSTANCE, loginFromMail } from "@/api/helpers.js";
const instance = VUE_WP_INSTANCE().state.auth;
export const authModule = {
  namespaced: true,
  state: () => ({
    /**
     * (!) - userAuth можно изменить из фронта и попасть на маршрут (правильно ли это?)
     */
    userAuth: false,
    currentURLPayment: '',
    userData: {
      
    },

    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      route_base: instance.route_base,
      params: Object.assign({}, instance.params),
    },
  }),
  getters: {},

  actions: {
    updateUserAuth({ state, dispatch, commit, getters }) {
      commit("setUserAuth", Boolean(Cookies.get("jwt-token")));
    },

    async login({ state, dispatch, commit, getters }, userData) {
      const requestedLogin = await dispatch(
        "mainFetchRequest",
        {
          route_base: "token",
          apiType: state.basedRequest.apiType,
          method: "post",
          data: {
            username: loginFromMail(userData.email),
            password: userData.password,
          },
          maintainJWT: false,
          reqiredJWT: false,
        },
        { root: true }
      );
      dispatch("cart/getCart", null, { root: true });
      Cookies.set("jwt-token", requestedLogin.response.data.token);
      commit("setUserAuth", true);
    },

    async register({ state, dispatch, commit, getters, rootState }, userData) {
      userData.username = loginFromMail(userData.email);
      dispatch(
        "mainFetchRequest",
        {
          ...rootState.customers.basedRequest,
          ...{
            method: "post",
            data: userData,
            maintainJWT: false,
            reqiredJWT: false,
          },
        },
        { root: true }
      );
    },

    logout({ dispatch, commit, getters }, { route }) {
      if (route.path.match(/^\/personal/)) {
        router.push("/");
      }

      Cookies.remove("jwt-token");
      commit("setUserAuth", false);
      dispatch("cart/getCart", null, { root: true });
    },
  },

  mutations: {
    setUserAuth(state, value) {
      state.userAuth = value;
    },
    setCurrentURLPayment(state, value) {
      state.currentURLPayment = value
    }
  },
};
