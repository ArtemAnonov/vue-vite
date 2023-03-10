<template>
  <MainPageNode
    class="single-category">
    <template #page-main>
      <RouterView name="top"/>
      <ContainerNode >
        <div
          class="single-category__body">
          <CatalogSidebarNode/>
          <RouterView/>
        </div>
        <DistributionNode/>
      </ContainerNode>
      <RouterView name="bot"/>
    </template>
  </MainPageNode>
</template>

<script>

import CatalogSidebarNode from "@/components/CatalogSidebarNode.vue";
import DistributionNode from "@/components/DistributionNode.vue";

export default {

  components: {
    CatalogSidebarNode,
    DistributionNode,
  },
};
</script>

<style lang="scss">
.single-category {
  position: relative;
  &__body {
    margin: 1rem 0;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 3fr;
    @media (max-width: ($md2+px)) {
      grid-template-columns: 1fr;
    }
  }
  &__sections {
    width: 100%;
    max-width: 100%;
    min-height: 0;
    min-width: 0;
  }
}

.slider-banners-single-category {
  // margin-top: -2.6666666667rem;
}
</style>
