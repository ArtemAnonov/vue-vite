//
import { routes } from "@/router/routes";
import { VUE_WP_INSTANCE } from "@/api/helpers.js";
import store from "@/store";
import Cookies from "js-cookie";

import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from "vue-router";

const router = createRouter({
  routes,
  history: import.meta.env.SSR
    ? createMemoryHistory() // /test/
    : createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 500);
    });
  },
});

// let userAuth = store?.state?.auth.userAuth;
router.beforeEach((to, from) => {
  /**
   * Изначально userAuth установлен в false. Так как загрузка компонентов и Store происходит
   * после роутинга, guard'ов, то здесь переустановливается userAuth - если установлена куку jwt-token,
   * то пользователь зарегистрирован и перемаршрутизация работает корректно (была проблема, что зареганый
   * юзер не мог сразу открыть Orders маршрут, так как смена userAuth происходила из created хука компонента App)
   */
  store.dispatch("auth/updateUserAuth");
  let userAuth = store.state?.auth.userAuth;
  // let userAuth = Boolean(Cookies.get('jwt-token'))
  /**
   * (!) - userAuth можно изменить из фронта и попасть на маршрут (правильно ли это?)
   *
   */
  if (userAuth === false && to.name === "Checkout") {
    return { name: "Cart" };
  }
  if (userAuth === false && to.name === "Orders") {
    console.log(userAuth);
    return { name: "Home" };
  }
});

export default router;
