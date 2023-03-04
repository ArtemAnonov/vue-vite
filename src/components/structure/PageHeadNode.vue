<template>
  <section class="page-head"
    :class="title ? '' : 'page-head_product'">
    <ContainerNode>
      <div class="page-head__body"
        v-bind="$attrs">
        <div class="page-head__content">
          <button
            v-if="!title"
            class="page-head__back icon-arrow"
            @click="$router.back()"
          >
            Назад
          </button>
          <ul class="page-head__breadcrumbs">
            <BaseLinkNode @click="$router.push('/')">Главная</BaseLinkNode>
            <template v-for="(crumb, index) in crumbs"
              :key="index"
            >
              <BaseLinkNode @click="crumb.routeTo">
                {{ crumb?.title }}</BaseLinkNode>

            </template>
            <!-- <li><RouterLink to="/">Главная&nbsp;&nbsp;&nbsp;/</RouterLink></li>
            <template v-if="Array.isArray(crumbs)">
              <li v-for="(crumb, index) in crumbs?.reverse()"
                :key="index">
                <RouterLink :to="`/product-category/${crumb.slugs.join('/')}`">
                  {{ crumb.name }}&nbsp;&nbsp;&nbsp;<span
                    v-if="crumbs.length - 1 !== index || additionalTitle"
                  >/</span
                  >
                </RouterLink>
              </li>
            </template>
            <template v-else
            ><li>
              <button>
                <span>{{ navRaw }}</span>
              </button>
            </li></template
            >
            <li>
              <span v-if="additionalTitle">{{ additionalTitle }}</span>
            </li> -->
          </ul>
        </div>
        <h1 v-if="title"
          class="page-head__title">{{ title }}</h1>
      </div>
    </ContainerNode>
  </section>
</template>

<script>

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getPathName, routeToSingleProductCategory } from "@/api/helpers";

export default {
  inheritAttrs: false,
  props: {
    /**
     * Для продуктов
     */
    additionalTitle: String,
    title: String,
    /**
     * Может быть моделью-категорией или Route ((([хотя хк])))
     */
    navRaw: [Object, String, Array],
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const productsCategoriesType = store.state.productsCategories.basedRequest.type;
    const productsType = store.state.products.basedRequest.type;
    /**
     * В массиве els может присутствовать префикс например /product-category/,
     * который выкидывается pages/pageBySlug, но остается в el.path
     * Много мороки с правилным путём категори, т.к. таксономии не имеют свойтсв
     * типа product.permalink
     */
    const crumbs = computed(() => {
      const handledPath = getPathName(route.path, "array");
      let items = [];
      // if (handledPath?.prefix) { // поиск по категориям продуктов
      //   const catSlugs = handledPath.items;
      //   for (let i = 0; i < catSlugs.length; i++) {
      //     const el = catSlugs[i]; // iubki
      //     const pCat = store.getters.singleBySlug({ type: productsCategoriesType, slug: el });
      //     items.push({ title: pCat.name, routeTo: () => routeToSingleProductCategory(pCat) });
      //   }
      //   if (handledPath?.last) items.push({ title: store.getters.singleBySlug({ type: productsType, slug: handledPath.last }).name });
      // } else { // поиск по страницам
      items = handledPath.items.map((el) => {
        const title = store.getters["pages/pageBySlug"](el)?.title.rendered;
        return title ? { title, routeTo: () => router.push(el) } : null;
      });
      // }

      return items;
    });
    return {
      crumbs,

    };
  },
};
</script>

<style lang="scss">
.page-head {
  padding: 2.6666666667rem 0 0 0;
  margin-bottom: 1rem;
  // border-bottom: 0.0666666667rem solid #d8d8d8;
  &_product {
    padding: 2rem 0 1rem 0;
    @media (max-width: ($md3+px)) {
      padding: 1rem 0 1rem 0;
    }
  }
  &__body {
  }

  &__breadcrumbs {
    font-size: 0.9333333333rem;
    line-height: 1.0666666667rem;
    display: inline-flex;
    flex-wrap: wrap;

    li {
      display: inline-flex;
      margin-right: 0.3rem;
      a,
      button {
        color: #868686 !important;
      }
    }
  }

  &__back {
    position: relative;
    // padding: 6px 20px 6px 32px;
    margin-right: 3rem;
    font-size: 0.8rem;
    @media (max-width: ($md3+px)) {
      display: none;
    }
    &::before {
      margin-right: 0.3rem;
      display: inline-flex;
      transform: rotate(180deg);
      font-size: 0.8rem;
    }
  }

  &__title {
    padding: 0.6666666667rem 0 0 0;
    @media (max-width: ($md4+px)) {
      padding: 0.6666666667rem 0 0 0;
    }
  }
}
</style>
