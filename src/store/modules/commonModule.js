import { split } from "lodash-es";
import { togglerOpening } from "@/api/helpers.js";
/**
 * (!) erv.off нужно переделать. Необходимо разделить блоки на общие и неподконтрольные
 * общему механизму скрытия/раскрытия
 */
export const commonModule = {
  namespaced: true,
  state: () => ({
    scrollY: null,
    scrollFlag: true,
    /**
     * Default value for protected of error before gidratation
     */
    browserReady: false,
    windowWidth: null,
    // windowWidth: import.meta.env.VITE_LIKE_A_SPA ? window.innerWidth : null,
    breakpoint: "",
    /**
     * Наполняется атрибутами при их подгрузке
     *
     * Необходимо разделение как по логическим группам, так и по типам: попапы, ревелинги, листы
     *
     * прим. Правильнее включить название айтема в объект с его свойствами
     *
     */
    revs: {},
    progressLoad: {
      visible: false,
      percent: 0,
    },
    progress: [],
    messages: {
      orderingError: {
        name: "orderingError",
        type: "error",
        visible: false,
      },
      currentPaymentURLNotSet: {
        name: "currentPaymentURLNotSet",
        type: "error",
        visible: false,
      },
      notSelectPaymentMethod: {
        name: "notSelectPaymentMethod",
        type: "error",
        visible: false,
      },
      productAddedToCart: {
        name: "productAddedToCart",
        type: "success",
        visible: false,
      },
      notSelectProductSize: {
        name: "notSelectProductSize",
        type: "error",
        visible: false,
      },
      allError: {
        name: "allError",
        type: "error",
        visible: false,
      },
    },

    openings: {
      revealing: {},
      popup: {},
      catalogRevealing: {},
      spoiler: {},
    },
    //   { name: 'notSelectPaymentMethod', type: 'error', visible: false },
    // ]
  }),
  getters: {},

  mutations: {
    addOpening(state, item) {
      const element = {
        name: item.name,
        active: item.active ? item.active : false,
        /**
         * Дефолтный - обычный. Для спойлеров - это то, что, например, он не скрыт из-за определенного 
         * разрешения экрана. Ддя сatalogRevealing's - это стандартное отображения
         */
        default: item.default ? item.default : true,
      };
      state.openings[item.type][element.name] = element;
    },

    setRevealing(state, { name, value = null, prop = "active" }) {
      const type = "revealing";
      togglerOpening(name, prop, value, state, type);
    },

    setPopup(state, { name, value = null, prop = "active" }) {
      const type = "popup";
      togglerOpening(name, prop, value, state, type);
    },

    setCatalogRevealing(state, { name, value = null, prop = "active" }) {
      const type = "catalogRevealing";
      togglerOpening(name, prop, value, state, type);
    },

    setSpoiler(state, { name, value = null, prop = "active" }) {
      const type = "spoiler";
      togglerOpening(name, prop, value, state, type);
    },

    setRev(state, { name, value = null, prop = "active" }) {
      const type = "rev";
      togglerOpening(name, prop, value, state, type);
    },

    /**
     *
     * @param {Object} Payload
     * @param {Object} Payload.type - если значение равно null все Opening's закрываются
     */
    setAllOpeningTypeItems(
      state,
      { type = null, value = false, prop = "active" }
    ) {
      const items = type !== null ? state.openings[type] : state.openings;
      for (const key in items) {
        if (Object.hasOwnProperty.call(items, key)) {
          const item = items[key];
          if (type !== null) {
            item[prop] = value;
          } else {
            for (const nestedKey in item) {
              if (Object.hasOwnProperty.call(item, nestedKey)) {
                const element = item[nestedKey];
                element[prop] = value;
              }
            }
          }
        }
      }
    },

    setMessage(state, { name, value = true }) {
      state.messages[name].visible = value;
    },
    setScrollFlag(state, { value, toggle = false }) {
      if (toggle) {
        value ? (value = false) : (value = true);
      }
      state.scrollFlag = value;
    },
    setWindowWidth(state, value) {
      state.windowWidth = value;
    },
    setBreakpoint(state, value) {
      state.breakpoint = value;
    },
    setScrollY(state, value) {
      state.scrollY = value;
    },

    /**
     *
     * @param {*} state
     * @param {Object} value
     */
    setProgressLoad(state, value) {
      state.progressLoad = value;
    },

    /**
     *
     * @param {*} state
     * @param {Object} value
     */
    setProgress(state, value) {
      state.progress.push(value);
    },

    setBrowserReady(state, value) {
      state.browserReady = value;
    },
  },

  actions: {
    updateMessage(
      { state, dispatch, commit, getters, rootGetters },
      { name, value = true }
    ) {
      commit("setMessage", { name, value });
      setTimeout(() => {
        commit("setMessage", { name, value: false });
      }, 3000);
    },

    updateAllOpeningTypeItems(
      { state, dispatch, commit, getters, rootGetters },
      { type = null, value = false, prop = "active" }
    ) {
      const options = { type, value, prop };
      commit("setAllOpeningTypeItems", options);
      if (options.value === false && options.prop === "active")
        commit("setScrollFlag", { value: true });
    },
  },
};
