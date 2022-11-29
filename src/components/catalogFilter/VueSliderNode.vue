<template>
  <div class="">
    <input-node type="number" v-model.number="minPrice">
      <template #before><span>От</span></template>
      <template #after><span>руб</span></template>
    </input-node>
    <input-node type="number" v-model.number="maxPrice">
      <template #before><span>До</span></template>
      <template #after><span>руб</span></template>
    </input-node>
    <vue-slider
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
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  components: {
    VueSlider,
  },
  // emmits: ["updateApplyValidate"],
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
        // this.$emit("updateApplyValidate", this.applyValidator);
      },
    },
    maxPrice: {
      get() {
        return this.max_price;
      },
      set(value) {
        this.setMaxPrice(value);
        // this.$emit("updateApplyValidate", this.applyValidator);
      },
    },
    pointValues() {
      return [this.min_price, this.max_price];
    },
    // applyValidator() {
    //   if (this.min_price >= this.minCost && this.max_price <= this.maxCost) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
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
    getPrices() {
      let params = {
        orderby: "price",
        order: "asc",
        per_page: 1,
        _fields: ["price"],
      };
      this.getPrice(params, "Min");
      params.order = "desc";
      this.getPrice(params, "Max");
    },
    async getPrice(params, type) {
      const { request, response } = await this.mainFetchRequest({
        config: { params },
        route_base: this.productsRequest.route_base,
        apiType: this.productsRequest.apiType,
      });
      if (!response) return;

      this[`set${type}Cost`](Number(response.data[0].price));
      this[`set${type}Price`](Number(response.data[0].price));
    },
    updatePrices(newValue) {
      this.setMinPrice(newValue[0]);
      this.setMaxPrice(newValue[1]);
    },
  },
  created() {
    this.getPrices();
  },
};
</script>

<style></style>
