import { isEmpty, cloneDeep } from "lodash-es";
import router from "@/router/index.js";
import {
  VUE_WP_INSTANCE,
  mutateObjectForReplaceProperty,
} from "@/api/helpers.js";

/**
 * Фильтрация и сортировка во фроненде работает для предзагрузки товаров,
 * которые есть в хранилище и соответвуют заданным значениям. Это позволяет
 * уже начать выбирать товары ещё до полной загрузки страницы пагинации, загрузки данных
 * с сервера
 */
const instance = VUE_WP_INSTANCE().state.products;
export default {
  namespaced: true,
  /**
   * В params содержатся только базовые параметры. Необходимо это для корректной инициализации
   * каталога. Могут возникать проблемы со сравниванием объектов, когда имеются, например,
   * объекты. Сравнивание элементов в методе-геттере request() может рпботать некорректно
   * при наличии непримитивов
   *
   * @returns
   */
  state: () => ({
    basedRequest: {
      apiType: instance.apiType,
      type: instance.type,
      routeBase: instance.route_base,
      params: import.meta.env.VITE_LIKE_A_SPA
        ? instance.params
        : mutateObjectForReplaceProperty(instance.params, { per_page: 8 }),
      preparedParams: {},
    },
    requests: instance.requests,
    items: instance.items,
    itemsPaginated: {},
    totalPages: null,
    total: null,
  }),
  getters: {
    /**
     * Присваивает id-шникам соответвующие объекты из items
     *
     * @returns
     */
    filtredProducts:
      (state, getters, rootState, rootGetters) => ({ quantity }) => {
        const items = [];
        if (
          !isEmpty(state.itemsPaginated)
          && state.itemsPaginated.hasOwnProperty(state.basedRequest.params.page)
        ) {
          const ids = state.itemsPaginated[state.basedRequest.params.page];
          for (let i = 0; i < ids.length; i++) {
            if (i === quantity) break;
            const el = ids[i];
            items.push(state.items[el]);
          }
        }
        return items;
      },

    /**
     * @param {*} Параметры с опциями: {brand: {name: "Бренд", options: []}, materials: {} }
     *
     * Фильтр по одному совпадению в атрибуте: достаточно одного отмеченного чекбокса для
     * добавление товара в результирующий список, первое совпадение определяет true для атрибута,
     * в завершении объект формата {pa_brend: true, pa_tcvet: false} перебирается и если найден хотя бы
     * один false, item не добавляется.
     * В цикле перебора соответсвия опций выбраковываются те item, для которых переданы значения
     * термов атрибутов, но соответвие не найдено, так как в функцию попадают только заполненные атрибуты
     *
     *
     * @returns
     */
    filtredProductAttributes:
      (state, getters, rootState, rootGetters) => ({ requestAttributes, item }) => {
        let confirmed = true;
        const filter = {};
        requestAttributes: for (const reqAttrKey in requestAttributes) {
          if (Object.hasOwnProperty.call(requestAttributes, reqAttrKey)) {
            const reqAttrObject = requestAttributes[reqAttrKey]; // attributes['pa_brand']
            for (let i = 0; i < item.attributes.length; i++) {
              const itemAtrrObject = item.attributes[i];
              if (itemAtrrObject.id == reqAttrObject.id) {
                for (
                  let index = 0;
                  index < itemAtrrObject.options.length;
                  index++
                ) {
                  const itemOption = itemAtrrObject.options[index];
                  for (
                    let index = 0;
                    index < reqAttrObject.options.length;
                    index++
                  ) {
                    const inputOption = reqAttrObject.options[index];
                    if (inputOption.name == itemOption) {
                      filter[reqAttrKey] = true;
                      continue requestAttributes;
                    } else {
                      filter[reqAttrKey] = false;
                    }
                  }
                }
              }
            }
          }
        }
        for (const opt in filter) {
          if (Object.hasOwnProperty.call(filter, opt)) {
            const bool = filter[opt];
            if (!bool) {
              confirmed = false;
              break;
            }
          }
        }
        return confirmed;
      },
    /**
     *
     * @returns - Скидка в процентах
     */
    procentPriceSale: (state) => (product) => Math.round(
      100 - (product.sale_price / product.regular_price) * 100,
    ),
    singleProductAttribute:
      (state) => ({ productId, attrId }) => state.items?.[productId]?.attributes.find((i) => i.id == attrId),

    sortingProducts:
      (state, getters, rootState, rootGetters) => (items, type) => {
        if (type == 0) return items.sort(rootGetters["filter/sortDefault"]); //
        if (type == 1) { return items.sort(rootGetters["filter/sortPriceMinToMax"]); } // цена, по убыванию
        if (type == 2) { return items.sort(rootGetters["filter/sortPriceMaxToMin"]); } // цены по возрастанию
      },
  },
  mutations: {
    /**
     * 3 типа значений:
     * 1) В объекте (nestedValue) происходит поиск свойств, в products.state.basedRequest.params, и если есть совпадение по ключу, значение записывается (*)
     * 2) Обычная запись примитива (**)
     * 3) Объекты могут иметь свойство options, при этом в параметр записывается массив значений (***)
     * @param {*} state
     * @param {*} filterParams
     */
    setProductsParams(state, filterParams) {
      const { params } = state.basedRequest;
      /**
       * Цикл для запроса
       */
      for (const key in filterParams) {
        const neastedValue = filterParams[key];
        if (
          typeof neastedValue === "object"
          && !neastedValue.hasOwnProperty("options")
        ) {
          // (*)
          for (const neastedValueKey in neastedValue) {
            if (Object.hasOwnProperty.call(neastedValue, neastedValueKey)) {
              const element = neastedValue[neastedValueKey];
              if (params.hasOwnProperty(neastedValueKey)) {
                params[neastedValueKey] = element;
              }
            }
          }
        }
        if (params.hasOwnProperty(key)) {
          // (**)
          if (
            typeof neastedValue === "number"
            || typeof neastedValue === "string"
            || typeof neastedValue === "array"
          ) {
            params[key] = neastedValue;
          } else if (typeof neastedValue === "object") {
            // (***)
            if (neastedValue.hasOwnProperty("options")) {
              params[key] = neastedValue.options.map((object) => object.id);
            }
          }
        }
      }
      /**
       * Цикл для preparedParams
       */
      for (const key in filterParams) {
        const filterParam = filterParams[key];
        if (
          typeof filterParam === "number"
          || typeof filterParam === "string"
        ) {
          state.basedRequest.preparedParams[key] = filterParam; // optionalParams.price = 500
        } else {
          state.basedRequest.preparedParams[key] = cloneDeep(filterParam);
        }
      }
    },

    setTotalPages(state, value) {
      state.totalPages = value;
    },
    setTotal(state, value) {
      state.total = value;
    },
    setProductsCategoryId(state, value) {
      state.basedRequest.params.category = value;
    },
    // setExclude(state, value) {
    //     state.optionalParams.exclude = value;
    // },

    setItemsPaginated(state, { pageNumber, value }) {
      state.itemsPaginated[pageNumber] = value;
    },
    unsetItemsPaginated(state) {
      state.itemsPaginated = {};
    },
  },
  actions: {
    /**
     * Метод отрабатывает при обновлении параметров - использования фильтра и сортировки
     * @param {*} param0
     */
    filterAndPaginate: ({
      state, dispatch, commit, getters, rootGetters,
    }) => {
      const { preparedParams } = state.basedRequest;
      /**
       * Достаем тот реквест, у которого page совпадает с текщим basedRequest
       */
      const requestAttributes = {};
      let items = [];
      /**
       * Цикл для атрибутов - если options пуст, значит атрибуты не заданы -> данный атрибут в проверку
       * не включается
       */
      for (const key in preparedParams) {
        if (Object.hasOwnProperty.call(preparedParams, key)) {
          const param = preparedParams[key];
          if (key.match(/^pa_[a-z]+/) && param.options.length) {
            // && !isEmpty(element.options)
            requestAttributes[key] = param;
          }
        }
      }
      /**
       * Перебираем items, поэтапно проверяя свойства. Для добавления item'а необходимо,
       * чтобы confirmed был TRUE. На выходе все айтемы, которые прошли фильтрацию, готовы к сортировке
       */
      const ids = Object.keys(state.items);
      for (let index = 0; index < ids.length; index++) {
        let confirmed = false;
        const id = ids[index];
        const item = state.items[id];
        for (let index = 0; index < item.categories.length; index++) {
          const category = item.categories[index];
          if (category.id == preparedParams.category) {
            confirmed = true;
            break;
          } else {
            confirmed = false;
          }
        }
        if (confirmed === false) continue;
        if (
          item.price < preparedParams.min_price
          || item.price > preparedParams.max_price
        ) {
          continue;
        }
        if (!isEmpty(requestAttributes) && !isEmpty(item.attributes)) {
          confirmed = getters.filtredProductAttributes({
            requestAttributes,
            item,
          });
        }
        if (confirmed) items.push(item);
      }

      items = getters.sortingProducts(
        items,
        state.basedRequest.preparedParams.orderAndOrderBy.id,
      );

      const { per_page } = state.basedRequest.params;

      commit("setTotalPages", Math.ceil(items.length / per_page));

      commit("unsetItemsPaginated");
      /**
       * Создаются шаблоны для страниц пагинации. Для отображения товаров
       * исрользуется getter filtredProducts
       */
      const pageCount = Math.ceil(items.length / per_page);
      let itemMarker = 0;
      for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
        commit("setItemsPaginated", {
          pageNumber,
          value: items
            .slice(itemMarker, itemMarker + per_page)
            .map((i) => i.id),
        });
        itemMarker += per_page;
      }
    },

    changePage({
      state, dispatch, commit, getters, rootGetters,
    }, page) {
      const value = Number(page);
      const pushObj = { name: "" };
      if (value != 1) pushObj.query = { page: value };
      const { type } = state.basedRequest;
      commit("SET_PAGE", { type, value }, { root: true });
      return pushObj;
    },

    /**
     * Запускает сеттер, устанавливающй параметры в store
     *
     * @param {*} param0
     */
    updateRequestParams({
      state, dispatch, commit, getters, rootGetters,
    }) {
      commit("setProductsParams", rootGetters["filter/params"]);
    },

    routeToSingle({ state, rootGetters }, ident) {
      if (typeof ident === "number") {
        state.items[ident].slug;
      }
      router.push({
        name: "SingleProduct",
        params: { productSlug: ident },
      });
    },
  },
};
