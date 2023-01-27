<template>
  <div class="filter-prices">
    <div class="filter-prices__inputes">
      <InputNode inputmode="numeric" v-model.number="minPrice">
        <template #before><span>От:</span></template>
        <template #after><span>руб</span></template>
      </InputNode>
      <InputNode inputmode="numeric" v-model.number="maxPrice">
        <template #before><span>До:</span></template>
        <template #after><span>руб</span></template>
      </InputNode>
    </div>
    <VueSlider
      :modelValue="pointValues"
      @update:modelValue="updatePrices"
      :min="minCost"
      :max="maxCost"
      :enable-cross="false"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";

export default {
  components: {
    VueSlider,
  },
  data() {
    return {};
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
  methods: {
    ...mapMutations({
      setMinCost: "filter/setMinCost",
      setMaxCost: "filter/setMaxCost",
      setMaxPrice: "filter/setMaxPrice",
      setMinPrice: "filter/setMinPrice",
    }),
    ...mapActions({
      mainFetchRequest: "mainFetchRequest",
    }),
    /**
     * deprecated - получение цен благодаря продуктам - нудно при этом получать продукты с помощью WCGB
     * ONLI (VITE_LIKE_A_SPA)
     */
    // getPrices() {
    //   let params = {
    //     orderby: "price",
    //     order: "asc",
    //     per_page: 1,
    //     _fields: ["price"],
    //   };
    //   this.getPrice(params, "Min");
    //   params.order = "desc";
    //   this.getPrice(params, "Max");
    // },
    /**
     * deprecated - получение цен благодаря продуктам - нудно при этом получать продукты с помощью WCGB
     * ONLI (VITE_LIKE_A_SPA)
     */
    // async getPrice(params, type) {
    //   const { request, response } = await this.mainFetchRequest({
    //     config: { params },
    //     route_base: this.productsRequest.route_base,
    //     apiType: this.productsRequest.apiType,
    //   });
    //   if (!response) return;
    //   let price = Number(response.data[0].price);

    //   this[`set${type}Cost`](price);
    //   this[`set${type}Price`](price);
    // },
    updatePrices(newValue) {
      this.setMinPrice(newValue[0]);
      this.setMaxPrice(newValue[1]);
    },
  },
  created() {
    if (import.meta.env.VITE_LIKE_A_SPA) {
      this.getPrices();
    }
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
