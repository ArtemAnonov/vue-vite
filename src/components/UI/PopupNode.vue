<template>
  <div v-show="popup.visible" class="popup" @click="popupVisability">
    <div @click.stop class="popup__wrapper">
      <div class="popup__inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import popupRevealingMixin from "@/mixins/popupRevealingMixin";
export default {
  name: "popup-node",
  components: {},
  mixins: [popupRevealingMixin],
  props: {},
  data() {
    return {
      popups: {
        [this.name]: {
          default: true,
          visible: false,
          off: true,
        },
      },
    };
  },
  watch: {
    popup: {
     handler(){
      this.setScrollFlag({ value: !this.popup.visible, toggle: false });
     },
     deep: true
  }
  },  
  computed: {
    ...mapGetters({}),
    ...mapState({
      popup(state) {
        return state.common.revs[this.name];
      },
    }),
  },
  methods: {
    ...mapMutations({
      addRev: "common/addRev",
      setScrollFlag: "common/setScrollFlag",
    }),
    ...mapActions({}),
    /**
     * (!) Скролл-дисеблер прописан в двух метсах
     */
    popupVisability() {
      this.updateRev({
        name: this.name,
        value: this.popup.visible,
      });

    },
  },
  created() {
    this.addRev(this.popups);
  },
};
</script>

<style lang="scss">
.popup {
  transition: 0.5s;
  z-index: 100;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.747);
  overflow: auto;
  height: 100%;
  width: 100%;
  position: fixed;

  &__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: #fff;
    // display: table;
    height: 80%;
    width: 80%;
  }
  &__inner {
    // display: table-cell;
    // vertical-align: middle;
  }

  &__close {
    position: absolute;
    border-radius: 50%;
    top: 18px;
    right: 15px;
    width: 18px;
    height: 18px;
    z-index: 1;
  }
}
</style>
