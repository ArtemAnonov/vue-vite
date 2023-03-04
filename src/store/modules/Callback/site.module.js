import { VUE_WP_INSTANCE } from "@/api/helpers";

const instance = VUE_WP_INSTANCE().state.site.returned;
export default {
  namespaced: true,
  state: () => ({ settings: {}, items: instance }),

  getters: {
    // loading: (state) => () => state.site.loading,
  },
};
