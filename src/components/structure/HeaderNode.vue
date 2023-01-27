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
              <li class="header-nav__item">
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
                <RevealingNode :item="{ name: 'profileLoginned' }"
                  ><ul class="header__profile-list">
                    <li>
                      <RouterLink to="/personal/favorite">Избранное</RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/personal/orders">Мои заказы</RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/personal/profile">Профиль</RouterLink>
                    </li>
                    <li><RouterLink to="/">Карта лояльности</RouterLink></li>
                    <li>
                      <button @click="logout({ route: $route })">Выйти</button>
                    </li>
                  </ul></RevealingNode
                >
              </li>
            </NavNode>
          </ContainerNode>
        </div>
        <div class="header-main">
          <ContainerNode>
            <div class="header-main__body">
              <HeaderMenuNode />
              <div class="header__logo">
                <RouterLink to="/">LO<span>GOTYPE</span></RouterLink>
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
                <HeaderButtonNode link="/favorite" class="icon-favorite">
                  <span></span>
                </HeaderButtonNode>
                <HeaderButtonNode
                  :itemsCounter="cartItemsQuantity"
                  link="/cart"
                  class="icon-cart"
                ></HeaderButtonNode>
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
import NavNode from "@/components/header/NavNode.vue";
import SearchNode from "@/components/header/SearchNode.vue";
import HeaderButtonNode from "@/components/header/HeaderButtonNode.vue";
import HeaderMenuNode from "@/components/header/HeaderMenuNode.vue";
import CategoriesNode from "@/components/header/CategoriesNode.vue";

export default {
  components: {
    NavNode,
    SearchNode,
    HeaderButtonNode,
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
      loginPopup(state) {
        return state.common.revs.login;
      },
    }),
  },
  methods: {
    ...mapMutations({
      setPopup: "common/setPopup",
      setRevealing: "common/setRevealing",
    }),
    ...mapActions({}),
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
    border-bottom: 1px solid #f1f1f1;
    position: fixed;
    width: 100%;
    z-index: 200;
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
    }
  }
  &__body {
    background: #fff;
    z-index: 2;
    position: relative;
  }
  &__actions {
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
  .header-top {
    display: block;
    background: #f7f7f7;
    @media (max-width: ($md2+px)) {
      display: none;
    }
  }

  .header-main {
    position: relative;
    padding: 25px 0;
    border-bottom: 1px solid #f1f1f1;
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
      a {
        margin-left: 40px;
        @media (max-width: ($md3+px)) {
          margin-left: 20px;
        }
        &::before {
          font-size: 22px;
        }
      }
    }

    .icon-favorite {
      span {
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: #006140;
        border: 0.0666666667rem solid #fff;
        position: absolute;
        top: -0.2666666667rem;
        right: -0.4rem;
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
}
</style>
