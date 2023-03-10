<template>
  <div class="slider-products">
    <ArrowsSliderNode :slug="slug"/>
    <!-- :loop="true" -->
    <Swiper v-bind="$attrs"
      :slides-per-view="2"
      :space-between="20"
      :navigation="{
        prevEl: `.${slug}__arrow_prev`,
        nextEl: `.${slug}__arrow_next`,
      }"
      :modules="modules"
      :breakpoints="swiperBreakpoints"
      @swiper="onSwiper"
      @slideChange="onSlideChange">
      <SwiperSlide v-for="(product, index) in products"
        :key="index">
        <ProductNode v-if="product"
          :product="product"/>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper";
import { mapState, mapGetters } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";

import ProductNode from "@/components/ProductNode.vue";
import ArrowsSliderNode from "@/components/sliders/ArrowsSliderNode.vue";

import "swiper/css";

export default {
  components: {
    Swiper,
    SwiperSlide,
    ProductNode,
    ArrowsSliderNode,
  },
  inheritAttrs: false,
  props: {
    slug: String,
    products: Object,
    breakpoints: Object,
  },
  setup(props) {
    const onSwiper = () => { };
    const onSlideChange = () => { };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Autoplay, FreeMode],
    };
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
      requestByParam: "requestByParam",
      singleById: "singleById",
      itemsMatchedByCallback: "itemsMatchedByCallback",
    }),
    ...mapState({
      productsRequest: (state) => state.products.basedRequest,
      productsCategoriesRequest: (state) => state.productsCategories.basedRequest,
    }),

    swiperBreakpoints() {
      return this.breakpoints
        ? this.breakpoints
        : this.defaultBreakpoints;
    },

  },

};
</script>

<style lang="scss">
.slider-products {
  position: relative;
  margin-bottom: 2rem;
  @media (max-width: ($md3+px)) {
     margin-bottom: 0;
  }

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
</style>
