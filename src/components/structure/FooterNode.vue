<template>
  <footer class="footer">
    <section class="footer__main">
      <container-node>
        <div class="footer__main-body">
          <div class="footer__logo">
            <router-link to="/">LO<span>GOTYPE</span></router-link>
          </div>
          <spoilers-block-node class="footer__columns" spoilerBlockName="footer" :spoilersAmount="3" v-slot="slotProps">
            <div class="footer__column">
              {{ slotProps.spoilers[Object.keys(slotProps.spoilers)[0]] }}
              <div class="footer__block">
                <div class="footer__text">Присоединяйтесь в соц. сетях</div>
                <social-networks-node></social-networks-node>
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
            <div class="footer__column">
              <div class="footer__title">Покупки онлайн</div>
              <ul class="footer__list">
                <li>Доставка по всей России</li>
                <li>Оплата</li>
                <li>Выбор размера</li>
                <li>Возврат</li>
                <li>Отслеживание заказа</li>
              </ul>
            </div>
            <div class="footer__column">
              <div class="footer__title">Покупателям</div>
              <ul class="footer__list">
                <li>Магазины</li>
                <li>Программа лояльности</li>
                <li>Подарочные бонусы</li>
                <li>Условия возврата</li>
                <li>Подарочные карты</li>
                <li>Подарочные карты</li>
                <li>Обратная связь</li>
                <li>Правила продажи</li>
              </ul>
            </div>
            <div class="footer__column">
              <div class=" footer__title">Компания</div>
              <ul class=" footer__list">
                <li>Вакансии</li>
                <li>Fashion-блог</li>
                <li>О компании</li>
                <li>Пресс-офис</li>
                <li>Пресс-релизы</li>
                <li>Партнерам</li>
                <li>Контакты</li>
              </ul>
            </div>
          </spoilers-block-node>

        </div>
      </container-node>
    </section>
    <section class="footer__footer">
      <container-node>
        <div class="footer__footer-body">
          <div class="footer__text">© АО «LOGOTYPE», 2022</div>
          <div class="footer__text footer__text_semi-transp">
            Политика конфиденциальности
          </div>
        </div>
      </container-node>
    </section>
  </footer>
</template>

<script>
import SocialNetworksNode from "@/components/SocialNetworksNode.vue";
import SpoilersBlockNode from "@/components/SpoilersBlockNode.vue";

export default {
  components: {
    SocialNetworksNode,
    SpoilersBlockNode,
  },
  data() {
    return {

    }
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
  }

  &__main-body {}

  &__logo {
    color: #fff;
    margin: 0 0 2.6666666667rem;
    font-weight: 700;
    font-size: 30px;
  }

  &__columns {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: .6666666667rem 0;

    @media (max-width: ($md3+px)) {
      grid-template-columns: none;
      grid-gap: 0;
    }
  }

  &__column {
    padding: 1.3333333333rem 0 0;
    border-top: .1333333333rem solid rgba(255, 255, 255, .2);
    border-bottom: none;

    @media (max-width: ($md3+px)) {
      grid-column: auto !important;

      .footer__list {
        // height: 0;
        // opacity: 0;
        // visibility: hidden;
      }

      &.active {
        .footer__list {
          // height: auto;
        }
      }

      &:not(:nth-child(1)) {
        border-bottom: .0666666667rem solid rgba(255, 255, 255, .2);
        border-top: 0;
        padding: 1rem 0;
      }
    }

    &:nth-child(1) {
      max-width: 16rem;
      padding: 1.3333333333rem;
      background-color: #1a1f27;
      grid-column: 1/span 3;
      border: none;

      @media (max-width: ($md2+px)) {
        grid-column: 1/span 4;
      }

      @media (max-width: ($md3+px)) {
        background-color: #1e242c;
        width: 100%;
        order: 1;
        padding: 0;
      }
    }

    &:nth-child(2) {
      grid-column: 4/span 2;

      @media (max-width: ($md2+px)) {
        grid-column: 7/span 4;
      }
    }

    &:nth-child(3) {
      grid-column: 7/span 2;

      @media (max-width: ($md2+px)) {
        grid-column: 1/span 4;
      }
    }

    &:nth-child(4) {
      grid-column: 10/span 2;

      @media (max-width: ($md2+px)) {
        grid-column: 7/span 4;
      }
    }
  }

  &__block {
    margin: 0 0 1rem;

    .footer__text {
      margin: 0 0 .3333333333rem;
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
    margin: 0 0 1.3333333333rem;
  }

  &__list {
    li {
      margin: 0 0 .6666666667rem;
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
    margin: .6666666667rem 0 0;

    .button {
      border: .0666666667rem solid #868686;

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
