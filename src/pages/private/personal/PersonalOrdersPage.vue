<template>
  <PreloadWrapContainerNode
    v-slot="slotProps"
    class="order"
    :quantityPreloadElements="4"
    :iterable="handledOrders"
  >
    <OrderNode :order="slotProps.item"/>
  </PreloadWrapContainerNode>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PreloadWrapContainerNode from "@/components/structure/PreloadWrapContainerNode.vue";
import OrderNode from "@/components/ordering/OrderNode.vue";

export default {
  components: {
    PreloadWrapContainerNode,
    OrderNode,
  },
  async setup() {
    const store = useStore();
    const { basedRequest, items } = store.state.orders;

    store.dispatch("getItems", { basedRequest });

    // const handledOrders = computed(() => items);

    function openPaymentPage(url) {
      window.open(url);
    }

    return {
      openPaymentPage,
      handledOrders: computed(() => items),
    };
  },
};
</script>

<style lang="scss">

</style>
