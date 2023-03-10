<template>
  <MainPageNode>
    <template #page-head="pageHeadProps">
      <PageHeadTruncatedNode
        :templatePage="pageHeadProps.templatePage"
        :handledPath="pageHeadProps.handledPath"
        backLinkName="Назад"
      />
    </template>
    <template #page-main>
      <ContainerNode><RouterView/></ContainerNode>
    </template>
  </MainPageNode>
</template>

<script>
import PageHeadTruncatedNode from "@/components/structure/PageHeadTruncatedNode.vue";

export default {
  components: {
    PageHeadTruncatedNode,
  },
};
</script>
