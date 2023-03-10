import __INST__ from "@/json/vuewp.json";

const instance = __INST__.state.site.returned;
export default {
  namespaced: true,
  state: () => ({ settings: {}, items: instance }),
};
