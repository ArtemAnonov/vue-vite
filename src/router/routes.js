import HomePage from "@/pages/common/HomePage.vue";
import SingleSubCategoryPage from "@/pages/common/SingleSubCategoryPage.vue";
import SingleCategoryPage from "@/pages/common/SingleCategoryPage.vue";
import SingleProductPage from "@/pages/common/SingleProductPage.vue";
import BlogPage from "@/pages/common/BlogPage.vue";

import CartPage from "@/pages/private/CartPage.vue";
import PaymentPage from "@/pages/private/PaymentPage.vue";
import CheckoutPage from "@/pages/private/CheckoutPage.vue";

import PersonalPage from "@/pages/private/PersonalPage.vue";
import PersonalWishlistPage from "@/pages/private/personal/PersonalWishlistPage.vue";
import PersonalOrdersPage from "@/pages/private/personal/PersonalOrdersPage.vue";
import PersonalProfilePage from "@/pages/private/personal/PersonalProfilePage.vue";

import NotFoundPage from "@/pages/private/NotFoundPage.vue";

import store from "@/store";

function checkAuth(to) {
  const userAuth = store.state?.auth.userAuth;

  if (!userAuth) {
    return false;
  }
  return true;
}

export const prefixes = {
  product: null,
  //   (handled) => {
  //   handled.last = handled.items[handled.items.length - 1];
  //   handled.items.pop();
  //   return handled;
  // },
  "product-category": null,
};

/**
 * params нельзя использовать вместе с path
 */
export const truncatedComponents = [
  {
    path: "/cart/",
    component: CartPage,
    name: "Cart",
  },
  {
    path: "/checkout/",
    component: CheckoutPage,
    name: "Checkout",
  },
  {
    path: "/payment/",
    component: PaymentPage,
    name: "Payment",
  },
];

export const commonComponents = [
  {
    path: "/",
    component: HomePage,
    name: "Home",
    props: () => ({ slug: "home" }),
  },
  {
    path: "/product-category/:mainCategorySlug/",
    component: SingleCategoryPage,
    name: "SingleCategory",
    props: (route) => ({ params: route.params }),
  },
  {
    path: "/product-category/:mainCategorySlug/:categorySlug/",
    component: SingleSubCategoryPage,
    name: "SingleSubCategory",
    props: (route) => ({ params: route.params, query: route.query }),
  },
  {
    path: "/product/:mainPath+/", // exp: /product/cat1/cat2/productSlug
    component: SingleProductPage,
    name: "SingleProduct",
    props: (route) => ({ params: route.params }),
  },
  {
    path: "/personal/",
    component: PersonalPage,
    children: [
      {
        path: "wishlist/",
        component: PersonalWishlistPage,
        name: "PersonalWishlist",
      },
      {
        path: "orders/",
        component: PersonalOrdersPage,
        name: "PersonalOrders",
        beforeEnter: [checkAuth],
      },
      {
        path: "profile/",
        component: PersonalProfilePage,
        name: "PersonalProfile",
        beforeEnter: [checkAuth],
      },
    ],
  },

  //
  {
    path: "/blog-page/",
    component: BlogPage,
    name: "BlogPage",
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
    name: "NotFound",
  },
];
export const routes = truncatedComponents
  .concat(commonComponents)
  .filter((route) => route);
