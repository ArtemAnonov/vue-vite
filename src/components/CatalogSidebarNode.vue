<template>
  <section class="catalog-sidebar">
    <SpoilerNode
      :item="{
        name: 'catalogSidebar',
        default: windowWidth < 1024,
      }"
    >
      <template #button>
        <div class="catalog-sidebar__title catalog-sidebar__title_main">
          Одежда
        </div></template
      >
      <template #list>
        <!-- <Transition> -->
        <div v-if="mainCategory" class="catalog-sidebar__body">
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
            Вся одежда
            <span v-html="total ? total : 0"></span>
          </button>
          <div class="catalog-sidebar__items">
            <ul class="catalog-sidebar__list">
              <li
                class="catalog-sidebar__item"
                v-for="productsCategory in items(mainCategory.id)"
                :key="productsCategory.id"
              >
                <!--                   :class="
                    category
                      ? category.id == productsCategory.id
                        ? 'active'
                        : ''
                      : ''
                  " -->
                <button
                  class="catalog-sidebar__category icon-arrow"
                  :class="{
                    active: category?.id == productsCategory?.id,
                    'disable-arrow': productsCategory.count == 0,
                  }"
                  @click="routeToCategory(productsCategory)"
                >
                  {{ productsCategory.name
                  }}<span>{{ productsCategory.count }}</span>
                </button>
                <!-- <Transition> -->
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
                      :class="{
                        active: category.id == productsSubCategory.id,
                        'disable-arrow': productsSubCategory.count == 0,
                      }"
                      @click="routeToCategory(productsSubCategory)"
                    >
                      {{ productsSubCategory.name
                      }}<span>{{ productsSubCategory.count }}</span>
                    </button>
                  </li>
                </ul>
                <!-- </Transition> -->
              </li>
            </ul>
          </div>
        </div>
        <!-- </Transition> -->
      </template>
    </SpoilerNode>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { routeToCategory } from "@/api/helpers";
import SpoilerNode from "@/components/SpoilerNode.vue";

export default {
  components: { SpoilerNode },
  props: {
    mainCategory: Object,
    category: Object,
    total: [String, Number],
  },
  setup() {
    return {
      routeToCategory,
    };
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
};
</script>

<style lang="scss">
.catalog-sidebar {
  position: sticky;
  // top: 1em;
  @media (max-width: ($md3+px)) {
  }
  span {
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
    &.active {
      color: #231f20;
    }
    &.disable-arrow {
      &::before {
        opacity: 0 !important;
      }
    }
  }

  .active {
    &::after {
      content: "";
      position: absolute;
      border-left: 0.1333333333rem solid #231f20;
      height: 70%;
      transform: translate(0, 23%);
      pointer-events: none;
      left: 0;
      top: 0;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 1.1333333333rem;
    line-height: 1.6rem;
    padding: 0.2rem 0.4rem 0.2rem 1.3rem;
    margin-left: -1.3rem;
    &_main {
      &::before {
        opacity: 1 !important;
      }
    }
    &:hover {
      background-color: transparent !important;
    }
    &.active {
      color: #868686;
      &::after {
        display: none;
      }
    }
    &::before,
    span {
      position: relative;
      left: 1.3rem;
    }
  }

  &__category {
    color: #868686;
    position: relative;
    font-size: 1.1333333333rem;
    line-height: 1.6rem;
    padding: 0.5333333333rem 0.4rem 0.4rem 1.3333333333rem;
    span {
      color: #231f20;
    }
  }

  &__sub-category {
    padding: 0.2rem 0.4rem 0.2rem 2.6666666667rem;
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
  .spoiler {
    &_active {
      & > .spoiler__button {
        &::before {
          // transform: translate(0, 0) rotate(-90deg) !important;
        }
      }
    }
    &__button {
      // position: relative;
      // display: inline-flex;
      // flex-direction: row-reverse;
      &::before {
        right: auto;
        top: 60%;
        left: 4.8rem;
        // transform: translate(0, 0) rotate(90deg);
      }
    }
  }
}
</style>
