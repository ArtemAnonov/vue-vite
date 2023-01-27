<template>
  <div class="preload-container">
    <div v-if="iterableHandled" :class="`${$attrs.class}s`">
      <template v-for="(item, index) in arrayPreloadElements" :key="index">
        <PreloadWrapNode :targetPreloadElement="true" paddingBottom="35">
        </PreloadWrapNode>
      </template>
    </div>
    <div else :class="`${$attrs.class}s`">
      <template v-for="(cartItem, index) in iterable" :key="index" :class="`${$attrs.class}_wrapper`">
        <slot :cartItem="cartItem"></slot>
      </template>
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash-es'

/**
 * Класс дочерних узлов называется во множественном числе, а слоты в единственном, например:
 * 'parentelement__item'
 */
export default {
  inheritAttrs: false,
  props: {
    quantityPreloadElements: Number,
    iterable: {
      type: [Array, Object]
    }
  },
  computed: {
    /**
     * Метод возвращает массив от 0 до n
     */
    arrayPreloadElements() {
      return [...Array(this.quantityPreloadElements).keys()]
    },
    iterableHandled() { return isEmpty(this.iterable) }
  },
}
</script>

<style>

</style>