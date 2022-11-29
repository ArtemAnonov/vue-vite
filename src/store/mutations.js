export default {
    ADD_SETTINGS(state, { type, settings }) {
        state[type].settings = settings
    },

    SET_LOADING(state, loading) {
        state.site.loading = loading
    },
    SET_DOC_TITLE(state, title) {
        state.site.docTitle = title
    },
    /**
     * 
     * @param {*} state 
     * @param {*} param1 - payload
     */
    ADD_ITEM(state, { type, item }) {
        if (item && type && ! state[type]['items'].hasOwnProperty(item.id)) {
            state[type]['items'][item.id] = item;
        }
    },
    ADD_ITEMS_IDS(state, { type, ids }) {
        state[type].request.optionalParams.exclude = [...state[type].request.optionalParams.exclude, ...ids]
    },
    ADD_REQUEST(state, { type, request }) {
        state[type].requests.push(request)
    },
    SET_PAGE(state, { type, value }) {
        state[type].basedRequest.params.page = value;
    },
    SET_INCLUDE(state, { type, value }) {
        state[type].basedRequest.params.include = value;
    },

    /**
     * 
     * @param {*} state 
     * @param {*} paramKey - ключ параметра
     */
     SET_PARAM(state, { type, paramKey, slug }) {
        state[type].basedRequest.params[paramKey] = slug;
    },
    /**
     * 
     * @param {*} state 
     * @param {*} paramKey - ключ параметра
     */
    SET_SINGLE_PARAM(state, { type, paramKey, slug }) {
        state[type].basedRequest.single_params[paramKey] = slug;
    },

    /**
     * Установка значения; 
     * Первый случай - установка в модуль, второй - в state
     * @param {*} state 
     * @param {*} param1 
     */
    SET_VALUE(state, { type, key, value }) {
        if (type) {
            state[type][key] = value
        } else {
            state[key] = value
        }
    }
}