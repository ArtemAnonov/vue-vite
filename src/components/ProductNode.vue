<template>
  <PreloadWrapNode :targetPreloadElement="product"
    :paddingBottom="product ? 0 : 146">
    <article class="product"
      :class="`product_${viewType}`">
      <div class="product__body">
        <div class="product__image"
          @click="routeToSingleProduct(product)">
          <img v-if="product.images?.[3]"
            :src="product.images?.[3].src"
            alt="" >
          <img v-if="product.images?.[0]"
            :src="product.images?.[0].src"
            alt="" >
        </div>
        <div class="product__content">
          <div class="product__brand">{{ brand(1) }}</div>
          <h3 class="product__title"
            @click="routeToSingleProduct(product)">
            <button>
              {{ product.name }}
            </button>
          </h3>
          <ProductPricesNode
            class="product__prices"
            :pricesObject="product"
          />
        </div>
        <div class="product__actions">
          <ButtonWishlistNode :resolver="{ func: updateWishlist, payload: wishlistPayload }"
            class="product__wishlist minimal" />
          <ul class="product__colors">
            <li
              v-for="(color, index) in colorsRGBList"
              :key="index"
              class="product__color"
              :style="{ background: `#${color}` }"
            />
          </ul>
          <ul class="product__sizes">
            <li v-for="(index, size) in sizes(4)"
              :key="index">
              {{ sizes(4)?.[size] }}
            </li>
          </ul>
        </div>
      </div>
    </article>
  </PreloadWrapNode>

</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { isEmpty } from "lodash-es";

import ProductPricesNode from "@/components/product/ProductPricesNode.vue";
import ButtonWishlistNode from "@/components/product/ButtonWishlistNode.vue";

export default {
  components: {
    ProductPricesNode, ButtonWishlistNode,
  },
  props: {
    /**
     * Тип отображения, отвечает за стили
     */
    viewType: {
      type: String,
      default: "slider",
      validator: (value) => ["slider", "catalog", "wishlist"].includes(value),
    },
    product: {
      type: Object,
      required: true,
    },
    test: {
      type: String,
    },
  },

  data() {
    return {
      params: {
        id: this.$props.product.id,
        quantity: 1,
        variations: [],
      },
      colorsRGBList: [],
    };
  },
  computed: {
    ...mapGetters({
      itemsMatchedOneProperty: "itemsMatchedOneProperty",
      singleProductAttribute: "products/singleProductAttribute",
      productContanedInWishlist: "wishlist/productContanedInWishlist",
    }),
    ...mapState({
      colorsRequest: (state) => state.productsTermsColors.basedRequest,
    }),
    wishlistPayload() {
      return {
        product_id: this.product.id,
        // variation_id, //
        // meta: [] //
      };
    },
  },
  mounted() {
    this.colorsRGB();
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      updateWishlist: "wishlist/updateWishlist",
      routeToSingleProduct: "products/routeToSingleProduct",
    }),

    colorsRGB() {
      if (isEmpty(this.product)) return;
      const colors = [];
      const productColorNames = this.product.attributes.find(
        (el) => el.id === 5,
      ).options;
      productColorNames.forEach((element) => {
        const color = this.itemsMatchedOneProperty(
          { type: this.colorsRequest.type },
          { name: element },
        );
        colors.push(color);
      });
      /**
       * Слаг названия цвета включает в себя rgb - он следует после последнего вхождения
       * подстроки (-)
       */
      colors.forEach((element) => {
        if (!isEmpty(element[0])) {
          let str = element[0].slug;
          const pos = str.lastIndexOf("-");
          str = str.slice(pos + 1);
          this.colorsRGBList.push(str);
        }
      });
    },
    brand(attrId) {
      return this.singleProductAttribute({
        productId: this.product?.id,
        attrId,
      })?.options?.[0];
    },
    /**
     *
     * @param {*} attrId
     * @return {array} - Options
     */
    sizes(attrId) {
      return this.singleProductAttribute({
        productId: this.product?.id,
        attrId,
      })?.options;
    },
  },

};
</script>

<style lang="scss">
.product {
  display: grid;
  grid-template: auto auto / 1fr;
  justify-items: center;
  position: relative;
  padding: 0 0 2rem 0;
  margin: 0 0 1rem 0;
  &_catalog {
    // padding: 0 0.66rem 3rem 0.66rem;

    // .product__content {
    //   justify-items: start;
    // }
    .product__sizes {
      display: block !important;
    }
    .product-prices__procent-sale {
      left: 20px;
    }
  }

  @media (any-hover: hover) {
    &:hover {
      &.catalog-type {
        .product__colors {
          display: flex;
        }
      }
      .product__wishlist {
        color: $cMain;
        opacity: 1;
      }
      &::before {
        opacity: 1;
      }
      &_catalog {
        .product__image {
          img {
            &:nth-child(2) {
              opacity: 0;
            }
          }
        }
      }
      .product__sizes {
        opacity: 1;
      }
    }
  }

  &::before {
    content: "";
    position: absolute;
    // top: -0.66rem;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 0.2666666667rem 0.3333333333rem rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: opacity 0.1s;
    z-index: -1;
    pointer-events: none;
  }

  &__body {
  }

  &__image {
    position: relative;
    cursor: pointer;
    img {
      height: 100%;
      width: 100%;

      // object-fit: cover;
      &:nth-child(1) {
        position: absolute;
      }

      &:nth-child(2) {
        position: relative;
      }
    }
  }

  &__content {
    padding: 0 0.66rem;
    min-width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 0.8rem;
    font-size: 1.13333rem;
    line-height: 21px;
    justify-items: start;
  }

  &__brand {
    font-size: inherit;
    margin: 0 0 0.3333333333rem;
    font-weight: 400;
    @media (max-width: ($md4+px)) {
      font-size: 0.9rem;
      margin: 0 0 -0.3333333333rem;
    }
  }

  &__title {
    margin-bottom: 0.5rem;
    height: 2.4rem;

    @media (max-width: ($md3+px)) {
      button {
        font-size: 0.86667rem;
        line-height: 1.06667rem;
      }
    }
    @media (max-width: ($md4+px)) {
      margin-bottom: 0.3rem;
    }
    button {
      font-size: 1rem;
      line-height: 1.2rem;
      color: #868686;
      text-align: start;
      @media (max-width: ($md4+px)) {
        font-size: 11px;
      }
    }
  }

  &__prices {

  }

  &__regular-price {
    &_only {
      color: #231f20;
    }
  }

  &__wishlist {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before {
      flex: 1 1 auto;
    }
    @media (any-hover: hover) {
      opacity: 0;
    }
  }

  &__colors {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    li {
      border-radius: 50%;
      flex: 0 0 0.9333333333rem;
      width: 0.9333333333rem;
      height: 0.9333333333rem;
      margin: 0 0.6666666667rem 0.2666666667rem 0;
      border-radius: 50%;
      overflow: hidden;
      border: 0.0666666667rem solid #fff;
      box-shadow: 0 0.0666666667rem 0.1333333333rem 0 rgba(0, 0, 0, 0.4);
    }
  }

  &__sizes {
    display: none !important;
    position: absolute;
    // bottom: 1rem;
    padding: 0.4rem 0 0 0.66rem;
    background-color: #fff;
    transition: opacity 0.1s;
    opacity: 0;
    z-index: 2;
    display: inline-flex;

    li {
      display: inline-flex;
      font-size: 0.6666666667rem;
      line-height: 0.8rem;
      color: #868686;
      margin: 0 0.7333333333rem 0 0;
    }
  }

  .product-prices {
    &__costs {
      display: flex;
      justify-content: center;
    }

    &__sale-price {
      font-size: 0.9333333333rem;
      line-height: 1.2rem;
      font-weight: 700;
      margin: 0 5px 0 0;
      // @media (max-width: ($md4+px)) {
      //   font-size: 1rem;
      // }
    }

    &__regular-price {
      font-size: 0.9333333333rem;
      line-height: 1.2rem;
      font-weight: 400;
      text-decoration: line-through;
      // @media (max-width: ($md4+px)) {
      //   font-size: 13px;
      // }

      &_only {
        text-decoration: none;
        line-height: 1.4rem;
        font-weight: 700;
      }
    }

    &__procent-sale {
      position: absolute;
      top: 10px;
      left: 10px;
      cursor: pointer;
    }
  }

}
</style>
