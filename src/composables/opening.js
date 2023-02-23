import { useStore } from "vuex";
import { computed, watch, watchEffect, isRef, ref } from "vue";
import { capitalize } from "lodash-es";

export function useOpening(item) {
  const store = useStore();

  store.commit("common/addOpening", item);
  let element = store.state.common.openings[item.type][item.name];
  // watch(element, (element) => {
  //   console.log(element);
  // });
  return {
    element,
  };
}
