import { VUE_WP_INSTANCE } from "@/api/utils";
import paths from "@/router/paths";
import { categorySlugFromParams, pageFromPath } from "./utils";
import Home from "@/pages/Home.vue";
import SingleSubCategory from "@/pages/SingleSubCategory.vue";
import SingleCategory from "@/pages/SingleCategory.vue";
import SingleProduct from "@/pages/SingleProduct.vue";
import Cart from "@/pages/Cart.vue";
import Checkout from "@/pages/Checkout.vue";
import Favorite from "@/pages/Favorite.vue";
import Personal from "@/pages/Personal.vue";
import BlogPage from "@/pages/BlogPage.vue";

/**
 * params нельзя использовать вместе с path
 */
const { show_on_front, page_for_posts, page_on_front } =
  VUE_WP_INSTANCE().routing.returned;

/**
 * Первый маршрут работает, если установлена кастомная домашняя страница
 */
const rootRoute =
  show_on_front === "page" && page_on_front
    ? {
        path: "/",
        component: Home,
        name: "Home",
        props: () => ({ slug: page_on_front }),
      }
    : {
        path: paths.postsPage(),
        component: Home,
        name: "Home",
        props: (route) => ({ page: pageFromPath(route.path) }),
      };

/**
 * Первый маршрут работает, если установлена страница для постов
 */
// const postsPageRoute =
//   show_on_front === "page" && page_for_posts
//     ? {
//         path: paths.postsPage(page_for_posts),
//         component: Posts,
//         name: "Posts",
//         props: (route) => ({ page: pageFromPath(route.path) }),
//       }
//     : null;

/**
 *
 */
export const truncatedComponents = [
  {
    path: "/cart",
    component: Cart,
    name: "Cart",
  },
  {
    path: "/checkout",
    component: Checkout,
    name: "Checkout",
  },
];

export const commonComponents = [
  rootRoute,
  // () => {
  //     return show_on_front === 'page' && page_on_front ? {
  //         path: '/',
  //         component: Home,
  //         name: 'Home',
  //         props: () => ({ slug: page_on_front }),
  //     } : {
  //         path: paths.postsPage(),
  //         component: Home,
  //         name: 'Home',
  //         props: route => ({ page: pageFromPath(route.path) }),
  //     }
  // },
  // postsPageRoute,
  {
    path: "/product-category/:mainCategorySlug",
    component: SingleCategory,
    name: "SingleCategory",
    props: (route) => ({ params: route.params }),
  },
  {
    path: "/product-category/:mainCategorySlug/:categorySlug",
    component: SingleSubCategory,
    name: "SingleSubCategory",
    props: (route) => ({ params: route.params, query: route.query }),
  },
  {
    path: "/product/:productSlug",
    component: SingleProduct,
    name: "SingleProduct",
    props: (route) => ({ params: route.params, query: route.query }),
  },

  {
    path: "/favorite",
    component: Favorite,
    name: "Favorite",
    // props: route => ({ params: route.params, query: route.query }),
  },
  {
    path: "/personal",
    component: Personal,
    name: "Personal",
    // props: route => ({ params: route.params, query: route.query }),
  },
  {
    path: "/blog-page",
    component: BlogPage,
    name: "BlogPage",
    // props: route => ({ params: route.params, query: route.query }),
  },
  // {
  //     path: '/:pathMatch(.*)*',
  //     name: 'NotFound',
  //     component: NotFound,
  // },
];
export const routes = truncatedComponents
  .concat(commonComponents)
  .filter((route) => route);
