<template>
  <div class="__items catalog-products">
    <ProductNode v-for="product in products"
      :key="product.id"
      :product="product"/>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import ProductNode from "@/components/ProductNode.vue";

export default {
  components: {
    ProductNode,
  },
  setup() {
    const store = useStore();
    const products = computed(() => store.getters.itemsByIds(
      store.state.products.basedRequest.type,
      store.getters["wishlist/wishlistProductIds"],
    ));
    return {
      products,
    };
  },
};
</script>

<style lang="scss"></style>
