// 
import { routes } from "@/router/routes";
import { VUE_WP_INSTANCE } from "@/api/utils";
import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";
const { url, state } = VUE_WP_INSTANCE().routing.returned;

// if ("scrollRestoration" in window.history)
//   window.history.scrollRestoration = "manual";

const router = createRouter({
  routes,
  history: import.meta.env.SSR
  ? createMemoryHistory() // /test/
  : createWebHistory(),
});

let userAuth = state?.auth.userAuth
router.beforeEach((to, from) => {
  // window.scrollTo({ top: 0, behavior: 'smooth' });
  
  if (userAuth === false && to.name === 'Checkout') {
    return { name: 'Cart' }
  }
})

export default router;
