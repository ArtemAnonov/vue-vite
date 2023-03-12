<template>
  <MainPageNode :class="name">
    <template #page-main>
      <ContainerNode>
        <Suspense>
          <template #default>
            <section class="personal">
              <div class="personal__body">
                <div class="personal__sidebar sidebar-personal">
                  <SpoilerNode
                    v-for="item in profileSectionItemsOutput"
                    :key="item.id"
                    :item="{ name: `personal${lastSlugParam(item.url)}`, active: lastSlugParam(item.url) === last(refHandledPath) }"
                  >
                    <template
                      #button>
                      <button class="sidebar-personal__button link">{{ item.content }}</button>
                    </template>
                    <template #list>
                      <button v-for="(subItem, index) in subItems(item.url)"
                        :key="subItem.id"
                        class="sidebar-personal__sub-button link"
                        :class="{ 'sidebar-personal__sub-button_active': index === 0 ? lastSlugParam(item.url) === last(refHandledPath) : lastSlugParam(subItem.url) === last(refHandledPath) }"
                        @click="index === 0 ?
                          routeTo(item.url) :
                          routeTo(subItem.url)">
                        {{ subItem.content }}
                      </button>
                    </template>
                  </SpoilerNode>
                  <LogoutButtonNode v-if="userAuth" />
                </div>
                <!-- <div class="personal__content"> -->
                <RouterView class="personal__content"/>
                <!-- </div> -->
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
 *
 * (~) вместо логики извлечения последнего параметра пути как слага следует расширить
 *      класс WP Menus, чтобы из item.url доставался это слаг в бекенде
 */
import { ref, computed, watch } from "vue";
import { kebabCase, isEmpty, has, last } from "lodash-es";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { getPathName, lastSlugParam } from "@/api/uni";
import SpoilerNode from "@/components/SpoilerNode.vue";
import LogoutButtonNode from "@/components/personal/LogoutButtonNode.vue";

export default {
  components: {
    SpoilerNode,
    LogoutButtonNode,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const routes = router.getRoutes();
    const userAuth = computed(() => store.state.auth.userAuth);
    const profileSectionItems = store.state.menus.items.profileSectionsList.items;
    const menusItems = store.state.menus.items;
    const pageByLink = store.getters["pages/pageByLink"];
    const profileSectionItemsHandled = [];
    const refHandledPath = ref();

    watch(route, (newRoute) => {
      refHandledPath.value = getPathName(newRoute.path, "array").items;
    }, { immediate: true });

    for (const key in routes) {
      if (has(routes, key)) {
        const routeItem = routes[key];
        if (routeItem.path.match(/personal\/[a-z]/) && !routeItem.beforeEnter) {
          profileSectionItemsHandled.push(profileSectionItems.find((el) => getPathName(el.url) === routeItem.path));
        }
      }
    }

    return {
      refHandledPath,
      userAuth,
      pageByLink,
      name: kebabCase(route.name),
      profileSectionItemsOutput: computed(() => (userAuth.value ? profileSectionItems : profileSectionItemsHandled)),
      subItems: (url) => menusItems[getPathName(url, "array").items[1]].items,
      routeTo: (url) => router.push(getPathName(url)),
      isEmpty,
      last,
      lastSlugParam,
    };
  },
};
</script>

<style lang="scss">
.personal {
  margin-bottom: 3rem;
  // .personal__body
  &__body {
    display: grid;
    grid-template-columns: 3fr 7fr;
    gap: 2rem;
    @media (max-width: ($md3+px)) {
       grid-template-columns: 1fr;
    }
  }
  // .personal__sidebar
  &__sidebar {
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    border-radius: 0;
    align-self: flex-start;
    width: 100%;
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  // .personal__content
  &__content {
  }

  .spoiler {
    width: 100%;
    &_active {
      .spoiler__list {
        padding: 10px 0;
      }
      .spoiler__button {
        border-bottom: 1px solid #f1f1f1;
      }
    }
    &__button {
      border-bottom: 1px solid transparent;
      padding: 15px 0;
    }
    &__list {
      border-bottom: 1px solid #f1f1f1;

      button {
        margin-left: -20px;
        padding: 5px 0 5px 40px;
      }
    }
  }

  .logout-button {
    border-bottom: 1px solid #f1f1f1;
    padding: 15px 0;
  }
}
.sidebar-personal {
  // button {
  //   transition: .1s;
  //   &:hover {
  //     font-weight: 600;
  //   }
  // }
  .spoiler__button {
    &:hover {
      &::before {
        color: $cBlue !important;
      }
    }
  }
  &__button {

  }
  &__sub-button {
    position: relative;
    &_active {
      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 2px;
        top: 0;
        left: 0;
        background: $cMain;
      }
    }
  }
}
</style>
