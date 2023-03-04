<template>
  <BaseButtonNode
    v-if="viewType === 'base'"
    :class="`button_${buttonStyle}`"
    :disabled="disabled"
    @click.prevent="resolver ? expectAsync() : ''"
  ><slot/></BaseButtonNode>
  <button
    v-else
    :disabled="disabled"
    @click.prevent="resolver ? expectAsync() : ''"
  />
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  name: "ButtonNode",
  props: {
    viewType: {
      type: String,
      validator: (value) => ["base", "minimal"].includes(value),
      default: "base",
    },
    buttonStyle: {
      type: String,
      default: "light",
    },
    resolver: {
      type: Object,
    },
  },
  setup(props) {
    const store = useStore();
    const disabled = ref(false);
    const expectAsync = async () => {
      disabled.value = true;
      try {
        await props.resolver.func(props.resolver.payload);
      } catch (e) {
        store.dispatch("common/updateMessage", "allError");
        console.error(e);
      } finally {
        disabled.value = false;
      }
    };
    return {
      disabled,
      expectAsync,
    };
  },
};
</script>

<style lang="scss">
</style>
