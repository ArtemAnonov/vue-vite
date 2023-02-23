<template>
  <button class="link">
    <span>
      <slot/>
    </span>
  </button>
</template>

<script>
export default {
  name: "BaseLinkNode",
};
</script>

<style lang="scss">
.link {
  &_blue {
    transition: .1s;
    &:hover {
      color: #5073a2;
    }
    &:disabled {

    }
  }
}
</style>
