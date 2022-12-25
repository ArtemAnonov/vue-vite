<template>
  <!--         v-if="category && mainCategory && templatePage"  -->
  <MainPageNode :templatePage="templatePage" :category="category">
    <template #page-main>
      <filter-node @updateFilter="updateFilter"></filter-node>
      <ContainerNode>
        <div class="catalog__body">
          <div class="catalog__main">
            <div class="catalog__sidebar">
              <catalog-sidebar-node
                v-if="mainCategory && category"
                :mainCategory="mainCategory"
                :category="category"
                :total="total"
              ></catalog-sidebar-node>
            </div>
            <div class="catalog__products">
              <div class="catalog__sorting">
                <RevealingListNode
                  :bodyLoaded="sortOptions ? true : false"
                  @apply="updateFilter"
                  name="sorting"
                >
                  <template #title>Сортировка</template>
                  <template #main>
                    <input-radio-node
                      v-for="option in sortOptions"
                      :modelValue="equalOptionSort(option)"
                      :labelText="option.name"
                      @input="setOrderAndOrderBy(option)"
                      :checked="option.id === 0"
                      name="sort"
                      :key="option.id"
                    >
                    </input-radio-node>
                  </template>
                </RevealingListNode>
              </div>
              <catalog-products-node
                :categoryId="categoryId"
              ></catalog-products-node>
              <pagination-node :type="productsRequest.type"></pagination-node>
            </div>
            <!-- <div class="observer" v-intersection="loadMoreProducts" v-if="page < totalPages"></div> -->
          </div>
        </div>
        <page-content-node
          v-if="templatePage"
          :page="templatePage"
        ></page-content-node>
        <distribution-node></distribution-node>
      </ContainerNode>
    </template>
  </MainPageNode>
</template>

<script>
//
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { isEmpty, isEqual } from "lodash-es";

import CatalogSidebarNode from "@/components/CatalogSidebarNode.vue";
import FilterNode from "@/components/FilterNode.vue";
import CatalogProductsNode from "@/components/CatalogProductsNode.vue";
import PaginationNode from "@/components/PaginationNode.vue";
import RevealingListNode from "@/components/RevealingListNode.vue";
import PageContentNode from "@/components/PageContentNode.vue";
import DistributionNode from "@/components/DistributionNode.vue";
import MainPageNode from "@/components/structure/MainPageNode.vue";

export default {
  /**
   * В компоненте в первую очередь утанавливается data страницы каталога,
   * затем (маркером установки является установка старницы категории в request)
   * осуществляется загрузка первых товаров, вместе с тем устанавливается общее
   * число страниц...
   */
  components: {
    RevealingListNode,
    CatalogSidebarNode,
    FilterNode,
    CatalogProductsNode,
    PaginationNode,
    PageContentNode,
    DistributionNode,
    MainPageNode,
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
  watch: {
    /**
     * За установкой номера каталога-категории следует инициализация
     * каталога
     *
     * @param {*} newValue
     */
    async categoryId(newValue) {
      if (newValue !== null && !this.initMarker) {
        this.initCatalog();
        // this.getTemplatePage()
      }
    },

    /**
     * Проверка if() необходима для того, чтобы во время выполнения initCatalog()
     * не происходил ненужный запрос в связи с изменением page
     */
    page(newValue) {
      if (import.meta.env.VITE_LIKE_A_SPA) {
        if (newValue != this.query.page) {
          this.loadMoreProducts();
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      itemBySlug: "itemBySlug",
      total: "total",
      requestByItemParam: "requestByItemParam",
    }),
    ...mapState({
      productsRequestsRequest: (state) => state.products.requests[0],
      productsRequest: (state) => state.products.basedRequest,
      productsCategoriesRequest: (state) =>
        state.productsCategories.basedRequest,
      totalProducts: (state) => state.products.total,
      totalPages: (state) => state.products.totalPages,
      page: (state) => state.products.basedRequest.params.page,
      loading: (state) => state.site.loading,
      pagesRequest: (state) => state.pages.basedRequest,
      /**filter*/
      sortOptions: (state) => state.filter.defaultValues.sort,
      categoryId: (state) => state.filter.params.category,
      orderAndOrderBy: (state) => state.filter.params.orderAndOrderBy,
    }),
    /**
     * Slug from props
     */
    category() {
      return this.itemBySlug({
        type: this.productsCategoriesRequest.type,
        slug: this.params.categorySlug,
      });
    },

    mainCategory() {
      return this.itemBySlug({
        type: this.productsCategoriesRequest.type,
        slug: this.params.mainCategorySlug,
      });
    },

    templatePage() {
      return this.itemBySlug({
        type: this.pagesRequest.type,
        slug: this.params.categorySlug,
      });
    },

    total() {
      if (isEmpty(this.mainCategory)) return;
      return this.mainCategory.count;
    },

    /*filter*/
    // orderAndOrderByChecked: {
    //   get() {
    //     return this.sortOptions;
    //   },
    //   set(value) {
    //     this.setOrderAndOrderBy(value);
    //   },
    // },
  },

  methods: {
    ...mapMutations({
      setCategoryId: "filter/setCategoryId",
      setTotalPages: "products/setTotalPages",
      setTotal: "products/setTotal",
      setPage: "filter/setPage",
      setItemsPaginated: "products/setItemsPaginated",
      SET_SINGLE_PARAM: "SET_SINGLE_PARAM",
      /**filter */
      setOrderAndOrderBy: "filter/setOrderAndOrderBy",
    }),
    ...mapActions({
      getItems: "getItems",
      updateRequestParams: "products/updateRequestParams",
      filterAndPaginate: "products/filterAndPaginate",
      changePage: "products/changePage",
      validateValues: "filter/validateValues",
      getSingleBySlug: "getSingleBySlug",
    }),

    /**
     * Валидация параметоров (цены) происходит автоматически, без выаода сообщения
     */
    async updateFilter() {
      this.$router.push(await this.changePage(1));
      this.validateValues();
      this.updateRequestParams();
      this.filterAndPaginate();
      let request;
      if (import.meta.env.VITE_LIKE_A_SPA) {
        const { request } = await this.getItems(
          Object.assign({ onDownloadProgress: Function }, this.productsRequest)
        );
        this.setTotalPages(request.totalPages);
        this.setItemsPaginated({
          pageNumber: request.params.page,
          value: request.data,
        });
      } else {
        request = this.productsRequestsRequest;
        this.setTotalPages(Math.ceil(request.total / 8));
      }
    },
    async loadMoreProducts() {
      const { request } = await this.getItems(this.productsRequest);
      this.setItemsPaginated({
        pageNumber: request.params.page,
        value: request.data,
      });
    },

    /**
     * Функция иницализатор, срабатывающая, при устаговки state.basedRequest.params.category
     */
    async initCatalog() {
      if (this.query.page) this.setPage(this.query.page);
      await this.updateRequestParams();
      let request;
      if (import.meta.env.VITE_LIKE_A_SPA) {
        request = await this.getItems(this.productsRequest).request;
        this.setTotalPages(request.totalPages);
        this.setItemsPaginated({
          pageNumber: request.params.page,
          value: request.data,
        });
      } else {
        this.filterAndPaginate();
        request = this.productsRequestsRequest;
        this.setTotalPages(Math.ceil(request.total / 8));
      }
      this.initMarker = true;
    },

    getTemplatePage() {
      this.getSingleBySlug({
        basedRequest: this.pagesRequest,
        params: { slug: this.params.categorySlug },
      });
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
  created() {
    this.setCategoryId(this.category.id);
    this.getTemplatePage();
  },

  /**
   * Run after change category
   */
  beforeUpdate() {
    this.initMarker = false;
    this.setCategoryId(this.category.id);
    this.getTemplatePage();
  },
};
</script>

<style lang="scss">
.catalog {
  &__body {
  }

  &__top {
    position: relative;

    @media (max-width: ($md2+px)) {
    }

    // margin-bottom: 1000px;
  }

  &__sorting {
    .input_radio {
      margin-bottom: 0.5rem;
    }
  }

  &__main {
    margin: 2rem 0;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 3fr;

    @media (max-width: ($md2+px)) {
      grid-template-columns: 1fr;
    }
  }

  &__products {
  }

  &__sorting {
    display: flex;
    padding: 0 0 2rem;
  }
}
</style>
