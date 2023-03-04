<template>
  <div v-if="!isEmpty(products)"
    class="catalog-products">
    <!-- v-if="product" -->
    <ProductNode
      v-for="(product, index) in products"
      :key="index"
      :product="product"
      viewType="catalog"/>
  </div>
  <TroubleNode v-else
    :text="['Для этой категории ', 'ещё не добавлено товаров!']" />
</template>

<script>

import { isEmpty } from "lodash-es";
import {
  mapState, mapGetters,
  mapMutations,
} from "vuex";
import TroubleNode from "@/components/TroubleNode.vue";

import ProductNode from "@/components/ProductNode.vue";

export default {
  components: {
    ProductNode, TroubleNode,
  },
  data() {
    return {
      isEmpty,
    };
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
      return this.filtredProducts({ quantity: this.productRequest.per_page });
    },
  },
  // watch: {
  //   itemsPaginated: {
  //     handler(newValue, oldValue) {
  //       // this.products()
  //     },
  //     deep: true,
  //   },
  // },
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
