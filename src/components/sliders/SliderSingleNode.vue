<template>
  <section class="slider-single">
    <ContainerNode>
      <div class="slider-single__sliders sw-cont">
        <swiper
          class="slider-single__thumb-slider sw-cont"
          v-show="windowWidth > 767"
          @swiper="setThumbsSwiper"
          :watchSlidesProgress="true"
          :modules="modules"
          :breakpoints="{
            '320': {
              spaceBetween: '15',
              direction: 'horizontal',
            },
            '768': {
              direction: 'horizontal',
              slidesPerView: 3,
              spaceBetween: 0,
            },
            '1024': {
              spaceBetween: 10,
              direction: 'vertical',
              slidesPerView: 'auto',
            },
          }"
        >
          <swiper-slide v-for="(image, index) in images" :key="index">
            <div class="slider-single__image">
              <picture>
                <source srcset="" type="image/webp" />
                <source srcset="" type="image/jpeg" />
                <img :src="image?.src" alt="" />
              </picture>
            </div>
          </swiper-slide>
        </swiper>
        <swiper
          class="slider-single__main-slider sw-cont"
          v-bind="$attrs"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="modules"
          @swiper="onSwiper"
          :breakpoints="{
            '768': {
              slidesPerView: 1,
            },
            '1200': {
              slidesPerView: 2,
            },
          }"
        >
          <swiper-slide v-for="(image, index) in images" :key="index">
            <preload-wrap-node :paddingBottom="image?.src ? '' : 50" :targetPreloadElement="image?.src ? false : true">
                <div class="slider-single__image">
                  <picture>
                    <source srcset="" type="image/webp" />
                    <source srcset="" type="image/jpeg" />
                    <img :src="image?.src" alt="" />
                  </picture>
                </div>
            </preload-wrap-node>
            <!-- <span>s</span> -->
          </swiper-slide>
        </swiper>
      </div>
    </ContainerNode>
  </section>
</template>

<script>
import { ref } from "vue";
import { Thumbs } from "swiper";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
export default {
  inheritAttrs: false,
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    images: Array,
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters({}),
    ...mapState({
      windowWidth: (state) => state.common.windowWidth,
    }),
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({}),
  },
  created() {},
  setup() {
    let thumbsSwiper = ref(null);
    function setThumbsSwiper(swiper) {
      thumbsSwiper.value = swiper;
    }
    const onSwiper = (swiper) => {};
    const onSlideChange = () => {};

    return {
      onSwiper,
      onSlideChange,

      thumbsSwiper,
      setThumbsSwiper,
      modules: [Thumbs],
    };
  },
};
</script>

<style lang="scss">
.slider-single {
  position: relative;
  margin-bottom: 3rem;
  &__sliders {
    column-gap: 1rem;
    display: grid;
    grid-template-columns: 0.2fr 1.8fr;
    @media (max-width: ($md2+px)) {
      grid-template-columns: 1fr;
    }
  }

  &__image {
    position: relative;
    img {
      max-width: 100%;
    }
  }

  &__main-slider {
    width: 100%;
    @media (max-width: ($md3+px)) {
      overflow: visible !important;
    }
    .slider-single__image {
      height: 100%;
      width: 100%;
      padding-bottom: 50%;
      @media (max-width: ($md2+px)) {
        padding-bottom: 150%;
      }
      @media (max-width: ($md3+px)) {

      }
      img {
        max-width: 100%;
        object-fit: contain;
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }
  &__thumb-slider {
    margin-right: 2rem;
    max-height: 100%;
    height: 100%;
    width: 100%;
    @media (max-width: ($md2+px)) {
      margin-top: 1rem;
      grid-row: 2 / 3;
      .swiper-slide {
        height: 100%;
      }
    }
    .swiper-slide {
      height: auto !important;
    }
    .slider-single__image {
      img {
        width: 3.2rem;
        @media (max-width: ($md2+px)) {
          width: 8rem;
        }
      }
    }
  }
}
</style>
