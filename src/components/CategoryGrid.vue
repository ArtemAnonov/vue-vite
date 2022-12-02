<template>
  <section class="category-grid">
    <div class="category-grid__body">
      <div
        class="category-grid__items"
        v-if="
          productsCategories === undefined || productsCategories.length === 0
        "
      >
        <article
          v-for="(item, index) in [0, 1, 2, 3, 4, 5]"
          :key="index"
          class="category-grid__item"
        >
          <preload-wrap-node :targetPreloadElement="true" paddingBottom="100"></preload-wrap-node>
        </article>
      </div>
      <div class="category-grid__items">
        <article
          class="category-grid__item"
          v-for="productCategory in productsCategories"
          :key="productCategory.id"
        >
          <preload-wrap-node>
            <button
              v-if="productCategory"
              @click="routeToCategory(productCategory, productCategory.slug)"
            >
              <div class="category-grid__image">
                <img
                  v-if="productCategory.image"
                  :src="productCategory.image.src"
                  alt=""
                />
              </div>
              <div class="category-grid__content">
                <div class="category-grid__title">
                  {{ productCategory.name }}
                </div>
                <div class="category-grid__subtitle">
                  {{ productCategory.description }}
                </div>
              </div>
            </button>
          </preload-wrap-node>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import routeToCategoryMixin from "@/mixins/routeToCategoryMixin";
import itemsLoadHandler from "@/mixins/itemsLoadHandler";
import PreloadWrapContainerNode from "@/components/structure/PreloadWrapContainerNode.vue";

export default {
  components: {
    PreloadWrapContainerNode
  },
  mixins: [routeToCategoryMixin, itemsLoadHandler],
  props: {
    productCategory: {
      reqired: true,
      type: Object,
    },
  },
  computed: {
    ...mapState({
      pCRequest: (state) => state.productsCategories.basedRequest,
    }),
    ...mapGetters({
      itemsMatchedByCallback: "itemsMatchedByCallback",
      itemBySlug: "itemBySlug",
    }),
    productsCategories() {
      if (this.productCategory) {
        return this.itemsMatchedByCallback(
          this.pCRequest,
          {
            parent: this.productCategory.id,
          },
          function (product, keys, params, items, approved) {
            keys.forEach((key) => {
              if (items.length === 6) {
                return undefined;
              }
              if (product[key] == params[key]) {
                approved = true;
              }
            });
            return approved;
          }
        );
      }
    },
  },
};
</script>

<style scoped lang="scss">
.category-grid {
  margin-bottom: 3rem;
  &__body {
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 2.6666666667rem;
    column-gap: 1rem;
    @media (max-width: ($md3+px)) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  &__item {
    &:hover {
      img {
        transform: scale(1.1);
      }
      .category-grid__title,
      .category-grid__subtitle {
        color: #5073a2;
      }
    }
  }

  &__image {
    overflow: hidden;
    img {
      max-width: 100%;
      transition: 0.3s ease;
    }
  }

  &__content {
    text-align: start;
  }

  &__title {
    font-size: 1.0666666667rem;
    line-height: 1.3333333333rem;
    transition: 0.3s ease;
    margin-top: 1.0666666667rem;
    font-weight: 700;
  }

  &__subtitle {
    font-size: 1.0666666667rem;
    line-height: 1.3333333333rem;
    transition: 0.3s ease;
    margin-top: 0.4rem;
    font-weight: 400;
    color: #868686;
  }
}
</style>
