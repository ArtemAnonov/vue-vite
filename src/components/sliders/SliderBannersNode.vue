<template>
  <section class="slider-banners" :class="$attrs.class">
    <ContainerNode :containerStylesOff="containerStylesOff">
      <div class="slider-banners__body">
        <div class="slider-banners__items">
          <slot name="banner-category-name"></slot>
          <arrows-slider-node
            v-show="banners?.length !== 0"
            :identificator="identificator"
          ></arrows-slider-node>
        </div>
        <swiper
          v-bind="$attrs"
          :modules="modules"
          :loop="true"
          :navigation="{
            prevEl: `.${identificator}__arrow_prev`,
            nextEl: `.${identificator}__arrow_next`,
          }"
          :freeMode="{
            enabled: true,
            sticky: true,
          }"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-if="banners?.length === 0">
            <preload-wrap-node :targetPreloadElement="true">
              <div class="slider-banners__image">
                <img src="" alt="" />
              </div>
            </preload-wrap-node>
          </swiper-slide>
          <swiper-slide @click="$router.push('/blog-page')" v-for="banner in banners" :key="banner.id">
            <!-- Если src картинки равен пустой строке, то отображается псевдоэлемент -->
            <preload-wrap-node
              :targetPreloadElement="
                bannerOneMedia(banner.featured_media) === ''
              "
            >
              <div class="slider-banners__image">
                <picture>
                  <source srcset="" type="image/webp" />
                  <source srcset="" type="image/jpeg" />
                  <img :src="bannerOneMedia(banner.featured_media)" alt="" />
                </picture>
              </div>
              <slot name="banner-title" :banner="banner"></slot>
            </preload-wrap-node>
          </swiper-slide>
        </swiper>
      </div>
    </ContainerNode>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { isEmpty } from "lodash-es";

import ArrowsSliderNode from "@/components/sliders/ArrowsSliderNode.vue";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
/**
 * (import.meta.env.VITE_LIKE_A_SPA) - Каждый requests.request соостветсвует экземпляру компонента
 * Баннеры запускаются по очереди так же меняются и banner_categories. Возможно использование более одной banner_categories?
 * но по факту используется одна категория. Блоки вызывают запрос с разным значением banner_categories
 * по очереди. Таким образом данный компонент поддерживает единовременную загрузку заданного количества слайдов
 *
 * Баннеры и Медиафайлы загружаются исходя из необходимых ids, которые берутся не из
 * даты запросов, а из хранилища. Такой подход позволяет избежать перезаписывания локальных
 * свойств после перерисовки, из-за которой геттеры отрабатывают неправильно и шаблоны пропадают - отрисовка ломается
 *
 * (! import.meta.env.VITE_LIKE_A_SPA)
 *
 *
 */
export default {
  inheritAttrs: false,
  components: {
    Swiper,
    SwiperSlide,
    ArrowsSliderNode,
  },
  props: {
    bannerCategoryId: Number,

    identificator: String,
    containerStylesOff: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      itemById: "itemById",
      itemsInclude: "itemsInclude",
      requestByParam: "requestByParam",
      mapItemsByKey: "mapItemsByKey",
      itemsMatchedByCallback: "itemsMatchedByCallback",
    }),
    ...mapState({
      bannersRequest: (state) => state.banners.basedRequest,
      mediaRequest: (state) => state.media.basedRequest,
    }),
    /**
     * (VITE_LIKE_A_SPA)
     *    Метод запрашивает ids баннеров, полученных для конкретного экземпляра компонента
     * (! VITE_LIKE_A_SPA)
     */
    banners() {
      if (import.meta.env.VITE_LIKE_A_SPA) {
        if (this.bannersIds()) {
          return this.itemsInclude(this.bannersRequest, this.bannersIds());
        } else return [];
      } else {
        return this.itemsMatchedByCallback(
          this.bannersRequest,
          {
            banner_categories: [this.bannerCategoryId],
          },
          function (banner, keys, params, items, approved) {
            if (banner.banner_categories[0] === params.banner_categories[0]) {
              approved = true;
            }
            return approved;
          }
        );
      }
    },
    /**
     * ONLY (VITE_LIKE_A_SPA)
     */
    mediaBanners() {
      return this.itemsInclude(this.mediaRequest, this.mediaIds());
    },
  },
  methods: {
    ...mapActions({
      getItems: "getItems",
    }),
    ...mapMutations({
      SET_INCLUDE: "SET_INCLUDE",
      setBannerCategoriesIds: "banners/setBannerCategoriesIds",
    }),
    /**
     * ONLY (VITE_LIKE_A_SPA)
     */
    async getBanners() {
      this.setBannerCategoriesIds(this.bannerCategoryId);
      const banners = await this.getItems(this.bannersRequest);

      if (isEmpty(banners.response)) return;

      this.SET_INCLUDE({
        type: this.mediaRequest.type,
        value: this.mediaIds(),
      });
      const media = await this.getItems(this.mediaRequest);
    },

    bannerOneMedia(value) {
      let item;
      if (import.meta.env.VITE_LIKE_A_SPA) {
        item = this.mediaBanners[value]
      } else {
        item = this.itemById({type: this.mediaRequest.type, id: value})
      }
      return item.guid.rendered || ""
    },
        /**
     * ONLY (VITE_LIKE_A_SPA)
     */
    bannersIds() {
      let request = this.requestByParam(this.bannersRequest, {
        param: "banner_categories",
        value: this.bannerCategoryId,
      });
      return request?.data;
    },
        /**
     * ONLY (VITE_LIKE_A_SPA)
     */
    mediaIds() {
      return this.mapItemsByKey(this.bannersRequest, "featured_media");
    },
  },
  created() {
    if (import.meta.env.VITE_LIKE_A_SPA) {
      this.getBanners();
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
.slider-banners {
  // min-height: 80vh;

  @media (max-width: ($md2+px)) {
    .slider-arrows {
      display: none;
    }
  }
  &__body {
    padding: 2.6666666667rem 0;
    position: relative;
  }

  &__image {
    cursor: pointer;
    position: relative;
    padding-bottom: 40%;
    // @include adaptiv-value("width",1000, 100, 0);
    img {
      max-width: 100%;
      object-fit: cover;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  .swiper-wrapper {
    // padding-bottom: 40%;
  }
  .swiper {
    padding-bottom: 2rem;
  }

  .slider-arrows {
    position: absolute;
    right: 2rem;
    bottom: 6rem;
    top: auto;
    left: auto;
  }

  .swiper-pagination {
    bottom: 0;
    // bottom: 2.6rem;
    // position: absolute;
    .swiper-pagination-bullet {
      position: relative;
      border-radius: 0;
      top: 50%;
      left: 0;
      width: 5rem;
      height: 0.13rem;
      @media (max-width: ($md3+px)) {
        width: 3rem;
      }
      &::after {
        width: 0;
        transition: width 5s;
        content: "";
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        // background-color: #d8d8d8;
      }
      &.swiper-pagination-bullet-active {
        background-color: #d8d8d8;
        &::after {
          width: 100%;
          background-color: #231f20;
        }
      }
    }
  }
}
</style>
