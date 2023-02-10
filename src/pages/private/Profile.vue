<template>
  <ProfilePageNode>
    <template #content>
                <button @click="store.dispatch('auth/logout', { route: $route })">
            Выйти
          </button>
    </template>
  </ProfilePageNode>
</template>

<script>
import ProfilePageNode from "@/components/profile/ProfilePageNode.vue";

import { useStore } from "vuex";
export default {
  components: {
    ProfilePageNode,
  },
  setup() {
    const store = useStore();

    return { store };
  },
};
</script>

<style lang="scss">
</style>