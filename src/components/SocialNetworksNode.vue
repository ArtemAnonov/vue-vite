<template>
  <div class="social-networks">
    <ButtonNode class="social-networks__button icon icon-image_tg"/>
    <ButtonNode class="social-networks__button icon icon-image_vk"/>
    <ButtonNode class="social-networks__button icon icon-image_ms"/>
  </div>
</template>

<script>
export default {

};
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
