// import { VUE_WP_INSTANCE } from "@/api/helpers.js";
import Home from "@/pages/common/HomePage.vue";
import SingleSubCategory from "@/pages/common/SingleSubCategoryPage.vue";
import SingleCategory from "@/pages/common/SingleCategoryPage.vue";
import SingleProduct from "@/pages/common/SingleProductPage.vue";
import BlogPage from "@/pages/common/BlogPage.vue";

import Cart from "@/pages/private/CartPage.vue";
import Payment from "@/pages/private/PaymentPage.vue";
import Checkout from "@/pages/private/CheckoutPage.vue";

import Personal from "@/pages/private/PersonalPage.vue";
import PersonalWishlist from "@/pages/private/personal/PersonalWishlistPage.vue";
import PersonalOrders from "@/pages/private/personal/PersonalOrdersPage.vue";
import PersonalProfile from "@/pages/private/personal/PersonalProfilePage.vue";

import NotFound from "@/pages/private/NotFoundPage.vue";

/**
 * params нельзя использовать вместе с path
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
    props: () => ({ slug: "home" }),
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
  {
    path: "/personal/",
    component: Personal,
    // name: "Personal",
    children: [
      {
        path: "wishlist",
        component: PersonalWishlist,
        name: "PersonalWishlist",
      },
      {
        path: "orders",
        component: PersonalOrders,
        name: "PersonalOrders",
      },
      {
        path: "profile",
        component: PersonalProfile,
        name: "PersonalProfile",
      },
    ],
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
