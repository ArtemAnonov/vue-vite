<template>
  <div :class="containerStylesOff ? 'styles-off' : ''" class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContainerNode",
  props: {
    containerStylesOff: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  max-width: ($md1+px);
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  @media (max-width: ($md1+px)) {
    max-width: ($md2+px);
  }
  @media (max-width: ($md2+px)) {
    max-width: 100%;
  }
  @media (max-width: ($md3+px)) {
    padding: 0 10px;
  }
  &.styles-off {
    max-width: 100%;
    margin: auto;
    padding: 0;
    @media (max-width: ($md1+px)) {
      max-width: 100%;
    }
    @media (max-width: ($md2+px)) {
      max-width: 100%;
    }
    @media (max-width: ($md3+px)) {
    }
  }
}
</style>
