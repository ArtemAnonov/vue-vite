<template>
  <section class="catalog-sidebar">
    <SpoilerNode
      :item="{
        name: 'catalogSidebar',
        default: wW < 1024,
      }"
    >
      <template #button>
        <div class="catalog-sidebar__title catalog-sidebar__title_main">
          Одежда
        </div></template
      >
      <template #list>
        <CategoriesNode
          v-slot="slotProps"
          :activityCategory="pCatSlugs[0]"
        >
          <CategoriesNode
            v-slot="sP"
            :nestedLevel="slotProps.nestedLevel"
            :parentID="slotProps.parentID"
            :activityCategory="pCatSlugs[1] || true"

          >
            <CategoriesNode
              :nestedLevel="sP.nestedLevel"
              :parentID="sP.parentID"
              :activityCategory="pCatSlugs[2] || true"

            /></CategoriesNode>
        </CategoriesNode>
      </template>

    </SpoilerNode>
  </section>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  routeToSingleProductCategory,
  getPathName,
} from "@/api/helpers";
import CategoriesNode from "@/components/header/CategoriesNode.vue";

import SpoilerNode from "@/components/SpoilerNode.vue";

export default {
  components: {
    SpoilerNode,
    CategoriesNode,
  },
  props: {
    // firstCategory: Object,
    // category: Object,
    total: [String, Number],
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const pCatSlugs = computed(() => getPathName(route.path, "array").items);
    const wW = store.state.common.windowWidth;
    return {
      wW,
      routeToSingleProductCategory,
      pCatSlugs,
    };
  },
};
</script>

<style lang="scss">
.catalog-sidebar {
  .categories {
    button {
      color: #868686;
      &.active {
        color: $mainColor;
      }
    }
    .categories__list {

    }
    .categories__item {

    }
    .categories__button {

    }
    .categories__first-list {
      margin: 0 0 0 1rem;
    }
    .categories__second-list {
      margin: 0 0 0 1rem;
    }
    // >> .categories__first-list {
    //   margin: 0 0 0 1rem;
    // }
    .categories__first-item {

    }
    .categories__first-button {

    }
  }

  // span {
  //   font-size: 0.8666666667rem;
  //   font-weight: 400;
  //   margin: 0 0 0 0.5rem;
  //   flex: 1 1 auto;
  //   display: inline-flex;
  //   justify-content: flex-end;
  // }
  // button {
  //   transition: 0.1s;
  //   position: relative;
  //   text-align: start;
  //   display: inline-flex;
  //   align-items: center;
  //   width: 100%;
  //   &:hover {
  //     background-color: #f1f1f1;
  //     color: #231f20;
  //     &::before {
  //       opacity: 1;
  //     }
  //   }
  //   &::before {
  //     opacity: 0;
  //     transition: 0.1s;
  //     order: 3;
  //     font-size: 0.7rem;
  //     margin-left: 0.7rem;
  //     transform: rotate(90deg) translate(0, 0);
  //   }
  //   &.active {
  //     color: #231f20;
  //   }
  //   &.disable-arrow {
  //     &::before {
  //       opacity: 0 !important;
  //     }
  //   }
  // }

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

  &__first-category {
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

   <!-- <template #list>
        <div v-if="firstCategory"
          class="catalog-sidebar__body">
          <button
            class="catalog-sidebar__title icon-arrow"
            :class="category ? (category.id ? '' : 'active') : ''"
            @click="
              routeToSingleProductCategory(
                singleById({
                  type: productsCategoriesRequest.type,
                  id: firstCategory.id,
                })
              )
            "
          >
            Вся одежда
            <span v-html="total ? total : 0"/>
          </button>
          <div class="catalog-sidebar__items">
            <ul class="catalog-sidebar__list">
              <li
                v-for="firstCategory in items(firstCategory.id)"
                :key="firstCategory.id"
                class="catalog-sidebar__item"
              >
                <button
                  class="catalog-sidebar__category icon-arrow"
                  :class="{
                    active: category?.id === firstCategory?.id,
                    'disable-arrow': firstCategory.count === 0,
                  }"
                  @click="routeToSingleProductCategory(firstCategory)"
                >
                  {{ firstCategory.name
                  }}<span>{{ firstCategory.count }}</span>
                </button>
                <ul
                  v-if="category"
                  v-show="
                    category.id === firstCategory.id ||
                      category.parent === firstCategory.id
                  "
                  class="catalog-sidebar__first-list"
                >
                  <li
                    v-for="secondCategory in items(firstCategory.id)"
                    :key="secondCategory.id"
                    class="catalog-sidebar__first-item"
                  >
                    <button
                      class="catalog-sidebar__first-category icon-arrow"
                      :class="{
                        active: category.id === secondCategory.id,
                        'disable-arrow': secondCategory.count === 0,
                      }"
                      @click="routeToSingleProductCategory(secondCategory)"
                    >
                      {{ secondCategory.name
                      }}<span>{{ secondCategory.count }}</span>
                    </button>
                    <ul
                      v-if="subCategory"
                      v-show="
                        subCategory.id === category.id ||
                          subCategory.parent === category.id
                      "
                      class="catalog-sidebar__first-list"
                    >
                      <li
                        v-for="thirdCategory in items(category.id)"
                        :key="thirdCategory.id"
                        class="catalog-sidebar__first-item"
                      >
                        <button
                          class="catalog-sidebar__first-category icon-arrow"
                          :class="{
                            active: subCategory.id === thirdCategory.id,
                            'disable-arrow': thirdCategory.count === 0,
                          }"
                          @click="routeToSingleProductCategory(thirdCategory)"
                        >
                          {{ thirdCategory.name
                          }}<span>{{ thirdCategory.count }}</span>
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </template> -->
