import { useStore } from "vuex";
import { isRef, ref } from "vue";

export function useOpening(item) {
  const store = useStore();
  const element = ref();
  if (isRef(item)) {
    store.commit("common/addOpening", item.value);
    element.value = store.state.common.openings[item.value.type][item.value.name];
  } else {
    store.commit("common/addOpening", item);
    element.value = store.state.common.openings[item.type][item.name];
  }

  return {
    element,
  };
}
