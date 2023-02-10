<template>
  <nav class="header-nav">
    <ul class="header-nav__list">
      <slot name="in"></slot>
      <li class="header-nav__item">
        <button class="header-nav__btn" @click="$router.push('/')">
          г.Москва
        </button>
      </li>
      <li class="header-nav__item" v-for="item in items" :key="item.id">
        <button class="header-nav__btn" @click="$router.push('/')">
          {{ item.content }}
        </button>
      </li>
    </ul>
    <slot name="out"></slot>
  </nav>
</template>

<script>
// <a href="tel:88009999999">88009999999</a>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: {
    menuName: {
      type: String,
      // required: true
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userAuth: (state) => state.auth.userAuth,

      items: (state) => state.menus.top_header.items,
    }),
  },
  methods: {
    ...mapMutations({
      setPopup: "common/setPopup",
      setRevealing: "common/setRevealing",
    }),
    ...mapActions({
      logout: "auth/logout",
    }),
  },
};
</script>

<style lang="scss">
.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  &__list {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
  }

  &__btn {
    margin-right: 26px;
    display: inline-block;
    padding: 4px 0 5px;
    font-size: 1rem;
    color: #868686;
    text-decoration: none;
    white-space: nowrap;
    &:last-child {
      margin-left: 10px;
    }
    &.icon-profile {
      &::before {
        margin-right: 5px;
      }
    }
  }
}
</style>
