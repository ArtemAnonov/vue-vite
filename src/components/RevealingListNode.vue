<template>
  <div
    class="revealing-list"
    :class="state.visible ? 'revealing-list_active' : ''"
    @click.stop
  >
    <div class="revealing-list__actions">
      <ButtonNode
        class="revealing-list__button revealing-list__button_main"
        :class="state.default ? 'revealing-list__button_main_default' : ''"
        @click="bodyVisible"
      >
        <span
          class="revealing-list__close icon-plus"
          @click="setDefault"
        ></span>
        <span class="revealing-list__title">
          <slot name="title"></slot>
        </span>
        <span class="revealing-list__arrow icon-arrow"></span>
      </ButtonNode>
    </div>
    <div class="revealing-list__body" v-show="state.visible">
      <!-- <div
        class="revealing-list__error"
        :class="errorInvalidValue ? 'revealing-list__error_active' : ''"
      >
        Введены некорректные данные! Значения обновлены до начальных.
      </div> -->
      <div class="revealing-list__main">
        <slot name="main"></slot>
      </div>
      <div class="revealing-list__nested-actions">
        <ButtonNode class="revealing-list__button" @click="setDefault"
          >Очистить</ButtonNode
        >
        <ButtonNode
          class="revealing-list__button"
          button-style="dark"
          @click.stop="apply"
          :disabled="bodyLoaded ? false : true"
          >Применить</ButtonNode
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import popupRevealingMixin from "@/mixins/popupRevealingMixin";
export default {
  components: {},
  props: {
    /**
     * Загружены ли айтемы. применяется для отключения кнопки итц
     */
    bodyLoaded: {
      type: Boolean,
      default: false,
    },
    applyValidate: {
      default: true,
      type: Boolean,
    },
  },
  emmits: ["apply", "setDefault"],
  mixins: [popupRevealingMixin],
  data() {
    return {
      errorInvalidValue: false,
    };
  },
  computed: {
    ...mapGetters({}),
    ...mapState({}),
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),

    // /**
    //  * Раскрывающийся список работает в любом случае, то есть закрывается, если
    //  * введены неверные условия. Однако при этом не происходит emmit родительскому элементу и
    //  * не выполняется соответсвующий метод
    //  */
    /**
     * Вместо вывода сообщения, логика валидации (она нужна по сути только для цены)
     * вынесена в Catalog.updateFilter
     */
    apply() {
      this.closeRevs();
      return this.$emit("apply");
      // if (this.applyValidate) {

      // } else {
      //   this.errorInvalid();
      // }
    },

    // errorInvalid() {
    //   this.errorInvalidValue = true;
    //   setTimeout(() => {
    //     this.errorInvalidValue = false;
    //   }, 3000);
    // },

    setDefault() {
      this.$emit("setDefault");
    },
  },
};
</script>

<style lang="scss">
.revealing-list {
  position: relative;
  &_active {
    .revealing-list__actions {
      z-index: 3;
    }
    .revealing-list__button_main {
      border: 1px solid transparent;
      &:hover {
        box-shadow: 0 0.3333333333rem 1rem 0 transparent;
      }
    }
  }
  &__actions {
    position: relative;
    margin-right: 20px;
  }

  &__close {
    transition: 0.5s;

    transform: rotate(45deg) translate(-0.2rem, 0.2rem);
    font-size: 1.2rem;
    color: #868686;
    width: 20px;
    opacity: 1;
    visibility: visible;
  }

  &__arrow {
    transform: rotate(90deg);
    font-size: 0.7rem;
    color: #868686;
    position: relative;
  }

  &__button {
    // width: 100%;
    // display: flex;
    .button__span {
      align-items: center;
    }
    &_main {
      border: 1px solid #231f20;
      &_default {
        border: 1px solid transparent;

        .revealing-list__close {
          width: 0;
          opacity: 0;
          visibility: hidden;
        }
      }
    }
  }

  &__title {
    position: relative;
    padding: 0 0.3rem 0 0;
    font-size: 1.1333333333rem;
    line-height: 1.1333333333rem;
    cursor: pointer;
  }

  &__body {
    padding: 4rem 1.33rem 1.33rem 1.33rem;
    top: -1.33rem;
    left: -1.33rem;
    position: absolute;
    min-width: 17.4666666667rem;
    // opacity: 0;
    background-color: #fff;
    border: 0.0666666667rem solid #d8d8d8;
    box-shadow: 0 0.3333333333rem 1rem 0 rgba(0, 0, 0, 0.15);
    z-index: 2;
    &_active {
      opacity: 1;
    }
  }

  &__main {
  }

  &__nested-actions {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    button {
      &:not(:last-child) {
        margin-bottom: 0.8rem;
      }
    }
  }

  &__error {
    transition: 1s;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate(0, 0);
    color: #ea0022;
    &_active {
      opacity: 1;
      visibility: visible;
      transform: translate(0, 120%);
    }
  }
}
</style>
