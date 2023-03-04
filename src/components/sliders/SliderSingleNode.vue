<template>
  <section class="slider-single">
    <ContainerNode>
      <div class="slider-single__sliders">
        <Swiper v-show="windowWidth > 767"
          class="slider-single__thumb-slider"
          :watchSlidesProgress="true"
          :modules="modules"
          :breakpoints="{
            '320': {
              spaceBetween: 15,
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
              autoHeight: true
            },
          }"
          @swiper="setThumbsSwiper">
          <SwiperSlide v-for="(image, index) in images"
            :key="index">
            <div class="slider-single__image">
              <picture>
                <source srcset=""
                  type="image/webp" >
                <source srcset=""
                  type="image/jpeg" >
                <img :src="image?.src"
                  alt="" >
              </picture>
            </div>
          </SwiperSlide>
        </swiper>
        <Swiper class="slider-single__main-slider"
          v-bind="$attrs"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="modules"
          :breakpoints="{
            '768': {
              slidesPerView: 1,
            },
            '1200': {
              slidesPerView: 2,
            },
          }"
          @swiper="onSwiper">
          <SwiperSlide v-for="(image, index) in images"
            :key="index">
            <PreloadWrapNode :paddingBottom="image?.src ? 0 : 50"
              :targetPreloadElement="image?.src">
              <div class="slider-single__image">
                <picture>
                  <source srcset=""
                    type="image/webp" >
                  <source srcset=""
                    type="image/jpeg" >
                  <img :src="image?.src"
                    alt="" >
                </picture>
              </div>
            </PreloadWrapNode>
            <!-- <span>s</span> -->
          </SwiperSlide>
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
  components: {
    Swiper,
    SwiperSlide,
  },
  inheritAttrs: false,
  props: {
    images: Array,
  },

  setup() {
    const thumbsSwiper = ref(null);
    function setThumbsSwiper(swiper) {
      thumbsSwiper.value = swiper;
    }
    const onSwiper = () => { };
    const onSlideChange = () => { };

    return {
      onSwiper,
      onSlideChange,

      thumbsSwiper,
      setThumbsSwiper,
      modules: [Thumbs],
    };
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
};
</script>

<style lang="scss">
.slider-single {
  position: relative;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  // багает слайдер - миниатюры не работают правильнгл (показывается одна)
  height: 100%;

  .container {
    height: 100%;
  }

  &__sliders {
    min-width: 0; // for swiper
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
    min-width: 0; // for swiper
    width: 100%;
    @media (max-width: ($md3+px)) {
      overflow: visible !important;
    }
    .slider-single__image {
      height: 100%;
      width: 100%;
      padding-bottom: 150%;
      // padding-bottom: 160%;

      // @media (max-width: ($md2+px)) {
      //   padding-bottom: 150%;
      // }

      @media (max-width: ($md3+px)) {}

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
    min-width: 0; // for swiper
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
