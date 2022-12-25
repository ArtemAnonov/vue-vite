<template>
  <div class="product-prices">
    <div class="product-prices__procent-sale" v-if="haveSale && customOptions.percentSale">
      <span>-{{ procentPriceSale(pricesObject) }}%</span>
    </div>
    <div class="product-prices__costs">
      <div class="product-prices__sale-price" v-if="haveSale">
        {{ pricesObject?.sale_price }}<span class="product-prices__currency"> ₽</span>
      </div>
      <div class="product-prices__regular-price" :class="haveSale ? '' : 'product-prices__regular-price_only'">
        <span v-if="customOptions.brackets">(</span>
        {{ pricesObject?.regular_price }}<span class="product-prices__currency"> ₽</span>
        <span v-if="customOptions.brackets">)</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {},
  props: {
    pricesObject: Object,
    customOptions: {
      type: Object,
      default: {
        percentSale: true,
        brackets: false,
      }
    }
  },
  computed: {
    ...mapGetters({
      procentPriceSale: "products/procentPriceSale",
    }),
    ...mapState({}),
    haveSale() {
      if (this.pricesObject?.sale_price && this.pricesObject?.sale_price !== this.pricesObject?.regular_price) {
        return true
      }
    }
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
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
