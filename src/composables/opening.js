import { useStore } from "vuex";

export function useOpening(item) {
  const store = useStore();
  store.commit("common/addOpening", item);
  const element = store.state.common.openings[item.type][item.name];
  return {
    element,
  };
}
