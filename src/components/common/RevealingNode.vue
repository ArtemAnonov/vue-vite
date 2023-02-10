<template>
  <div v-show="element.active" class="revealing">
    <div class="revealing__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useOpening } from "@/composables/opening.js";

export default {
  name: "RevealingNode",
  props: {
    item: Object,
  },
  setup(props) {
    const item = { ...{ type: "revealing" }, ...props.item };

    const { element} = useOpening(item);
    return { element};
  },
};
</script>

<style lang="scss">
.revealing {
  position: relative;
  // .revealing__body
  &__body {
    // z-index: 4;
    // position: absolute;
    // top: 0;
    // right: 0;
    // padding: 0.5rem;
    // transform: translate(-50%, 0);
  }
}
</style>
