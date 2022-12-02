<template>
  <div class="input input_text" :class="[$attrs.class]">
    <slot name="before"></slot>
    <input v-bind="$attrs" :class="{ 'not-empty': modelValue }" :value="modelValue" @input="updateInput">
    <slot name="after"></slot>
  </div>
</template>

<script>
export default {
  name: 'input-node',
  inheritAttrs: false,
  props: {
    modelValue: [Number, String, Object, Array, Boolean]
  },

  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  },
}
</script>

<style lang="scss">
.input_text {
  border: 0.1333333333rem solid #f1f1f1;

  &.main {
    margin-bottom: 1.3333333333rem;
    display: grid;
    position: relative;
    border: none;

    @media (max-width: ($md3+px)) {
      margin-top: 1.3333333333rem;
    }

    &:hover {
      input {
        border-bottom: 0.06rem solid #1e242c;
      }

      label {
        color: #1e242c;
      }
    }

    input {
      padding: 1.5rem 0 0.5rem 0;
      border-top: 0.09rem solid transparent;
      border-bottom: 0.06rem solid #d8d8d8;
      transition: transform 0.1s, font-size 0.1s, color 0.1s;

      &:focus {
        border-top: 0rem solid transparent;
        border-bottom: 0.16rem solid #1e242c;

        &+label {
          color: #1e242c;
          font-size: 0.8666666667rem;
        }
      }
      &.not-empty {
        &+label {
          color: #1e242c;
          font-size: 0.8666666667rem;
        }
      }
    }

    label {
      position: absolute;
      top: 0;
      left: 0;
      color: #868686;
      font-size: 1.13333rem;
      line-height: 1;
      transition: transform 0.1s, font-size 0.1s, color 0.1s;
      pointer-events: none;
    }
  }



}
</style>