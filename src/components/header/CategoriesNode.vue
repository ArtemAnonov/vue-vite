<template>
  <div class="categories"
    :class="{default: !activityCategory}">
    <ul
      v-if="!isEmpty(categories)"
      :class="`categories__${ordinal}list`">

      <li
        v-for="category in categories"
        :key="category.id"
        :class="[`categories__${ordinal}item`,
                 { active: category.slug === activityCategory?.slugs[activityCategory.index],
                   current: category.slug === activityCategory?.slugs[activityCategory.index] && !activityCategory?.slugs[activityCategory.index + 1]
                 },
        ]"
        @click.stop="routeToSingleProductCategory(category)"
      >
        <SpoilerNode
          :item="{
            name: category.slug,
            default: spoilerType && !isEmpty(subCategories(category.id)),
          }"
        >
          <template #button>
            <BaseLinkNode
              :class="[`categories__${ordinal}button`, ]" >
              {{
                category.id === parentID
                  ? "ВСЕ ТОВАРЫ"
                  : category.name
              }}
            </BaseLinkNode>
          </template
          >
          <template #list>
            <slot :nestedLevel="nestedLevel + 1"
              :parentID="category.id"/>
          </template>
        </SpoilerNode
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { isEmpty } from "lodash-es";
import { computed } from "vue";
import { useStore } from "vuex";
import { toOrdinal } from "@/api/utils";
import SpoilerNode from "@/components/SpoilerNode.vue";

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
    // логика связанная с сайдбаром и отображение выбранной категории
    // если дефолтное значение, то добавляет текущюю категорю как "ВСЕ ТОВАРЫ", если имеет подкатгории
    activityCategory: {
      default: null,
    },
  },
  setup(props) {
    const store = useStore();
    const ordinal = props.nestedLevel ? `${toOrdinal(props.nestedLevel)}-` : "";
    const request = store.state.productsCategories.basedRequest;
    const categories = computed(() => {
      const items = store.getters.itemsMatchedOneProperty(request, {
        parent: props.parentID,
      });
      if (props.parentID !== 0 && props.activityCategory === null && !isEmpty(items)) {
        const selfCategory = store.getters.singleById({ type: request.type, id: props.parentID });
        items[selfCategory.id] = selfCategory;
      }
      return items;
    });
    return {
      isEmpty,
      routeToSingleProductCategory: (value) => store.dispatch("productsCategories/routeToSingleProductCategory", value),
      ordinal,
      categories,
      subCategories: (value) => store.getters.itemsMatchedOneProperty(request, {
        parent: value,
      }),
    };
  },
};
</script>

<style lang="scss">
.categories {
  &.default {
    li {

    }
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
      background: #fff;
      transform: translate(0, 1px);
      min-width: 100%;
      left: 0;
      padding: 20px 20px;
      // display: flex;
      // flex-flow: column wrap;

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
    }
    .categories__first-button {
      text-transform: uppercase;
      transition: 0.3s;
    }
  }
}
</style>
