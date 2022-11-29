import { VUE_WP_INSTANCE } from '@/api/utils.js'
const items = VUE_WP_INSTANCE().state.menus.returned;
export const menusModule = {
    namespaced: true,
    state: () => (items),
    getters: {
        menu: state => ({ name }) => {
            return state.menus[name]
        },
    },
}