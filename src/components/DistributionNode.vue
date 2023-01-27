<template>
  <section class="distr">
    <ContainerNode>
      <form class="distr__body">
        <div class="distr__head">
          <div class="distr__title">Подпишитесь на рассылку</div>
          <p>
            Будьте в числе первых, кто узнает о новинках, распродажах и
            интересных новостях Logotype!
          </p>
        </div>
        <div class="distr__inputes">
          <InputNode class="main" v-model="email">
            <template #before><label>Ваш E-mail:</label></template>
          </InputNode>
          <InputCheckboxNode v-model="forMen" labelText="Для мужчин"></InputCheckboxNode>
          <InputCheckboxNode v-model="forWomen" labelText="Для женщин"></InputCheckboxNode>
        </div>
        <ButtonNode class="distr__btn" buttonStyle="dark">Подписаться</ButtonNode>
      </form>
    </ContainerNode>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      forMen: true,
      forWomen: true,
    };
  },
};
</script>

<style lang="scss">
.distr {
  padding: 1.3333333333rem 0;

  &__body {
    padding: 2.6666666667rem 0;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
  }

  &__head {
    grid-column: span 5;

    @media (max-width: ($md2+px)) {
      grid-column: span 12;
    }

    p {
      line-height: 1.1333333333rem;
      margin: 0.6666666667rem 0 1.3333333333rem;
      color: #868686;

      @media (max-width: ($md3+px)) {
        margin: 0.6666666667rem 0 0.6666666667rem;
      }
    }
  }

  &__title {
    font-size: 1.4rem;
    line-height: 1.6666666667rem;
  }

  &__inputes {
    grid-column: span 4;

    @media (max-width: ($md2+px)) {
      grid-column: span 9;
    }

    @media (max-width: ($md3+px)) {
      grid-column: span 12;
    }

    .input_checkbox {
      &:nth-child(2) {
        margin-bottom: 0.6666666667rem;
      }
    }
  }

  &__btn {
    min-width: 10rem;
    grid-column: span 2;

    @media (max-width: ($md3+px)) {
      margin-top: 2.6666666667rem;
      grid-column: span 12;
    }
  }
}
</style>
