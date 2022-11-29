<template>
  <section class="catalog-sidebar">
    <button
      class="catalog-sidebar__title icon-arrow"
      @click="bodyShow = !bodyShow"
      v-show="windowWidth < 767"
    >
      Одежда
    </button>
    <Transition>
      <div v-if="mainCategory" v-show="bodyShow" class="catalog-sidebar__body">
        <button
          class="catalog-sidebar__title icon-arrow"
          :class="category ? (category.id ? '' : 'active') : ''"
          @click="
            routeToCategory(
              itemById({
                type: productsCategoriesRequest.type,
                id: mainCategory.id,
              })
            )
          "
        >
          {{ windowWidth > 768 ? "Одежда" : "Вся одежда" }}
          <span v-html="total ? total : 0"></span>
        </button>
        <div class="catalog-sidebar__items">
          <ul class="catalog-sidebar__list">
            <li
              class="catalog-sidebar__item"
              v-for="productsCategory in items(mainCategory.id)"
              :key="productsCategory.id"
            >
              <button
                class="catalog-sidebar__category icon-arrow"
                :class="category ? (category.id == productsCategory.id ? 'active' : '') : ''"
                @click="
                  routeToCategory(
                    productsCategory,
                    itemById({
                      type: productsCategoriesRequest.type,
                      id: productsCategory.parent,
                    }).slug
                  )
                "
              >
                {{ productsCategory.name
                }}<span>{{ productsCategory.count }}</span>
              </button>
              <Transition>
                <ul
                  class="catalog-sidebar__sub-list"
                  v-if="category"
                  v-show="
                    category.id == productsCategory.id ||
                    category.parent == productsCategory.id
                  "
                >
                  <li
                    class="catalog-sidebar__sub-item"
                    v-for="productsSubCategory in items(productsCategory.id)"
                    :key="productsSubCategory.id"
                  >
                    <button
                      class="catalog-sidebar__sub-category icon-arrow"
                      :class="
                        category.id == productsSubCategory.id ? 'active' : ''
                      "
                      @click="
                        routeToCategory(
                          productsSubCategory,
                          itemById({
                            type: productsCategoriesRequest.type,
                            id: productsCategory.parent,
                          }).slug
                        )
                      "
                    >
                      {{ productsSubCategory.name
                      }}<span>{{ productsSubCategory.count }}</span>
                    </button>
                  </li>
                </ul>
              </Transition>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import routeToCategoryMixin from "@/mixins/routeToCategoryMixin";
export default {
  mixins: [routeToCategoryMixin],
  components: {},
  props: {
    mainCategory: Object,
    category: Object,
    total: [String, Number],
  },
  data() {
    return {
      bodyShow: true,
    };
  },
  watch: {
    windowWidth(newValue) {
      if (newValue > 767) this.bodyShow = true;
    },
  },
  computed: {
    ...mapGetters({
      itemsMatchedOneProperty: "itemsMatchedOneProperty",
      itemById: "itemById",
    }),
    ...mapState({
      windowWidth: (state) => state.common.windowWidth,

      productsCategoriesRequest: (state) =>
        state.productsCategories.basedRequest,
    }),
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),

    items(id) {
      return this.itemsMatchedOneProperty(this.productsCategoriesRequest, {
        parent: id,
      });
    },
  },
  created() {},
};
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.catalog-sidebar {
  position: sticky;
  // top: 1em;
  @media (max-width: ($md3+px)) {
  }
  span {
    // line-height: .8666666667rem;
    font-size: 0.8666666667rem;
    font-weight: 400;
    margin: 0 0 0 0.5rem;
    flex: 1 1 auto;
    display: inline-flex;
    justify-content: flex-end;
  }
  button {
    transition: 0.1s;
    position: relative;
    text-align: start;
    display: inline-flex;
    align-items: center;
    width: 100%;
    &:hover {
      background-color: #f1f1f1;
      color: #231f20;
      &::before {
        opacity: 1;
      }
    }
    &::before {
      opacity: 0;
      transition: 0.1s;
      order: 3;
      font-size: 0.7rem;
      margin-left: 0.7rem;
      transform: rotate(90deg) translate(0, 0);
    }
  }

  .active {
    // border-left: .1333333333rem solid #231f20;
    &::after {
      content: "";
      position: absolute;
      border-left: 0.1333333333rem solid #231f20;
      height: 70%;
      transform: translate(0, 23%);
      pointer-events: none;
      // top: .5333333333rem;
      // bottom: .5333333333rem;
      left: 0;
      top: 0;
    }
  }
  &__body {
  }

  &__title {
    font-weight: 700;
    font-size: 1.1333333333rem;
    line-height: 1.6rem;
    padding: 0.2rem 0.7rem 0.2rem 1.3rem;
    margin-left: -1.3rem;
    &:hover {
      background-color: transparent !important;
    }
    &.active {
      color: #868686;
      &::after {
        display: none;
      }
    }
  }

  &__items {
  }

  &__sub-list {
  }

  &__item {
  }

  &__category {
    position: relative;
    font-size: 1.1333333333rem;
    line-height: 1.6rem;
    padding: 0.5333333333rem 2rem 0.4rem 1.3333333333rem;
  }

  &__sub-category {
    padding: 0.2rem 2rem 0.2rem 2.6666666667rem;
    font-size: 1rem;
    line-height: 1.4rem;
    color: #868686;
    &.active {
      color: #231f20;
      &:hover {
        background-color: #fff;
      }
      &::after {
        left: 1.3333333333rem;
      }
    }
    &::before {
      opacity: 0;
    }
  }
}
</style>
