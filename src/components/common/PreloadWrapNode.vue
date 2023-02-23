<template>
  <div :style="paddingBottom ? { paddingBottom: `${paddingBottom}%` } : {}"
    :class="{ visible: showLoading }"
    class="preload-wrap"
    @click="routeTo">
    <slot />
  </div>
</template>

<script>
import { isEmpty } from "lodash-es";
import { ref, watch } from "vue";

export default {
  name: "PreloadWrapNode",
  props: {
    // Принимает объект (предположительно) именованного маршрута
    route: Object,
    // Когда айтемы с данными загружаются, этот элемент убирается из DOM
    targetPreloadElement: {
      default: false,
    },
    paddingBottom: Number,
  },
  setup(props) {
    const showLoading = ref(false);
    watch(
      () => props.targetPreloadElement,
      (newValue) => {
      // console.log(newValue, typeof newValue, isEmpty(newValue));
      // console.log(props.targetPreloadElement.value);
        switch (typeof newValue) {
          case "string":
          case "object":
          case "array":
            showLoading.value = isEmpty(newValue);
            break;
          default:
            showLoading.value = Boolean(newValue);
        }
      },
      { immediate: true },
    );
    return {
      showLoading,
    };
  },
  methods: {
    routeTo() {
      if (this.route) {
        this.$router.push(this.route);
      }
    },
  },
};
</script>

<style lang="scss">
.preload-wrap {
  // cursor: pointer;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  &.visible {
    &::after, &::before {
      display: block;
    }
  }
  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #e7e7e7;
    z-index: 6;
    display: none;
  }

  &::before {
    content: "";
    background: no-repeat url("@/assets/images/gifs/spinner.gif");
    position: absolute;
    height: 2.333333333333333rem;
    width: 2.333333333333333rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 7;
    display: none;
  }
}
</style>
