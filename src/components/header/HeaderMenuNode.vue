<template>
  <div class="header-menu">
    <button
      class="header-burger-icon"
      @click.stop="setPopup({ name: 'headerMenu' })"
    >
      <i></i><i></i><i></i>
    </button>
    <PopupNode :item="{ name: 'headerMenu' }">
      <CategoriesNode
        :parentID="0"
        :neastedLevel="0"
        v-slot="slotProps"
        :spoilerType="true"
      >
        <CategoriesNode
          :neastedLevel="1"
          :parentID="slotProps.parentID"
          :parentCategorySlug="slotProps.parentCategorySlug"
        >
        </CategoriesNode>
      </CategoriesNode>
      <NavNode name="top_header">
        <template #in>
          <li class="header-nav__item">
            <button
              class="header-nav__btn icon-profile"
              @click.stop="
                userAuth
                  ? $router.push('/personal/profile')
                  : setPopup({
                      name: 'login',
                    })
              "
            >
              {{ userAuth ? "Личный кабинет" : "Вход/Регистрация" }}
            </button>
          </li></template
        ></NavNode
      >
    </PopupNode>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import NavNode from "@/components/header/NavNode.vue";
import CategoriesNode from "@/components/header/CategoriesNode.vue";

export default {
  components: {
    NavNode,
    CategoriesNode,
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      userAuth: (state) => state.auth.userAuth,
    }),
  },
  methods: {
    ...mapMutations({
      setPopup: "common/setPopup",
    }),
  },
};
</script>

<style lang="scss">
.header-menu {
  display: none;
  @media (max-width: ($md2+px)) {
    display: block;
  }
  .popup {
    z-index: -2;
    // display: block !important;
  }

  .popup__wrapper {
    overflow: hidden;
    position: absolute;
    top: 60px !important;
    left: 0 !important;
    transform: translate(0, 0) !important;
    padding: 0 20px;
    height: 100% !important;
    width: 300px !important;

    @media (max-width: ($md3+px)) {
      top: 54px !important;
    }
  }

  /** */
  .categories__list {
    flex-direction: column;

    &__button {
      text-transform: none;
    }
  }

  .categories__sub-list {
    opacity: 1 !important;
    visibility: visible !important;
    right: 0;
    left: auto;
    position: relative;
    padding: 1rem 0 1rem 0.5rem;

    &::before {
      position: absolute;
      top: 0;
      content: "";
      background-color: #231f20;
      height: 20px;
      width: 300px;
      transform: translate(-20px, 0);
    }

    &::after {
      transition: 0s;
      background-color: #f7f7f7;
      width: 600px;
      transform: translate(-30%, 0);
    }

    &__item {
      margin-left: 20px;
    }
  }

  .categories__item,
  .categories__sub-item {
    position: relative;
    display: block !important;

    &::before {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      font-size: 0.6rem;
    }
  }

  .categories__item {
  }

  .header-nav {
    &__list {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: start;

      &::after {
        z-index: -1;
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-color: #f7f7f7;
        width: 300px;
        transform: translate(-20px, 0);
      }
    }

    &__item {
      width: 100%;
      position: relative;
      display: inline-grid;
      grid-column: 1 / 3;
      &:nth-child(1) {
        display: inline-flex;
        align-items: center;

        &::before {
          margin-right: 0.5rem;
          display: inline-flex;
          position: relative;
        }
      }
      &:nth-child(2) {
        display: inline-flex;
        align-items: center;

        &::before {
          margin-right: 0.5rem;
          display: inline-flex;
          position: relative;
        }
      }

      &:nth-child(3) {
        grid-column: 1 / 2;
      }

      &:nth-child(4) {
        padding-left: 20px;
        grid-column: 2 / 3;

        &::after {
          display: none;
        }

        &::before {
          content: "";
          position: absolute;
          height: 100%;
          width: 1px;
          top: 0;
          left: 0;
          background: rgb(216, 216, 216);
        }
      }

      &::after {
        content: "";
        position: absolute;
        height: 1px;
        width: 300px;
        top: 0;
        left: -20px;
        background: rgb(216, 216, 216);
      }
    }

    &__btn {
      margin: 0;
      padding: 1rem 0;
      color: #231f20;
      text-align: start;
    }
  }
}

.header-burger-icon {
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0.8rem 0.8rem 0.8rem 0;

  i {
    display: inline-flex;
    height: 0.1333333333rem;
    background-color: #231f20;
    width: 1.6rem;
    transition: transform 0.2s;

    &:nth-child(1) {
      margin-bottom: 7px;
    }

    &:nth-child(2) {
      margin-bottom: 7px;
    }

    &:nth-child(3) {
    }
  }
}

.header-nav__btn.icon-profile {
  &::before {
    margin-right: 5px;
  }
}
</style>