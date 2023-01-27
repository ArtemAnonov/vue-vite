import { VUE_WP_INSTANCE } from '@/api/helpers.js'
const instance = VUE_WP_INSTANCE().state.productsTermsMaterials;
export const productsTermsMaterialsModule = {
    namespaced: true,
    state: () => ({
        basedRequest: {
            apiType:  instance.apiType,
            type:  instance.type,
            route_base:  instance.route_base,
            params: Object.assign({}, instance.params),
          },
        requests: instance.requests,
        settings: instance.settings,
        items: instance.items
    }),
}