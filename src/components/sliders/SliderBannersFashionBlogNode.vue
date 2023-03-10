<template>
  <SliderBannersNode
    class="slider-banners-fashion-blog"
    :bannerCategoryId="69"
    slug="slider-banners-fashion-blog"
    :space-between="60"
    :breakpoints="{
      '320': {
        slidesPerView: 1.25,
        spaceBetween: 20,
      },
      '992': {
        slidesPerView: 2,
        spaceBetween: 50,
      },
    }"
  >
    <template #banner-category-name>
      <h2
        class="slider-banners-fashion-blog__title"
        @click="$router.push('/')"
      >
        Fashion-блог
      </h2>
    </template>
    <template #banner-title="bannerTitleProps">
      <div
        class="slider-banners-fashion-blog__banner-title"
        @click="$router.push('/')"
      >
        {{ bannerTitleProps.banner.title.rendered }}
      </div>
    </template>
  </SliderBannersNode>
</template>

<script>
import SliderBannersNode from "@/components/sliders/SliderBannersNode.vue";

export default {
  components: {
    SliderBannersNode,
  },
};
</script>

<style lang="scss">
.slider-banners-fashion-blog {
  background-color: #231f20;

  &__title {
    // font-size: 2rem;
    cursor: pointer;
  }
  &__banner-title {
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: #fff;
    text-align: center;
    margin: 1.3333333333rem 1.3333333333rem 0;
    text-transform: uppercase;
    @media (max-width: ($md3+px)) {
      font-size: 1rem;
      line-height: 1.2rem;
    }
  }

  .slider-banners {
    &__items {
      display: flex;
      justify-content: space-between;
      color: #fff;
      margin: 0.6666666667rem 0 2.3333333333rem;
    }
    &__image {
      padding: 0 0 60% 0;
    }
    &__body {
      padding: 2.6666666667rem 0 !important;
      @media (max-width: ($md3+px)) {
      padding: 1.6666666667rem 0 0 0 !important;

      }
    }
  }
  .slider-arrows {
    position: static;
  }
}
</style>
