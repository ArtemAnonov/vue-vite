import axios from "axios";
import { has } from "lodash-es";
import { actionJWTResolver } from "@/api/helpers";
import { siteURL } from "@/api/uni";

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
// eslint-disable-next-line arrow-body-style
) => {
  return axios.create({
    baseURL,
    headers,
    timeout: 200000,
  });
};

// axios.create().get("http://anyaaa6t.beget.tech/wp-json/wp/v2/media");

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
  return null;
}
