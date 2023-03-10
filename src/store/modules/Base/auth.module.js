import Cookies from "js-cookie";
import __INST__ from "@/json/vuewp.json";
import { mainFetch } from "@/api";
import { loginFromMail } from "@/api/helpers";

const instance = __INST__.state.auth;
export default {
  namespaced: true,
  state: () => ({
    settings: instance?.settings ? instance.settings : {},
    /**
     * (!) - userAuth можно изменить из фронта и попасть на маршрут (правильно ли это?)
     */

    userAuth: false,
    currentURLPayment: "",
    userData: { id: 0 },

    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      routeBase: instance.route_base,
      params: instance.params,
    },
  }),
  getters: {},

  actions: {
    updateUserAuth({
      commit,
    }) {
      commit("setUserAuth", Boolean(Cookies.get("jwt-token")));
    },

    async login({
      state, dispatch, commit,
    }, authData) {
      const basedRequest = { ...{}, ...state.basedRequest };
      basedRequest.routeBase = "token";
      const responseLogin = await mainFetch(
        {
          basedRequest,
          method: "post",
          data: {
            username: loginFromMail(authData.email),
            password: authData.password,
          },
        },
      );
      Cookies.set("jwt-token", responseLogin.data.token);
      commit("updateSensitiveData", null, { root: true });

      commit("common/setPopup", { name: "login", value: false }, { root: true });
      dispatch("cart/getCart", null, { root: true });
    },

    logout({ dispatch, commit }, { route }) {
      Cookies.remove("jwt-token");
      // (~)
      commit("updateSensitiveData", null, { root: true });
      Cookies.remove("tinv_wlk_log");
      dispatch("cart/getCart", null, { root: true });
    },

    async getUser({ dispatch, commit, rootState }) {
      const response = await mainFetch(
        { basedRequest: rootState.customers.basedRequest },
      );
      commit("setUserData", response?.data);
    },
  },

  async register({
    dispatch, rootState,
  }, authData) {
    const authDataHandled = authData;
    authDataHandled.username = loginFromMail(authData.email);
    mainFetch(
      {
        basedRequest: rootState.customers.basedRequest,
        method: "post",
        data: authDataHandled,
      },
    );
  },

  mutations: {
    setUserAuth(state, value) {
      state.userAuth = value === undefined ? !state.userAuth : value;
    },

    setUserData(state, value = { id: 0 }) {
      state.userData = value;
    },
  },
};
