<template>
  <div class="pagination">
    <!-- <loading-node :loading="loading"/> -->
    <button
      v-for="(page, index) in totalPages"
      :key="index"
      :class="currentPage == page ? 'active' : ''"
      @click="changePageLocal(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: {
    type: {
      type: String,
      reqired: true,
    },
  },
  computed: {
    ...mapGetters({
      // loading: (state) => state.site.loading,
    }),
    ...mapState({
      totalPages: (state) => state.products.totalPages,
      currentPage: (state) => state.products.basedRequest.params.page,
    }),
  },

  methods: {
    ...mapMutations({}),
    ...mapActions({
      changePage: "products/changePage",
    }),
    async changePageLocal(page) {
      this.$router.push(await this.changePage(page));
    },
  },
};
</script>

<style scoped lang="scss">
.pagination {
  position: relative;
  button {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 40px;
    height: 40px;
    margin: 0 4px 10px;
    line-height: 40px;
    text-decoration: none;
    text-align: center;
    font-size: 1.13333rem;
    color: #231f20;
    border: 1px solid #d8d8d8;
    transition: box-shadow color 0.1s 0.1s;
    &.active {
      border-color: #006140;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
      pointer-events: none;
    }
    @media (any-hover: hover) {
      &:hover {
        box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);
      }
    }
  }
}
</style>
