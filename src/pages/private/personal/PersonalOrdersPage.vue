<template>
  <ProfilePageNode>
    <template #content>
      <OrdersListNode />
    </template>
  </ProfilePageNode>
</template>

<script>
import OrdersListNode from "@/components/personal/OrdersListNode.vue";
// import ProfilePageNode from "@/components/personal/ProfilePageNode.vue";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { useStore } from "vuex";
export default {
  components: {
    OrdersListNode,
    // ProfilePageNode,
  },
};
</script>

<style>
</style>