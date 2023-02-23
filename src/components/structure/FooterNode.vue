<template>
  <footer class="footer">
    <section class="footer__main">
      <ContainerNode>
        <div class="footer__main-body">
          <LogoNode />

          <div class="footer__spoilers">
            <div class="footer__column">
              <div class="footer__block">
                <div class="footer__text">Присоединяйтесь в соц. сетях</div>
                <SocialNetworksNode />
              </div>
              <div class="footer__block">
                <div class="footer__text">Бесплатно по России:</div>
                <div class="footer__text_big">
                  <a href="tel:88009999999">88009999999</a>
                </div>
              </div>
              <div class="footer__block">
                <div class="footer__text">Адрес магазина:</div>
                <div class="footer__text_medium">
                  г. Москва, Смоленская площадь, 0
                </div>
                <div class="footer__text_semi-transp">Другие магазины</div>
              </div>
            </div>
            <div v-for="(menu, key, index) in menus"
              :key="index"
              class="footer__column">
              <SpoilerNode :item="{
                name: key,
                default: windowWidth < 767,
              }">
                <template #button>
                  <div class="footer__title">
                    {{ menu.name }}
                  </div>
                </template>
                <template #list>
                  <ul class="footer__list">
                    <li v-for="(item, index) in menu.items"
                      :key="index"
                      class="spoiler__item">
                      <RouterLink to="/">{{ item.content }}</RouterLink>
                    </li>
                  </ul>
                </template>
              </SpoilerNode>
            </div>
          </div>
        </div>
      </ContainerNode>
    </section>
    <section class="footer__footer">
      <ContainerNode>
        <div class="footer__footer-body">
          <div class="footer__text">© АО «LOGOTYPE», 2022</div>
          <div class="footer__text footer__text_semi-transp">
            Политика конфиденциальности
          </div>
        </div>
      </ContainerNode>
    </section>
  </footer>
</template>

<script>
import { mapState } from "vuex";
import LogoNode from "@/components/header/LogoNode.vue";

import SocialNetworksNode from "@/components/SocialNetworksNode.vue";
import SpoilerNode from "@/components/SpoilerNode.vue";

export default {
  components: {
    SocialNetworksNode,
    SpoilerNode,
    LogoNode,
  },
  computed: {
    ...mapState({
      windowWidth: (state) => state.common.windowWidth,
      footerShopingOnline: (state) => state.menus.footerShopingOnline,
      footerForCustomers: (state) => state.menus.footerForCustomers,
      footerCompany: (state) => state.menus.footerCompany,
    }),
    menus() {
      return {
        footerShopingOnline: this.footerShopingOnline,
        footerForCustomers: this.footerForCustomers,
        footerCompany: this.footerCompany,
      };
    },
  },
};
</script>

<style lang="scss">
.footer {
  color: #d8d8d8;

  &__main {
    background-color: #1e242c;
    padding-top: 2.6666666667rem;
    padding-bottom: 2.6666666667rem;

    @media (max-width: ($md3+px)) {
      padding-top: 1.3rem;
    }
  }

  .logo {
    color: #fff;
    margin: 0 0 2rem;
    font-weight: 700;

    a {
      font-size: 30px !important;
    }

    @media (max-width: ($md3+px)) {
      display: none;
    }
  }

  &__spoilers {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 0.6666666667rem 0;

    @media (max-width: ($md3+px)) {
      grid-template-columns: none;
      grid-gap: 0;
    }
  }

  &__column {
    padding: 1.3333333333rem 0 0;
    border-top: 0.1333333333rem solid rgba(255, 255, 255, 0.2);
    border-bottom: none;

    @media (max-width: ($md3+px)) {
      grid-column: auto !important;

      &:not(:nth-child(1)) {
        border-bottom: 0.0666666667rem solid rgba(255, 255, 255, 0.2);
        border-top: 0;
        padding: 1rem 0;
      }
    }

    &:nth-child(1) {
      max-width: 16rem;
      padding: 1.3333333333rem;
      background-color: #1a1f27;
      grid-column: 1 / span 3;
      border: none;

      @media (max-width: ($md2+px)) {
        grid-column: 1 / span 4;
      }

      @media (max-width: ($md3+px)) {
        background-color: #1e242c;
        width: 100%;
        order: 1;
        padding: 1.3333333333rem 0 0;
      }
    }

    &:nth-child(2) {
      grid-column: 4 / span 2;

      @media (max-width: ($md1+px)) {
        grid-column: 5 / span 2;
      }

      @media (max-width: ($md2+px)) {
        grid-column: 7 / span 4;
      }
    }

    &:nth-child(3) {
      grid-column: 7 / span 2;

      @media (max-width: ($md1+px)) {
        grid-column: 8 / span 2;
      }

      @media (max-width: ($md2+px)) {
        grid-column: 1 / span 4;
      }
    }

    &:nth-child(4) {
      grid-column: 10 / span 2;

      @media (max-width: ($md1+px)) {
        grid-column: 11 / span 2;
      }

      @media (max-width: ($md2+px)) {
        grid-column: 7 / span 4;
      }
    }
  }

  &__block {
    margin: 0 0 1rem;

    .footer__text {
      margin: 0 0 0.3333333333rem;
    }
  }

  &__text {
    &_big {
      font-size: 1.4rem;
    }

    &_medium {
      font-size: 1.13rem;
    }

    &_semi-transp {
      color: #868686;
    }
  }

  &__title {
    position: relative;
    font-weight: 700;
    font-size: 1.1333333333rem;
    color: #fff;
  }

  &__list {
    padding: 1.3333333333rem 0 0;

    li {
      margin: 0 0 0.6666666667rem;
    }
  }

  &__footer {
    background-color: #1a1f27;
    padding: 2.6666666667rem 0;

    .footer__text {}
  }

  &__footer-body {
    .footer__text {
      &:first-child {
        margin-bottom: 1.3333333333rem;

        color: #fff;
      }
    }
  }

  .social-networks {
    margin: 0.6666666667rem 0 0;

    .button {
      border: 0.0666666667rem solid #868686;

      &:hover {
        background: #868686;

        &::before {
          color: #1e242c;
        }
      }

      &::before {
        color: #d8d8d8;
      }
    }
  }
}
</style>
