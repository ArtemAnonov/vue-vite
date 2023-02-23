<template>
  <div class="widgets">
    <div class="messages">
      <MessageNode :item="message"/>
    </div>
    <LoadingLineNode/>
    <PopupNode class="login"
      :item="{ name: 'login' }">
      <TheLoginNode/>
    </PopupNode>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import TheLoginNode from "@/components/TheLoginNode.vue";
import MessageNode from "@/components/MessageNode.vue";
import LoadingLineNode from "@/components/LoadingLineNode.vue";

export default {
  components: {
    LoadingLineNode,
    TheLoginNode,
    MessageNode,
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      message: (state) => state.common.message,
    }),
  },
  methods: {
    ...mapMutations({
      setPopup: "common/setPopup",
    }),
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
