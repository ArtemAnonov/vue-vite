<template>
  <button class="link">
    <slot/>
    <!-- <span>

    </span> -->
  </button>
</template>

<script>
export default {
  name: "BaseLinkNode",
};
</script>

<style lang="scss">
.link {
  transition: .1s;
    &:hover {
      color: #5073a2;
    }
    &:disabled {

    }
  // &_blue {

  // }
}
</style>
