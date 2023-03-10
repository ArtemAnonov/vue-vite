<template>
  <div class="wishlist">
    <div v-if="!isEmpty(products)"
      class="wishlist__items catalog-products">
      <ProductNode v-for="product in products"
        :key="product.id"
        :product="product"/>
    </div>
    <div v-else>Ваш список желаний пуст. Пополните же его!</div>
  </div>
</template>

<script>
import { isEmpty } from "lodash-es";
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
      isEmpty,
    };
  },
};
</script>

<style lang="scss">
.wishlist {
  .catalog-products {
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ($md3+px)) {
    grid-template-columns: repeat(2, 1fr);
  }
}
}
</style>
