<template>
  <section class="slider-products">
    <ContainerNode>
      <div class="slider-products__body">
        <div class="slider-products__title">
          <button @click="routeToCategoryLocal(productsCategory, null)">
            {{ title }}
          </button>
        </div>
        <div class="slider-products__slider">
          <ArrowsSliderNode :identificator="identificator"></ArrowsSliderNode>
          <Swiper
            v-bind="$attrs"
            :loop="true"
            :slides-per-view="2"
            :space-between="20"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            :navigation="{
              prevEl: `.${identificator}__arrow_prev`,
              nextEl: `.${identificator}__arrow_next`,
            }"
            :modules="modules"
            :breakpoints="swiperBreakpoints"
          >
            <SwiperSlide v-for="(product, index) in products" :key="index">
              <PreloadWrapNode
                :targetPreloadElement="product ? false : true"
                :paddingBottom="product ? 0 : 146"
              >
                <ProductNode v-if="product" :product="product"></ProductNode>
              </PreloadWrapNode>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </ContainerNode>
  </section>
</template>

<script>
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { isEmpty } from "lodash-es";

import ProductNode from "@/components/ProductNode.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import ArrowsSliderNode from "@/components/sliders/ArrowsSliderNode.vue";

import "swiper/css";
import { itemsLoadHandler, routeToCategory } from "@/api/helpers";

export default {
  inheritAttrs: false,
  components: {
    Swiper,
    SwiperSlide,
    ProductNode,
    ArrowsSliderNode,
  },
  props: {
    productsCategoryId: String,
    title: String,
    breakpoints: Object,
  },
  data() {
    return {
      defaultBreakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    };
  },

  computed: {
    ...mapGetters({
      itemById: "itemById",
      itemsMatchedByCallback: "itemsMatchedByCallback",
    }),
    ...mapState({
      productsRequest: (state) => state.products.basedRequest,
      productsCategoriesRequest: (state) =>
        state.productsCategories.basedRequest,
    }),
    products() {
      /**
       * Не уверен в нужности этой функции, но оставил
       */
      return itemsLoadHandler(
        this.itemsMatchedByCallback(
          this.productsRequest,
          { categories: this.productsCategoryId },
          function (product, keys, params, items, approved) {
            keys.forEach((key) => {
              if (Array.isArray(product[key])) {
                product[key].forEach((category) => {
                  if (params[key] == category.id) approved = true;
                });
              }
            });
            return approved;
          }
        )
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
    },
    swiperBreakpoints() {
      return this.breakpoints === undefined
        ? this.defaultBreakpoints
        : this.breakpoints;
    },
  },
  methods: {
    ...mapActions({
      getItems: "getItems",
    }),
    routeToCategoryLocal(category, parentCategorySlug) {
      routeToCategory(category, parentCategorySlug);
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
  setup() {
    const onSwiper = (swiper) => {};
    const onSlideChange = () => {};
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Autoplay, FreeMode],
    };
  },
};
</script>

<style lang="scss">
.slider-products {
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
