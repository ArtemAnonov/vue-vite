import { createStore } from "vuex"


import { commonModule } from "@/store/modules/Callback/common.module.js"
import { menusModule } from "@/store/modules/Callback/menus.module.js"
import { filterModule } from "@/store/modules/Callback/filter.module.js"
import { siteModule } from "@/store/modules/Callback/site.module.js"

import { pagesModule } from "@/store/modules/WP/pages.module.js"
import { bannersModule } from "@/store/modules/WP/banners.module.js"
import { mediaModule } from "@/store/modules/WP/media.module.js"

import { customersModule } from "@/store/modules//VWSSG/customers.module.js"
import { ordersModule } from "@/store/modules/VWSSG/orders.module.js"

import { productsCategoriesModule } from "@/store/modules/WC/productsCategories.module.js"
import { productsModule } from "@/store/modules/WC/products.module.js"
import { productsAttributesModule } from "@/store/modules/WC/productsAttributes.module.js"
import { productsTermsBrandsModule } from "@/store/modules/WC/productsTermsBrands.module.js"
import { productsTermsMaterialsModule } from "@/store/modules/WC/productsTermsMaterials.module.js"
import { productsTermsColorsModule } from "@/store/modules/WC/productsTermsColors.module.js"
import { productsTermsSizesModule } from "@/store/modules/WC/productsTermsSizes.module.js"
import { paymentGatewaysModule } from "@/store/modules/WC/paymentGateways.module.js"
import { wishlistModule } from "@/store/modules/WC/wishlist.module.js"

import { cartModule } from "@/store/modules/WCGB/cart.module.js"
import { checkoutModule } from "@/store/modules/WCGB/checkout.module.js"

import { authModule } from "@/store/modules/Base/auth.module.js"

import getters from "@/store/getters"
import mutations from "@/store/mutations"
import actions from "@/store/actions"
import state from "@/store/state"


export default createStore({
    modules: {
        common: commonModule,
        menus: menusModule,
        site: siteModule,

        pages: pagesModule,
        banners: bannersModule,
        media: mediaModule,

        customers: customersModule,
        orders: ordersModule,
        productsCategories: productsCategoriesModule,
        productsAttributes: productsAttributesModule,
        products: productsModule,
        productsTermsBrands: productsTermsBrandsModule,
        productsTermsMaterials: productsTermsMaterialsModule,
        productsTermsColors: productsTermsColorsModule,
        productsTermsSizes: productsTermsSizesModule,
        paymentGateways: paymentGatewaysModule,
        wishlist: wishlistModule,

        filter: filterModule,
        auth: authModule,
        cart: cartModule,
        checkout: checkoutModule,
    },
    state: state,
    /**
     * геттеры, к которым обращаются через методы, будут запускаться каждый раз, когда вы их вызываете, и результат не кэшируется
     */
    getters: getters,
    mutations: mutations,
    actions: actions
})

