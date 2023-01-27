<template>
  <main class="page" :class="templatePage ? '' : 'page_product'">
    <slot name="page-head">
      <div class="page__head-wrapper" v-if="pageHeadNodeShow">
        <PageHeadNode :title="templatePage ? templatePage.title.rendered : ''" :category="category"
          :additionalTitle="additionalTitle"></PageHeadNode>
      </div>
    </slot>
    <slot name="page-main"></slot>
  </main>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import PageHeadNode from '@/components/structure/PageHeadNode.vue'
export default {
  name: "MainPageNode",
  components: {
    PageHeadNode,
  },
  props: {
    pageHeadNodeShow: {
      type: Boolean,
      default: true,
    },
    templatePage: Object,
    category: Object,
    additionalTitle: String,
  },
  data() {
    return {};
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
.page {
    min-height: 50vh;
  flex: 1 1 auto;
  position: relative;

  @media (max-width: ($md2+px)) {
    padding: 0 10px;
  }

  &__head-wrapper {
    min-height: 9.57rem;
    border-bottom: 0.0666666667rem solid #d8d8d8;
  }

  &_product {
    .page__head-wrapper {
      min-height: 5rem !important;
      border-bottom: 0.0666666667rem solid transparent;
    }
  }
}

// button {
//   padding: 0 30px;
//   font-size: 1.4rem;
//   background-color: #231f20;
//   color: #fff;
//   border-color: transparent;
//   .loading {
//     // background-color: #231f20;
//   }

//   &:disabled {
//     background-color: #584d50;
//   }
// }
</style>
