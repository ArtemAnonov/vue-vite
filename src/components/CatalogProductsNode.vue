<template>
  <div class="catalog-products" :class="itemsLoaded ? '' : 'products-loading'">
    <preload-wrap-node
      v-for="(product, index) in products"
      :key="index"
      :targetPreloadElement="product ? false : true"
      :paddingBottom="product ? 0 : 180"
    >
      <product-node v-if="product" :product="product"></product-node>
    </preload-wrap-node>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import itemsLoadHandler from "@/mixins/itemsLoadHandler";

import ProductNode from "@/components/ProductNode.vue";
export default {
  components: {
    ProductNode,
  },
  mixins: [itemsLoadHandler],
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
      return this.itemsLoadHandler(this.filtredProducts, 8);
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
