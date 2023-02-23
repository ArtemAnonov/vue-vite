import axios from "axios";
import { siteURL } from "@/api/helpers.js";
/**
 * Импорт глобального хранилища VUEX
 */
import store from "../store";
import _ from "lodash-es";

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
  baseURL
  // withCredentials = false
) =>
  axios.create({
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
  const { routeBase, apiType, type } = basedRequest;
  const baseURL = `${siteURL()}wp-json${apiType}`;
  config.withCredentials =
    import.meta.env.MODE === "development" &&
    Boolean(store.state[type]?.withCredentials);
  let showProgress =
    config.hasOwnProperty("onDownloadProgress") && config.onDownloadProgress;
  try {
    if (showProgress) {
      config.onDownloadProgress = (progressEvent) => {
        // if (progressEvent.lengthComputable === false) return;
        let percentCompleted = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        // console.log('p');
        store.commit("common/setProgress", percentCompleted);
        store.commit("common/setProgressLoad", {
          visible: true,
          percent: percentCompleted === Infinity ? 100 : percentCompleted,
        });
      };
    }
    // console.log(data, config, basedRequest, store.state[type]);
    const response = await axiosInstance(
      baseURL
      // withCredentials
    )[method](
      `/${routeBase}/${id !== null ? id : ""}`,
      method === "get" ? config : data,
      method === "get" ? undefined : config
    );
    return response;
  } catch (error) {
    console.log("Error in method 'mainFetch'", { error, basedRequest });
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
