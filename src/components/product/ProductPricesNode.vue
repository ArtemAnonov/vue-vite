<template >
  <div class="product-prices">
    <div v-if="haveSale && customOptions.percentSale"
      class="product-prices__procent-sale">
      <span>-{{ procentPriceSale(pricesObject) }}%</span>
    </div>
    <div class="product-prices__costs">
      <div v-if="haveSale"
        class="product-prices__sale-price">
        {{ pricesObject?.sale_price }}<span class="product-prices__currency"> ₽</span>
      </div>
      <div class="product-prices__regular-price"
        :class="haveSale ? '' : 'product-prices__regular-price_only'">
        <span v-if="customOptions.brackets && haveSale">(</span>
        {{ pricesObject?.regular_price }}<span class="product-prices__currency"> ₽</span>
        <span v-if="customOptions.brackets && haveSale">)</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    pricesObject: Object,
    /**
     * customOptions.percentSale
     * customOptions.brackets
     */
    customOptions: {
      type: Object,
      default() {
        return {
          percentSale: true,
          brackets: false,
        };
      },
    },
  },
  computed: {
    ...mapGetters({
      procentPriceSale: "products/procentPriceSale",
    }),
    ...mapState({}),
    haveSale() {
      if (this.pricesObject?.sale_price && this.pricesObject?.sale_price !== this.pricesObject?.regular_price) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
.product-prices {
  &__procent-sale {
    text-align: center;
    display: inline-flex;
    position: relative;
    align-items: center;
    font-size: 0.86667rem;
    line-height: 1.06667rem;
    font-weight: 700;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    color: #fff;
    background-color: #d50f3b;

    span {
      flex: 1 1 auto;
      display: block;
    }
  }

  &__costs {
    display: inline-flex;

  }

  &__sale-price {
    color: #d50f3b;
  }

  &__regular-price {
    color: #868686;

    &_only {
      color: #231f20;

      // span {
      //   display: none;
      // }
    }
  }

  &__currency {

  }
}
</style>
