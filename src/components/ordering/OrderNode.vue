<template>
  <article
    class="order">
    <div class="order__block">
      <h2 class="order__title">
        Заказ №{{ order.id }} от {{ order.date_created.getDate() }}
        {{ handleMonth(order.date_created.getMonth()) }}
        {{ order.date_created.getFullYear() }} г.
      </h2>
      <div class="order__status">{{ order.status }}</div>
    </div>
    <div class="order__block">
      <div class="">Товаров: {{ order.line_items.length }}</div>
      <ul class="order__list-products">
        <li>
          <RouterLink
            v-for="product in order.line_items"
            :key="product.id"
            :to="`${'/product/' + product.slug}`"
          >
            <article class="order__product product-order">
              <div class="product-order__image">
                <img :src="product.image.src"
                  alt="" >
              </div>
              <div class="product-order__props">
                <div class="product-order__prop product-order__brand">
                  BRAND
                </div>
                <div class="product-order__prop">{{ product.name }}</div>
                <div class="product-order__prop">Размер: 37</div>
                <div class="product-order__prop product-order__price">
                  {{ product.total }} руб
                </div>
              </div>
            </article>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="order__block">
      <ul class="order__list-props">
        <li class="order__prop">
          <span class="order__prop-key">Стоимость заказа</span>
          <div class="order__prop-value">{{ order.total }} руб</div>
        </li>
      </ul>
    </div>
    <ButtonNode :disabled="true"
      @click="openPaymentPage(order.payment_url)"
    >Оплатить</ButtonNode
    >
  </article>
</template>

<script>
import { handleMonth } from "@/api/utils.js";

export default {
  props: {
    order: {
      type: Object,
      reqired: true,
    },
  },
  setup() {
    return {
      handleMonth,
    };
  },

};
</script>

<style lang="scss">
  .order {
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  padding: 40px;
  margin-bottom: 40px;
  // .order__block
  &__block {
    &:nth-child(2),
    &:nth-child(3) {
      display: block;
      border-top: 1px solid #f1f1f1;
      padding-top: 20px;
      margin-top: 20px;
    }
    &:nth-child(3) {
      margin-bottom: 2rem;
    }
  }
  // .order__title
  &__title {
    margin: 0 0 20px;
  }
  // .order__status
  &__status {
    color: #00b477;
    font-size: 1.4rem;
  }
  // .order__list-products
  &__list-products {
  }
  // .order__list-props
  &__list-props {
  }
  // .order__prop
  &__prop {
    display: flex;
  }
  // .order__prop-key
  &__prop-key {
    padding-right: 40px;
    color: rgba(0,0,0,.5);
    font-size: .86667rem;
    line-height: 1.06667rem;
    white-space: nowrap;
  }
  // .order__prop-value
  &__prop-value {
    font-weight: 700;
    font-size: 1.13333rem;
    line-height: 1.4rem;
  }

  .product-order {
    position: relative;
    display: flex;
    width: 240px;
    padding: 10px 10px 20px;
    transition: opacity 0.1s;
    background: transparent;
    &:hover {
      background: #f7f7f7;
    }
    // .product-order__image
    &__image {
      position: relative;
      display: block;
      flex-shrink: 0;
      width: 66px;
      background-repeat: no-repeat;
      background-position: top;
      background-size: contain;
      img {
        display: block;
        width: 100%;
        height: auto;
        max-width: 100%;
        margin: 0 auto;
      }
    }
    // .product-order__props
    &__props {
      padding-left: .8rem;

    }

    // .product-order__prop
    &__prop {
      display: block;
      margin-bottom: 10px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.86667rem;
      line-height: 1.06667rem;
      color: #868686;
    }

    // .product-order__brand
    &__brand {
      font-weight: 400;
      color: inherit;
      display: block;
      line-height: 1rem;
      line-height: 1.2rem;
      margin-bottom: 5px;
    }
    // .product-order__name
    &__name {
    }
    // .product-order__size
    &__size {
    }
    // .product-order__price
    &__price {
      color: inherit;
      font-size: 1.33333rem;
      display: block;
      margin-top: 35px;
      font-weight: 700;
      line-height: 1.2rem;
    }
  }
}
</style>
