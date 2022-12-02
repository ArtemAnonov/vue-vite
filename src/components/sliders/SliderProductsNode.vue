<template>
  <section class="slider-products">
    <container-node>
      <div class="slider-products__body">
        <div class="slider-products__title">
          <button @click="routeToCategory(productsCategory)">
            {{ title }}
          </button>
        </div>
        <div class="slider-products__slider">
          <arrows-slider-node
            v-show="itemsLoaded"
            :identificator="identificator"
          ></arrows-slider-node>
          <swiper
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
            <!-- <swiper-slide v-if="products.length === 0">
              <preload-wrap-node :targetPreloadElement="true" paddingBottom="146"> </preload-wrap-node>
            </swiper-slide> -->
            <swiper-slide v-for="(product, index) in products" :key="index">
              <preload-wrap-node
                :targetPreloadElement="product ? false : true"
                :paddingBottom="product ? 0 : 146"
              >
                <product-node
                  v-if="product"
                  :product="product"
                  :catalogType="false"
                ></product-node>
              </preload-wrap-node>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </container-node>
  </section>
</template>

<script>
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { isEmpty } from 'lodash-es'

import ProductNode from "@/components/ProductNode.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import ArrowsSliderNode from "@/components/sliders/ArrowsSliderNode.vue";

import "swiper/css";
import routeToCategoryMixin from "@/mixins/routeToCategoryMixin";
import itemsLoadHandler from "@/mixins/itemsLoadHandler";
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
  mixins: [itemsLoadHandler, routeToCategoryMixin],
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
      return this.itemsLoadHandler(
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
      return this.itemById(
        this.productsCategoriesRequest,
        this.productsCategoryId
      );
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
    ...mapMutations({
      setProductsCategoryId: "products/setProductsCategoryId",
    }),

  },
  created() {
    this.setProductsCategoryId(this.productsCategoryId);
    this.getItems(this.productsRequest);
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
          left: 0;
        }

        &_next {
          right: 0;
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
    @media (max-width: ($md3+px)) {
      margin: 0;
    }
    button {
      font-size: 2rem;
      line-height: 1.2;
      margin: 0.6rem 0 0.6rem 0;
      font-weight: 400;
    }
  }
}
</style>
