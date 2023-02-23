<template>
  <div class="slider-arrows">
    <div
      :class="`slider-arrows__arrow slider-arrows__arrow_prev ${identificator}__arrow_prev icon-arrow`"
    />
    <div
      :class="`slider-arrows__arrow slider-arrows__arrow_next ${identificator}__arrow_next icon-arrow`"
    />
  </div>
</template>

<script>
export default {
  props: {
    identificator: String,
  },
  computed: {},
};
</script>

<style lang="scss">
.slider-arrows {
  display: flex;
  align-items: center;
  justify-content: center;
  &__arrow {
    position: relative;
    width: 2.6666666667rem;
    height: 2.6666666667rem;
    cursor: pointer;
    z-index: 5;
    padding: 0.8666666667rem;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0.0666666667rem 0.3333333333rem 0 rgba(0, 0, 0, 0.05);
    &::before {
      color: #231f207a;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    @media (any-hover: hover) {
      &:hover {
        background: #fff;
        &::before {
          color: #231f20;
        }
      }
    }
    &_prev {
      margin-right: 0.6666666667rem;
      transform: scale(-1);
    }
    &_next {
    }
  }
}
</style>
