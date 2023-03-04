<template>
  <MainPageNode :pageHeadNodeShow="false">
    <template #page-main>
      <ContainerNode>
        <TroubleNode/>
      </ContainerNode>
    </template>
  </MainPageNode>
</template>

<script>
// import MainPageNode from "@/components/structure/MainPageNode.vue";
import TroubleNode from "@/components/TroubleNode.vue";

export default {
  components: {
    // MainPageNode,
    TroubleNode,
  },
};
</script>

<style lang="scss">

</style>
