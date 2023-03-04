<template>
  <!-- (!) -->
  <main class="page"
    :class="templatePage ? '' : 'page_product'">
    <div v-if="pageHeadNodeShow"
      class="page__head-wrapper">
      <slot name="page-head">
        <PageHeadNode
          :title="templatePage ? templatePage.title.rendered : ''"
          :navRaw="navRaw"
          :additionalTitle="additionalTitle"
        />
      </slot>
    </div>

    <div class="page-main"
      :class="$attrs.class">
      <slot name="page-main"/>
    </div>
  </main>
</template>

<script>
import PageHeadNode from "@/components/structure/PageHeadNode.vue";

export default {
  name: "MainPageNode",

  components: {
    PageHeadNode,
  },
  inheritAttrs: false,
  props: {
    pageHeadNodeShow: {
      type: Boolean,
      default: true,
    },
    templatePage: Object,

    navRaw: Object,
    additionalTitle: String,
  },
};
</script>

<style lang="scss">
.page {
  min-height: 50vh;
  flex: 1 1 auto;
  position: relative;
  &__head-wrapper {
    min-height: 8rem;
    border-bottom: 0.0666666667rem solid #d8d8d8;
  }
  &_product {
    .page__head-wrapper {
      min-height: 5rem !important;
      border-bottom: 0.0666666667rem solid transparent;
    }
  }
}
</style>
