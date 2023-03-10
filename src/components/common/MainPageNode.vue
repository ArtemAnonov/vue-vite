<template>
  <main v-if="templatePage"
    class="page"
    :class="{'page_product': templatePage}">

    <div v-if="pageHeadNodeShow"
      class="page__head-wrapper">
      <slot name="page-head"
        :handledPath="handledPath"
        :templatePage="templatePage">
        <PageHeadNode
          :handledPath="handledPath"
          :templatePage="templatePage"
        />
      </slot>
    </div>
    <div class="page-main"
      :class="$attrs.class">
      <slot name="page-main"/>
    </div>
  </main>
  <ContainerNode v-else>
    <TroubleNode/>
  </ContainerNode>
</template>

<script>
import { ref, watch } from "vue";
import { last } from "lodash-es";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getPathName } from "@/api/uni";
import PageHeadNode from "@/components/structure/PageHeadNode.vue";
import TroubleNode from "@/components/TroubleNode.vue";

export default {
  name: "MainPageNode",

  components: {
    TroubleNode,
    PageHeadNode,
  },
  inheritAttrs: false,
  props: {
    pageHeadNodeShow: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { state, getters } = useStore();
    const route = useRoute();
    const handledPath = ref();
    const templatePage = ref();
    watch(route, () => {
      handledPath.value = getPathName(route.path, "array");
      if (!handledPath.value.last) {
        templatePage.value = getters.singleBySlug({
          type: state.pages.basedRequest.type,
          slug: last(handledPath.value.items) || "home",
        });
      } else {
        templatePage.value = true;
      }
    }, { immediate: true });

    return {
      handledPath,
      templatePage,
    };
  },
};
</script>

<style lang="scss">
.page {
  min-height: 50vh;
  flex: 1 1 auto;
  position: relative;
  // margin-bottom: 3rem;

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
