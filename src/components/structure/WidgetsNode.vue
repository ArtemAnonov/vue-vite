<template>
  <div class="widgets">
    <div class="messages">
      <MessageNode :item="message"></MessageNode>
    </div>
    <LoadingLineNode></LoadingLineNode>
    <PopupNode class="login" :item="{ name: 'login' }">
      <LoginNode></LoginNode>
    </PopupNode>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import LoginNode from "@/components/structure/LoginNode.vue";
import MessageNode from "@/components/MessageNode.vue";
import LoadingLineNode from "@/components/LoadingLineNode.vue";
export default {
  components: {
    LoadingLineNode,
    LoginNode,
    MessageNode
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      message: (state) => state.common.message,
    }),
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
  },
};
</script>

<style lang="scss">
.widgets {
  position: relative;
  z-index: 1000;
}
</style>