<template>
  <section class="slider-products-section">
    <ContainerNode>
      <div class="slider-products-section__body">
        <h2 class="slider-products-section__title">
          <button @click="routeToSingleProductCategory(productsCategory)">
            {{ title }}
          </button>
        </h2>
        <SliderProductsNode
          :slug="slug"
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
import SliderProductsNode from "@/components/sliders/SliderProductsNode.vue";
import { routeToSingleProductCategory } from "@/api/helpers";

export default {
  components: {
    SliderProductsNode,
  },
  inheritAttrs: false,
  props: {
    productsCategoryId: Number,
    title: String,
    breakpoints: Object,
    slug: String,
  },
  setup() {
    return {
      routeToSingleProductCategory,
    };
  },
  computed: {
    ...mapGetters({
      singleById: "singleById",
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
      return this.singleById({
        type: this.productsCategoriesRequest.type,
        id: this.productsCategoryId,
      });
    },
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
    // margin-bottom: 1rem;
    margin: 0.6rem 0 1.5rem 0;
      // font-weight: 400;
    // @media (max-width: ($md3+px)) {
    //   margin: 0;
    // }
    button {
      // font-size: inherit;
      // font-size: 2rem;
      // line-height: 1.2;

    }
  }
}
</style>
