<template>
  <MainPageNode :class="name">
    <!-- <template #page-head>
      <PageHeadNode
        :title="templatePage?.title.rendered"
        navRaw="Избранное"
      />
    </template> -->
    <template #page-main>
      <ContainerNode>
        <Suspense>
          <template #default>
            <section class="personal">
              <div class="personal__body">
                <div class="personal__sidebar">
                  <div
                    class="personal__items">
                    <SpoilerNode
                      v-for="item in profileSectionItemsOutput"
                      :key="item.id"
                      :item="{ name: `personal${item.id}` }"
                    >
                      <template
                        #button>
                        <button>{{ item.content }}</button>
                      </template>
                      <template #list>
                        <button v-for="(subItem, index) in subItems(item.url)"
                          :key="subItem.id"
                          @click="index === 0 ?
                            routeTo(item.url) :
                            routeTo(subItem.url)">
                          {{subItem.content}}
                        </button>
                      </template>
                    </SpoilerNode>
                    <LogoutButtonNode v-if="userAuth" />
                  </div>
                </div>
                <div class="personal__content">
                  <RouterView/>
                </div>
              </div>
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
/**
 * Логика компонента такова, что родительские маршруты сочетаются с именами страниц/маршрутов,
 * идущими первыми по списку. Так, PersonalWishlistPage сочетается с "Избранное/Без списка"
 * и так далее. В CMS при этом есть страницы и меню с соответсвующими страницами.
 */
import { ref, computed, watch } from "vue";
import { kebabCase, isEmpty, has } from "lodash-es";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { getPathName } from "@/api/helpers";
// import PageHeadNode from "@/components/structure/PageHeadNode.vue";
import SpoilerNode from "@/components/SpoilerNode.vue";
import LogoutButtonNode from "@/components/personal/LogoutButtonNode.vue";

export default {
  components: {
    // PageHeadNode,
    SpoilerNode,
    LogoutButtonNode,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const routes = router.getRoutes();
    const userAuth = computed(() => store.state.auth.userAuth);
    const profileSectionItems = store.state.menus.items.profileSectionsList.items;
    const { items } = store.state.menus;
    const pageByLink = store.getters["pages/pageByLink"];
    const profileSectionItemsHandled = [];

    for (const key in routes) {
      if (has(routes, key)) {
        const route = routes[key];
        if (route.path.match(/personal\/[a-z]/) && !route.beforeEnter) {
          profileSectionItemsHandled.push(profileSectionItems.find((el) => getPathName(el.url) === route.path));
        }
      }
    }

    return {
      userAuth,
      pageByLink,
      name: kebabCase(useRoute().name),
      profileSectionItemsOutput: computed(() => (userAuth.value ? profileSectionItems : profileSectionItemsHandled)),
      subItems: (url) => items[getPathName(url, "array").items[1]].items, // wishlist, profile, orders
      routeTo: (url) => router.push(getPathName(url)),
      isEmpty,
      templatePage: pageByLink(useRoute().fullPath),
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
  }

  .logout-button {
    border-top: 1px solid #f1f1f1;

    padding: 10px 0;
  }
}
</style>
