<template>
  <div class="profile-sections-list">
    <button
      v-for="item in items"
      :key="item.id"
      @click="$router.push(getPathName(item.url))"
    >
      {{ item.content }}
    </button>
    <LogoutButtonNode/>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { getPathName } from "@/api/helpers";
import LogoutButtonNode from "@/components/personal/LogoutButtonNode.vue";

export default {
  components: {
    LogoutButtonNode,
  },
  setup() {
    const store = useStore();
    const { items } = store.state.menus.items.profileSectionsList;

    return { items, getPathName };
  },
};
</script>

<style lang="scss">
.profile-sections-list {
  width: 300px;
  button {
    font-size: 1rem;
    line-height: 1.4rem;
    margin-bottom: 0.6rem;
    font-weight: 300;
    display: block;
    // min-width: 10.6666666667rem;
    color: #231f20;
    &:last-child {
      &::before {
        content: "";
        height: 1px;
        width: 100%;
        display: block;
        margin: 1rem 0;
        background-color: rgb(241, 241, 241);
      }
    }
    &:hover {
      color: #004199;
    }
  }
}
</style>
