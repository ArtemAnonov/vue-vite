<template>
  <div class="filter-prices">
    <div class="filter-prices__inputes">
      <InputNode v-model.number="minPrice"
        inputmode="numeric">
        <template #before><span>От:</span></template>
        <template #after><span>руб</span></template>
      </InputNode>
      <InputNode v-model.number="maxPrice"
        inputmode="numeric">
        <template #before><span>До:</span></template>
        <template #after><span>руб</span></template>
      </InputNode>
    </div>
    <VueSlider
      :modelValue="pointValues"
      :min="minCost"
      :max="maxCost"
      :enable-cross="false"
      @update:modelValue="updatePrices"
    />
  </div>
</template>

<script>
import {
  mapState, mapGetters, mapMutations, mapActions,
} from "vuex";
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";

export default {
  components: {
    VueSlider,
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      minCost: (state) => state.filter.minCost,
      maxCost: (state) => state.filter.maxCost,
      min_price: (state) => state.filter.params.min_price,
      max_price: (state) => state.filter.params.max_price,
      productsRequest: (state) => state.products.basedRequest,
    }),
    minPrice: {
      get() {
        return this.min_price;
      },
      set(value) {
        this.setMinPrice(value);
      },
    },
    maxPrice: {
      get() {
        return this.max_price;
      },
      set(value) {
        this.setMaxPrice(value);
      },
    },
    pointValues() {
      return [this.min_price, this.max_price];
    },
  },
  created() {
    if (import.meta.env.VITE_LIKE_A_SPA) {
      this.getPrices();
    }
  },
  methods: {
    ...mapMutations({
      setMinCost: "filter/setMinCost",
      setMaxCost: "filter/setMaxCost",
      setMaxPrice: "filter/setMaxPrice",
      setMinPrice: "filter/setMinPrice",
    }),
    ...mapActions({
    }),
    updatePrices(newValue) {
      this.setMinPrice(newValue[0]);
      this.setMaxPrice(newValue[1]);
    },
  },
};
</script>

<style lang="scss">
.filter-prices {
  &__inputes {
    .input_text {
      display: flex;
      color: #868686;
      font-size: 1rem;
      line-height: 1.6666666667rem;
      margin: 0 1.3333333333rem 1.3333333333rem 2.6666666667rem;
      @media (max-width: ($md4+px)) {
        margin: 0 0.3333333333rem 1.3333333333rem 1.6666666667rem;
      }
      input {
        text-align: center;
        color: inherit !important;
        border: none;
        border-bottom: 1px solid #1e242c;
        margin: 0 0.6666666667rem;
      }
      span {
      }
    }
  }
}
.vue-slider {
  margin: 0 0.6rem 0 0.6rem;
  height: 0.1333333333rem !important;
  .vue-slider-rail {
    border-radius: 0;
  }
  .vue-slider-process {
    background: #1e242c;
  }
  // .vue-slider.vue-slider-ltr {

  // }
  .vue-slider-dot.vue-slider-dot-hover {
    height: 1.2rem !important;
    width: 1.2rem !important;
    box-shadow: none;
  }
  .vue-slider-dot-handle-focus {
    box-shadow: none;
  }
  .vue-slider-dot-handle {
    background: #1e242c;
    box-shadow: none;
  }
  .vue-slider-dot-tooltip.vue-slider-dot-tooltip-top {
    display: none !important;
  }
}
</style>
