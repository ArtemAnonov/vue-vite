<template>
  <MainPageNode :pageHeadNodeShow="false">
    <template #page-main>
      <ContainerNode>
        <TroubleNode :text="['Для следющего пути', ' не существует маршрута!']"/>
      </ContainerNode>
    </template>
  </MainPageNode>
</template>

<script>
import TroubleNode from "@/components/TroubleNode.vue";

export default {
  components: {
    TroubleNode,
  },
};
</script>

<style lang="scss">

</style>
