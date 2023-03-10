<template>
  <MainPageNode>
    <template #page-main>
      <div class="single">
        <div class="single__body">
          <div class="single__main">
            <ContainerNode>
              <div class="single__columns">
                <div class="single__content">
                  <SliderSingleNode
                    :images="product?.images"
                  />
                </div>
                <div class="single__sidebar sidebar-single">
                  <div class="sidebar-single__item sidebar-single__top">
                    <h1 class="sidebar-single__title">
                      {{ attribute(1)?.options[0] }}
                      <span>{{ product?.name }}</span>
                    </h1>
                    <div class="sidebar-single__brand">
                      <span>{{ attribute(1)?.options[0] }}</span>
                    </div>
                  </div>
                  <div class="sidebar-single__item sidebar-single__sizes">
                    <div class="sidebar-single__sizes-top">
                      <button>Определить размер</button>
                    </div>
                    <ul>
                      <li
                        v-for="(index, size) in attribute(4)?.options"
                        :key="index"
                      >
                        <ButtonNode
                          :class="
                            cartPayload.params.variations[0].value &&
                              attribute(4)?.options[size] ===
                              cartPayload.params.variations[0].value
                              ? 'checked'
                              : ''
                          "
                          @click="
                            setVariation(
                              attribute(4),
                              attribute(4)?.options[size]
                            )
                          "
                        >{{ attribute(4)?.options[size] }}</ButtonNode
                        >
                      </li>
                    </ul>
                  </div>

                  <ProductPricesNode
                    class="sidebar-single__item sidebar-single__prices"
                    :pricesObject="product"
                    :customOptions="{
                      percentSale: true,
                      brackets: true,
                    }"
                  />
                  <div class="sidebar-single__item sidebar-single__actions">
                    <ButtonNode
                      class="
                        sidebar-single__addtocart
                        button button_dark
                        cart-btn_textabele
                      "
                      :resolver="{ func: updateCart, payload: cartPayload }"
                    >Купить</ButtonNode
                    >
                    <!--  @errorValidation="errorValidation" -->
                    <!-- icon -->
                    <ButtonWishlistNode class="sidebar-single__wishlist"
                      :resolver="{
                        func: updateWishlist,
                        payload: wishlistPayload,
                      }"/>

                  </div>
                  <SocialNetworksNode
                    class="sidebar-single__item"
                  />
                </div>
              </div>
              <div class="single__rows">
                <div class="single__row single__data data-single">
                  <div class="data-single__info">
                    <h2 class="data-single__title">Информация о товаре</h2>
                    <ul class="data-single__list">
                      <li
                        v-for="(attr, index) in product?.attributes"
                        :key="index"
                      >
                        <span class="data-single__name">{{ attr.name }}</span>
                        <ul class="data-single__values">
                          <li
                            v-for="(term, index) in attr.options"
                            :key="index"
                            class="data-single__value"
                          >
                            {{ term }}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="single__row">
                  <SliderProductsSectionNode
                    slug="single-product-concomitant"
                    title="Сопутствующие товары"
                    :productsCategoryId="20"
                    :breakpoints="slidersData.breakpoints.singleMain"
                  />
                </div>
              </div>
            </ContainerNode>
          </div>
          <div class="single__bottom">
            <SliderProductsSectionNode
              slug="single-product-additional"
              title="С этим товаром также покупают"
              :productsCategoryId="20"
            />
            <SliderBannersFashionBlogNode/>
            <DistributionNode/>
          </div>
        </div>
      </div>
    </template>
  </MainPageNode>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { isEmpty } from "lodash-es";

import Sticky from "sticky-js";
import SliderBannersFashionBlogNode from "@/components/sliders/SliderBannersFashionBlogNode.vue";
import SliderProductsSectionNode from "@/components/sliders/SliderProductsSectionNode.vue";
import SliderSingleNode from "@/components/sliders/SliderSingleNode.vue";
import SocialNetworksNode from "@/components/SocialNetworksNode.vue";
import DistributionNode from "@/components/DistributionNode.vue";
import ProductPricesNode from "@/components/product/ProductPricesNode.vue";
import ButtonWishlistNode from "@/components/product/ButtonWishlistNode.vue";

export default {
  components: {
    SliderBannersFashionBlogNode,
    SliderSingleNode,
    SliderProductsSectionNode,
    SocialNetworksNode,
    DistributionNode,
    ProductPricesNode,
    ButtonWishlistNode,
  },
  props: {
    params: Object,
  },
  data() {
    return {
      /**
       * При обработке variations мутируют до пустого массива
       */
      cartPayload: {
        routeBase: "cart/add-item",
        params: {
          id: null,
          quantity: 1,
          variations: [
            {
              name: "size",
              value: "",
            },
          ],
        },
      },

      slidersData: {
        breakpoints: {
          singleMain: {
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          },
        },
      },
      // errorValidationShow: false,
    };
  },
  computed: {
    ...mapGetters({
      singleBySlug: "singleBySlug",
    }),
    ...mapState({
      productsRequest: (state) => state.products.basedRequest,
    }),
    product() {
      return this.singleBySlug({
        type: this.productsRequest.type,
        slug: this.params.mainPath[this.params.mainPath.length - 1],
      });
    },
    wishlistPayload() {
      return {
        product_id: this.product.id,
      };
    },
    // productSlug() {
    //   return this.params[this.params.length - 1];
    // },
  },
  watch: {
    product(newValue) {
      if (!isEmpty(newValue)) {
        this.cartPayload.params.id = newValue.id;
      }
    },
  },
  created() {
    this.cartPayload.params.id = this.product.id;
  },
  mounted() {
    // eslint-disable-next-line no-new
    new Sticky(".sidebar-single", {
      wrap: false,
      marginTop: 100,
      marginBottom: 100,
      stickyFor: 1024,
      stickyContainer: ".single__main",
    });
  },
  methods: {
    ...mapMutations({
      setCategoryId: "filter/setCategoryId",
    }),
    ...mapActions({
      getSingleBySlug: "getSingleBySlug",
      updateCart: "cart/updateCart",
      updateWishlist: "wishlist/updateWishlist",
    }),
    attribute(attrId) {
      if (isEmpty(this.product)) return null;
      return this.product.attributes.find((i) => i.id === attrId);
    },
    /**
     * Метод для вариативных продуктов (заменен фикцией)
     */
    setVariation(attribute, value) {
      const settedValue = this.cartPayload.params.variations[0].value;
      this.cartPayload.params.variations[0].value = settedValue ? "" : value;
    },
  },
};
</script>

<style lang="scss">
.single {
  &__body {
  }

  &__main {
  }

  &__content {
    min-width: 0; // for swiper
  }

  &__columns {
    position: relative;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    min-height: 400px;
    @media (max-width: ($md1+px)) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: ($md2+px)) {
      grid-template-columns: 0.8fr 1.2fr;
    }
    @media (max-width: ($md3+px)) {
      grid-template-columns: 1fr;
    }
  }

  &__rows {
    width: 57%;
    @media (max-width: ($md1+px)) {
      width: 49.5%;
    }
    @media (max-width: ($md2+px)) {
      width: 100%;
    }
  }
}

.sidebar-single {
  align-self: start;

  .product-prices {
    &__costs {
      display: inline-flex;
      align-items: baseline;
    }
    &__sale-price {
      font-size: 2rem;
      font-weight: 700;
      white-space: nowrap;
    }
    &__regular-price {
      margin-left: 10px;
      font-weight: 700;
      white-space: nowrap;
      &_only {
        margin: 0;
        font-size: 2rem;
      }
    }
  }

  &__top {
    position: relative;
  }

  &__title {
    span {
      display: block;
      padding-top: 5px;
      color: #868686;
      font-size: 1rem;
      line-height: 20px;
    }
  }

  &__item {
    margin-bottom: 1.3rem;
  }

  &__brand {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 1rem;
    border: 1px solid #f1f1f1;
    background-color: #fff;
    overflow: hidden;
    height: 100%;
    display: flex;
    align-items: center;
    span {
      color: #868686;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      display: block;
      text-align: center;
      flex: 1 1 auto;
    }
  }

  &__sizes {
    button {
      height: 40px;
      line-height: 39px;
      color: #5073a2;
      display: block;
    }
    ul {
      display: inline-grid;
      grid-auto-flow: column;
      gap: 0.5rem;
      li {
        button {
          color: #231f20;
          line-height: 100%;
        }
      }
    }
  }

  &__sizes-top {
    display: grid;
    grid-auto-flow: column;
    // grid-template-columns: 1fr 1fr;
    justify-items: start;
    align-items: center;
  }

  &__prices {
    display: inline-flex;
    align-items: center;
  }

  &__actions {
    display: flex;
    height: 4rem;

    button {
      min-height: 100% !important;
    }
  }

  &__addtocart {
    width: 100%;
    font-size: 1.4rem;
  }

  &__wishlist {
    font-size: 1.2rem;
    width: 4rem;
    margin-left: 1rem;
    &::before {
      // color: #000 !important;
    }
  }
}

.data-single {
  &__info {
    margin-bottom: 2rem;
  }

  &__title {
    margin-bottom: 20px;
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 1rem;

    li {
      display: grid;
    }
  }

  &__name {
    font-size: 1rem;
    line-height: 20px;
    color: #000;
    padding-bottom: 1px;
    opacity: 0.5;
  }

  &__values {
    display: inline-flex;
  }

  &__value {
    font-size: 1rem;
    line-height: 20px;
    color: #000;
    margin-right: 0.5rem;
  }
}
</style>
