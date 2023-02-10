<template>
  <div v-show="element.active" class="popup">
    <div class="popup__scroll-wrapper">
      <div @click.stop class="popup__wrapper">
        <div class="popup__inner">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watchEffect } from "vue";
import { useStore } from "vuex";
import { useOpening } from "@/composables/opening.js";

export default {
  name: "PopupNode",
  props: {
    item: Object,
  },
  setup(props) {
    const store = useStore();
    const item = { ...{ type: "popup" }, ...props.item };
    const { element } = useOpening(item);
    watchEffect(() => {
      if (element.active) {
        store.commit("common/setScrollFlag", { value: false });
      }
    });

    return { element };
  },
};
</script>

<style lang="scss">
.popup {
  transition: 0.5s;
  z-index: 100;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.747);
  overflow: auto;
  height: 101%;
  width: 100%;
  position: fixed;

  &__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: #fff;
    // display: table;
    height: 80%;
    width: 80%;
  }
  &__scroll-wrapper {
    height: 101%;
  }
  &__inner {
  }

  &__close {
    position: absolute;
    border-radius: 50%;
    top: 18px;
    right: 15px;
    width: 18px;
    height: 18px;
    z-index: 1;
  }
}
</style>
