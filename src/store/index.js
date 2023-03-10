import { createStore } from "vuex";
import __INST__ from "@/json/vuewp.json";

import common from "@/store/modules/Callback/common.module";
import menus from "@/store/modules/Callback/menus.module";
import filter from "@/store/modules/Callback/filter.module";
import site from "@/store/modules/Callback/site.module";

import pages from "@/store/modules/WP/pages.module";
import banners from "@/store/modules/WP/banners.module";
import media from "@/store/modules/WP/media.module";

import customers from "@/store/modules//VWSSG/customers.module";
import orders from "@/store/modules/VWSSG/orders.module";

import productsCategories from "@/store/modules/WC/productsCategories.module";
import products from "@/store/modules/WC/products.module";
import productsAttributes from "@/store/modules/WC/productsAttributes.module";
import productsTermsBrands from "@/store/modules/WC/productsTermsBrands.module";
import productsTermsMaterials from "@/store/modules/WC/productsTermsMaterials.module";
import productsTermsColors from "@/store/modules/WC/productsTermsColors.module";
import productsTermsSizes from "@/store/modules/WC/productsTermsSizes.module";
import paymentGateways from "@/store/modules/WC/paymentGateways.module";
import wishlist from "@/store/modules/WC/wishlist.module";

import cart from "@/store/modules/WCGB/cart.module";
import checkout from "@/store/modules/WCGB/checkout.module";

import auth from "@/store/modules/Base/auth.module";

import getters from "@/store/getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import state from "@/store/state";

// console.log(__INST__);

export default createStore({
  modules: {
    common,
    menus,
    site,

    pages,
    banners,
    media,

    customers,
    orders,
    productsCategories,
    productsAttributes,
    products,
    productsTermsBrands,
    productsTermsMaterials,
    productsTermsColors,
    productsTermsSizes,
    paymentGateways,
    wishlist,

    filter,
    auth,
    cart,
    checkout,
  },
  state,
  /**
     * геттеры, к которым обращаются через методы, будут запускаться каждый раз,
     * когда вы их вызываете, и результат не кэшируется
     */
  getters,
  mutations,
  actions,
});
