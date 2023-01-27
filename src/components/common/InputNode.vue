<template>
  <div
    class="input input_text"
    :class="[$attrs.class, { input_text_focus: focus }]"
  >
    <slot name="before"></slot>
    <input
      type="text"
      v-bind="$attrs"
      :class="{ 'not-empty': modelValue }"
      :value="modelValue"
      @input="updateInput"
      @focus="focusEvent"
      @blur="focusEvent"
    />
    <slot name="after"></slot>
  </div>
</template>

<script>
export default {
  name: "InputNode",
  inheritAttrs: false,
  props: {
    modelValue: [Number, String, Object, Array, Boolean],
  },
  data() {
    return {
      focus: false,
    };
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    focusEvent(event) {
      this.focus = event.type === "blur" ? false : true;
    },
  },
};
</script>

<style lang="scss">
.input {
  &_text {
    &.main {
      margin-bottom: 1.3333333333rem;
      display: grid;
      position: relative;
      border: none;

      &::after {
        content: "";
        position: absolute;
        height: 0.06rem;
        width: 100%;
        bottom: 0;
        left: 0;
        background: #d8d8d8;
      }
      @media (max-width: ($md3+px)) {
        margin-top: 1.3333333333rem;
      }
      &:hover {
        &::after {
          background: #1e242c;
        }
        label {
          color: #1e242c;
        }
      }

      input {
        padding: 0 0 0.7rem 0;
        transition: transform 0.1s, font-size 0.1s, color 0.1s;
        // &.not-empty {
        //   & + label {
        //     color: #1e242c;
        //     font-size: 0.8666666667rem;
        //   }
        // }
      }

      label {
        padding: 0 0 0.5rem 0;
        color: #868686;
        font-size: 1.13333rem;
        line-height: 1;
        transition: transform 0.1s, font-size 0.1s, color 0.1s;
        pointer-events: none;
      }
    }
    &_focus {
      &.main {
        &::after {
          background: #1e242c;
          height: 0.16rem;
        }
      }
    }
  }
}
</style>