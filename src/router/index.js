import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";
import { routes } from "@/router/routes";
import store from "@/store";

const router = createRouter({
  routes,
  history: import.meta.env.SSR
    ? createMemoryHistory()
    : createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 500);
    });
  },
});

router.beforeEach((to, from) => {
  /**
   * Изначально userAuth установлен в false. Так как загрузка компонентов и Store происходит
   * после роутинга, guard'ов, то здесь переустановливается userAuth - если установлена куку jwt-token,
   * то пользователь зарегистрирован и перемаршрутизация работает корректно (была проблема, что зареганый
   * юзер не мог сразу открыть Orders маршрут, так как смена userAuth происходила из created хука компонента App)
   */
  store.dispatch("auth/updateUserAuth");
  // const userAuth = store.state?.auth.userAuth;
});

export default router;
