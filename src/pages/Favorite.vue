<template>
  <div class="favorite">В разработке...</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters({}),
    ...mapState({}),
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
        getItems: 'getItems'
    }),
  },
  created() {

  }
};
</script>

<style>
</style>