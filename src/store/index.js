import { createStore } from "vuex"


import { commonModule } from "@/store/modules/commonModule.js"

import { menusModule } from "@/store/modules/menusModule.js"
import { siteModule } from "@/store/modules/siteModule.js"
import { pagesModule } from "@/store/modules/pagesModule.js"
import { bannersModule } from "@/store/modules/bannersModule.js"
import { mediaModule } from "@/store/modules/mediaModule.js"

import { customersModule } from "@/store/modules/customersModule.js"
import { ordersModule } from "@/store/modules/ordersModule.js"
import { productsCategoriesModule } from "@/store/modules/productsCategoriesModule.js"
import { productsModule } from "@/store/modules/productsModule.js"
import { productsAttributesModule } from "@/store/modules/productsAttributesModule.js"
import { productsTermsBrandsModule } from "@/store/modules/productsTermsBrandsModule.js"
import { productsTermsMaterialsModule } from "@/store/modules/productsTermsMaterialsModule.js"
import { productsTermsColorsModule } from "@/store/modules/productsTermsColorsModule.js"
import { productsTermsSizesModule } from "@/store/modules/productsTermsSizesModule.js"
import { paymentGatewaysModule } from "@/store/modules/paymentGatewaysModule.js"



import { filterModule } from "@/store/modules/filterModule.js"
import { cartModule } from "@/store/modules/cartModule.js"
import { checkoutModule } from "@/store/modules/checkoutModule.js"

import { authModule } from "@/store/modules/authModule.js"

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

