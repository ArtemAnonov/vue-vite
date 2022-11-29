import { VUE_WP_INSTANCE } from '@/api/utils.js'
const instance = VUE_WP_INSTANCE().state.productsTermsMaterials;
export const productsTermsMaterialsModule = {
    namespaced: true,
    state: () => ({
        basedRequest: {
            apiType: instance.basedRequest.apiType,
            type: instance.basedRequest.type,
            route_base: instance.basedRequest.route_base,
            params: Object.assign({}, instance.params),
          },
        requests: instance.requests,
        settings: instance.settings,
        items: instance.items
    }),
}