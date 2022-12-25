import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: {
    name: {
      type: String,
    },
  },
  computed: {
    ...mapState({
      state(state) {
        return state.common.revs[this.name];
      },
    }),
  },
  methods: {
    ...mapMutations({
      updateRev: "common/updateRev",
      closeRevs: "common/closeRevs",
    }),
    ...mapActions({}),
    /**
     * В closeRevs() передается name текущего компонента, ему устанавливается
     * Bollean значение на манер toggle
     */
    bodyVisible() {
      this.closeRevs(this.name);
      this.updateRev({
        name: this.name,
        value: this.state.visible,
      });
    },
  },
};
