<template>
  <section class="filter" :class="filterShow ? 'filter_active' : ''">
    <ContainerNode>
      <ButtonNode
        @click="filterVisible"
        class="filter__button filter__button_filter-show"
        >Фильтр товаров</ButtonNode
      >
      <div class="filter__body">
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
            class="filter__item"
            v-for="(attr, index) in attributes"
            :key="index"
          >
            <CatalogRevealingNode
              :item="{ name: attr.slug }"
              @apply="$emit('updateFilter')"
              :name="attr.slug"
              @setDefault="setDefaultAttribute(attr.slug)"
              :bodyLoaded="attr.slug ? true : false"
            >
              <template #title>{{ attr.name }}</template>
              <template #main>
                <ul class="filter__sub-list">
                  <li
                    class="filter__sub-item"
                    v-for="{ id, name } in singleAttribute(attr.slug)"
                    :key="id"
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
          @click.stop="filterCleanAndLoadDefault"
          class="filter__button filter__button_clean"
          >Очистить<span>фильтры</span></ButtonNode
        >
      </div>
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
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { isEmpty } from "lodash-es";
import FilterPrices from "@/components/filter/FilterPrices.vue";
import CatalogRevealingNode from "@/components/CatalogRevealingNode.vue";

export default {
  components: {
    FilterPrices,
    CatalogRevealingNode,
  },
  emits: ["updateFilter"],
  data() {
    return {
      onlineOnly: true,
      filterShow: true,
      applyValidate: true,
      revealings: {
        sorting: {},
        prices: {},
      },
    };
  },
  watch: {
    attributes(newValue) {
      this.attributesSlugsRevs(newValue);
    },
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
      productsMaterialsRequest: (state) =>
        state.productsTermsMaterials.basedRequest,
      productsSizesRequest: (state) => state.productsTermsSizes.basedRequest,
      productsAttributesRequest: (state) =>
        state.productsAttributes.basedRequest,
    }),

    attributes() {
      return this.itemsMatchedByCallback(
        this.productsAttributesRequest,
        { regExp: /^pa_yookassa_*./ },
        function (element, keys, params) {
          if (element.slug.match(params.regExp) === null) {
            return true;
          }
        }
      );
    },
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
    }),

    ...mapActions({
      getItemsBased: "getItemsBased",
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
      }
    },

    /**
     * Возвращает объект формата { "pa_brand": false }
     */
    attributesSlugsRevs(object) {
      if (isEmpty(object)) return;
      const items = {};
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          const element = object[key];
          items[element.slug] = {};
        }
      }
      return items;
    },
    /**
     * Установка чекбоксов атрибутов. Извлекает установленное значение
     */
    filterParamsChecked(attrSlug, termID) {
      let terms = this.filterParams[attrSlug].options;
      let term = terms.find((i) => i.id == termID);
      if (term) return true;
      else return false;
    },

    filterVisible() {
      this.filterShow ? (this.filterShow = false) : (this.filterShow = true);
    },

    /**
     * Производится установка дефолтных значения для компонентов revealing-node -
     * автоочиска options не позволяет изменить на default: true
     * (Возможно более изящное решение проблемы...)
     */
    filterCleanAndLoadDefault() {
      // const slugs = this.attributesSlugs;
      // slugs.forEach((slug) => {
      //   this.setCatalogRevealing({
      //     name: slug,
      //     value: true,
      //     prop: "default",
      //   });
      // });
      this.setDefaultFilter();
      this.updateAllOpeningTypeItems({ type: "catalogRevealing" });
      this.updateAllOpeningTypeItems({ type: "catalogRevealing", value: true, prop: "default" });
      this.$emit("updateFilter");
    },

    /**
     * Устанавливает мутированнй терм атрибута в формате {id, name}
     * Если options пуст, значит revealing представляет собой дефолтное состояние
     */
    updateCatalogRevealing({ type, value }) {
      this.setAttributeTerms({ type, value });
      let marker = isEmpty(this.filterParams[type].options);
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
  created() {
    if (import.meta.env.VITE_LIKE_A_SPA) {
      this.getItems(this.productsBrandsRequest);
      this.getItems(this.productsMaterialsRequest);
      this.getItems(this.productsColorsRequest);
      this.getItems(this.productsSizesRequest);
      this.getItems(this.productsAttributesRequest);
    }
  },
  mounted() {
    // (async () => {
    //     const FilterPrices = await import(
    //       "@/components/filter/FilterPrices.vue"
    //     );
    // })();
  },
};
</script>

<style scoped lang="scss">
.filter {
  position: relative;
  z-index: 1;
  background: #f7f7f7;
  // border-top: 0 solid #d8d8d8;
  border-bottom: 0 solid #d8d8d8;
  &_active {
    // border-top: .0666666667rem solid #d8d8d8;
    border-bottom: 0.0666666667rem solid #d8d8d8;
    .filter__body {
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
  &__body {
    // display: none;
    transition: 0.5s;
    padding: 0;
    height: 0;
    opacity: 0;
    visibility: hidden;

    display: flex;
    &_active {
    }
  }

  &__list {
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
  }

  &__sub-list {
  }

  &__sub-item {
    margin-bottom: 0.8rem;
  }

  &__input {
    // элемент .revealing__main
  }

  &__button {
    &_filter-show {
      position: absolute;
      transform: translate(0, -150%);
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
}
</style>
