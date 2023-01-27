<template>
<!-- :class="itemsLoaded ? '' : 'products-loading'" -->
  <div class="catalog-products" >
    <PreloadWrapNode
      v-for="(product, index) in products"
      :key="index"
      :targetPreloadElement="product ? false : true"
      :paddingBottom="product ? 0 : 180"
    >
      <ProductNode v-if="product" :product="product"></ProductNode>
    </PreloadWrapNode>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import {itemsLoadHandler} from "@/api/helpers";

import ProductNode from "@/components/ProductNode.vue";
export default {
  components: {
    ProductNode,
  },
  data() {
    return {};
  },
  watch: {
    itemsPaginated: {
      handler(newValue, oldValue) {
        // this.products()
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      filtredProducts: "products/filtredProducts",
      productsIds: "products/productsIds",
    }),
    ...mapState({
      productRequest: (state) => state.products.basedRequest,
      itemsPaginated: (state) => state.products.itemsPaginated,
    }),
    products() {
      return this.filtredProducts({quantity: this.productRequest.per_page})
    },
  },
  methods: {
    ...mapMutations({
      setExclude: "products/setExclude",
    }),
  },
};
</script>

<style lang="scss">
.catalog-products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0 0.66rem;

  &.products-loading {
    grid-gap: 1.2rem 0.66rem;
  }

  @media (max-width: ($md3+px)) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
