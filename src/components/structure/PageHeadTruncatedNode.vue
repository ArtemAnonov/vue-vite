<template>
  <div class="page-head_truncated">
    <ContainerNode>
      <div class="page-head_truncated__body">
        <div class="page-head_truncated__row">
          <button class="page-head_truncated__back icon-long_arrow" @click="$router.back()">
            <!--  v-if="!pageTitle" -->
            <!-- <div class=""></div> -->
            {{ backLinkName }}
          </button>
        </div>
        <div class="page-head_truncated__row">
          <div class="page-head_truncated__title">
            {{ pageTitle }}
          </div>
          <!-- <slot name="content"></slot> -->
        </div>
      </div>
    </ContainerNode>
  </div>
</template>

<script>
export default {
  props: {
    backLinkName: String,
    pageTitle: String,
  }
}
</script>

<style lang="scss">
.page-head_truncated {
  margin-bottom: 1rem;
  // .page-head_truncated__body
  &__body {}

  // .page-head_truncated__row
  &__row {}

  // .page-head_truncated__back
  &__back {
    display: inline-flex;
    color: #187552;
    margin-bottom: .66rem;
    &::before {
      position: relative;
      margin-right: .66rem;
      top: .25rem;
    }
  }

  // .page-head_truncated__title
  &__title {
    font-size: 1.5rem;
    line-height: 1.8125rem;
    margin-bottom: .25rem;
    font-weight: 700;
  }
}

.icon-long {

  // .icon-long_arrow
  &_arrow {}
}
</style>