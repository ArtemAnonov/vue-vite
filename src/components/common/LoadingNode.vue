<template>
  <div
    v-show="$props.loading"
    class="loading"
  >
    <div class="loading__image"><img src="@/assets/images/gifs/spinner.gif"
      alt=""></div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "LoadingNode",
  props: {
    loading: Boolean,
  },
};
</script>

<style lang="scss">
.loading {
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f7f7f7a8;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

</style>
