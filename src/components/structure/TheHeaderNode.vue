<template>
  <header class="header">
    <div
      ref="headerWrapperNode"
      class="header__wrapper"
      :class="headerWrapper.default ? '' : 'header__wrapper_scrolled'"
    >
      <div class="header__body">
        <div class="header-top">
          <ContainerNode>
            <NavNode name="top_header">
              <template #out>
                <li class="header-nav__item">
                  <RevealingNode :item="{ name: 'profileLoginned' }">
                    <ProfileSectionsList />
                  </RevealingNode>
                  <button
                    class="header-nav__btn icon-profile"
                    @click.stop="
                      userAuth
                        ? setRevealing({
                          name: 'profileLoginned',
                        })
                        : setPopup({
                          name: 'login',
                        })
                    "
                  >
                    {{ userAuth ? "Личный кабинет" : "Вход/Регистрация" }}
                  </button>
                </li></template
              >
            </NavNode>
          </ContainerNode>
        </div>
        <div class="header-main">
          <ContainerNode>
            <div class="header-main__body">
              <HeaderMenuNode />
              <LogoNode />
              <div v-show="scrollY > 99"
                class="header-bot header-bot_scroller">
                <CategoriesNode
                  v-slot="slotProps"
                >
                  <CategoriesNode
                    :nestedLevel="slotProps.nestedLevel"
                    :parentID="slotProps.parentID"
                  />
                </CategoriesNode>
              </div>
              <SearchNode/>
              <div class="header-main__actions">
                <button
                  class="header-main__action icon-wishlist"
                  @click="$router.push({ name: 'PersonalWishlist' })"
                >
                  <span v-if="!wishlistItemsEmpty"/>
                </button>
                <button
                  class="header-main__action icon-cart"
                  @click="$router.push({ name: 'OrderingCart' })"
                >
                  <span>{{ cartItemsQuantity }}</span>
                </button>
              </div>
            </div>
          </ContainerNode>
        </div>
        <div v-show="scrollY < 99"
          class="header-bot">
          <ContainerNode>
            <CategoriesNode v-slot="slotProps">
              <CategoriesNode
                :nestedLevel="slotProps.nestedLevel"
                :parentID="slotProps.parentID"
              />
            </CategoriesNode>
          </ContainerNode>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { isEmpty } from "lodash-es";
import NavNode from "@/components/header/NavNode.vue";
import SearchNode from "@/components/header/SearchNode.vue";
import HeaderMenuNode from "@/components/header/HeaderMenuNode.vue";
import CategoriesNode from "@/components/header/CategoriesNode.vue";
import LogoNode from "@/components/header/LogoNode.vue";
import ProfileSectionsList from "@/components/personal/ProfileSectionsList.vue";

export default {
  components: {
    NavNode,
    SearchNode,
    CategoriesNode,
    HeaderMenuNode,
    LogoNode,
    ProfileSectionsList,
  },
  data() {
    return {
      headerWrapper: {
        height: 99,
        default: true,
      },
    };
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      userAuth: (state) => state.auth.userAuth,
      cartItemsQuantity: (state) => state.cart.store.items?.length,
      breakpoint: (state) => state.common.breakpoint,
      scrollY: (state) => state.common.scrollY,
      windowWidth: (state) => state.common.windowWidth,
      wishlistItemsEmpty: (state) => isEmpty(state.wishlist.items),
    }),
  },
  watch: {
    scrollY(newValue) {
      if (this.windowWidth < 1024) {
        this.headerWrapper.default = true;
        return;
      }
      if (newValue > this.headerWrapper.height) {
        this.headerWrapper.default = false;
      } else {
        this.headerWrapper.default = true;
      }
    },
  },
  methods: {
    ...mapMutations({
      setPopup: "common/setPopup",
      setRevealing: "common/setRevealing",
    }),
    ...mapActions({
      logout: "auth/logout",
    }),
  },
};
</script>

<style lang="scss">
.header {
  position: relative;
  padding-bottom: 205px;
  @media (max-width: ($md2+px)) {
    padding-bottom: 60px;
  }

  &__wrapper {
    box-shadow: 0 0 0.3333333333rem 0 rgba(0, 0, 0, 0.25);
    position: fixed;
    width: 100%;
    z-index: 200;
    // min-height: 60px;
    &_scrolled {
      .header-main {
        padding: 0 !important;
        &__actions {
          display: flex;
          a {
            margin-left: 20px !important;
          }
        }
      }
      .header-top {
        display: none !important;
      }
      .logo {
        a {
          font-size: 30px;
        }
        span {
          display: none;
        }
      }
      .header-bot,
      .header-bot_scroller {
        flex: 1 1 auto;
        margin: 0 2rem 0 2rem;
        background: transparent !important;

      }
      .header__body {
        min-height: 40px;
      }
      .categories {
        &__button {
        padding: 0 !important;
      }
      &__list {
        padding: 0 10px;
      }
      }

    }
  }
  &__body {
    min-height: 60px;
    background: #fff;
    z-index: 2;
    position: relative;
  }
  &__actions {
    button {
      position: relative;
      display: flex;
      &::before {
        font-size: 21px !important;
      }
      &__counter {
        padding-left: 4px;
        font-size: 0.86667rem;
        color: #231f20;
        line-height: 1;
      }
    }
  }
}
.header-top {
  display: block;
  background: #f7f7f7;
  @media (max-width: ($md2+px)) {
    display: none;
  }

  .header-nav__btn.icon-profile {
    position: relative;
    z-index: 2;
    // opacity: 0;
  }

  .revealing {
    &__body {
      // display: none;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(5%, 0);
      width: 200px;
      padding: 3.3333333333rem 1.3333333333rem 1.3333333333rem;
      border: 0.0666666667rem solid #d8d8d8;
      background-color: #fff;
      box-shadow: 0 0.3333333333rem 1rem 0 rgba(0, 0, 0, 0.15);
      z-index: 1;
      transition: transform 0.2s;
    }
  }
}

.header-main {
  position: relative;
  padding: 25px 0;
  // border-bottom: 1px solid #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: #fff;
    z-index: -1;
  }
  @media (max-width: ($md2+px)) {
    padding: 0.5rem 0;
  }

  @media (max-width: ($md3+px)) {
    padding: 7px 0;
  }

  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  &__actions {
    display: flex;
  }

  &__action {
    margin-left: 35px;
    position: relative;
    display: flex;
    @media (max-width: ($md2+px)) {
      margin-left: 20px;
    }
    &::before {
      color: $mainColor;
    }
    &.icon-cart {
      span {
        padding-left: 2px;
        font-size: 0.86667rem;
        color: #231f20;
        line-height: 1;
      }
    }
    &.icon-wishlist {
      display: flex;
      align-items: end;
      margin-right: 3px;
      &::before {
        font-size: 19px;
      }
      span {
        display: block;
        &::before,
        &::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          display: block;
        }
        &::before {
          background: #fff;
          width: 12px;
          height: 12px;
          top: -4px;
          right: -6px;
        }
        &::after {
          background: #006140;
          width: 9px;
          height: 9px;
          top: -3px;
          right: -5px;
        }
      }
    }
    &::before {
      font-size: 22px;
    }
  }
}

.header-bot {
  background: #f7f7f7;
  @media (max-width: ($md2+px)) {
    display: none;
  }
  .categories__list {
    margin: 0 -20px;
    // sub-list абсолютен не по отношшению к item
    .categories__item {
      &:hover {
        .categories__first-list {
          opacity: 1;
          visibility: visible;
        }
      }
    }
    .categories__button {
      padding: 0 20px;
    }
  }

  .categories__first-list {
    top: 39px;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    max-height: 370px;

    &::before {
      z-index: -1;
      content: "";
      position: fixed;
      height: 100vh;
      width: 300%;
      transform: translate(-50%, 0);
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.7);
      pointer-events: none;
    }
  }

  .categories__item,
  .categories__first-item {
    &::before {
      display: none;
    }
  }
}
</style>
