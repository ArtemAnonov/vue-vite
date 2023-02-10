<template>
  <div class="search">
    <!--       v-show="scrollY < 99" -->
    <button
      @click.stop="setPopup({ name: 'search' })"
      class="search__button"
      :class="{ search__button_scrolled: scrollY > 99 }"
    >
      <span class="search__icon icon-search"></span>
      <span class="search__input">Поиск</span>
    </button>
    <PopupNode :item="{ name: 'search' }">
      <form class="search__form" action="">
        <span class="search__icon icon-search"></span>
        <input
          class="search__input"
          v-model="searchInputValue"
          placeholder="Введите запрос..."
          type="text"
        />
        <CloseBtnNode @click.prevent="popupInputButton"></CloseBtnNode>
      </form>
    </PopupNode>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      searchInputValue: "",
    };
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      scrollY: (state) => state.common.scrollY,
    }),
  },
  methods: {
    ...mapMutations({
      setPopup: "common/setPopup",
    }),

    /**
     * Кнопка очищает input или закрывает popup
     */
    popupInputButton() {
      if (this.searchInputValue) {
        this.searchInputValue = "";
      } else {
        this.setPopup({ name: "search" });
      }
    },
  },
};
</script>

<style lang="scss">
.header__wrapper_scrolled {
  .search {
    height: 22px;
    &__header-btn {
      padding: 0;
    }
  }
}
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
    padding: 2px 20px 0 0;
    border: 2px solid #f1f1f1;
    transition: border-color 0.1s, box-shadow 0.1s;
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
}
</style>
