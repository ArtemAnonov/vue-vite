<template>
  <MainPageNode :templatePage="templatePage"
    :navRaw="category">
    <template #page-main>
      <TheFilterNode @updateFilter="updateFilter"/>
      <ContainerNode>
        <div class="catalog__body">
          <div class="catalog__main">
            <CatalogSidebarNode
              :total="total"
            />
            <div class="catalog__products">
              <div class="catalog__sorting">
                <CatalogRevealingNode
                  :bodyLoaded="sortOptions ? true : false"
                  :item="{ name: 'catalogSorting' }"
                  @apply="updateFilter"
                >
                  <template #title>Сортировка</template>
                  <template #main>
                    <InputRadioNode
                      v-for="option in sortOptions"
                      :key="option.id"
                      :modelValue="equalOptionSort(option)"
                      :labelText="option.name"
                      :checked="option.id === 0"
                      name="sort"
                      :disabled="
                        option.id == 3 || option.id == 4 || option.id == 5
                      "
                      @input="setOrderAndOrderBy(option)"
                    />
                  </template>
                </CatalogRevealingNode>
              </div>
              <CatalogProductsNode
                :categoryId="categoryId"
              />
              <PaginationNode :type="productsRequest.type"/>
            </div>
          </div>
        </div>
        <DistributionNode/>
      </ContainerNode>
      <PageContentNode
        v-if="templatePage"
        :page="templatePage"
      />
    </template>
  </MainPageNode>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { isEmpty, isEqual } from "lodash-es";
import TheFilterNode from "@/components/TheFilterNode.vue";
import CatalogProductsNode from "@/components/CatalogProductsNode.vue";
import PaginationNode from "@/components/PaginationNode.vue";
import CatalogRevealingNode from "@/components/CatalogRevealingNode.vue";
import PageContentNode from "@/components/PageContentNode.vue";
import DistributionNode from "@/components/DistributionNode.vue";
import CatalogSidebarNode from "@/components/CatalogSidebarNode.vue";
/**
 * В компоненте в первую очередь утанавливается data страницы каталога,
 * затем (маркером установки является установка старницы категории в request)
 * осуществляется загрузка первых товаров, вместе с тем устанавливается общее
 * число страниц...
 */

export default {
  components: {
    CatalogSidebarNode,
    CatalogRevealingNode,
    TheFilterNode,
    CatalogProductsNode,
    PaginationNode,
    PageContentNode,
    DistributionNode,
  },
  props: {
    params: {
      mainCategorySlug: String,
      categorySlug: String,
    },
    query: Object,
  },
  data() {
    return {
      initMarker: false,
    };
  },
  computed: {
    ...mapGetters({
      pageBySlug: "pages/pageBySlug",
      singleBySlug: "singleBySlug",
      total: "total",
      requestByItemParam: "requestByItemParam",
      filtredProducts: "products/filtredProducts",
    }),
    ...mapState({
      productsSSGDefaultRequest: (state) => state.products.requests[0],
      productsRequest: (state) => state.products.basedRequest,
      productsCategoriesRequest: (state) => state.productsCategories.basedRequest,
      totalProducts: (state) => state.products.total,
      totalPages: (state) => state.products.totalPages,
      page: (state) => state.products.basedRequest.params.page,
      pagesRequest: (state) => state.pages.basedRequest,
      /** filter */
      sortOptions: (state) => state.filter.defaultValues.sort,
      categoryId: (state) => state.filter.params.category,
      orderAndOrderBy: (state) => state.filter.params.orderAndOrderBy,
    }),

    category() {
      return this.singleBySlug({
        type: this.productsCategoriesRequest.type,
        slug: this.params.categorySlug,
      });
    },

    mainCategory() {
      return this.singleBySlug({
        type: this.productsCategoriesRequest.type,
        slug: this.params.mainCategorySlug,
      });
    },

    templatePage() {
      return this.pageBySlug(this.params.categorySlug);
    },
    total() {
      if (isEmpty(this.mainCategory)) return;
      return this.mainCategory.count;
    },

    products() {
      return this.filtredProducts({ quantity: 8 });
    },
  },
  watch: {
    /**
     * За установкой номера каталога-категории следует инициализация
     * каталога
     * @param {*} newValue
     */
    async categoryId(newValue) {
      if (newValue !== null && !this.initMarker) {
        this.initCatalog();
      }
    },
  },
  created() {
    this.setCategoryId(this.category.id);
  },
  /**
   * Run after change category
   */
  beforeUpdate() {
    this.initMarker = false;
    this.setCategoryId(this.category.id);
  },
  methods: {
    ...mapMutations({
      setCategoryId: "filter/setCategoryId",
      setTotalPages: "products/setTotalPages",
      setTotal: "products/setTotal",
      setPage: "filter/setPage",
      setItemsPaginated: "products/setItemsPaginated",
      SET_SINGLE_PARAM: "SET_SINGLE_PARAM",
      /** filter */
      setOrderAndOrderBy: "filter/setOrderAndOrderBy",
    }),
    ...mapActions({
      updateRequestParams: "products/updateRequestParams",
      filterAndPaginate: "products/filterAndPaginate",
      changePage: "products/changePage",
      validateValues: "filter/validateValues",
    }),

    /**
     * Функция иницализатор, срабатывающая, при устаговки state.basedRequest.params.category
     */
    async initCatalog() {
      this.setPage(this.query.page ? this.query.page : 1);
      this.updateRequestParams();
      this.filterAndPaginate();
      this.initMarker = true;
    },

    /**
     * Валидация параметоров (цены) происходит автоматически, без выаода сообщения
     */
    async updateFilter() {
      this.$router.push(await this.changePage(1));
      this.validateValues();
      this.updateRequestParams();
      this.filterAndPaginate();
    },

    /**
     * Метод возвращает Boolean, сравнивая опцию, записанную в filter.params.orderAndOrderBy
     * и опцию из списка опций. Таким образом он в компанент передает значение, которое
     * определяет показывается ли checked
     */
    equalOptionSort(value) {
      return isEqual(value, this.orderAndOrderBy);
    },
  },
};
</script>

<style lang="scss">
.catalog {
  &__body {
  }

  &__top {
    position: relative;
  }

  &__sorting {
    .input_radio {
      margin-bottom: 0.5rem;
    }
  }

  &__main {
    margin: 1rem 0;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 3fr;

    @media (max-width: ($md2+px)) {
      grid-template-columns: 1fr;
    }
  }

  &__sorting {
    display: flex;
    padding: 0 0 2rem;
  }
}
</style>
