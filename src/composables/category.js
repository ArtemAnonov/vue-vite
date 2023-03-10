import { useStore } from "vuex";
import { isRef, watch, ref } from "vue";
import { isArray, last } from "lodash-es";

export function useCategory(props) {
  const store = useStore();
  const pCatsType = store.state.productsCategories.basedRequest.type;
  const pagesType = store.state.pages.basedRequest.type;
  const templatePage = ref({});
  const category = ref({});
  // const test = ref(0);
  watch(props, () => {
    let slug = "";
    if (isArray(props.params.mainPath)) {
      slug = last(props.params.mainPath);
    } else {
      slug = props.params.mainPath;
    }
    templatePage.value = store.getters.singleBySlug({ type: pagesType, slug });
    category.value = store.getters.singleBySlug({ type: pCatsType, slug });
  }, { immediate: true });

  return {
    // test,
    templatePage,
    category,
  };
}
