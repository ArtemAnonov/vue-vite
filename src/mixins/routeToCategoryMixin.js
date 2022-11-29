import { isEmpty } from 'lodash-es'


export default {
  methods: {
    /**
     *
     * @param {*} category - категория (родительская(базовая) или одна из дочерних)
     * @param {*} parentCategorySlug - передаётся при переходе к одной из дочерних категорий
     * @returns
     */
    routeToCategory(category, parentCategorySlug) {
      if (isEmpty(category)) return;
      if (
        category.parent == 0 &&
        (parentCategorySlug === undefined ||
          parentCategorySlug === "rootCategories")
      ) {
        //
        return this.$router.push({
          name: "MainCategory",
          params: { mainCategorySlug: category.slug },
        });
      } else {
        return this.$router.push({
          name: "Catalog",
          params: {
            mainCategorySlug: parentCategorySlug,
            categorySlug: category.slug,
          },
        });
      }
    },
  },
};
