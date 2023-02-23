import { VUE_WP_INSTANCE } from "@/api/helpers.js";

const items = VUE_WP_INSTANCE().state.site.returned;
export default {
  namespaced: true,
  state: () => (items),
  getters: {
    loading: (state) => () => state.site.loading,
  },
};
