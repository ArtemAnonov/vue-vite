import { has } from "lodash-es";
import { togglerOpening } from "@/api/helpers";
import { messages } from "@/api/utils.js";

export default {
  namespaced: true,

  state: () => ({
    settings: {},
    scrollY: null,
    scrollFlag: true,
    /**
     * Default value for protected of error before gidratation
     */
    browserReady: false,
    windowWidth: null,
    breakpoint: "",
    /**
     * Наполняется атрибутами при их подгрузке
     * Необходимо разделение как по логическим группам, так и по типам: попапы, ревелинги, листы
     * прим. Правильнее включить название айтема в объект с его свойствами
     *
     */
    progressLoad: {
      visible: false,
      percent: 0,
    },
    progress: [],
    message: null,

    openings: {
      basic: {},
      revealing: {},
      popup: {},
      catalogRevealing: {},
      spoiler: {},
      // sensitive: {

      // },
    },
    //   { name: 'notSelectPaymentMethod', type: 'error', visible: false },
    // ]
  }),
  getters: {},

  mutations: {
    addOpening(state, item) {
      if (has(state.openings[item.type], item.name)) {
        // (!)
        // console.error(`Такой opening ${item.name} уже существует`);
        return;
        // throw new Error(`Такой opening ${item.name} уже существует`);
      }

      /**
       * element.default - обычный. Для спойлеров - это то, что, например, он не скрыт
       * из-за определенного
       * разрешения экрана. Для сatalogRevealing's - это стандартное отображения
       */
      const element = {
        name: item.name,
        active: item.active !== undefined ? item.active : false,
        default: item.default !== undefined ? item.default : true,
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

    setBasic(state, { name, value = null, prop = "active" }) {
      const type = "basic";
      togglerOpening(name, prop, value, state, type);
    },

    /**
     *
     * @param {Object} Payload
     * @param {Object} Payload.type - если значение равно null все Opening's закрываются
     */
    setAllOpeningTypeItems(
      state,
      { type = null, value = false, prop = "active" },
    ) {
      const items = type !== null ? state.openings[type] : state.openings;
      for (const key in items) {
        if (has(items, key)) {
          // (~) костыль
          if (key === "basic") continue;
          const item = items[key];
          if (type !== null) {
            item[prop] = value;
          } else {
            for (const nestedKey in item) {
              if (has(item, nestedKey)) {
                const element = item[nestedKey];
                element[prop] = value;
              }
            }
          }
        }
      }
    },

    setMessage(state, value) {
      state.message = value;
    },
    setScrollFlag(state, { value, toggle = false }) {
      state.scrollFlag = toggle ? !value : value;
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
      // setTimeout(() => {

      // }, 1000);
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
    updateMessage({ commit }, name) {
      commit("setMessage", messages[name]);
      setTimeout(() => {
        commit("setMessage", null);
      }, 4500);
    },

    updateAllOpeningTypeItems(
      {
        commit,
      },
      { type = null, value = false, prop = "active" },
    ) {
      const options = { type, value, prop };
      commit("setAllOpeningTypeItems", options);
      if (options.value === false && options.prop === "active") { commit("setScrollFlag", { value: true }); }
    },
  },
};
