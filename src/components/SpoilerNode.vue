<template>
  <div
    v-if="element?.default"
    class="spoiler"
    :class="{
      spoiler_active: element.active,
      spoiler_default: element.default,
    }"
  >
    <div
      class="spoiler__button icon-arrow"
      @click.stop="element.default ? openSpoiler() : ''"
    >
      <slot name="button"/>
    </div>
    <div class="spoiler__list"><slot name="list"/></div>
  </div>
  <template v-else>
    <slot name="button"/>
    <slot name="list"/>
  </template>
</template>

<script>
/**
 * element.active - значение, которое определяет можно ли взаимодействовать со спойлером, напрмер
 * его активность отключается при определенной длине окна
 * element.default - определяет, открыт ли спойлеры
 */
import { useStore } from "vuex";

import { watch, ref } from "vue";
import { useOpening } from "@/composables/opening.js";

export default {
  props: {
    item: {
      type: Object,
      reqired: true,
    },
  },
  setup(props) {
    if (props.item.default === false) return {};
    const store = useStore();
    const item = ref({ ...{ type: "spoiler" }, ...props.item });
    // гарантирует отзывчивость (например из-за изменения размера окна)
    watch(props, (newProps) => {
      store.commit("common/setSpoiler", {
        name: newProps.item.name,
        // (~)
        value: newProps.item.default === undefined ? true : newProps.item.default,
        // value: newProps.item.default,
        prop: "default",
      });
      store.commit("common/setSpoiler", {
        name: newProps.item.name,
        // (~)
        value: newProps.item.active,
      });
    });

    const { element } = useOpening(item);
    const openSpoiler = () => {
      store.commit("common/setSpoiler", {
        name: element.value.name,
        prop: "active",
      });
    };
    return { element, openSpoiler };
  },
};
</script>

<style lang="scss">
.spoiler {
  &__list {
    height: 0;
    opacity: 0;
    transform: translate(10%, 0);
  }
  &_active {
    & > .spoiler__button {
      &::before {
        transform: translate(0, -50%) rotate(-90deg);
      }
    }
    .spoiler__list {
      height: auto;
      opacity: 100;
      transform: translate(0, 0);
    }
  }
  &__button {
    position: relative;
    &::before {
      transition: 0.2s;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%) rotate(90deg);
      font-size: 10px;
    }
  }
}
</style>
