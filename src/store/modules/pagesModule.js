import { VUE_WP_INSTANCE } from '@/api/helpers.js'
const instance = VUE_WP_INSTANCE().state.pages;

export const pagesModule = {
    namespaced: true,
    state: () => ({
        basedRequest: {
            apiType: instance.apiType,
            type: instance.type,
            route_base: instance.route_base,
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