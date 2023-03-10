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
          <ul class="page-head__links">
            <BaseLinkNode class="page-head__link"
              @click="$router.push('/')">Главная<span>/</span></BaseLinkNode>
            <template v-for="(crumb, index) in links"
              :key="index"
            >
              <BaseLinkNode  class="page-head__link"
                @click="crumb?.routeTo">
                {{ crumb?.title }}<span v-if="index<links.length-1">/</span></BaseLinkNode>
            </template>
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
import { getPathName } from "@/api/uni";

export default {
  inheritAttrs: false,
  props: {
    handledPath: Object,
    templatePage: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const { state, getters } = useStore();
    const router = useRouter();
    const productsCategoriesType = state.productsCategories.basedRequest.type;
    const productsType = state.products.basedRequest.type;
    /**
     * Три варианта использования: для продуктов, для каегорий продуктов и для страниц.
     * Для кат.прод. используются именно category.name, хотя и для каждой страницы должен быть
     * создана страница - в page.title.rendered используются полные названия категорий
     */
    const links = computed(() => {
      let items = [];
      if (props.handledPath?.prefix) {
        items = props.handledPath.items.map((slug) => {
          const category = getters.singleBySlug({ type: productsCategoriesType, slug });
          return { title: category.name, routeTo: () => router.push(getPathName(category.permalink)) };
        });
        if (props.handledPath?.last) {
          const product = getters.singleBySlug({ type: productsType, slug: props.handledPath.last });
          items.push({ title: product.name });
        }
      } else {
        items = props.handledPath.items.map((slug) => {
          const page = getters["pages/pageBySlug"](slug);
          return { title: page.title.rendered, routeTo: () => router.push(getPathName(page.link)) };
        });
      }
      return items;
    });
    return {
      links,
      title: computed(() => (typeof props.templatePage === "object" ? props.templatePage.title.rendered : null)),
    };
  },
};
</script>

<style lang="scss">
.page-head {
  padding: 2.6666666667rem 0 0 0;
  margin-bottom: 1rem;
  @media (max-width: ($md3+px)) {
    padding: 1.666667rem 0 0 0;
  }
  // &_product {
  //   padding: 2rem 0 1rem 0;
  //   @media (max-width: ($md3+px)) {
  //     padding: 1rem 0 1rem 0;
  //   }
  // }
  &__body {
  }

  &__links {
    font-size: 0.9333333333rem;
    line-height: 1.0666666667rem;
    display: inline-flex;
    flex-wrap: wrap;
  }

  &__link {
    display: inline-flex;
    margin-right: 0.2rem;
    color: #868686;
    span {
      margin-left: 0.4rem;

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
