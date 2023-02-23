<template>
  <MainPageNode
    class="single-category"
    :templatePage="templatePage"
    :navRaw="productCategory"
  >
    <template #page-main>
      <ContainerNode>
        <div class="single-category__body">
          <CatalogSidebarNode
            :mainCategory="productCategory"
            :total="total"
          />
          <div class="single-category__sections">
            <SliderBannersNode
              class="slider-banners-single-category"
              :bannerCategoryId="68"
              :containerStylesOff="true"
              identificator="slider-banners-main_single-category"
              :autoplay="{ delay: 50000, disableOnInteraction: false }"
              pagination
              :slides-per-view="1"
            />
            <CategoryGrid :productCategory="productCategory"/>
            <SliderProductsSectionNode
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
        </div>
      </ContainerNode>
    </template>
  </MainPageNode>
</template>

<script>
//                       :prevCategory="params.category"                         :parent="productCategory.id"
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { isEmpty } from "lodash-es";

import CatalogSidebarNode from "@/components/CatalogSidebarNode.vue";
import CategoryGrid from "@/components/CategoryGrid.vue";
import SliderProductsSectionNode from "@/components/sliders/SliderProductsSectionNode.vue";
import SliderBannersNode from "@/components/sliders/SliderBannersNode.vue";
import MainPageNode from "@/components/structure/MainPageNode.vue";

export default {
  components: {
    CatalogSidebarNode,
    CategoryGrid,
    SliderProductsSectionNode,
    SliderBannersNode,
    MainPageNode,
  },
  props: {
    params: {
      mainCategorySlug: String,
    },
  },
  data() {
    return {
      // categoryId: String
    };
  },
  watch: {},
  computed: {
    ...mapState({
      productsRequest: (state) => state.products.basedRequest,
      pCRequest: (state) => state.productsCategories.basedRequest,
      pagesRequest: (state) => state.pages.basedRequest,
    }),
    ...mapGetters({
      itemBySlug: "itemBySlug",
      requestByItemParam: "requestByItemParam",
    }),

    /**
     * Метод получает дату категории страницы. Перед этим во VUEX state pC добавляется slug
     */
    productCategory() {
      return this.itemBySlug({
        type: this.pCRequest.type,
        slug: this.params.mainCategorySlug,
      });
    },

    templatePage() {
      return this.itemBySlug({
        type: this.pagesRequest.type,
        slug: this.params.mainCategorySlug,
      });
    },

    total() {
      if (isEmpty(this.productCategory)) return;
      return this.productCategory.count;
    },
  },

  methods: {
    ...mapMutations({
      SET_SINGLE_PARAM: "SET_SINGLE_PARAM",
    }),
    ...mapActions({
      getSingleBySlug: "getSingleBySlug",
    }),
    async getTemplatePage() {
      this.getSingleBySlug({
        basedRequest: this.pagesRequest,
        params: { slug: this.params.mainCategorySlug },
      });
    },
    async getProductCategory() {
      if (isEmpty(this.productCategory)) {
        const returned = await this.getSingleBySlug({
          basedRequest: this.pCRequest,
          params: { slug: this.params.mainCategorySlug },
        });
      }
    },
  },
  /**
   * Маршрут предоставляет slug, который используется для получения категории. Полученный slug записывается
   * в basedRequest productsCategories. Далее он перезаписывается при переходе на другие категории, в том числе
   * дочернего уровня
   */
  created() {
    this.getTemplatePage(this.params.mainCategorySlug);
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
