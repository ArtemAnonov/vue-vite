<template>
  <section class="page-head" :class="title ? '' : 'page-head_product'">
    <container-node>
      <div class="page-head__body" v-bind="$attrs">
        <div class="page-head__content">
          <button v-if="!title" class="page-head__back icon-arrow" @click="$router.back()">
            <!-- <div class=""></div> -->
            Назад
          </button>
          <ul class="page-head__breadcrumbs">
            <li><router-link to="/">Главная</router-link></li>
            <li
              v-for="(crumb, index) in crumbs?.reverse()"
              :key="index"
            >
              <router-link :to="`/product-category/${crumb.slugs.join('/')}`">
                / {{ crumb.name }}
              </router-link>
            </li>
            <li>
              <span>{{ additionalTitle ? "/ " + additionalTitle : "" }}</span>
            </li>
          </ul>
        </div>
        <h1 v-if="title" class="page-head__title">{{ title }}</h1>
      </div>
    </container-node>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "page-head-node",
  inheritAttrs: false,
  props: {
    /**
     * Для продуктов
     */
    additionalTitle: String,
    title: String,
    category: Object,
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
      if (!this.category) return;
      let category;
      if (this.category.hasOwnProperty("parent")) {
        category = this.category;
      } else
        category = this.itemById({
          type: this.productsCategoriesRequest.type,
          id: this.category.id,
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

<style lang="scss" scoped>
.page-head {
  padding: 2.6666666667rem 0 1.6666666667rem 0;
  // margin-bottom: 1rem;
  // border-bottom: 0.0666666667rem solid #d8d8d8;
  &_product {
    padding: 4rem 0 1rem 0;
    margin-bottom: 1rem;
    // border-bottom: 0.0666666667rem solid transparent;
  }
  &__body {
  }

  &__breadcrumbs {
    font-size: 0.9333333333rem;
    line-height: 1.0666666667rem;
    color: #868686;
    display: inline-flex;
    li {
      display: inline-flex;
      margin-right: 0.5rem;
    }
  }

  &__back {
    position: relative;
    // padding: 6px 20px 6px 32px;
    margin-right: 3rem;
    font-size: 0.8rem;
    &::before {
      margin-right: 0.3rem;
      display: inline-flex;
      transform: rotate(180deg);
      font-size: 0.8rem;
    }
  }

  &__title {
    padding: 0.6666666667rem 0 1rem;
  }
}
</style>
