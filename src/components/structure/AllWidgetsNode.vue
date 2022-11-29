<template>
  <div class="widgets">
    <loading-line-node></loading-line-node>
    <popup-node class="login" name="login">
      <login-node></login-node>
    </popup-node>
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
    ...mapGetters({

    }),
    ...mapState({
      loginPopup(state) {
        return state.common.revs.login
      }
    }),
  },
  methods: {
    ...mapMutations({
      addRev: "common/addRev",
      updateRev: "common/updateRev",
    }),
    ...mapActions({

    }),
    loginPopupVisible() {
      this.updateRev({
        name: "login",
        value: this.loginPopup.visible,
      });
    },
  },
  mounted() {
    this.updateRev({
      name: "login",
      value: false,
      toggleValue: false,
    });
  },
}
</script>

<style lang="scss">

  .widgets {
    position: relative;
    z-index: 1000;
  }
</style>