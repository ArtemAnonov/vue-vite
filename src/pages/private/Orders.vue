<template>
  <ProfilePageNode>
    <template #content>
      <OrdersListNode />
    </template>
  </ProfilePageNode>
</template>

<script>
import OrdersListNode from "@/components/profile/OrdersListNode.vue";
import ProfilePageNode from "@/components/profile/ProfilePageNode.vue";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { useStore } from "vuex";
export default {
  components: {
    OrdersListNode,
    ProfilePageNode,
  },
};
</script>

<style>
</style>