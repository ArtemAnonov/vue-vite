<template>
  <div class="widgets">
    <LoadingLineNode></LoadingLineNode>
    <PopupNode class="login" :item="{ name: 'login' }">
      <LoginNode></LoginNode>
    </PopupNode>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import LoginNode from "@/components/structure/LoginNode.vue";
import LoadingLineNode from "@/components/LoadingLineNode.vue";
export default {
  components: {
    LoadingLineNode,
    LoginNode,
  },
  computed: {
    ...mapGetters({}),
    ...mapState({}),
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