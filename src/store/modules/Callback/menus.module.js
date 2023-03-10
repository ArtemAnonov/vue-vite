import __INST__ from "@/json/vuewp.json";

const instance = __INST__.state.menus.returned;
export default {
  namespaced: true,
  state: () => ({ settings: {}, items: instance }),
  getters: {
    menu: (state) => ({ name }) => state.menus.items[name],
  },
};
