import Cookies from "js-cookie";
// import { useRouter, useRoute } from 'vue-router'
import router from "@/router/index.js";

import { VUE_WP_INSTANCE, loginFromMail } from "@/api/helpers.js";

const instance = VUE_WP_INSTANCE().state.auth;
export default {
  namespaced: true,
  state: () => ({
    /**
     * (!) - userAuth можно изменить из фронта и попасть на маршрут (правильно ли это?)
     */
    userAuth: false,
    currentURLPayment: "",
    userData: {},

    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      routeBase: instance.route_base,
      params: instance.params,
    },
    JWTRequestConfig: {
      JWTMaintain: false,
      JWTReqired: false,
    },
  }),
  getters: {},

  actions: {
    updateUserAuth({
      state, dispatch, commit, getters,
    }) {
      commit("setUserAuth", Boolean(Cookies.get("jwt-token")));
    },

    async login({
      state, dispatch, commit, getters, rootState,
    }, authData) {
      const basedRequest = { ...{}, ...state.basedRequest };
      basedRequest.routeBase = "token";
      const responseLogin = await dispatch(
        "mainFetchRequest",
        {
          basedRequest,
          method: "post",
          data: {
            username: loginFromMail(authData.email),
            password: authData.password,
          },
        },
        { root: true },
      );
      Cookies.set("jwt-token", responseLogin.data.token);
      commit("setUserAuth", true);
      commit("common/setPopup", { name: "login", value: false }, { root: true });
      dispatch("cart/getCart", null, { root: true });
      dispatch("getUser");
    },

    async register({
      state, dispatch, commit, getters, rootState,
    }, userData) {
      userData.username = loginFromMail(userData.email);
      dispatch(
        "mainFetchRequest",
        {
          basedRequest: rootState.customers.basedRequest,
          method: "post",
          data: userData,
        },
        { root: true },
      );
    },

    logout({ dispatch, commit, getters }, { route }) {
      if (route.path.match(/^\/personal/)) {
        if (!route.path.match(/^\/wishlist/)) {
          router.push("/");
        }
      }

      Cookies.remove("jwt-token");
      commit("setUserData");
      commit("setUserAuth", false);
      Cookies.remove("tinv_wlk_log");
      dispatch("cart/getCart", null, { root: true });
    },

    async getUser({ dispatch, commit, rootState }) {
      const response = await dispatch(
        "mainFetchRequest",
        { basedRequest: rootState.customers.basedRequest },
        {
          root: true,
        },
      );
      // .then((r) => console.log('r',r), (e) => console.log(e))
      commit("setUserData", response?.data);
      // console.log(response);
      // return response
    },
  },

  mutations: {
    setUserAuth(state, value) {
      state.userAuth = value;
    },
    setCurrentURLPayment(state, value) {
      state.currentURLPayment = value;
    },
    setUserData(state, value = 0) {
      if (value === 0) {
        state.userData = { id: 0 };
      } else {
        state.userData = value;
      }
    },
  },
};
