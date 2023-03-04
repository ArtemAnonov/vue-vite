import axios from "axios";
import { has } from "lodash-es";
import { siteURL, actionJWTResolver } from "@/api/helpers";
/**
 * Импорт глобального хранилища VUEX
 */
import store from "@/store";

/**
 * routeBase - конкретное значение, в отличие от type, который используется как ярлык
 * products/categories - routeBase; productsCategories - type
 *
 *
 */

const headers = () => {
  const headers = {
    // Accept: "application/json",
    // "Content-Type": "application/json",
  };
  if (import.meta.env.MODE !== "development") {
    headers["Content-Security-Policy"] = "default-src 'self'";
  }
  return headers;
};
/**
 * Post: (siteURL, data, params)
 *
 * Установка axios.create({withCredentials: true}) необходима для того, чтобы в режиме разработки
 * запрос неавторизованного пользователя устанавливал куку.
 * Однако это меняет респонс и такой запрос не совместим для запроса, который должен получать nonce
 *
 * @param {*} apiType
 * @returns
 */
const axiosInstance = (
  baseURL,
  // withCredentials = false
) => axios.create({
  baseURL,
  headers,
  timeout: 200000,
  // withCredentials:
  //   import.meta.env.MODE === "development" && withCredentials ? true : false,
});

// axios.create().get("http://anyaaa6t.beget.tech/wp-json/wp/v2/media");

// /**
//  * @param {string} Payload.routeBase - products/categories
//  * @param {string} Payload.apiType - /wp/v2/
//  * @param {string} Payload.method - get
//  * @param {object} Payload.config -
//  * @param {object} Payload.data -
//  * @returns
//  */
export async function mainFetch({
  id = null,
  basedRequest,
  method = "get",
  config = {},
  data = {},
}) {
  const { routeBase, apiType, type, params } = basedRequest;
  const handledConfig = actionJWTResolver({
    type, config,
  });
  handledConfig.params = params;
  const baseURL = `${siteURL()}wp-json${apiType}`;
  handledConfig.withCredentials = import.meta.env.MODE === "development"
    && Boolean(store.state[type]?.withCredentials);
  const showProgress = has(handledConfig, "onDownloadProgress") && handledConfig.onDownloadProgress;
  try {
    if (showProgress) {
      handledConfig.onDownloadProgress = (progressEvent) => {
        const percentCompleted = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100,
        );
        store.commit("common/setProgress", percentCompleted);
        store.commit("common/setProgressLoad", {
          visible: true,
          percent: percentCompleted === Infinity ? 100 : percentCompleted,
        });
      };
    }
    const response = await axiosInstance(
      baseURL,
      // withCredentials
    )[method](
      `/${routeBase}/${id !== null ? id : ""}`,
      method === "get" ? handledConfig : data,
      method === "get" ? undefined : handledConfig,
    );
    return response;
  } catch (error) {
    console.error("Error in method 'mainFetch'", { error, basedRequest });
  } finally {
    if (showProgress) {
      setTimeout(() => {
        store.commit("common/setProgressLoad", {
          visible: false,
          percent: 0,
        });
      }, 2000);
    }
  }
}
