import { VUE_WP_INSTANCE } from '@/api/helpers.js'
const items = VUE_WP_INSTANCE().state.site.returned;
export const siteModule ={
    namespaced: true,
    state: () => (items),
    getters: {
        loading: (state) => () => {
            return state.site.loading;
        },
    },
}