<template>
  <div class="middle-content">
    <div class="middle-content__body">
      <ul class="middle-content__items">
        <slot name="items"/>
      </ul>
      <div class="middle-content__sidebar">
        <slot name="sidebar"/>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      cartStore: computed(() => store.state.cart.store),
    };
  },
};
</script>
<style lang="scss">
.middle-content {

  // .middle-content__body
  &__body {
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: start;
    column-gap: 3.75rem;

    @media (max-width: ($md2+px)) {
      grid-template-columns: 0.5fr 27.75rem 0.5fr;
    }

    @media (max-width: ($md3+px)) {
      grid-template-columns: 1fr;
    }
  }

  // .middle-content__items
  &__items {
    border-top: 0.0625rem solid rgba(0, 0, 0, 0.08);
      @media (max-width: ($md2+px)) {
        margin: 0;
        grid-column: 2/3;
      }
      @media (max-width: ($md3+px)) {
        grid-column: 1/2;
      }
  }

  // .middle-content__sidebar
  &__sidebar {
    @media (max-width: ($md2+px)) {
      grid-column: 2/3;
    }

    @media (max-width: ($md3+px)) {
      grid-column: 1/2;
    }
  }

  &__sidebar-inner {
    border: 0.0625rem solid rgba(0, 0, 0, 0.08);
    padding: 1.5rem 1.25rem 1.75rem;

    @media (max-width: ($md1+px)) {
      border: none;
      padding: 1.5rem 0;
    }

    @media (max-width: ($md4+px)) {}
  }

  // .middle-content__block
  &__block {
    position: relative;

    &::after {
      content: "";
      display: none;
      position: absolute;
      height: 0.0625rem;
      width: 100%;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.08);
    }

    &:nth-child(1),
    &:nth-child(2) {
      padding-bottom: 1.25rem;
    }

    &:nth-child(3) {}

    &:nth-child(2),
    &:nth-child(3) {
      padding-top: 1.25rem;
    }

    &_promo {
      .middle-content__item {
        @media (max-width: ($md5+px)) {
          grid-template-columns: auto;
          gap: 0.5rem 0;
        }
      }

      .input {
        margin: 0 0.5rem 0 0;

        @media (max-width: ($md5+px)) {
          margin: 0;
        }
      }

      input {
        background-color: #f1f1f1;

        width: auto;
        padding: 0 0 0 0.9rem !important;
        height: 3rem;
        border-color: #b9b9b9;

        // (!) сложна - уравовешивание border-ов. сложности с псевдоэлементами
        &:focus {
          border-top: 0.09rem solid transparent !important;
          border-bottom: 0.06rem solid #1e242c !important;
        }
      }

      button {
        min-height: 49.22px;
      }
    }
  }

  // .middle-content__item
  &__item {
    display: grid;
    grid-template-columns: 1fr auto;
    row-gap: 0.5rem;
  }

  // .middle-content__key
  &__key {

    // .middle-content__key_medium
    &_medium {
      color: #231f20;
      font-size: 1.125rem;
      line-height: 1.375rem;
      padding: 0 0 0.75rem;

      &::before {
        color: #187552 !important;
      }
    }

    // .middle-content__key_big
    &_big {
      font-size: 1.25rem;
      // line-height: 1rem;
      font-weight: 700;
    }
  }

  // .middle-content__value
  &__value {
    font-size: 1.125rem;
    line-height: 1.375rem;
    font-weight: 700;
    color: #187552;

    &.icon-info {
      color: inherit;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;

      &::before {
        color: #187552;
        margin-left: 0.5rem;
      }
    }

    // .middle-content__value_big
    &_big {
      color: inherit;
      font-size: 1.5rem;
      line-height: 1.875rem;
      font-weight: 700;
    }
  }

  &__currency {
    font-weight: 400;
  }

  &__button-submit {
    min-height: 52px;
    min-width: 100%;
    margin-top: 1rem;
  }
}
</style>
