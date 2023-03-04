<template>
  <div
    v-if="element.default"
    class="basic"
    :class="{
      basic_active: element.active,
      basic_default: element.default,
    }"
  ><slot/></div>
</template>

<script>
import { useStore } from "vuex";

import { watch } from "vue";
import { useOpening } from "@/composables/opening.js";

export default {
  props: {
    item: {
      type: Object,
      reqired: true,

    },
  },
  setup(props) {
    const store = useStore();
    const item = { ...{ type: "basic" }, ...props.item };
    watch(props, (newProps) => {
      store.commit("common/setBasic", {
        name: newProps.item.name,
        value: newProps.item.default,
        prop: "default",
      });
    });

    const { element } = useOpening(item);
    const openBasic = () => {
      store.commit("common/setBasic", {
        name: element.name,
        prop: "active",
      });
    };
    return { element, openBasic };
  },
};
</script>

<style lang="scss">
.basic {

}
</style>
