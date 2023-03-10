<template>
  <div class="single-category__sections">
    <SliderBannersNode
      class="slider-banners-single-category"
      :bannerCategoryId="68"
      :containerStylesOff="true"
      slug="slider-banners-main_single-category"
      :autoplay="{ delay: 50000, disableOnInteraction: false }"
      pagination
      :slides-per-view="1"
    />
    <CategoryGrid :category="category"/>
    <SliderProductsSectionNode
      slug="single-category-for-women"
      title="Для женщин"
      :productsCategoryId="20"
      :breakpoints="{
        '320': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '768': {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        '1200': {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }"
    />
  </div>
</template>

<script>
import { isEmpty } from "lodash-es";
import CategoryGrid from "@/components/CategoryGrid.vue";
import SliderProductsSectionNode from "@/components/sliders/SliderProductsSectionNode.vue";
import SliderBannersNode from "@/components/sliders/SliderBannersNode.vue";
import { useCategory } from "@/composables/category";

export default {

  components: {
    CategoryGrid,
    SliderProductsSectionNode,
    SliderBannersNode,
  },
  props: {
    params: Object,
  },
  setup(props) {
    const { templatePage, category } = useCategory(props);
    return {
      templatePage,
      category,
    };
  },

};
</script>

<style lang="scss">
.single-category {
  position: relative;
  &__body {
    margin: 1rem 0;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 3fr;
    @media (max-width: ($md2+px)) {
      grid-template-columns: 1fr;
    }
  }
  &__sections {
    width: 100%;
    max-width: 100%;
    min-height: 0;
    min-width: 0;
  }
}

.slider-banners-single-category {
  // margin-top: -2.6666666667rem;
}
</style>
