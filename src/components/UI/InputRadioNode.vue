<template>
  <div class="input input_radio" :class="disabled ? 'disabled' : ''">
    <!-- v-model="modelValue" -->
    <input :disabled="disabled ? true : false" type="radio" v-bind="$attrs"  />
    <span :class="modelValue ? 'checked' : ''"></span>
    <label for="">{{ $props.labelText }}</label>
  </div>
</template>

<script>
export default {
  name: "input-radio-node",
  inheritAttrs: false,
  props: {
    modelValue: Boolean,
    labelText: String,
    disabled: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {

    };
  },

  methods: {},

  created() { },
};
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  overflow: hidden;
  color: #231f20;

  &.disabled {
    label {
      color: #d8d8d8;
    }
    span::after {
      border-color: #d8d8d8 !important;
    }
    span::before {
      border-color: #d8d8d8 !important;
    }
  }

  input {
    z-index: 3;
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
    display: block;
    position: relative;

    //point
    &::before {
      content: "";
      position: absolute;
      border-radius: 50%;
      transition: box-shadow .1s, border-color .1s, transform .1s, background-color .1s;
      top: 0.5333333333rem;
      left: 0.5333333333rem;
      width: 0.6rem;
      height: 0.6rem;
      background-color: #006140;
      z-index: 1;
      opacity: 0;
      visibility: hidden;
    }

    //elips
    &::after {
      content: "";
      top: 0;
      left: 0;
      width: 1.6666666667rem;
      height: 1.6666666667rem;
      background-color: #fff;
      border: .0666666667rem solid #d8d8d8;
      box-sizing: border-box;
      border-color: #006140;
      box-shadow: 0 .0666666667rem .2666666667rem 0 rgba(255, 255, 255, .15);
      content: "";
      position: absolute;
      border-radius: 50%;
      transition: box-shadow .1s, border-color .1s, transform .1s, background-color .1s;
    }

    &.checked {
      &::before {
        opacity: 1;
        visibility: visible;
      }

      &::after {}
    }
  }

  label {
    position: relative;
    min-height: 1.6666666667rem;
    font-size: 1rem;
    line-height: 1.6666666667rem;
    padding: 0 0 0 2.3333333333rem;
    margin: 0;
    transition: color 0.1s;
    cursor: pointer;
  }
}
</style>
