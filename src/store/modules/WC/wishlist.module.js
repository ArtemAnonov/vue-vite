import Cookies from "js-cookie";
import { has } from "lodash-es";
import { VUE_WP_INSTANCE, getWishListKeyFromCookieKey } from "@/api/helpers";
import { mainFetch } from "@/api";

const instance = VUE_WP_INSTANCE().state.wishlist;
export default {
  namespaced: true,

  state: () => ({
    settings: instance?.settings ? instance.settings : {},
    requests: instance.requests,
    /**
     * Свойство позволяет с localhost:3000 сделать запрос с получением axios-ом куки,
     * которое успешно устанавливается в браузер. Иначе кука приходит в ответе, но
     * не устанавливается
     */
    withCredentials: true,
    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      routeBase: instance.route_base,
      params: instance.params,
    },

    items: instance.items,
    // wishlist: {},
  }),
  getters: {
    /**
     * Есть ли айтем в вишлисте
     * @returns
     */
    productContanedInWishlist:
      (state, getters, rootState, rootGetters) => (id) => {
        for (const key in state.items) {
          if (has(state.items, key)) {
            const item = state.items[key];
            if (id === item.product_id) {
              return key;
            }
          }
        }
        return false;
      },
    wishlistProductIds: (state) => {
      const ids = [];
      for (const key in state.items) {
        if (has(state.items, key)) {
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
    async getWishlistByUser({
      state, dispatch, commit, getters, rootState,
    }) {
      const { userData } = rootState.auth;
      const basedRequest = { ...{}, ...state.basedRequest };
      basedRequest.routeBase = `${basedRequest.routeBase}/get_by_user/${userData.id}`;
      const response = await mainFetch({ basedRequest });
      if (userData.id !== 0) {
        const tinvWlkLog = response?.data?.[0]?.share_key;
        Cookies.set("tinv_wlk_log", tinvWlkLog || "");
      }
    },
    /**
     *
     * @param {*} param0
     */
    getWishlistProductsByShareKey({ state, dispatch }) {
      const basedRequest = { ...{}, ...state.basedRequest };
      basedRequest.routeBase = `${
        basedRequest.routeBase
      }/${getWishListKeyFromCookieKey()}/get_products`;

      dispatch("getItems", { basedRequest, config: { onDownloadProgress: true } }, { root: true });
    },
    /**
     *
     *
     * @param {*} productData - объект с параметрами. Так как вариативности нет, предоставляет только product_id
     *
     * @returns
     */
    async updateWishlist(
      {
        state, dispatch, commit, getters, rootGetters, rootState,
      },
      productData,
    ) {
      let response;
      try {
        const productId = productData.product_id;
        const itemId = getters.productContanedInWishlist(productId);
        const payload = { basedRequest: { ...{}, ...state.basedRequest } };
        if (itemId) {
          payload.basedRequest.routeBase = `${payload.basedRequest.routeBase}/remove_product/${itemId}`;
        } else {
          payload.basedRequest.routeBase = `${
            payload.basedRequest.routeBase
          }/${getWishListKeyFromCookieKey()}/add_product`;
          payload.config = { params: productData };
          payload.method = "post";
        }
        response = await mainFetch(payload);
        if (typeof response.data === "object") {
          dispatch("common/updateMessage", "productAddedToWishlist", { root: true });
          commit(
            "ADD_ITEM",
            {
              type: payload.basedRequest.type,
              item: response.data[0],
            },
            { root: true },
          );
        } else {
          commit(
            "REMOVE_ITEM",
            { type: state.basedRequest.type, id: itemId },
            { root: true },
          );
        }
        return response;
      } catch (error) {
        console.error(error);
      }
      return response;
    },

  },
  mutations: {
    setItems(state, value = {}) {
      state.items = value;
    },
  },
};
