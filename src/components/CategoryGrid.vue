<template>
  <section class="category-grid">
    <div class="category-grid__body">
      <div v-if="productsCategories.length === 0"
        class="category-grid__items">
        <article v-for="(item, index) in [0, 1, 2, 3, 4, 5]"
          :key="index"
          class="category-grid__item">
          <PreloadWrapNode :targetPreloadElement="false"
            :paddingBottom="100"/>
        </article>
      </div>
      <div class="category-grid__items">
        <article v-for="productSubCategory in productsCategories"
          :key="productSubCategory.id"
          class="category-grid__item">
          <PreloadWrapNode>
            <div v-if="productSubCategory"
              @click="
                routeToSingleProductCategory(productSubCategory)
              ">
              <div class="category-grid__image">
                <img v-if="productSubCategory.image"
                  :src="productSubCategory.image.src"
                  alt="" >
              </div>
              <div class="category-grid__content">
                <div class="category-grid__title">
                  {{ productSubCategory.name }}
                </div>
                <div class="category-grid__subtitle">
                  {{ productSubCategory.description }}
                </div>
              </div>
            </div>
          </PreloadWrapNode>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, useStore } from "vuex";

export default {
  components: {
  },
  props: {
    category: {
      reqired: true,
      type: Object,
    },
  },
  setup() {
    const store = useStore();
    return {
      routeToSingleProductCategory: (value) => store.dispatch("productsCategories/routeToSingleProductCategory", value),

    };
  },
  computed: {
    ...mapState({
      pCRequest: (state) => state.productsCategories.basedRequest,
    }),
    ...mapGetters({
      itemsMatchedByCallback: "itemsMatchedByCallback",
      singleBySlug: "singleBySlug",
    }),
    productsCategories() {
      if (!this.category) return [];
      return this.itemsMatchedByCallback(
        this.pCRequest,
        {
          parent: this.category.id,
        },
        (product, keys, params, items) => {
          let approved;
          for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (items.length === 6) {
              return null;
            } if (product[key] === params[key]) {
              approved = true;
            }
          }
          return approved;
        },
      );
    },
  },
};
</script>

<style lang="scss">
.category-grid {
  margin-bottom: 3rem;

  &__body {}

  &__items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 0.5rem;
    column-gap: 0.5rem;

    @media (max-width: ($md3+px)) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__item {
    cursor: pointer;
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
    padding: .5rem;
  }

  &__title {
    font-size: 1rem;
    line-height: 1.3333333333rem;
    transition: 0.3s ease;
    // margin-top: 1.0666666667rem;
  }

  &__subtitle {
    font-size: 0.9rem;
    line-height: 1.3333333333rem;
    transition: 0.3s ease;
    margin-top: 0.4rem;
    font-weight: 400;
    color: #868686;
  }
}
</style>
