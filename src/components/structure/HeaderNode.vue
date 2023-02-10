<template>
  <header class="header">
    <div
      class="header__wrapper"
      :class="headerWrapper.default ? '' : 'header__wrapper_scrolled'"
      ref="headerWrapperNode"
    >
      <div class="header__body">
        <div class="header-top">
          <ContainerNode>
            <NavNode name="top_header">
              <template #out>
                <li class="header-nav__item">
                  <RevealingNode :item="{ name: 'profileLoginned' }"
                    ><ul class="header-top__profile-list">
                      <li>
                        <button @click="$router.push({name: 'Wishlist'})"
                          >Избранное</button
                        >
                      </li>
                      <li>
                        <button @click="$router.push({name: 'Orders'})"
                          >Мои заказы</button
                        >
                      </li>
                      <li>
                        <button @click="$router.push({name: 'Profile'})">Профиль</button>
                      </li>
                      <li><button @click="$router.push('/')">Карта лояльности</button></li>
                      <li>
                        <button @click="logout({ route: $route })">
                          Выйти
                        </button>
                      </li>
                    </ul></RevealingNode
                  >
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
              <div class="header__logo">
                <button @click="$router.push('/')">LO<span>GOTYPE</span></button>
              </div>
              <div class="header-bot header-bot_scroller" v-show="scrollY > 99">
                <CategoriesNode
                  :parentID="0"
                  :neastedLevel="0"
                  v-slot="slotProps"
                >
                  <CategoriesNode
                    :neastedLevel="1"
                    :parentID="slotProps.parentID"
                    :parentCategorySlug="slotProps.parentCategorySlug"
                  ></CategoriesNode>
                </CategoriesNode>
              </div>
              <SearchNode></SearchNode>
              <div class="header-main__actions">
                <button
                  @click="$router.push({ name: 'Wishlist' })"
                  class="header-main__action icon-wishlist"
                >
                  <span v-if="!wishlistItemsEmpty"></span>
                </button>
                <button
                  @click="$router.push({ name: 'Cart' })"
                  class="header-main__action icon-cart"
                >
                  <span>{{
                    cartItemsQuantity
                  }}</span>
                </button>
              </div>
            </div>
          </ContainerNode>
        </div>
        <div class="header-bot" v-show="scrollY < 99">
          <ContainerNode>
            <CategoriesNode :parentID="0" :neastedLevel="0" v-slot="slotProps">
              <CategoriesNode
                :neastedLevel="1"
                :parentID="slotProps.parentID"
                :parentCategorySlug="slotProps.parentCategorySlug"
              ></CategoriesNode>
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

export default {
  components: {
    NavNode,
    SearchNode,
    CategoriesNode,
    HeaderMenuNode,
  },
  data() {
    return {
      headerWrapper: {
        height: 99,
        default: true,
      },
    };
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
      .header__logo {
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

  &__logo {
    display: flex;
    @media (max-width: ($md2+px)) {
      flex: 1 1 auto;
      margin-right: 1.3333333333rem;
    }
    a {
      font-weight: 700;
      font-size: 50px;
      @media (max-width: ($md2+px)) {
        font-size: 30px;
      }
      @media (max-width: ($md3+px)) {
        font-size: 25px;
      }
    }
    img {
      position: relative;
      top: 10px;
      width: 70px;
      @media (max-width: ($md2+px)) {
        width: 50px;
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

  &__profile-list {
    li {
      font-size: 1rem;
      line-height: 1.4rem;
      margin-bottom: 0.6rem;
      font-weight: 300;
      display: block;
      min-width: 10.6666666667rem;
      color: #231f20;
      &:last-child {
        &::before {
          content: "";
          height: 1px;
          width: 100%;
          display: block;
          margin: 1rem 0;
          background-color: rgb(241, 241, 241);
        }
      }
      &:hover {
        color: #004199;
      }
    }
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
    padding: 0.3rem 0;
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
    margin-left: 40px;
    position: relative;
    display: flex;
    @media (max-width: ($md2+px)) {
      margin-left: 20px;
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
    .categories__item {
      @media (any-hover: hover) {
        &:hover {
          .categories__sub-list {
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  }

  .categories__sub-list {
    opacity: 0;
    visibility: hidden;
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
  .categories__sub-item {
    &::before {
      display: none;
    }
  }
}
</style>
