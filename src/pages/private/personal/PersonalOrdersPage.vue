<template>
  <PreloadWrapContainerNode
    v-if="!isEmpty(orders)"
    v-slot="slotProps"
    :quantityPreloadElements="4"
    :iterable="orders"
  >
    <OrderNode :order="slotProps.item"/>
  </PreloadWrapContainerNode>
  <div v-else>У вас ещё нет заказов.</div>
</template>

<script>
import { isEmpty } from "lodash-es";
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
    // (#) - сразу показывается "нет заказов"
    store.dispatch("getItems", { basedRequest });
    function openPaymentPage(url) {
      window.open(url);
    }

    return {
      isEmpty,
      openPaymentPage,
      orders: computed(() => items),
    };
  },
};
</script>

<style lang="scss">

</style>
