import Cookies from "js-cookie";
import { VUE_WP_INSTANCE } from '@/api/utils.js'
const instance = VUE_WP_INSTANCE().state.auth;
export const authModule = {
  namespaced: true,
  state: () => ({
    userAuth: false,

    basedRequest: {
      apiType: instance.basedRequest.apiType,
      type: instance.basedRequest.type,
      route_base: instance.basedRequest.route_base,
      params: Object.assign({

      }, instance.params),
    },
  }),
  getters: {

  },

  actions: {
    updateUserAuth({ dispatch, commit, getters }) {
      commit("setUserAuth", Boolean(Cookies.get('jwt-token')));
    },
    login({ dispatch, commit, getters }, token) {
      Cookies.set('jwt-token', token)
      commit("setUserAuth", true);
    },
    logout({ dispatch, commit, getters }) {
      Cookies.remove('jwt-token')
      commit("setUserAuth", false);
    },
  },

  mutations: {
    setUserAuth(state, value) {
      state.userAuth = value;
    },
  },
};
