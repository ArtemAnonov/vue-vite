<template>
  <div class="trouble">
    <div class="trouble__text">{{ text[0] }}</div>
    <div class="trouble__path">
      {{ location }}
    </div>
    <div class="trouble__text">{{ text[1] }}</div>
    <slot>
      <BaseButtonNode buttonStyle="dark"
        @click="$router.push('/')"
      >Вернуться на Главную</BaseButtonNode
      >
    </slot>
  </div>

</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    text: {
      default: () => ["Для следющего пути", " не существует маршрута!"],
      type: Array,
    },
    // output: String,
  },
  data() {
    return {
      location: "",
    };
  },
  computed: {
    ...mapState({
      browserReady: (state) => state.common.browserReady,
    }),
  },
  watch: {
    browserReady: {
      handler(newValue) {
        if (newValue) {
          this.location = window.location.href;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.trouble {
  padding: 3rem 0 3rem 0;
  &__text {
    margin-bottom: 1rem;
    &:last-child {
    }
  }
  &__path {
    border-top: 1px solid #868686;
    border-bottom: 1px solid #868686;
    margin-bottom: 1rem;
    color: #868686;
    padding: 0.5rem 0 0.5rem 0;
  }
}
</style>
