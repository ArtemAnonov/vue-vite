<template>
  <div class="header-menu">
    <button
      class="header-menu__icon"
      :class="{'header-menu__icon_active': headerMenuPopup?.active }"
      @click.stop="setPopup({ name: 'headerMenu' })"
    >
      <i/><i/><i/>
    </button>
    <PopupNode :item="{ name: 'headerMenu' }">
      <CategoriesNode
        v-slot="slotProps"
        class="container"
        :spoilerType="true"
      >
        <CategoriesNode
          :nestedLevel="slotProps.nestedLevel"
          :parentID="slotProps.parentID"
          :parentCategorySlug="slotProps.parentCategorySlug"
        />
      </CategoriesNode>
      <NavNode name="top_header">
        <template #in>
          <li class="header-nav__item">
            <button
              class="header-nav__btn icon-profile"
              @click.stop="
                userAuth
                  ? $router.push({name: 'PersonalProfile'})
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
import { computed } from "vue";
import { useStore } from "vuex";
import NavNode from "@/components/header/NavNode.vue";
import CategoriesNode from "@/components/header/CategoriesNode.vue";

export default {
  components: {
    NavNode,
    CategoriesNode,
  },
  setup() {
    const { state, commit } = useStore();
    return {
      userAuth: computed(() => state.auth.userAuth),
      setPopup: (value) => commit("common/setPopup", value),
      headerMenuPopup: computed(() => state.common.openings.popup?.headerMenu),
    };
  },
};
</script>

<style lang="scss">
.header-menu {
  display: none;
  &__icon {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: none;
  outline: none;
  background-color: transparent;
  // padding: 0 23px 0 16px;
  margin-right: 16px;
  min-height: 46px;
  width: 28px;
  i {
    position: absolute;
    display: inline-flex;
    height: 2px;
    background-color: #231f20;
    width: 100%;
    left: 0;
    // left: 50%;
    // transform: translate(-50%, 0);
    transition: 0.2s;
    &:nth-child(1) {
      top: 12px;
    }
    &:nth-child(2) {
      // transform: translate(-50%, 0);
    }
    &:nth-child(3) {
      bottom: 12px;
      // transform: translate(-50%, 0);
    }
  }
  &_active {
    i {

    &:nth-child(1) {
      width: 104%;
      transform-origin: top right;
      transform: translate(-10%, 0) rotate(-45deg);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      width: 104%;
      transform-origin: bottom right;
      transform: translate(-10%, 0) rotate(45deg);
    }
  }
  }
}
  @media (max-width: ($md2+px)) {
    display: block;
  }
  .popup {
    z-index: -2;
    &__scroll-wrapper {
      // margin: 40px 0;
      margin: 0 !important;
    }
    &__wrapper {
      overflow: hidden;
      position: absolute;
      top: 62px !important;
      left: 0 !important;
      transform: translate(0, 0) !important;
      padding: 0 20px;
      height: 100% !important;
      width: 300px !important;
      border-top: 3px solid #d8d8d8;

      @media (max-width: ($md3+px)) {
        top: 54px !important;
      }
    }
  }

  /** */
  .categories {
    padding: 0;
  }
  .categories__list {
    flex-direction: column;

    &__button {
      text-transform: none;
    }
  }

  .categories__first-list {
    opacity: 1 !important;
    visibility: visible !important;
    right: 0;
    left: auto;
    position: relative;
    background: #f1f1f1 !important;
    padding: 20px 20px 10px 10px !important;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      background-color: #d8d8d8;
      height: 1px;
      width: 300px;
      transform: translate(-20px, 0);
      z-index: 1;
    }

    &::after {
      transition: 0s;
      background-color: #f7f7f7 !important;
      width: 600px;
      transform: translate(-30%, 0);
    }

    &__item {
      margin-left: 20px;
    }
  }

  .categories__item,
  .categories__first-item {
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
        height: 200%;
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
      &:last-child {
        &::before {
        content: "";
        position: absolute;
        height: 1px;
        width: 300px;
        bottom: 0;
        left: -20px;
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
      &.icon-profile {
        &::before {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
