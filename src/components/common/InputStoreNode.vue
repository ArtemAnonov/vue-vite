<template>
  <div class="input">
    <slot/>
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="updateInput"
    >
  </div>
</template>

<script>
export default {
  name: "input-store-node",
  inheritAttrs: false,
  props: {
    modelValue: [Number, String, Object, Array, Boolean],
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
    input {
        border: 0.1333333333rem solid #f1f1f1;
    }
</style>
