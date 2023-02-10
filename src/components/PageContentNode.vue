<template>
  <section class="page-content">
    <ContainerNode>
      <div class="page-content__body">
        <h3 class="page-content__title" v-html="page.title.rendered"></h3>
        <div class="page-content__content" v-html="page.content.rendered"></div>
      </div>
    </ContainerNode>
  </section>
</template>

<script>
export default {
  props: {
    page: Object,
  },
};
</script>

<style lang="scss">
.page-content {
  color: #000;
  padding: 1.3333333333rem 0;
  &__content {
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
    margin: 0 0 1rem 2.6666666667rem;
  }
  li {
    list-style: disc;
    margin: 0 0 1rem 2.6666666667rem;
  }
  h3 {
    margin: 0 0 1.3rem;
  }
}
</style>
