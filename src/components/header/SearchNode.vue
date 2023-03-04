<template>
  <div class="search">
    <!--       v-show="scrollY < 99" -->
    <button
      class="search__button"
      :class="{ search__button_scrolled: scrollY > 99 }"
      @click.stop="setPopup({ name: 'search' })"
    >
      <span class="search__icon icon-search" />
      <span class="search__input">Поиск</span>
    </button>
    <PopupNode :item="{ name: 'search' }">
      <form class="search__form">
        <span class="search__icon icon-search" />
        <input
          v-model="queryString"
          class="search__input"
          placeholder="Юбки"
          type="text"
          @input="searchAll"
        >
        <CloseBtnNode @click.prevent="popupInputButton" />
      </form>
      <div class="search__result result-search">
        <template v-if="queryString.length > 2">
          <template v-if="isEmpty(pCats) && isEmpty(products)">
            <h3 class="result-search__title">К сожалению по вашему запросу ничего не было найдено!</h3>
          </template>
          <template v-else>
            <div v-if="!isEmpty(pCats)"
              class="result-search__row">
              <h3 class="result-search__title">Разделы каталога</h3>
              <div class="result-search__items">
                <button
                  v-for="item in pCats"
                  :key="item.id"
                  class="result-search__category"
                  @click="routeToSingleProductCategory(item)"
                >
                  {{ item.name }}
                </button>
              </div>
            </div>
            <div v-if="!isEmpty(products)"
              class="result-search__row">
              <h3 class="result-search__title">Результаты поиска</h3>
              <div class="result-search__items">
                <div class="result-search__products">
                  <!-- :breakpoints="breakpoints" -->
                  <SliderProductsNode
                    slug="header-search"
                    :products="products"
                    class="slider-products-section__slider"
                  />
                </div>
              </div>
            </div>
          </template>
        </template>
        <template v-else>
          <div class="result-search__row">
            <h3 class="result-search__title">Популярные разделы</h3>
            <div class="result-search__items">
              <CategoriesNode/>
            </div></div
          ></template>
      </div>
    </PopupNode>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { isEmpty } from "lodash-es";
import { routeToSingleProductCategory } from "@/api/helpers";
import SliderProductsNode from "@/components/sliders/SliderProductsNode.vue";
import CategoriesNode from "@/components/header/CategoriesNode.vue";

export default {
  components: {
    SliderProductsNode,
    CategoriesNode,
  },
  setup() {
    const store = useStore();
    const productsType = store.state.products.basedRequest.type;
    const pCatsType = store.state.productsCategories.basedRequest.type;
    const search = (payload) => store.getters.search(payload);
    // dispatch('search', payload);
    const queryString = ref("");
    const products = ref({});
    const pCats = ref({});
    const setPopup = (value) => store.commit("common/setPopup", value);
    const searchAll = () => {
      products.value = search({ str: queryString.value, type: productsType });
      pCats.value = search({ str: queryString.value, type: pCatsType });
    };
    const popupInputButton = () => {
      if (queryString.value) {
        queryString.value = "";
        searchAll();
      } else {
        setPopup({ name: "search" });
      }
    };

    return {
      isEmpty,
      routeToSingleProductCategory,
      setPopup,
      products,
      pCats,
      searchAll,
      popupInputButton,
      queryString,
      scrollY: computed(() => store.state.common.scrollY),
    };
  },
};
</script>

<style lang="scss">
// .header__wrapper_scrolled {
//   .search {
//     height: 22px;
//     &__header-btn {
//       padding: 0;
//     }
//   }
// }
.search {
  .search__button,
  .search__form {
    &:hover {
      .search__icon::before {
        color: $mainColor;
      }
    }
  }
  &__button {
    display: flex;
    align-items: end;
    min-width: 480px;
    align-items: center;
    max-width: 480px;
    height: 50px;
    cursor: pointer;
    transition: box-shadow 0.1s, border-color 0.1s;
    text-decoration: none;
    color: #868686;
    border: 2px solid #f1f1f1;
    &:hover {
      border-color: #d8d8d8;
      box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);
    }
    @media (max-width: ($md2+px)) {
      margin-left: 0 !important;
      display: block;
      min-width: auto;
      max-width: auto;
      height: auto;
      border: none;
      box-shadow: none;
      &:hover {
        border-color: transparent;
        box-shadow: none;
      }
      .search__icon {
        padding: 0;
        &::before {
          color: $mainColor !important;
        }
      }
      .search__input {
        display: none;
      }
    }
    &_scrolled {
      margin-left: 1rem;
      display: block;
      min-width: auto;
      max-width: auto;
      height: auto;
      border: none;
      box-shadow: none;
      &:hover {
        border-color: transparent;
        box-shadow: none;
      }
      .search__icon {
        padding: 0;
        &::before {
          color: $mainColor !important;
        }
      }
      .search__input {
        display: none;
      }
    }
  }

  &__form {
    position: relative;
    height: 50px;
    padding: 10px 20px 10px 0;
    border: 2px solid #f1f1f1;
    transition: border-color 0.1s, box-shadow 0.1s;
    margin-bottom: 1.5625rem;
    display: flex;
    align-items: center;
    &:hover {
      box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);
      input::placeholder {
        transition: 0.5s;
      }
    }
    input {
      width: 100%;
      height: 100%;
    }
  }

  &__icon {
    // transition: 0.3s;
    display: flex;
    color: #868686;
    padding: 0 1rem;
    &::before {
      color: #868686;
      font-size: 22px;
    }
  }

  &__input {
    transition: 0.5s;
    font-size: 1.13333rem;
  }
  .popup {
    &__wrapper {
      // height: 100%;
    }
    &__inner {
      min-width: 0; // for swiper
    }
  }
}

.result-search {
  // .result-search__row
  &__row {
    flex-direction: row;
    border-bottom: 0.0625rem solid var(--border);
    margin-bottom: 1.75rem;
    padding-bottom: 1.5rem;
  }
  // .result-search__title
  &__title {
    margin-bottom: 1rem;
    font-size: 1.125rem;
    line-height: 1.3125rem;
  }
  // .result-search__items
  &__items {
  }
  // .result-search__category
  &__category {
    padding: 0.36rem 0;
  }
  // .result-search__products
  &__products {
  }
  .categories {
    &__list {
      flex-direction: column;
    }
    &__button {
      text-transform: none;
      &:hover {
      color: #5073a2;
    }
    }
  }
}
</style>
