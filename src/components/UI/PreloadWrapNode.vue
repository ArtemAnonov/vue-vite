<template>
  <div @click="routeTo" class="preload-wrap" :class="targetPreloadElementHandled ? 'empty' : ''"
    :style="paddingBottom ? { paddingBottom: `${paddingBottom}%` } : {}">
    <slot></slot>
  </div>
</template>

<script>
import { isEmpty } from 'lodash-es'

export default {
  name: "preload-wrap-node",
  props: {
    /**
     * Принимает объект (предположительно) именованного маршрута
     */
    route: Object,
    /**
     * Значение true означает, что данный элемент используется как заполнитель.
     * Когда айтемы с данными загружаются, этот элемент убирается из DOM
     * 
     * Поддерживается ввод не Boolean значний
     */
    targetPreloadElement: {
      default: false,
    },

    paddingBottom: [String, Number]

  },
  computed: {
    targetPreloadElementHandled() {
      switch (typeof this.targetPreloadElement) {
        case 'object':
        case 'array':
          return isEmpty(this.targetPreloadElement)
        default:
          return Boolean(this.targetPreloadElement)
      }
    }
  },
  methods: {
    routeTo() {
      if (this.route) {
        this.$router.push(this.route);
      }
    },
  },
  updated() {

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

  &.empty {
    &::after {
      display: block;
    }

    &::before {
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
    background: no-repeat url('@/assets/images/gifs/spinner.gif');
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
