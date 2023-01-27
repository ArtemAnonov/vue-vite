<template>
  <div class="checkout__block checkout-block" @click.stop="setPopup({name: popupName})">
    <div class="checkout-block__body">
      <div class="checkout-block__icon" :class="'icon-' + icon"></div>
      <div class="checkout-block__content">
        <div class="checkout-block__key">{{ key }}</div>
        <div class="checkout-block__value">{{ value }}</div>
      </div>
      <div class="checkout-block__edit-icon icon-edit"></div>
      <div class="checkout-block__main">
        <slot name="main"></slot>
      </div>
      <PopupNode v-if="popupName" :item="{ name: popupName }">
        <slot name="popup"></slot>
      </PopupNode>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: {
    key: String,
    value: String,
    icon: String,
    popupName: String,
  },
  computed: {
    ...mapState({}),
  },
  methods: {
    ...mapMutations({
      setPopup: 'common/setPopup',
    }),
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
  // .checkout-block__icon
  &__icon {
  }
  // .checkout-block__content
  &__content {
  }
  // .checkout-block__key
  &__key {
  }
  // .checkout-block__value
  &__value {
  }
  // .checkout-block__edit-icon
  &__edit-icon {
  }
  // .checkout-block__products
  &__products {
  }
}
</style>