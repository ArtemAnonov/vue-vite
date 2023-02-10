<template>
  <section class="page-head" :class="title ? '' : 'page-head_product'">
    <ContainerNode>
      <div class="page-head__body" v-bind="$attrs">
        <div class="page-head__content">
          <button
            v-if="!title"
            class="page-head__back icon-arrow"
            @click="$router.back()"
          >
            Назад
          </button>
          <ul class="page-head__breadcrumbs">
            <li><RouterLink to="/">Главная&nbsp;&nbsp;&nbsp;/</RouterLink></li>
            <template v-if="Array.isArray(crumbs)">
              <li v-for="(crumb, index) in crumbs?.reverse()" :key="index">
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
                <button><span>{{ navRaw }}</span></button>
              </li></template
            >
            <li>
              <span v-if="additionalTitle">{{ additionalTitle }}</span>
            </li>
          </ul>
        </div>
        <h1 v-if="title" class="page-head__title">{{ title }}</h1>
      </div>
    </ContainerNode>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "PageHeadNode",
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
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      itemById: "itemById",
    }),
    ...mapState({
      productsCategoriesRequest: (state) =>
        state.productsCategories.basedRequest,
    }),

    /**
     * Заметочка: попытка сделать рекурсивную функцию с итеративной передачей
     * массива не получилась \/
     *
     * Прим. Не всегда работает корректно. Ошибка замечена при попытке выдать категории
     */
    crumbs() {
      if (!this.navRaw) return;

      let type = typeof this.navRaw;
      if (type === "string" || type === "array") return this.navRaw;

      let category;
      if (this.navRaw.hasOwnProperty("parent")) {
        category = this.navRaw;
      } else
        category = this.itemById({
          type: this.productsCategoriesRequest.type,
          id: this.navRaw.id,
        });

      let parent = 0;
      let index = 0;
      const crumbs = [];
      let parentCheck = (category) => {
        if (!category) return;
        let parentCategoryId = category.parent;
        if (parentCategoryId != parent) {
          crumbs.push({ name: category.name, slugs: [category.slug] });
          if (index !== 0) {
            crumbs[index - 1].slugs.unshift(category.slug);
          }
          index++;
          const parentCategory = this.itemById({
            type: this.productsCategoriesRequest.type,
            id: parentCategoryId,
          });
          parentCheck(parentCategory);
        } else {
          crumbs.push({ name: category.name, slugs: [category.slug] });
          if (index !== 0) {
            crumbs[index - 1].slugs.unshift(category.slug);
          }
          index++;
        }
      };
      parentCheck(category);
      return crumbs;
    },
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
  },
};
</script>

<style lang="scss">
.page-head {
  padding: 2.6666666667rem 0 0 0;
  // margin-bottom: 1rem;
  // border-bottom: 0.0666666667rem solid #d8d8d8;
  &_product {
    padding: 2rem 0 1rem 0;
    margin-bottom: 1rem;
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
          a, button {
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
