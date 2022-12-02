<template>
  <div class="social-networks">
    <button-node class="social-networks__button icon icon-image_tg"></button-node>
    <button-node class="social-networks__button icon icon-image_vk"></button-node>
    <button-node class="social-networks__button icon icon-image_ms"></button-node>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.social-networks {
  &__button {
    margin-right: 1rem;
  }
}
.icon-image {
  &_tg {
  }

  &_vk {
    font-size: 0.7rem;
  }

  &_ms {
  }
}
</style>