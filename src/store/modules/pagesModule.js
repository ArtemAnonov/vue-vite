import { VUE_WP_INSTANCE } from '@/api/utils.js'
const instance = VUE_WP_INSTANCE().state.pages;

export const pagesModule = {
    namespaced: true,
    state: () => ({
        basedRequest: {
            apiType: instance.basedRequest.apiType,
            type: instance.basedRequest.type,
            route_base: instance.basedRequest.route_base,
            params: instance.params,
            single_params: instance.single_params,
        },
        requests: instance.requests,
        settings: instance.settings,
        items: instance.items
    }),

    getters: {
        menu: state => ({ name }) => {
            return state.menus[name]
        },
    },
}