<template>
  <div class="categories" :class="mobile ? 'categories_mobile' : ''">
    <!-- <Transition> -->
    <ul
      v-if="productsCategories && productsCategories.length"
      :class="
        list.visible && mobile && slug !== 'rootCategories'
          ? `categories${neastedStr}-list categories${neastedStr}-list_active`
          : `categories${neastedStr}-list`
      "
      v-show="mobile && list ? list.visible : true"
    >
      <li
        :class="`categories${neastedStr}-list__item  icon-arrow`"
        v-for="productCategory in productsCategories"
        :key="productCategory.id"
      >
        <button
          :class="`categories${neastedStr}-list__button`"
          @click="buttonClick(productCategory, slug)"
        >
          {{
            productCategory.id == parent ? "ВСЕ ТОВАРЫ" : productCategory.name
          }}
        </button>
        <slot
          @nestedActiveUpd="(bool) => (nestedActive = bool)"
          :parent="productCategory.id"
          :parentCategorySlug="productCategory.slug"
        ></slot>
      </li>
    </ul>
    <!-- </Transition> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import routeToCategoryMixin from "@/mixins/routeToCategoryMixin";
/**
 * Отображение ul для немобильного отображения устанавливается в v-show: true
 * Если же prop mobile = true и list: {visible: Boolean, ...}, то тогглер
 * метод при нажатии на родительскую категорию скрывает/показывает лист дочерних категорий
 *
 * (?) - поместить button внутрь шаблона
 */
export default {
  mixins: [routeToCategoryMixin],
  props: {
    parent: {
      type: Number,
      reqired: true,
    },
    parentCategorySlug: {
      type: String,
    },
    neastedLevel: Number,
    mobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      nestedActive: false,
    };
  },
  computed: {
    ...mapState({
      request: (state) => state.productsCategories.basedRequest,
      list(state) {
        return state.common.revs[this.slug];
      },
    }),
    ...mapGetters({
      itemsMatchedOneProperty: "itemsMatchedOneProperty",
      itemsBased: "itemsBased",
      itemById: "itemById",
    }),

    productsCategories() {
      let categories = this.itemsMatchedOneProperty(this.request, {
        parent: this.parent,
      });
      if (!categories === [] && this.parent != 0) {
        categories.unshift(
          this.itemById({ type: this.request.type, id: this.parent })
        );
      }
      return categories;
    },

    neastedStr() {
      let neastedStr = "";
      for (let index = 0; index < this.neastedLevel; index++) {
        neastedStr += "-sub";
      }
      return neastedStr;
    },
  },
  methods: {
    ...mapMutations({
      setScrollFlag: "common/setScrollFlag",
      addRev: "common/addRev",
      updateRev: "common/updateRev",
      closeRevs: "common/closeRevs",
    }),
    ...mapActions({}),

    /**
     * Метод работает по разному для разных устройств (разрешения)
     * Класический десктопный вариант предполагает простой переход к категориям
     * 
     * @param {*} productCategory 
     * @param {*} parentCategorySlug 
     */
    buttonClick(productCategory, parentCategorySlug) {
      if (this.mobile) {
        this.closeRevs(["headerMenu", "rootCategories"]); //, 'rootCategories'
        if (productCategory.parent == 0 && this.slug === "rootCategories") {
          this.updateRev({
            name: [productCategory.slug],
            value:
              this.$store.state.common.revs[
                productCategory.slug
              ].visible,
          });
        } else {
          this.setScrollFlag({ value: true, toogle: false });
          this.updateRev({
            name: "headerMenu",
            value: false,
            toggleValue: false,
          });
          this.closeRevs();
          this.routeToCategory(productCategory, parentCategorySlug);
        }
      } else {
        this.routeToCategory(productCategory, parentCategorySlug);
      }
    },
  },
  /**
   * Переустанавливаем prop.
   */
  created() {
    !this.parentCategorySlug
      ? (this.slug = "rootCategories")
      : (this.slug = this.parentCategorySlug);

    this.addRev({ [this.slug]: {} });
    this.updateRev({
      name: "rootCategories",
      value: true,
      toggleValue: false,
    });
    this.updateRev({
      name: "rootCategories",
      value: true,
      toggleValue: false,
      prop: "off",
    });
  },
};
</script>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.categories {
  &-list {
    display: flex;
    justify-content: space-between;
    flex-grow: 1 1 auto;
    position: relative;

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
  }
  &-sub-list {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    background: #fff;
    transform: translate(0, 1px);
    min-width: 100%;
    left: 0;
    // overflow: hidden;
    padding: 40px 0;
    display: flex;
    flex-flow: column wrap;
    max-height: 370px;
    &_active {
      opacity: 1;
      visibility: visible;
    }

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
    &__item {
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
    &__button {
      text-transform: uppercase;
      transition: 0.3s;
    }
  }
}
.categories-list__item,
.categories-sub-list__item {
  // position: relative;
}
</style>
