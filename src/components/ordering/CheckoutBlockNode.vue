<template>
  <div class="checkout__block checkout-block"
    @click.stop="clickActionHandled()">
    <div class="checkout-block__body">
      <div class="checkout-block__top">
        <div class="checkout-block__icon"
          :class="'icon-' + icon"/>
        <div class="checkout-block__content">
          <div class="checkout-block__key">{{ title }}</div>
          <div class="checkout-block__value">{{ value }}</div>
        </div>
        <div class="checkout-block__edit-icon icon-arrow"/>
      </div>
      <div class="checkout-block__main">
        <slot name="main"/>
      </div>
      <PopupNode v-if="popupName"
        :showCloseBtn="true"
        :item="{ name: popupName }">
        <slot name="popup"/>
      </PopupNode>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  props: {
    title: String,
    value: String,
    icon: String,
    clickAction: {
      type: Function,
      // default: (value) => {
      // store.commit.setPopup(value);
      // },
    },
    popupName: String,
  },
  setup(props) {
    const { commit } = useStore();
    const clickActionHandled = () => {
      if (props.popupName && !props.clickAction) {
        commit("common/setPopup", { name: props.popupName });
      } else {
        props.clickAction();
      }
    };
    return {
      clickActionHandled,
    };
  },
};
</script>

<style lang="scss">
.checkout-block {
  // .checkout-block__button
  &__body {
    padding: 1rem 0.75rem;
    border: 0.0625rem solid rgba(0, 0, 0, 0.08);
    margin-bottom: 1rem;
    cursor: pointer;
    transition: border 0.2s;
    &:hover {
      border-color: #187552;
    }
  }
  &__top {
    display: grid;
    grid-template-columns: auto 1fr auto;
    column-gap: 1rem;
    margin-bottom: 1rem;
  }
  // .checkout-block__icon
  &__icon {
    font-size: 1.5rem;
  }
  // .checkout-block__content
  &__content {
  }
  // .checkout-block__key
  &__key {
    color: #187552;
    margin-bottom: .25rem;
    font-size: 1.125rem;
    line-height: 1.375rem;
    font-weight: 400;
  }
  // .checkout-block__value
  &__value {
  }
  // .checkout-block__edit-icon
  &__edit-icon {
    &::before {
      transform: rotate(90deg);

    }
  }
  // .checkout-block__products
  &__products {
  }
}
</style>
