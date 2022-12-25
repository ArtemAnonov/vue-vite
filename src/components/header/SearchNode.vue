<template>
  <div class="search" @click.stop>
    <button
      v-show="scrollY < 99"
      class="search__header-button"
      @click="popupVisability"
    >
      <button class="search__header-btn icon-search"></button>
      <span>Поиск</span>
    </button>
    <popup-node name="search">
      <div class="">Блок находится в разработке...</div>
      <form action="">
        <div class="icon-search"></div>
        <input
          v-model="searchInputValue"
          placeholder="Введите запрос..."
          type="text"
        />
        <close-btn-node @click.prevent="popupInputButton"></close-btn-node>
      </form>
    </popup-node>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      searchInputValue: '',
    };
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      scrollY: (state) => state.common.scrollY,
      popup: (state) => state.common.revs.search,
    }),
  },
  methods: {
    ...mapMutations({
      updateRev: "common/updateRev",
    }),
    ...mapActions({}),

    popupVisability() {
      this.updateRev({
        name: "search",
        value: this.popup.visible,
      });
    },
    /**
     * Кнопка очищает input или закрывает popup
     */
    popupInputButton() {
      if (this.searchInputValue) {
        this.searchInputValue = "";
      } else {
        this.popupVisible();
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
  &__header-button {
    display: grid;
    align-items: end;
    @media (min-width: ($md2+px)) {
      min-width: 480px;
      display: flex;
      align-items: center;
      max-width: 480px;
      height: 50px;
      padding: 0 18px;
      cursor: pointer;
      transition: box-shadow 0.1s, border-color 0.1s;
      text-decoration: none;
      color: #868686;
      border: 2px solid #f1f1f1;
      @media (any-hover: hover) {
        &:hover {
          border-color: #d8d8d8;
          box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);
        }
      }
      span {
        display: inline-block !important;
        padding-top: 1px;
        transition: color 0.1s;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #868686;
        font-size: 1.13333rem;
        line-height: 21px;
      }
    }

    button {
      display: grid;
      align-items: end;
    }
    span {
      display: none;
    }
  }

  &__header-btn {
    padding-right: 10px;
    @media (max-width: ($md2+px)) {
      padding: 0;
    }
    &::before {
      font-size: 21px;
    }
  }

  form {
    position: relative;
    &:hover {
      .icon-search {
        color: inherit;
      }
    }
    .icon-search {
      transition: 0.5s;
      color: #868686;
      font-size: 21px;
      position: absolute;
      top: 50%;
      transform: translate(50%, -50%);
    }
    input {
      box-sizing: border-box;
      display: inline-block;
      height: 50px;
      padding: 2px 20px 0 40px;
      border: 2px solid #f1f1f1;
      border-radius: 0;
      font-size: 1.13333rem;
      width: 100%;
      transition: border-color 0.1s, box-shadow 0.1s;
      &:hover {
        transition: 0.5s;
        box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);
        &::placeholder {
          transition: 0.5s;
          color: inherit;
        }
        &:focus {
          box-shadow: 0 0 0 0 transparent;
        }
      }
    }
  }
}
</style>
