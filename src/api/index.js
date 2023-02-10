import axios from "axios";
import { VUE_WP_INSTANCE } from "@/api/helpers.js";
/**
 * Импорт глобального хранилища VUEX
 */
import store from "../store";
import _ from "lodash-es";

let { url } = VUE_WP_INSTANCE().routing.returned;
url = new URL(url);
url = url.protocol + "//" + url.hostname;

/**
 * route_base - конкретное значение, в отличие от type, который используется как ярлык
 * products/categories - route_base; productsCategories - type
 *
 *
 */
/**
 * Post: (url, data, params)
 *
 * Установка axios.create({withCredentials: true}) необходима для того, чтобы в режиме разработки
 * запрос неавторизованного пользователя устанавливал куку.
 * Однако это меняет респонс и такой запрос не совместим для запроса, который должен получать nonce
 *
 * @param {*} apiType
 * @returns
 */
const axiosInstance = (apiType, withCredentials = false) =>
  axios.create({
    baseURL: `${url}/wp-json${apiType}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 200000,
    withCredentials:
      import.meta.env.MODE === "development" && withCredentials ? true : false,
  });

/**
 * @param {string} Payload.route_base - products/categories
 * @param {string} Payload.apiType - /wp/v2/
 * @param {string} Payload.method - get
 * @param {object} Payload.config -
 * @param {object} Payload.data -
 * @returns
 */
export async function mainFetch({
  id = null,
  basedRequest,
  method = 'get',
  config = {},
  data = {},
}) {
  const {route_base, apiType, type} = basedRequest
  let withCredentials = Boolean(store.state[type]?.withCredentials)
  let showProgress =
    config.hasOwnProperty("onDownloadProgress") && config.onDownloadProgress;
  try {
    if (showProgress) {
      config.onDownloadProgress = (progressEvent) => {
        // if (progressEvent.lengthComputable === false) return;
        let percentCompleted = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        store.commit("common/setProgress", percentCompleted);
        store.commit("common/setProgressLoad", {
          visible: true,
          percent: percentCompleted === Infinity ? 100 : percentCompleted,
        });
      };
    }
    // console.log(withCredentials, basedRequest, store.state[type]);
    const response = await axiosInstance(apiType, withCredentials)[method](
      `/${route_base}/${id !== null ? id : ""}`,
      method === "get" ? config : data,
      method === "get" ? undefined : config
    );
    return response;
  } catch (error) {
    console.log("Error in method 'mainFetch'", {error, basedRequest});
  } finally {
    if (showProgress) {
      setTimeout(() => {
        store.commit("common/setProgressLoad", {
          visible: false,
          percent: 0,
        });
      }, 500);
    }
  }
}
