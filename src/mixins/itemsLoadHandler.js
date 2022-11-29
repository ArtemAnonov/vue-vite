import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { isEmpty } from 'lodash-es'

/**
 * Миксин предназначен для компонентов-контейнеров, в которых располагаются
 * элементы, необходим для корректного отображения их отображения до того как произойдет
 * загрузка
 *
 */
export default {
  /**
   *
   * @returns {Object} Object
   * @returns {Boolean} Object.itemsLoaded - тогглер, определяющий, загружены ли раельные объекты-данные
   */
  data() {
    return {
      itemsLoaded: false,
    };
  },
  computed: {
    ...mapGetters({}),
    ...mapState({}),
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
    /**
     * Метод возвращает массив с установленным length, который может быть использован в
     * v-for; Либо он может вернуть уже готовый массив
     */
    itemsLoadHandler(callback, quantity = 4) {
      let items = [];
      items = callback;
      if (isEmpty(items)) {
        this.itemsLoaded = false;
        items.length = quantity;
      } else {
        this.itemsLoaded = true;
      }
      return items;
    },
  },
};
