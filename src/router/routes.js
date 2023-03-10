import { isEmpty, last } from "lodash-es";

import HomePage from "@/pages/common/HomePage.vue";
import CategoryMainPage from "@/pages/common/category/CategoryMainPage.vue";
import CategorySubPage from "@/pages/common/category/CategorySubPage.vue";
import SingleProductPage from "@/pages/common/SingleProductPage.vue";
import SingleCategoryPage from "@/pages/common/SingleCategoryPage.vue";

import OrderingPage from "@/pages/private/OrderingPage.vue";
import OrderingCartPage from "@/pages/private/ordering/OrderingCartPage.vue";
import OrderingPaymentPage from "@/pages/private/ordering/OrderingPaymentPage.vue";
import OrderingCheckoutPage from "@/pages/private/ordering/OrderingCheckoutPage.vue";

import PersonalPage from "@/pages/private/PersonalPage.vue";
import PersonalWishlistPage from "@/pages/private/personal/PersonalWishlistPage.vue";
import PersonalOrdersPage from "@/pages/private/personal/PersonalOrdersPage.vue";
import PersonalProfilePage from "@/pages/private/personal/PersonalProfilePage.vue";

import NotFoundPage from "@/pages/private/NotFoundPage.vue";

// VIEWS
import TheFilterNode from "@/components/TheFilterNode.vue";
import PageContentNode from "@/components/PageContentNode.vue";

import store from "@/store";

function checkAuth(to) {
  const userAuth = store.state?.auth.userAuth;
  if (!userAuth) {
    return false;
  }
  return true;
}

/**
 * params нельзя использовать вместе с path
 */
export const truncatedComponents = [
  {
    path: "/ordering/",
    component: OrderingPage,
    children: [
      {
        path: "cart/",
        component: OrderingCartPage,
        name: "OrderingCart",
      },
      {
        path: "checkout/",
        component: OrderingCheckoutPage,
        name: "OrderingCheckout",
        beforeEnter: [checkAuth],
      },
      {
        path: "payment/",
        component: OrderingPaymentPage,
        name: "OrderingPayment",
        beforeEnter: [checkAuth, () => (!isEmpty(store.state?.checkout.draftOrder))],
      },
    ],
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
    path: "/product-category/",
    component: SingleCategoryPage,
    children: [
      {
        path: ":mainPath/",
        component: CategoryMainPage,
        name: "CategoryMain",
        props: (route) => ({ params: route.params }),
      },
      {
        // path: ":parentCategory/:mainPath+/",
        path: ":mainPath+/",
        components: {
          default: CategorySubPage,
          // update filter
          top: TheFilterNode,
          bot: PageContentNode,
        },
        name: "CategorySub",
        props: {
          default: (route) => ({ params: route.params, query: route.query }),
          top: true,
          bot: (route) => ({ page: last(route.params.mainPath) }),
        },
      },
    ],
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

  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
    name: "NotFound",
  },
];
export const routes = truncatedComponents
  .concat(commonComponents)
  .filter((route) => route);
