import { VUE_WP_INSTANCE } from "@/api/helpers";

const instance = VUE_WP_INSTANCE().state.menus.returned;
export default {
  namespaced: true,
  state: () => ({ settings: {}, items: instance }),
  getters: {
    menu: (state) => ({ name }) => state.menus.items[name],
  },
};
