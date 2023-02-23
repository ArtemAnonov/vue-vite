<template>
  <section class="filter">
    <ContainerNode>
      <ButtonNode
        class="filter__button filter__button_filter-show"
        @click.stop="setBasic({name: 'filter'})"
      >Фильтр товаров</ButtonNode
      >
      <BasicNode :item="{name: 'filter'}"
                 @click.stop
      >
        <div
          ref="filterBody"
          class="filter__body"
          :style="{ minHeight: filterBodyHeight + 'px' }"
        >
          <div class="filter__wrapper container">
            <ul class="filter__list">
              <li class="filter__item">
                <CatalogRevealingNode
                  :item="{ name: 'catalogPrices' }"
                  @apply="$emit('updateFilter')"
                  @setDefault="setDefaultPrices"
                >
                  <template #title>Цена</template>
                  <template #main>
                    <FilterPrices v-if="browserReady" />
                  </template>
                </CatalogRevealingNode>
              </li>
              <li
                v-for="(attr, index) in attributes"
                :key="index"
                class="filter__item"
              >
                <CatalogRevealingNode
                  :item="{ name: attr.slug }"
                  :name="attr.slug"
                  :bodyLoaded="attr.slug ? true : false"
                  @apply="$emit('updateFilter')"
                  @setDefault="setDefaultAttribute(attr.slug)"
                >
                  <template #title>{{ attr.name }}</template>
                  <template #main>
                    <ul class="filter__sub-list">
                      <li
                        v-for="{ id, name } in singleAttribute(attr.slug)"
                        :key="id"
                        class="filter__sub-item"
                      >
                        <InputCheckboxNode
                          :modelValue="filterParamsChecked(attr.slug, id)"
                          :labelText="name"
                          @input="
                            updateCatalogRevealing({
                              type: attr.slug,
                              value: { id, name },
                            })
                          "
                        ></InputCheckboxNode>
                      </li>
                    </ul>
                  </template>
                </CatalogRevealingNode>
              </li>
              <li class="filter__item">
                <InputCheckboxNode
                  v-model="onlineOnly"
                  labelText="Доступно онлайн"
                ></InputCheckboxNode>
              </li>
            </ul>
            <ButtonNode
              class="filter__button filter__button_clean"
              @click.stop="filterCleanAndLoadDefault"
            >Очистить<span>фильтры</span></ButtonNode
            >
          </div>
        </div>
      </BasicNode>
    </ContainerNode>

  </section>
</template>

<script>
/**
 * Шаблон InputCheckboxNode работает только с v-model...
 * Подтверждение мутации опций, списка термов [0:{id: ..., name: ...}] не сделано
 * (подразумевается синхронизация булевого modelValue чекбокса и элемента массива опций)
 */

// setAttributeTerms({ type: attr.slug, value: { id, name } })
import Sticky from "sticky-js";

import {
  mapState, mapGetters, mapMutations, mapActions,
} from "vuex";
import { isEmpty } from "lodash-es";
import FilterPrices from "@/components/filter/FilterPrices.vue";
import CatalogRevealingNode from "@/components/CatalogRevealingNode.vue";
import BasicNode from "@/components/BasicNode.vue";

export default {
  components: {
    FilterPrices,
    CatalogRevealingNode,
    BasicNode,
  },
  emits: ["updateFilter"],
  data() {
    return {
      onlineOnly: true,
      // filterShow: true,
      applyValidate: true,
      revealings: {
        sorting: {},
        prices: {},
      },
      filterBodyHeight: null,
    };
  },

  computed: {
    ...mapGetters({
      itemsBased: "itemsBased",
      itemsMatchedByCallback: "itemsMatchedByCallback",
      attributesSlugs: "productsAttributes/attributesSlugs",
    }),
    ...mapState({
      browserReady: (state) => state.common.browserReady,
      // minCost: state => state.products.minCost,
      // maxCost: state => state.products.maxCost,
      minCost: (state) => state.filter.minCost || 10000,
      maxCost: (state) => state.filter.maxCost || 1000000,
      min_price: (state) => state.filter.params.min_price,
      max_price: (state) => state.filter.params.max_price,

      // orderAndOrderBy: state => state.filter.params.orderAndOrderBy,
      filterParams: (state) => state.filter.params,

      productsBrandsRequest: (state) => state.productsTermsBrands.basedRequest,
      productsColorsRequest: (state) => state.productsTermsColors.basedRequest,
      productsMaterialsRequest: (state) => state.productsTermsMaterials.basedRequest,
      productsSizesRequest: (state) => state.productsTermsSizes.basedRequest,
      productsAttributesRequest: (state) => state.productsAttributes.basedRequest,
    }),

    attributes() {
      return this.itemsMatchedByCallback(
        this.productsAttributesRequest,
        { regExp: /^pa_yookassa_*./ },
        (element, keys, params) => {
          if (element.slug.match(params.regExp) === null) {
            return true;
          }
          return false;
        },
      );
    },
  },
  watch: {
    /**
     * Хз зачем это здесь
     */
    // attributes(newValue) {
    //   this.attributesSlugsRevs(newValue);
    // },
  },
  created() {
    if (import.meta.env.VITE_LIKE_A_SPA) {
      this.getItems({ basedRequest: this.productsBrandsRequest });
      this.getItems({ basedRequest: this.productsMaterialsRequest });
      this.getItems({ basedRequest: this.productsColorsRequest });
      this.getItems({ basedRequest: this.productsSizesRequest });
      this.getItems({ basedRequest: this.productsAttributesRequest });
    }
  },
  mounted() {
    // eslint-disable-next-line no-new
    new Sticky(".filter__wrapper", {
      // wrap: true,
      marginTop: 40,
      marginBottom: 100,
      stickyFor: 1024,
      stickyClass: "filter__wrapper_stuck",
      stickyContainer: ".page-main",
    });
    this.filterBodyHeight = this.$refs.filterBody.offsetHeight;
  },
  methods: {
    ...mapMutations({
      setMaterials: "filter/setMaterials",
      setBrands: "filter/setBrands",
      setColors: "filter/setColors",
      setSizes: "filter/setSizes",
      setOrderAndOrderBy: "filter/setOrderAndOrderBy",
      setAttributeTerms: "filter/setAttributeTerms",
      setMaxPrice: "filter/setMaxPrice",
      setMinPrice: "filter/setMinPrice",
      unsetDefaultAttributeOptions: "filter/unsetDefaultAttributeOptions",
      setDefaultPrices: "filter/setDefaultPrices",
      setCatalogRevealing: "common/setCatalogRevealing",
      setBasic: "common/setBasic",
    }),

    ...mapActions({
      getItems: "getItems",
      setDefaultFilter: "filter/setDefaultFilter",
      updateAllOpeningTypeItems: "common/updateAllOpeningTypeItems",
    }),

    singleAttribute(attributeSlug) {
      switch (attributeSlug) {
        case "pa_brand":
          return this.itemsBased(this.productsBrandsRequest);
        case "pa_material":
          return this.itemsBased(this.productsMaterialsRequest);
        case "pa_tcvet":
          return this.itemsBased(this.productsColorsRequest);
        case "pa_razmer":
          return this.itemsBased(this.productsSizesRequest);
        default:
          break;
      }
      return {};
    },

    // /**
    //  * Возвращает объект формата { "pa_brand": false }
    //  */
    // attributesSlugsRevs(object) {
    //   if (isEmpty(object)) return;
    //   const items = {};
    //   for (const key in object) {
    //     if (Object.hasOwnProperty.call(object, key)) {
    //       const element = object[key];
    //       items[element.slug] = {};
    //     }
    //   }
    //   return items;
    // },
    /**
     * Установка чекбоксов атрибутов. Извлекает установленное значение
     */
    filterParamsChecked(attrSlug, termID) {
      const terms = this.filterParams[attrSlug].options;
      const term = terms.find((i) => i.id === termID);
      if (term) return true;
      return false;
    },

    // filterVisible() {
    //   this.filterShow ? (this.filterShow = false) : (this.filterShow = true);
    // },

    /**
     * Производится установка дефолтных значения для компонентов revealing-node -
     * автоочиска options не позволяет изменить на default: true
     * (Возможно более изящное решение проблемы...)
     */
    filterCleanAndLoadDefault() {
      this.setDefaultFilter();
      this.updateAllOpeningTypeItems({ type: "catalogRevealing" });
      this.updateAllOpeningTypeItems({
        type: "catalogRevealing",
        value: true,
        prop: "default",
      });
      this.$emit("updateFilter");
    },

    /**
     * Устанавливает мутированнй терм атрибута в формате {id, name}
     * Если options пуст, значит revealing представляет собой дефолтное состояние
     */
    updateCatalogRevealing({ type, value }) {
      this.setAttributeTerms({ type, value });
      const marker = isEmpty(this.filterParams[type].options);
      this.setCatalogRevealing({
        name: type,
        value: marker,
        prop: "default",
      });
    },

    /**
     * Очистка options, установка дефолтного значения для компонента catalog-revealing-node
     */
    setDefaultAttribute(slug) {
      this.setCatalogRevealing({
        name: slug,
        value: true,
        prop: "default",
      });
      this.unsetDefaultAttributeOptions(slug);
    },
  },
};
</script>

<style lang="scss">
.filter {
  position: relative;
  z-index: 1;
  background: #f7f7f7;
  border-bottom: 0 solid #d8d8d8;
  .basic_active {
    .filter__body {
      // border-bottom: 0.0666666667rem solid #d8d8d8;
      &::after {
        position: absolute;
        content: '';
        width: 500%;
        height: 0.0666666667rem;
        bottom: 0;
        left: -200%;
        background: #d8d8d8;
      }
    }
    .filter__wrapper {
      display: flex;
      padding: 1.3333333333rem 0;
      height: auto;
      opacity: 1;
      visibility: visible;
    }
    .filter__button_filter-show {
      &::after {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  &_active {

  }

  &__body {
  position: relative;

  }

  &__wrapper {
    position: relative;
    padding: 0;
    height: 0;
    opacity: 0;
    visibility: hidden;
    display: flex;

    //
    z-index: 1;
    &::before {
      opacity: 0;
      background: #fff;
      content: "";
      position: absolute;
      height: 100%;
      width: 300%;
      top: 0;
      left: 0;
      transform: translate(-50%, 0);
      box-shadow: 0 0 0.3333333333rem 0 rgba(0, 0, 0, 0.25);
    }
    &_stuck {
      &::before {
        opacity: 1;
      }
      padding: 0 !important;
      .filter__button_clean {
        display: none;
      }
    }
  }

  &__list {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
    @media (max-width: ($md3+px)) {
      flex-direction: column;
      flex: 1 0 auto;
    }
  }

  &__item {
    //li
    padding: 0.5rem 0 0.5rem 0;
    display: flex;
    align-items: center;
    .input {
      margin-left: 1rem;
    }
  }

  &__sub-item {
    margin-bottom: 0.8rem;
  }

  &__button {
    &_filter-show {
      position: absolute;
      top: -55px;
      right: 0;
      &::after {
        opacity: 0;
        visibility: hidden;
        content: "";
        position: absolute;
        top: calc(100% + 0.6666666667rem);
        left: calc(50% - 0.5333333333rem);
        width: 1.0666666667rem;
        height: 1.0666666667rem;
        background-color: #f7f7f7;
        border: 0.0666666667rem solid #d8d8d8;
        border-width: 0.0666666667rem 0 0 0.0666666667rem;
        transform: rotate(45deg);
      }
    }
    &_clean {
      margin-left: 1rem;
      span {
        margin-left: 0.3rem;
      }
      @media (max-width: ($md4+px)) {
        span {
          display: none;
        }
      }
    }
  }
  .container {
    position: relative;
  }
}
</style>
