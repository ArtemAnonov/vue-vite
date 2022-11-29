<template>
  <div class="revealing" :class="state.visible ? 'revealing_active' : ''" @click.stop>
    <slot></slot>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import popupRevealingMixin from "@/mixins/popupRevealingMixin";
export default {
  components: {},
  props: {

  },
  mixins: [popupRevealingMixin],
  data() {
    return {

    };
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

<style scoped lang="scss">
.revealing {
  position: relative;

  &_active {}






}
</style>
