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
// const wpRouteBases = ["/wp/v2/", "/jwt-auth/v1/", "/wc/v3/"];

/**
 * Post: (url, data, params)
 *
 * @param {*} apiType
 * @returns
 */
const defaultAjax = (apiType = "/wp/v2/") =>
  
  axios.create({
    baseURL: `${url}/wp-json${apiType}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 20000,
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
  route_base = '',
  apiType = "/wp/v2/",
  method = "get",
  config = {},
  data = {},
}) {
  let showProgress = config.hasOwnProperty("onDownloadProgress") && config.onDownloadProgress;
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

    const response = await defaultAjax(apiType)[method](
      `/${route_base}/${id !== null ? id : ''}`,
      method === "get" ? config : data,
      method === "get" ? undefined : config
    );
    return response;

  } catch (error) {

    console.log("Error in method 'mainFetch'", error);
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