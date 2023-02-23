<template>
  <MainPageNode :class="name">
    <template #page-head>
      <PageHeadNode
        :title="pageByLink(fullPath)?.title.rendered"
        :navRaw="pageByLink(fullPath)?.title.rendered"
      ></PageHeadNode>
    </template>
    <template #page-main>
      <!-- <ContainerNode> -->
      <Suspense>
        <template #default>
          <section class="personal">
            <ContainerNode>
              <div class="personal__body">
                <div class="personal__sidebar">
                  <div class="personal__items">
                    <SpoilerNode
                      v-for="item in profileSectionItems"
                      :key="item.id"
                      :item="{ name: `personal${item.id}` }"
                    >
                      <template #button>
                        <button>{{ item.content }}</button>
                      </template>
                      <template #list>
                        <button v-for="subItem in subItems(item.url)" :key="subItem.id">{{subItem.content}}</button>
                      </template>
                    </SpoilerNode>
                    <LogoutButtonNode />
                  </div>
                </div>
                <div class="personal__content">
                  <RouterView/>
                </div>
              </div>
            </ContainerNode>
          </section>
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
      <!-- </ContainerNode> -->
    </template>
  </MainPageNode>
</template>

<script>
import { kebabCase } from "lodash-es";
import { getPathByURL } from "@/api/helpers.js";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import MainPageNode from "@/components/structure/MainPageNode.vue";
import PageHeadNode from "@/components/structure/PageHeadNode.vue";
import SpoilerNode from "@/components/SpoilerNode.vue";
import LogoutButtonNode from "@/components/personal/LogoutButtonNode.vue";

export default {
  components: {
    MainPageNode,
    PageHeadNode,
    SpoilerNode,
    LogoutButtonNode,
  },
  setup() {
    const store = useStore();
    const profileSectionItems = store.state.menus.profileSectionsList.items;
    const menus = store.state.menus;
    const pageByLink = store.getters["pages/pageByLink"];

    return {
      pageByLink,
      name: kebabCase(useRoute().name),
      fullPath: useRoute().fullPath,
      profileSectionItems,
      subItems: (url) => {
        return menus[getPathByURL(url, "array")[1]].items;
      },  
    };
  },
};
</script>

<style lang="scss">
.personal {
  // .personal__body
  &__body {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
  }
  // .personal__sidebar
  &__sidebar {
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    border-radius: 0;
    padding: 0 20px;
    align-self: flex-start;
  }

  &__items {
    width: 100%;
    padding: 10px 0;
  }
  // .personal__content
  &__content {
  }

  .spoiler {
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
  }

  .logout-button {
    padding: 10px 0;
  }
}
</style>