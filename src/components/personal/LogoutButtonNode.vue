<template>
  <button class="logout-button"
    @click="logout({ route: $route })">
    Выйти
  </button>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      logout: (route) => store.dispatch("auth/logout", route),
    };
  },
};
</script>

<style>
</style>
