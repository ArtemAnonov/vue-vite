<template>
  <MainPageNode :class="name">
    <template #page-head>
      <PageHeadNode
        :title="pageBySlug(name).title.rendered"
        :navRaw="pageBySlug(name).title.rendered"
      ></PageHeadNode>
    </template>
    <template #page-main>
      <ContainerNode>
        <Suspense>
          <template #default>
            <section class="profile-middle-content">
              <ContainerNode>
                <div class="profile-middle-content__body">
                  <div class="profile-middle-content__sidebar"></div>
                  <div class="profile-middle-content__content">
                    <slot name="content"></slot>
                  </div>
                </div>
              </ContainerNode>
            </section>
          </template>
          <template #fallback>
            <div>Loading...</div>
          </template>
        </Suspense>
      </ContainerNode>
    </template>
  </MainPageNode>
</template>

<script>
import { lowerFirst } from "lodash-es";
import { watch, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import MainPageNode from "@/components/structure/MainPageNode.vue";
import PageHeadNode from "@/components/structure/PageHeadNode.vue";
export default {
  components: {
    MainPageNode,
    PageHeadNode,
  },
  //   props: {
  // type: String
  //   },
  setup() {
    // const name = useRoute().name;
    const store = useStore();
    // const { type } = store.state.wishlist.basedRequest;
    const pageBySlug = store.getters["pages/pageBySlug"];

    return {
      // products, type, 
      pageBySlug,
      name: lowerFirst(useRoute().name),
    };
  },
};
</script>

<style lang="scss">
.profile-middle-content {
  // .profile-middle-content__body
  &__body {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
  // .profile-middle-content__sidebar
  &__sidebar {
  }
  // .profile-middle-content__content
  &__content {
  }
}
</style>