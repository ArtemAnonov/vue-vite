<template>
  <section class="slider-products-section">
    <ContainerNode>
      <div class="slider-products-section__body">
        <div class="slider-products-section__title">
          <button @click="routeToCategory(productsCategory)">
            {{ title }}
          </button>
        </div>
        <SliderProductsNode
          :identificator="identificator"
          :products="products"
          :breakpoints="breakpoints"
          class="slider-products-section__slider"
        />
      </div>
    </ContainerNode>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { isEmpty } from "lodash-es";
import SliderProductsNode from "@/components/sliders/SliderProductsNode.vue";
import { routeToCategory } from "@/api/helpers";

export default {
  components: {
    SliderProductsNode,
  },
  inheritAttrs: false,
  props: {
    productsCategoryId: Number,
    title: String,
    breakpoints: Object,
  },
  setup() {
    return {
      routeToCategory,
    };
  },
  computed: {
    ...mapGetters({
      itemById: "itemById",
      itemsMatchedByCallback: "itemsMatchedByCallback",
    }),
    ...mapState({
      productsRequest: (state) => state.products.basedRequest,
      productsCategoriesRequest: (state) => state.productsCategories.basedRequest,
    }),
    products() {
      return this.itemsMatchedByCallback(
        this.productsRequest,
        { categories: this.productsCategoryId },
        (product, keys, params) => {
          let approved;
          for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (Array.isArray(product[key])) {
              approved = product[key].find((category) => params[key] === category.id);
            }
          }
          return approved;
        },
      );
    },
    productsCategory() {
      return this.itemById({
        type: this.productsCategoriesRequest.type,
        id: this.productsCategoryId,
      });
    },
    identificator() {
      if (!isEmpty(this.productsCategory)) {
        return this.productsCategory.slug;
      }
      return null;
    },
  },
  created() {
    if (import.meta.env.VITE_LIKE_A_SPA) {
      this.getItems({
        basedRequest: {
          ...{ category: this.productsCategoryId },
          ...this.productsRequest,
        },
      });
    }
  },
  methods: {
    ...mapActions({
      getItems: "getItems",
    }),
  },
};
</script>

<style lang="scss">
.slider-products-section {
  position: relative;
  margin-bottom: 2rem;
  &__slider {
    .slider-arrows {
      &__arrow {
        position: absolute;
        top: 50%;
        // transform: translate(0, -50%);
        &_prev {
          left: 1rem;
        }

        &_next {
          right: 1rem;
        }
      }
    }
  }
  &__body {
    // padding: 2.6666666667rem 0;
    // @media (max-width: ($md3+px)) {
    //   padding: 1.3rem 0 0 0;
    // }
  }
  &__title {
    text-align: center;
    margin-bottom: 1rem;
    // @media (max-width: ($md3+px)) {
    //   margin: 0;
    // }
    button {
      font-size: 2rem;
      line-height: 1.2;
      margin: 0.6rem 0 0.6rem 0;
      font-weight: 400;
    }
  }
}
</style>
