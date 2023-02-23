<template>
  <ProfilePageNode>
    <template #content>
    </template>
  </ProfilePageNode>
</template>

<script>

import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    return { store };
  },
};
</script>

<style lang="scss">
</style>