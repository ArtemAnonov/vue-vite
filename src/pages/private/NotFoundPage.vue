<template>
  <MainPageNode :pageHeadNodeShow="false">
    <template #page-main>
      <ContainerNode>
        <div class="not-found">
          <div class="not-found__text">Для следющего пути</div>
          <div class="not-found__path">
            {{ location }}
          </div>
          <div class="not-found__text">не существует маршрута!</div>
          <ButtonNode buttonStyle="dark" @click="$router.push('/')"
            >Вернуться на Главную</ButtonNode
          >
        </div>
      </ContainerNode>
    </template>
  </MainPageNode>
</template>

<script>
import MainPageNode from "@/components/structure/MainPageNode.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    MainPageNode,
  },
  data() {
    return {
      location: "",
    };
  },
  computed: {
    ...mapState({
      browserReady: (state) => state.common.browserReady,
    }),
  },
  watch: {
    browserReady: {
      handler(newValue) {
        if (newValue) {
          this.location = window.location.href;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.not-found {
  padding: 3rem 0 3rem 0;
  &__text {
    margin-bottom: 1rem;
    &:last-child {
    }
  }
  &__path {
    border-top: 1px solid #868686;
    border-bottom: 1px solid #868686;
    margin-bottom: 1rem;
    color: #868686;
    padding: 0.5rem 0 0.5rem 0;
  }
}
</style>