<template>
  <div class="input input_checkbox">
    <span class="icon-check" :class="modelValue ? 'checked' : ''"></span>
    <label for="">{{ $props.labelText }}</label>
    <input type="checkbox" v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', !modelValue)" />
  </div>
</template>

<script>
export default {
  name: "input-checkbox-node",
  inheritAttrs: false,
  props: {
    modelValue: Boolean,
    labelText: String,
  },
};
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  overflow: hidden;

  input {
    z-index: 1;
    opacity: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }

  span {
    // overflow: hidden;
    display: inline-flex;
    width: 1rem;

    &::before {
      font-size: 0.8rem;
      opacity: 0;
      transition: 0.2s;
      // transform: scale(0);
      transform: translate(36%, -60%);
      z-index: 1;
    }

    &::after {
      // z-index: 1;
      content: "";
      background-color: #fff;
      transition: border-color 0.1s, box-shadow 0.1s;
      position: absolute;
      top: 0;
      left: 0;
      width: 1.6666666667rem;
      height: 1.6666666667rem;
      border: 0.0666666667rem solid #d8d8d8;
      box-shadow: 0 0.0666666667rem 0.2666666667rem 0 rgba(0, 0, 0, 0.15);
    }

    &.checked {
      &::before {
        top: 0;
        left: 0;
        position: absolute;
        opacity: 1;
        // transform: scale(1) translate(25%, 40%);
        transform: translate(36%, 46%);
      }

      &::after {
        border: 0.0666666667rem solid #1e242c;
      }
    }
  }

  label {
    position: relative;
    min-height: 1.6666666667rem;
    font-size: 1rem;
    line-height: 1.6666666667rem;
    padding: 0 0 0 1.3333333333rem;
    margin: 0;
    transition: color 0.1s;
    cursor: pointer;
  }
}
</style>
