import { VUE_WP_INSTANCE } from '@/api/helpers.js'
const instance = VUE_WP_INSTANCE().state.productsTermsSizes;
export const productsTermsSizesModule = {
    namespaced: true,
    state: () => ({
        basedRequest: {
            apiType:  instance.apiType,
            type:  instance.type,
            route_base:  instance.route_base,
            params: Object.assign({}, instance.params),
          },
        requests: instance.requests,
         
        items: instance.items
    }),
}