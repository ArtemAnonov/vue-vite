<template>
  <div class="categories">
    <ul
      v-if="productsCategories && productsCategories.length"
      :class="
        spoilers?.slug?.active && spoilerType
          ? `categories__${neastedStr}list categories__${neastedStr}list_active`
          : `categories__${neastedStr}list`
      "
    >
      <li
        v-for="productCategory in productsCategories"
        :key="productCategory.id"
        :class="`categories__${neastedStr}item`"
      >
        <template v-if="spoilerType">
          <SpoilerNode
            :item="{
              name: productCategory.slug,
              default: spoilerType,
            }"
          >
            <template #button>
              <button :class="`categories__${neastedStr}button`">
                {{
                  productCategory.id == parentID
                    ? "ВСЕ ТОВАРЫ"
                    : productCategory.name
                }}
              </button></template
            >
            <template #list>
              <slot :parentID="productCategory.id"/></template>
          </SpoilerNode
          ></template>
        <template v-else>
          <button
            :class="`categories__${neastedStr}button`"
            @click="routeToCategory(productCategory)"
          >
            {{
              productCategory.id == parentID
                ? "ВСЕ ТОВАРЫ"
                : productCategory.name
            }}
          </button>
          <slot :parentID="productCategory.id"/></template>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  mapState, mapGetters,
} from "vuex";
import SpoilerNode from "@/components/SpoilerNode.vue";
import { routeToCategory } from "@/api/helpers";

export default {
  components: {
    SpoilerNode,
  },
  props: {
    parentID: {
      type: Number,
      reqired: true,
    },
    neastedLevel: Number,
    spoilerType: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      routeToCategory,
    };
  },
  computed: {
    ...mapState({
      request: (state) => state.productsCategories.basedRequest,
      spoilers: (state) => state.common.openings.spoiler,
    }),
    ...mapGetters({
      requestByParam: "requestByParam",
      itemsMatchedOneProperty: "itemsMatchedOneProperty",
      itemsBased: "itemsBased",
      itemById: "itemById",
    }),
    productsCategories() {
      const categories = this.itemsMatchedOneProperty(this.request, {
        parent: this.parentID,
      });
      if (this.parentID !== 0) {
        categories.unshift(
          this.itemById({ type: this.request.type, id: this.parentID }),
        );
      }
      return categories;
    },
    neastedStr() {
      let neastedStr = "";
      for (let index = 0; index < this.neastedLevel; index++) {
        neastedStr += "sub-";
      }
      return neastedStr;
    },
  },
};
</script>

<style lang="scss">
.categories {
  &__list {
    display: flex;
    justify-content: space-between;
    flex-grow: 1 1 auto;
    position: relative;
  }
  &__item {
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      border-bottom: 2px solid #231f20;
      width: 100%;
      transform-origin: left;
      transform: scaleX(0);
      transition: transform 0.1s;
    }
  }
  &__button {
    position: relative;
    display: block;
    color: #231f20;
    text-decoration: none;
    height: 40px;
    line-height: 40px;
    font-size: 1rem;
    text-transform: uppercase;
    @media (any-hover: hover) {
      &:hover {
        &::after {
          transform: scaleX(1);
        }
      }
    }
  }
  &__sub-list {
    position: absolute;
    background: #fff;
    transform: translate(0, 1px);
    min-width: 100%;
    left: 0;
    padding: 40px 0;
    display: flex;
    flex-flow: column wrap;
    max-height: 370px;

    &::after {
      content: "";
      position: fixed;
      height: 100%;
      width: 300%;
      transform: translate(-50%, 0);
      top: 0;
      left: 0;
      background: #fff;
    }
  }
  &__sub-item {
    position: relative;
    z-index: 1;
    margin-bottom: 15px;
    &:hover {
      color: #5073a2 !important;
      .categories-sub-list__button {
        color: #5073a2 !important;
      }
    }
  }
  &__sub-button {
    text-transform: uppercase;
    transition: 0.3s;
  }
}
</style>
