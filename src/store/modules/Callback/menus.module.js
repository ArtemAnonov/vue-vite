import { VUE_WP_INSTANCE } from "@/api/helpers.js";

const items = VUE_WP_INSTANCE().state.menus.returned;
export default {
  namespaced: true,
  state: () => (items),
  getters: {
    menu: (state) => ({ name }) => state.menus[name],
  },
};
