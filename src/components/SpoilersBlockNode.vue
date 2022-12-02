<template>
  <div class="spoiler">
    <slot :spoilers="spoilers"></slot>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {

  },
  props: {
    spoilerBlockName: {
      reqired: true,
      type: String
    },
    spoilersAmount: {
      reqired: true,
      type: Number
    },
  },
  data() {
    return {
      spoilers: {}
    }
  },
  computed: {
    ...mapGetters({

    }),
    ...mapState({

    }),
    setSpoilers() {
      for (let i = 0; i < this.spoilersAmount; i++) {
        let spoilerName = this.spoilerBlockName + 'Spoiler' + (i + 1)
        this.spoilers[spoilerName] = {
          default: true,
          visible: false,
          off: false
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      addRev: "common/addRev",
      updateRev: "common/updateRev",
      closeRevs: "common/closeRevs",
    }),
    ...mapActions({

    }),
  },
  created() {
    this.addRev(this.spoilers)
  },

}
</script>

<style>

</style>