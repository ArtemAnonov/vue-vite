import { VUE_WP_INSTANCE } from '@/api/utils.js'
const instance = VUE_WP_INSTANCE().state.productsAttributes;
export const productsAttributesModule = {
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
        items: instance.items,

    }),
    getters: {
        attributesSlugs(state) {
            const slugs = []
            for (let key in state.items) {
                if (Object.hasOwnProperty.call(state.items, key)) {
                    const element = state.items[key];
                    slugs.push(element.slug)
                }
            }
            return slugs
        }
    }
}