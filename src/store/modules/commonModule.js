/**
 * Общий модуль
 */
export const commonModule = {
  namespaced: true,
  state: () => ({
    scrollY: null,
    scrollFlag: true,
    windowWidth: null,
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
  }),
  getters: {},

  mutations: {
    setScrollFlag(state, { value, toggle = true }) {
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
     * Переключатель значений
     * Без аргументов, у которых установлены значения по умолчанию работает
     * как тогглер для, например, popup-ов
     * Использование аргумента prop как 'default' позволяет настроить дополнительные
     * стили итц
     * @param {*} state
     * @param {*} param1
     */
    updateRev(state, { name, value, toggleValue = true, prop = "visible" }) {
      if (toggleValue) value ? (value = false) : (value = true);
      state.revs[name][prop] = value;
    },
    /**
     * Добавление новых элементов
     *
     * @param {*} state
     * @param {*} object Объект формата: { "sorting": {}, ... }
     */
    addRev(state, object) {
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          let element = object[key]; // {}
          element = {
            default: element.default ? element.default : true,
            visible: element.visible ? element.visible : false,
            off: element.off ? element.off : false,
          };
          state.revs[key] = element;
        }
      }
    },
    /**
     * 
     * off: true обязует не применять функцию для элемента
     *
     * @param {*} state
     * @param {*} value Текущий узел, отобажение котрого регулируется в компоненте
     */
    closeRevs(state, value) {
      mark: for (let key in state.revs) {
        if (Object.hasOwnProperty.call(state.revs, key)) {
          const element = state.revs[key];
          if (element.off) continue mark;
          // if(value == key) continue
          if (Array.isArray(value)) {
            for (let index = 0; index < value.length; index++) {
              const element = value[index];
              if (element === key) continue mark;
            }
          } else {
            if (value == key) continue;
          }
          // if(value && state.revs[value].visible) continue
          state.revs[key].visible = false;
        }
      }
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
  },
};
