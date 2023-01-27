<template>
  <div>
    <div
      v-if="element.default"
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
        <slot name="button"></slot>
      </div>
      <div class="spoiler__list"><slot name="list"></slot></div>
    </div>
    <div v-else>
      <slot name="button"></slot>
      <slot name="list"></slot>
    </div>
  </div>
</template>

<script>
/**
 * element.active - значение, которое определяет можно ли взаимодействовать со спойлером, напрмер
 * его активность отключается при определенной длине окна
 * element.default - определяет, открыт ли спойлеры
 */
import { useStore } from "vuex";

import { watch } from "vue";
import { useOpening } from "@/composables/opening.js";
export default {
  props: {
    item: {
      type: Object,
    },
  },
  setup(props) {
    const store = useStore();
    // const spoiler = store.state.common.openings.spoiler[props.item.name]
    //   console.log(spoiler);

    const item = { ...{ type: "spoiler" }, ...props.item };
    //     watch(spoiler, (spoiler) => {
    //   console.log(spoiler);

    // });
    watch(props, (props) => {
      store.commit("common/setSpoiler", {
        name: props.item.name,
        value: props.item.default,
        prop: "default",
      });
    });

    const openSpoiler = function () {
      store.commit("common/setSpoiler", {
        name: element.name,
        prop: "active",
      });
    };

    const { element } = useOpening(item);
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
        transform: translate(0, -50%) rotate(0);
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
      transition: 0.3s;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%) rotate(-90deg);
      font-size: 0.6rem;
    }
  }
}
</style>
