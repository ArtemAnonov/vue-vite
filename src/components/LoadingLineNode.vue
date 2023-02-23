<template>
  <!-- v-show="progressLoad.visible"  -->

  <!-- opacity: progressLoad.visible ? 1 : 0, -->
  <div
    class="loading-line"
    :style="{
      width: progressLoad.percent + '%',
      opacity: progressLoad.visible ? 1 : 0,
    }"
  ></div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {},
  watch: {},
  computed: {
    ...mapGetters({}),
    ...mapState({
      progressLoad: (state) => state.common.progressLoad,
    }),
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
  },
};
</script>

<style lang="scss">
.loading-line {
  transition: width 1s;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: #231f20;
}
</style>