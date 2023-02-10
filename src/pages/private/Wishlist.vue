<template>
  <ProfilePageNode>
    <template #content>
      <div class="wishlist__items catalog-products">
        <PreloadWrapNode
          v-for="product in products"
          :key="product.id"
          :targetPreloadElement="product ? false : true"
          :paddingBottom="product ? 0 : 146"
        >
          <ProductNode v-if="product" :product="product"></ProductNode>
        </PreloadWrapNode>
      </div>
    </template>
  </ProfilePageNode>
</template>

<script>
import { watch, ref } from "vue";
import { useStore } from "vuex";
import ProfilePageNode from "@/components/profile/ProfilePageNode.vue";
import ProductNode from "@/components/ProductNode.vue";

export default {
  components: {
    ProfilePageNode,
    ProductNode,
  },
  setup() {
    let products = ref({});
    const store = useStore();
    watch(
      () => store.state.wishlist.items,
      () => {
        const ids = store.getters["wishlist/wishlistProductIds"];
        products.value = store.getters.itemsByIds(
          store.state.products.basedRequest.type,
          ids
        );
      },
      { deep: true }
    );
    return { products };
  },
};
</script>

<style lang="scss">
</style>