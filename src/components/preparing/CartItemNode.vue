<template>
    <div v-if="cartItem" calss="cart-item">
      <div class="cart-item__body">
        <div class="cart-item__image">
          <picture>
            <source srcset="" type="image/webp">
            <source srcset="" type="image/jpeg">
            <img :src="cartItem?.images?.[0].src" alt="">
          </picture>
        </div>
        <div class="cart-item__content">
          <div class="cart-item__brand">{{ brand(1) }}</div>
          <div class="cart-item__name">{{ cartItem?.name }}</div>
          <div class="cart-item__color">{{ color(2) }}</div>
          <div class="cart-item__size">Размер: {{ size(4) }}</div>
          <ProductPricesNode class="cart-item__prices" :pricesObject="cartItem?.prices" :customOptions="{
            percentSale: false,
            brackets: false,
          }">
          </ProductPricesNode>
        </div>
        <div class="cart-item__count">
          <CartBtnNode class="cart-item__button cart-btn_iconable icon-minus"
            :class="{ disabled: cartItem?.quantity == 1 }" :disabled="cartItem?.quantity == 1"
            :params="paramsUpdateMinusItem" route_base="cart/update-item" />
          <div class="cart-item__quantity">{{ cartItem?.quantity }}</div>
          <CartBtnNode class="cart-item__button cart-btn_iconable icon-plus" :params="paramsUpdatePlusItem"
            route_base="cart/update-item" />
        </div>
        <div class="cart-item__other">
          <div class="cart-item__bonus">+ 0 баллов</div>
          <CartBtnNode class="cart-item__button cart-item__button_trash icon-trash" :params="paramsRemoveItem"
            route_base="cart/remove-item">
          </CartBtnNode>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import CartBtnNode from '@/components/preparing/CartBtnNode.vue'
import ProductPricesNode from "@/components/product/ProductPricesNode.vue";

export default {
  components: {
    CartBtnNode,
    ProductPricesNode,

  },
  props: {
    cartItem: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      paramsRemoveItem: {
        key: this.cartItem.key,
      },
      paramsUpdateMinusItem: {
        key: this.cartItem.key,
        quantity: this.cartItem.quantity - 1,
      },
      paramsUpdatePlusItem: {
        key: this.cartItem.key,
        quantity: this.cartItem.quantity + 1,
      },
    }
  },
  computed: {
    ...mapGetters({
      singleProductAttribute: 'products/singleProductAttribute',
    }),
    ...mapState({

    }),
  },
  methods: {
    ...mapMutations({

    }),
    ...mapActions({
      getSingleById: 'getSingleById',
    }),
    /**
     * (!)
     * Логика ниже будет актуальна при вариативности товара
     */
    brand(attrId) {
      return this.singleProductAttribute({ productId: this.cartItem?.id, attrId })?.options?.[0]
    },
    color(attrId) {
      return this.singleProductAttribute({ productId: this.cartItem?.id, attrId })?.options?.[0]
    },
    size(attrId) {
      return this.singleProductAttribute({ productId: this.cartItem?.id, attrId })?.options?.[0]
    },
  },

  mounted() {
    /**
     * (!)Костыль для получения product не из корзины
     * 
     * заменено на логику в Cart.vue
     */
    // // this.getSingleById({ basedRequest: this.productsRequest, params: { id: this.cartItem.id } })
  },

}
</script>

<style lang="scss">
.cart-item {

  &__body {
    position: relative;
    display: grid;
    grid-template-columns: 6.25rem 1fr;
    column-gap: 1.25rem;
    row-gap: 0.5rem;
    padding: 0 0 .75rem;
    margin: 1.25rem 0;
    border-bottom: .0625rem solid rgba(0, 0, 0, .08);

  }

  // .cart-item__brand
  &__brand {
    font-weight: 700;
  }

  // .cart-item__size
  &__size {
    margin: 0 0 .5rem;
  }

  // .cart-item__name
  &__name {
    color: #868686;
    margin: 0 0 .75rem;

    &:hover {
      color: #231f20;
    }
  }

  // .cart-item__image
  &__image {
    position: relative;
    max-width: 6.25rem;
    height: 9.375rem;
    display: block;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-position: center;
      object-fit: cover;
    }
  }

  &__content {}

  &__other {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
  }

  &__count {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;


  }

  // .cart-item__prices
  &__prices {
    .product-prices__costs {}

    // .product-prices__sale-price
    .product-prices__sale-price {
      font-size: 1.125rem;
      line-height: 1.3125rem;
      font-weight: 700;
      color: #ea0022 !important;
    }

    // .product-prices__regular-price
    .product-prices__regular-price {
      margin: 0 0 0 .25rem;
      text-decoration: line-through;
      font-weight: normal;

      &_only {
        font-size: 1.125rem;
        line-height: 1.3125rem;
        font-weight: 700;
        margin: 0;
        text-decoration: none;
      }
    }

    .product-prices__currency {
      display: inline;
      font-weight: 400;
    }
  }

  // .cart-item__quantity
  &__quantity {
    line-height: 1.5rem;
    width: 2.375rem;
    margin: 0 .4375rem;
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 1.3125rem;
    color: #231f20;
    text-align: center;
  }

  // .cart-item__button
  &__button {
    font-size: 1.5rem;
    line-height: 1.5rem;
    color: #0a5c3d;

    // line-height: 2rem;
    &:hover {
      color: inherit;
    }

    // .cart-item__button_trash
    &_trash {
      color: #b9b9b9;

      &:hover {
        color: #ea0022;
      }
    }
  }

  &__bonus {
    font-size: .875rem;
    line-height: 1rem;
    color: #868686;
  }



}
</style>