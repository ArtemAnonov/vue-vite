<template>
  <div v-show="element.active"
    class="popup">
    <div class="popup__scroll-wrapper">
      <div class="popup__wrapper"
        @click.stop>
        <div class="popup__inner">
          <slot/>
        </div>
        <CloseBtnNode v-if="showCloseBtn"
          @click.stop="setPopup(element.name)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from "vue";
import { useStore } from "vuex";
import { useOpening } from "@/composables/opening.js";
import CloseBtnNode from "@/components/common/CloseBtnNode.vue";

export default {
  name: "PopupNode",
  components: {
    CloseBtnNode,
  },
  props: {
    item: Object,
    showCloseBtn: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { dispatch, commit } = useStore();
    const item = { ...{ type: "popup" }, ...props.item };
    const { element } = useOpening(item);
    watch(element, (newElement) => {
      if (newElement.active) {
        commit("common/setScrollFlag", { value: false });
      } else {
        commit("common/setScrollFlag", { value: true });
      }
    }, { deep: true });

    return {
      element,
      setPopup: (name) => commit("common/setPopup", { name }),
    };
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
  &__scroll-wrapper {
    position: relative;
    height: 113%;
    width: 100%;
    margin: 5% 0;
    @media (max-width: ($md3+px)) {
      margin: 3% 0;
    }
  }
  &__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: #fff;
    height: 100%;
    width: 80%;
    display: flex;

    @media (max-width: ($md3+px)) {
      width: 95%;
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  &__close {
    position: absolute;
    border-radius: 50%;
    top: 18px;
    right: 15px;
    width: 18px;
    height: 18px;
    z-index: 10;
  }
}
</style>
