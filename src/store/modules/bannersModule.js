import { VUE_WP_INSTANCE } from '@/api/utils.js'
const instance = VUE_WP_INSTANCE().state.banners;
export const bannersModule = {
    namespaced: true,
    state: () => ({
        basedRequest: {
            apiType: instance.basedRequest.apiType,
            type: instance.basedRequest.type,
            route_base: instance.basedRequest.route_base,
            params: Object.assign({

            }, instance.params),
            slug: null,
        },
        requests: instance.requests,
        settings: instance.settings,
        items: instance.items
    }),
    
    getters: {

    },

    mutations: {
        setBannerCategoriesIds(state, value) {
            state.basedRequest.params.banner_categories = value;
        },
    },

}