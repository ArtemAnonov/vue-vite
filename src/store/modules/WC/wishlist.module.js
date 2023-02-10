import { isEmpty } from "lodash-es";
import Cookies from "js-cookie";
import { VUE_WP_INSTANCE, getWishListKeyFromCookieKey } from "@/api/helpers.js";
const instance = VUE_WP_INSTANCE().state.wishlist;
export const wishlistModule = {
  namespaced: true,

  state: () => ({
    sensitive: true,
    /**
     * Свойство позволяет с localhost:3000 сделать запрос с получением axios-ом куки,
     * которое успешно устанавливается в браузер. Иначе кука приходит в ответе, но
     * не устанавливается
     */
    withCredentials: true,
    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      route_base: instance.route_base,
    },
    requests: instance.requests,
    items: instance.items,
    JWTRequestConfig: {
      JWTMaintain: true,
      JWTReqired: false,
    },
    // wishlist: {},
  }),
  getters: {
    productContanedInWishlist:
      (state, getters, rootState, rootGetters) => (id) => {
        for (const key in state.items) {
          if (Object.hasOwnProperty.call(state.items, key)) {
            const item = state.items[key];
            if (id == item.product_id) {
              return key;
            }
          }
        }
      },
    wishlistProductIds: (state) => {
      const ids = [];
      for (const key in state.items) {
        if (Object.hasOwnProperty.call(state.items, key)) {
          const el = state.items[key];
          ids.push(el.product_id);
        }
      }
      return ids;
    },
    // singleItem:
    //   (state, getters, rootState, rootGetters) => (id) => {

    // }
  },
  actions: {
    /**
     * Метод отрабатывает для получения tinv_wlk_log, который в свою очередь записывается
     * в куки - в случае запроса с user_id отличного от 0. Если пользователь
     * зарегистрирован, то установка происходит автоматически из бекэнда
     */
    async getWishlistByUser({ state, dispatch, commit, getters, rootState }) {
      if (rootState.auth.userAuth) {
        if (Cookies.get("tinv_wlk_log")) return;
      } else {
        if (Cookies.get("tinv_wishlistkey")) return;
      }
      const userData = rootState.auth.userData;
      const basedRequest = { ...{}, ...state.basedRequest };
      basedRequest.route_base =
        basedRequest.route_base + "/get_by_user/" + userData.id;
      const response = await dispatch(
        "mainFetchRequest",
        { basedRequest },
        {
          root: true,
        }
      );
      if (userData.id !== 0) {
        const tinv_wlk_log = response?.data?.[0]?.share_key;
        Cookies.set("tinv_wlk_log", Boolean(tinv_wlk_log) ? tinv_wlk_log : "");
      }
      // console.log(response);
    },
    /**
     *
     * @param {*} param0
     */
    getWishlistProductsByShareKey({ state, dispatch }) {
      // if(!getWishListKeyFromCookieKey()) throw 'sharekey=undefined'
      const basedRequest = { ...{}, ...state.basedRequest };
      basedRequest.route_base = `${
        basedRequest.route_base
      }/${getWishListKeyFromCookieKey()}/get_products`;

      dispatch("getItems", { basedRequest }, { root: true });
    },
    /**
     *
     * @param {*} Payload
     * @returns
     */
    async updateWishlist(
      { state, dispatch, commit, getters, rootGetters, rootState },
      { contained, itemId, productData }
    ) {
      const payload = { basedRequest: { ...{}, ...state.basedRequest } };
      if (contained) {
        payload.basedRequest.route_base = `${payload.basedRequest.route_base}/remove_product/${itemId}`;
      } else {
        payload.basedRequest.route_base = `${
          payload.basedRequest.route_base
        }/${getWishListKeyFromCookieKey()}/add_product`;
        payload.config = { params: productData };
        payload.method = "post";
      }
      return await dispatch("mainFetchRequest", payload, { root: true });
    },
  },
  mutations: {
    // setWishlist(state, value) {
    //   state.wishlist = value;
    // },
  },
};
