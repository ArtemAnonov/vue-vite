// import { VUE_WP_INSTANCE } from "@/api/helpers.js";
import Home from "@/pages/common/Home.vue";
import SingleSubCategory from "@/pages/common/SingleSubCategory.vue";
import SingleCategory from "@/pages/common/SingleCategory.vue";
import SingleProduct from "@/pages/common/SingleProduct.vue";
import BlogPage from "@/pages/common/BlogPage.vue";

import Cart from "@/pages/private/Cart.vue";
import Payment from "@/pages/private/Payment.vue";
import Checkout from "@/pages/private/Checkout.vue";

import Wishlist from "@/pages/private/Wishlist.vue";
import Orders from "@/pages/private/Orders.vue";
import Profile from "@/pages/private/Profile.vue";
import NotFound from "@/pages/private/NotFound.vue";
// console.log(VUE_WP_INSTANCE());
/**
 * params нельзя использовать вместе с path
 */
// const { page_on_front } =
//   VUE_WP_INSTANCE().routing.returned;

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
  {
    path: "/payment",
    component: Payment,
    name: "Payment",
  },
];

export const commonComponents = [
  {
    path: "/",
    component: Home,
    name: "Home",
    props: () => ({ slug: 'home' }),
  },
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
  //
  {
    path: "/wishlist",
    component: Wishlist,
    name: "Wishlist",
  },
  {
    path: "/orders",
    component: Orders,
    name: "Orders",
  },
  {
    path: "/profile",
    component: Profile,
    name: "Profile",
  },
  //
  {
    path: "/blog-page",
    component: BlogPage,
    name: "BlogPage",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];
export const routes = truncatedComponents
  .concat(commonComponents)
  .filter((route) => route);
