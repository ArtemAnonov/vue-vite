import { VUE_WP_INSTANCE } from '@/api/helpers.js'
const instance = VUE_WP_INSTANCE().state.customers;
export const customersModule = {
    namespaced: true,
    state: () => ({
        basedRequest: {
            apiType:  instance.apiType,
            type:  instance.type,
            route_base:  instance.route_base,

            slug: null,
        },
        requests: instance.requests,
        settings: instance.settings,
        items: instance.items
    }),
    
    getters: {

    },

    mutations: {

    },


}