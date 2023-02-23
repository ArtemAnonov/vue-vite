<template>
  <div
    class="catalog-revealing"
    :class="element.active ? 'catalog-revealing_active' : ''"
    @click.stop
  >
    <div class="catalog-revealing__actions">
      <ButtonNode
        class="catalog-revealing__button catalog-revealing__button_main"
        :class="element.default ? 'catalog-revealing__button_main_default' : ''"
        @click.stop="setCatalogRevealing({ name: item.name })"
      >
        <span
          class="catalog-revealing__close icon-plus"
          @click="setDefault"
        />
        <span class="catalog-revealing__title">
          <slot name="title"/>
        </span>
        <span class="catalog-revealing__arrow icon-arrow"/>
      </ButtonNode>
    </div>
    <div v-show="element.active"
      class="catalog-revealing__body">
      <div class="catalog-revealing__main">
        <slot name="main"/>
      </div>
      <div class="catalog-revealing__nested-actions">
        <ButtonNode class="catalog-revealing__button"
          @click="setDefault"
        >Очистить</ButtonNode
        >
        <!--           :disabled="bodyLoaded ? false : true" -->
        <ButtonNode
          class="catalog-revealing__button"
          button-style="dark"
          @click.stop="apply"
        >Применить</ButtonNode
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState, mapGetters, mapMutations, mapActions,
} from "vuex";
import { useOpening } from "@/composables/opening.js";

export default {
  props: {
    item: Object,
    /**
     * Загружены ли айтемы. применяется для отключения кнопки итц
     */
    bodyLoaded: {
      type: Boolean,
      default: false,
    },
  },
  emmits: ["apply", "setDefault"],
  setup(props) {
    const item = { ...{ type: "catalogRevealing" }, ...props.item };
    const { element } = useOpening(item);
    return { element };
  },
  computed: {
    ...mapGetters({}),
    ...mapState({}),
  },
  methods: {
    ...mapMutations({
      setCatalogRevealing: "common/setCatalogRevealing",
    }),
    ...mapActions({
      updateAllOpeningTypeItems: "common/updateAllOpeningTypeItems",
    }),

    /**
     * Вместо вывода сообщения, логика валидации (она нужна по сути только для цены)
     * вынесена в Catalog.updateFilter
     */
    apply() {
      this.updateAllOpeningTypeItems({ type: "catalogRevealing" });
      return this.$emit("apply");
    },

    setDefault() {
      this.$emit("setDefault");
    },
  },
};
</script>

<style lang="scss">
.catalog-revealing {
  position: relative;
  &_active {
    .catalog-revealing__actions {
      z-index: 3;
    }
    .catalog-revealing__button_main {
      border: 1px solid transparent;
      &:hover {
        box-shadow: 0 0.3333333333rem 1rem 0 transparent;
      }
    }
    .catalog-revealing__arrow {
      &::before {
        transform: translate(0, 20%) rotate(-90deg);
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
    &::before {
      transition: 0.1s;
      transform: translate(0, 20%) rotate(90deg);
      font-size: 12px;
      color: #868686;
      position: relative;
    }
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

        .catalog-revealing__close {
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
