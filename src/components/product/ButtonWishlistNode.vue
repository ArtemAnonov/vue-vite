<template>
  <ButtonNode
    :resolver="resolver"
    :class="productContanedInWishlist ? 'icon-wishlist-fill' : 'icon-wishlist'"
  />
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  props: {
    resolver: Object,
  },
  setup(props) {
    const store = useStore();
    return {
      productContanedInWishlist: computed(() => store.getters["wishlist/productContanedInWishlist"](props.resolver.payload.product_id)),
    };
  },
};
</script>

<style scoped lang="scss">
  .icon-wishlist-fill {
    color: $mainColor;
  }

</style>
