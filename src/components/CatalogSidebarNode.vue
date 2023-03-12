<template>
  <section class="catalog-sidebar">
    <SpoilerNode :item="{ name: 'catalogSidebar', default: wW < 1024 }">
      <template #button><BaseButtonNode v-if="wW < 1024">Категории одежды</BaseButtonNode></template>
      <template #list>
        <CategoriesNode
          v-slot="slotProps"
          :activityCategory="{ slugs, index: 0}"
        >
          <CategoriesNode
            v-slot="sP"
            :nestedLevel="slotProps.nestedLevel"
            :parentID="slotProps.parentID"
            :activityCategory="{ slugs, index: 1}"
          >
            <CategoriesNode
              :nestedLevel="sP.nestedLevel"
              :parentID="sP.parentID"
              :activityCategory="{ slugs, index: 2}"
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
  getPathName,
} from "@/api/uni";
import CategoriesNode from "@/components/header/CategoriesNode.vue";

import SpoilerNode from "@/components/SpoilerNode.vue";

export default {
  components: {
    SpoilerNode,
    CategoriesNode,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const slugs = computed(() => getPathName(route.path, "array").items);
    const wW = computed(() => store.state.common.windowWidth);
    return {
      wW,
      routeToSingleProductCategory: (value) => store.dispatch("productsCategories/routeToSingleProductCategory", value),
      slugs,
    };
  },
};
</script>

<style lang="scss">
.catalog-sidebar {
  .spoiler > .spoiler__button {
    // button {
    //   color: #868686;
    // }
    padding: 1rem 0;
    display: flex;
    justify-content: center;
    // font-size: 1.2rem;
    &::before {
      display: none;
      // color: #868686;
      // transform: translate(-50%, 0) rotate(90deg);
      // right: auto;
      // top: 90%;
      // font-size: 1rem;
    }
    &::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 400%;
      transform: translate(-50%, 0);
      top: 0;
      left: 0;
      background: #f7f7f7;
      z-index: -1;
      border-top: 1px solid #d8d8d8;
      border-bottom: 1px solid #d8d8d8;
    }
  }
  .spoiler_active > .spoiler__button {
    // button {
    //   color: inherit;
    // }
    // &::before {
    //   transform: translate(-50%, 0) rotate(-90deg);
    // }
    &::after {
      border-bottom: 1px solid transparent;

    }
  }
  .categories {
    button {
      position: relative;

      color: #868686;
      padding-top: 6px;
      padding-bottom: 6px;
    }

    li {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &.active {
        & > button {
          color: $cMain;
        }
      }
    }

    .categories__item {
      border-bottom: 1px solid #f1f1f1;
      ul {
        height: 0;
        opacity: 0;
        visibility: hidden;
      }

    }
    .categories__list {

    }

    .categories__button {
      font-weight: 700;
      padding-top: 8px;
      padding-bottom: 8px;
      &:hover {
        color: $cMain;
      }
    }

    .categories__first-list {
      // margin: 0 0 1rem 0;
    }
    .categories__second-list {
      // margin: 0 0 0 1rem;
    }
    .categories__first-list {
      margin: 0;
    }
    .categories__first-item {

    }
    .categories__first-button {
      padding-left: 1rem;

    }
    .categories__second-item {

    }
    .categories__second-button {
      padding-left: 2rem;
    }

    // (~) дублируется код - можно было бы использовать ">", обращаясь
    // сразу к нескольким листам, если корневым элементом в CategoriesNode сделать ul
    .categories__item {
      &.active {
        .categories__first-list {
          height: auto !important;
          opacity: 1 !important;
          visibility: visible;
          margin: 0 0 1rem 0;
        }
      }

    }

    .categories__first-item {
      &.active {
        .categories__second-list {
          height: auto !important;
          opacity: 1 !important;
          visibility: visible;
        }

      }
      &.current {
        & > .categories__first-button {
          &::after {
          content: '';
          position: absolute;
          background: $cMain;
          height: 100%;
          width: 2px;
          top: 0;
          left: 0;
        }
        }
      }
    }

    .categories__second-item {
      &.current {
        & > .categories__second-button {
          &::after {
          content: '';
          position: absolute;
          background: $cMain;
          height: 100%;
          width: 2px;
          top: 0;
          left: 0;
        }
        }
      }
    }

  }

}
</style>

  <!-- default: wW < 1024, -->
    <!-- <SpoilerNode
      :item="{
        name: 'catalogSidebar',
      }"
    >
      <template #button>
        <div class="catalog-sidebar__title catalog-sidebar__title_main">
          Одежда
        </div></template
      >
      <template #list> -->

<!--
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
    } -->
