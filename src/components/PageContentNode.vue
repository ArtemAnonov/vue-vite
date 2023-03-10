<template>
  <section class="page-content">
    <ContainerNode>
      <div v-if="handledPage"
        class="page-content__body">
        <h3 class="page-content__title"
          v-html="handledPage.title.rendered"/>
        <div class="page-content__content"
          v-html="handledPage.content.rendered"/>
      </div>
    </ContainerNode>
  </section>
</template>

<script>
import { useStore } from "vuex";

export default {
  props: {
    page: [String, Object],
  },
  setup(props) {
    const store = useStore();
    const handledPage = store.getters.universalItem({ type: store.state.pages.basedRequest.type, value: props.page });
    return {
      handledPage,
    };
  },
};
</script>

<style lang="scss">
.page-content {
  color: #000;
  padding: 1.3333333333rem 0;
  background-color: #f1f1f1;
    color: #868686;
    h3 {
      font-size: 1rem !important;
    }
  &__body {

  }
  &__content {
    // .page-content {

    // &__content {
      display: grid;
      grid-template-rows: repeat(4, auto);
      grid-auto-flow: column;
      column-gap: 2rem;
      align-items: start;

      @media (max-width: ($md2+px)) {
        grid-template-rows: auto;
        grid-auto-flow: row;
      }
    // }

  // }
    @media (max-width: ($md2+px)) {
      padding: 0 10px;
    }
  }
  &__title {
    margin: 0 0 1.6666666667rem;
  }
  p {
    margin: 0 0 1.6666666667rem;
  }
  ul {
    margin: 0 0 1rem 0;
    // margin: 0 0 1rem 2.6666666667rem;
  }
  li {
    list-style: disc;
    margin: 0 0 1rem 2rem;
  }
  h3 {
    margin: 0 0 1.3rem;
  }

  h2 {
    margin-bottom: 1rem;
  }
}
</style>
