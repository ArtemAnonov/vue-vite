<template>
  <div class="categories"
    :class="{default: !activityCategory}">
    <!--       :class="
        spoilers?.slug?.active && spoilerType
          ? `categories__${ordinal}list categories__${ordinal}list_active`
          : `categories__${ordinal}list`
      " -->
    <ul
      v-if="productsCategories && productsCategories.length"
      :class="`categories__${ordinal}list`">

      <li
        v-for="productCategory in productsCategories"
        :key="productCategory.id"
        :class="`categories__${ordinal}item`"
        @click.stop="routeToSingleProductCategory(productCategory)"
      >
        <SpoilerNode
          :item="{
            name: productCategory.slug,
            default: spoilerType,
          }"
        >
          <template #button>
            <!-- v-if="activityCategory === 'default'" -->
            <!-- :class="[`categories__${ordinal}button`, {[`categories__${ordinal}button_active`]: activityCategory}]" -->
            <button
              :class="[`categories__${ordinal}button`, {active: productCategory.slug === activityCategory}]" >
              {{
                productCategory.id === parentID
                  ? "ВСЕ ТОВАРЫ"
                  : productCategory.name
              }}
            </button>
          </template
          >
          <template #list>
            <slot :nestedLevel="nestedLevel + 1"
              :parentID="productCategory.id"/>
          </template>
        </SpoilerNode
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { toOrdinal } from "@/api/utils";
import SpoilerNode from "@/components/SpoilerNode.vue";
import { routeToSingleProductCategory } from "@/api/helpers";

export default {
  components: {
    SpoilerNode,
  },
  props: {
    parentID: {
      type: Number,
      reqired: true,
      default: 0,
    },
    nestedLevel: {
      type: Number,
      default: 0,
    },
    spoilerType: {
      type: Boolean,
      default: false,
    },
    activityCategory: {
      default: null,
    },
  },
  setup(props) {
    const store = useStore();
    const ordinal = props.nestedLevel ? `${toOrdinal(props.nestedLevel)}-` : "";
    const spoilers = store.state.common.openings.spoiler;
    const request = store.state.productsCategories.basedRequest;
    const productsCategories = computed(() => {
      const categories = store.getters.itemsMatchedOneProperty(request, {
        parent: props.parentID,
      });
      if (props.parentID !== 0 && props.activityCategory === null) {
        categories.unshift(
          store.getters.singleById({ type: request.type, id: props.parentID }),
        );
      }
      return categories;
    });
    return {
      routeToSingleProductCategory,
      spoilers,
      ordinal,
      productsCategories,
    };
  },
};
</script>

<style lang="scss">
.categories {
  &.default {
    .categories__list {
      display: flex;
      justify-content: space-between;
      flex-grow: 1 1 auto;
      position: relative;
    }
    .categories__item {
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
    .categories__button {
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
    .categories__first-list {
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
    .categories__first-item {
      position: relative;
      z-index: 1;
      margin-bottom: 15px;
      &:hover {
        color: #5073a2 !important;
        // .categories-first-list__button {
        //   color: #5073a2 !important;
        // }
      }
    }
    .categories__first-button {
      text-transform: uppercase;
      transition: 0.3s;
    }
  }
}
</style>
