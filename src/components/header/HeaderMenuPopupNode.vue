<template>
  <div class="header-menu" v-show="windowWidth < 1024">
    <button class="header-burger-icon" @click.stop="menuVisability"><i></i><i></i><i></i>
    </button>
    <popup-node name="headerMenu">
      <categories-node :parent="0" :neastedLevel="0" v-slot="slotProps" :mobile="true">
        <categories-node :neastedLevel="1" :parent="slotProps.parent" :parentCategorySlug="slotProps.parentCategorySlug"
          :mobile="true">
        </categories-node>
      </categories-node>
      <nav-node name="top_header">
        <template #choise-location>
          <li class="header-nav__item icon-favorite">
            <button class="header-nav__btn" @click="$router.push('/favorite')">Избранное</button>
          </li>
          <li class="header-nav__item icon-profile">
            <button class="header-nav__btn" @click="loginPopupVisible">Профиль</button>
          </li>
        </template>
      </nav-node>
    </popup-node>

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import NavNode from '@/components/header/NavNode.vue'
import CategoriesNode from '@/components/header/CategoriesNode.vue'

export default {
  components: {
    NavNode,
    CategoriesNode,
  },

  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({

    }),
    ...mapState({
      windowWidth: state => state.common.windowWidth,
      popup(state) {
        return state.common.revs.headerMenu
      },
      loginPopup(state) {
        return state.common.revs.login
      }
    }),
  },
  methods: {
    ...mapMutations({
      updateRev: 'common/updateRev',
      setScrollFlag: 'common/setScrollFlag',
    }),
    ...mapActions({

    }),
    /**
     * (!) Скролл-дисеблер прописан в двух метсах
     */
    menuVisability() {
      this.updateRev({ name: 'headerMenu', value: this.popup.visible })
      this.setScrollFlag({ value: this.popup.visible })
    },
    loginPopupVisible() {
      this.updateRev({
        name: "login",
        value: this.loginPopup.visible,
      });
    },
  },



}
</script>

<style lang="scss">
.header-menu {
  .popup {
    z-index: -2;
    // display: block !important;
  }

  .popup__wrapper {
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
  .categories-list {
    flex-direction: column;

    &__button {
      text-transform: none;

    }
  }

  .categories-sub-list {
    opacity: 1 !important;
    visibility: visible !important;
    right: 0;
    left: auto;
    position: relative;
    padding: 15px 0;

    &_active {}

    &::before {
      position: absolute;
      top: 0;
      content: '';
      background-color: #231f20;
      height: 20px;
      width: 300px;
      transform: translate(-20px, 0);
    }

    &::after {
      background-color: #f7f7f7;
      width: 300px;
      transform: translate(-20px, 0);
    }

    &__item {
      margin-left: 20px;
    }
  }

  .categories-list__item,
  .categories-sub-list__item {
    position: relative;
    display: block !important;

    &::before {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      font-size: .6rem;
    }
  }

  .header-nav {

    &__list {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: start;

      &::after {
        z-index: -1;
        content: '';
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
          margin-right: .5rem;
          display: inline-flex;
          position: relative;
        }
      }
      &:nth-child(2) {
        display: inline-flex;
        align-items: center;

        &::before {
          margin-right: .5rem;
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
          content: '';
          position: absolute;
          height: 100%;
          width: 1px;
          top: 0;
          left: 0;
          background: rgb(216, 216, 216);
        }
      }

      &::after {
        content: '';
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
  padding: .8rem .8rem .8rem 0;

  i {
    display: inline-flex;
    height: .1333333333rem;
    background-color: #231f20;
    width: 1.6rem;
    transition: transform .2s;

    &:nth-child(1) {
      margin-bottom: 7px;
    }

    &:nth-child(2) {
      margin-bottom: 7px;
    }

    &:nth-child(3) {}
  }
}

.header-nav__btn.icon-profile {
  &::before {
    margin-right: 5px;
  }
}
</style>