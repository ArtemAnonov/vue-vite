import { basename } from "node:path";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderStyle, ssrRenderVNode, renderToString } from "vue/server-renderer";
import { useSSRContext, mergeProps, resolveComponent, withCtx, openBlock, createBlock, createCommentVNode, createVNode, Fragment, renderList, toDisplayString, withDirectives, vShow, renderSlot, createTextVNode, ref, vModelText, withModifiers, resolveDynamicComponent, createSSRApp } from "vue";
import { mapGetters, mapState, mapMutations, mapActions, createStore } from "vuex";
import { isEmpty, cloneDeep, isEqual, pickBy, identity } from "lodash-es";
import Cookies from "js-cookie";
import axios from "axios";
import { Navigation, Pagination, Autoplay, FreeMode, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import Sticky from "sticky-js";
import { createRouter, createMemoryHistory } from "vue-router";
const main = "";
const ButtonNode_vue_vue_type_style_index_0_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$V = {
  name: "button-node",
  props: {
    buttonStyle: {
      type: String,
      default: "light"
    }
  },
  computed: {}
};
function _sfc_ssrRender$V(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    class: ["button", `button_${$props.buttonStyle}`]
  }, _attrs))}><span>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</span></button>`);
}
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/ButtonNode.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const ButtonNode = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["ssrRender", _sfc_ssrRender$V]]);
const InputNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$U = {
  name: "input-node",
  inheritAttrs: false,
  props: {
    modelValue: [Number, String, Object, Array, Boolean]
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  }
};
function _sfc_ssrRender$U(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["input input_text", [_ctx.$attrs.class]]
  }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "before", {}, null, _push, _parent);
  _push(`<input${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
    class: { "not-empty": $props.modelValue },
    value: $props.modelValue
  }))}>`);
  ssrRenderSlot(_ctx.$slots, "after", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/InputNode.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const InputNode = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["ssrRender", _sfc_ssrRender$U]]);
const popupRevealingMixin = {
  props: {
    name: {
      type: String
    }
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      state(state2) {
        return state2.common.revs[this.name];
      }
    })
  },
  methods: {
    ...mapMutations({
      updateRev: "common/updateRev",
      closeRevs: "common/closeRevs"
    }),
    ...mapActions({}),
    bodyVisible() {
      this.closeRevs(this.name);
      this.updateRev({
        name: this.name,
        value: this.state.visible
      });
    }
  }
};
const PopupNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$T = {
  name: "popup-node",
  components: {},
  mixins: [popupRevealingMixin],
  props: {},
  data() {
    return {
      popups: {
        [this.name]: {
          default: true,
          visible: false,
          off: true
        }
      }
    };
  },
  watch: {
    popup: {
      handler() {
        this.setScrollFlag({ value: !this.popup.visible, toggle: false });
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      popup(state2) {
        return state2.common.revs[this.name];
      }
    })
  },
  methods: {
    ...mapMutations({
      addRev: "common/addRev",
      setScrollFlag: "common/setScrollFlag"
    }),
    ...mapActions({}),
    popupVisability() {
      this.updateRev({
        name: this.name,
        value: this.popup.visible
      });
    }
  },
  created() {
    this.addRev(this.popups);
  }
};
function _sfc_ssrRender$T(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    style: _ctx.popup.visible ? null : { display: "none" },
    class: "popup"
  }, _attrs))}><div class="popup__wrapper"><div class="popup__inner">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div></div>`);
}
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/PopupNode.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const PopupNode = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["ssrRender", _sfc_ssrRender$T]]);
const _sfc_main$S = {
  name: "select-model",
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  }
};
function _sfc_ssrRender$S(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<select${ssrRenderAttrs(mergeProps({
    name: "",
    id: ""
  }, _attrs))}><option disabled value="">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430</option><!--[-->`);
  ssrRenderList($props.options, (option) => {
    _push(`<option${ssrRenderAttr("value", option.value)}>${ssrInterpolate(option.name)}</option>`);
  });
  _push(`<!--]--></select>`);
}
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/SelectModel.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const SelectModel = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["ssrRender", _sfc_ssrRender$S]]);
const _imports_0 = "/wp-content/themes/CustomTheme/vue-vite-ssr/dist/static/assets/spinner.f13e5c14.gif";
const LoadingNode_vue_vue_type_style_index_0_scoped_aec178a8_lang = "";
const _sfc_main$R = {
  name: "loading-node",
  props: {
    loading: Boolean
  },
  ...mapState({}),
  ...mapGetters({})
};
function _sfc_ssrRender$R(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    style: _ctx.$props.loading ? null : { display: "none" },
    class: "loading"
  }, _attrs))} data-v-aec178a8><div class="loading__image" data-v-aec178a8><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-aec178a8></div>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/LoadingNode.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const LoadingNode = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["ssrRender", _sfc_ssrRender$R], ["__scopeId", "data-v-aec178a8"]]);
const CloseBtnNode_vue_vue_type_style_index_0_scoped_2dc446aa_lang = "";
const _sfc_main$Q = {
  name: "close-btn-node",
  data() {
    return {};
  }
};
function _sfc_ssrRender$Q(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<button${ssrRenderAttrs(_attrs)} data-v-2dc446aa></button>`);
}
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/CloseBtnNode.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const CloseBtnNode = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["ssrRender", _sfc_ssrRender$Q], ["__scopeId", "data-v-2dc446aa"]]);
const ContainerNode_vue_vue_type_style_index_0_scoped_0ea80dd8_lang = "";
const _sfc_main$P = {
  name: "container-node",
  props: {
    containerStylesOff: {
      type: Boolean,
      default: false
    }
  }
};
function _sfc_ssrRender$P(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: [$props.containerStylesOff ? "styles-off" : "", "container"]
  }, _attrs))} data-v-0ea80dd8>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/ContainerNode.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const ContainerNode = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["ssrRender", _sfc_ssrRender$P], ["__scopeId", "data-v-0ea80dd8"]]);
const InputStoreNode_vue_vue_type_style_index_0_scoped_054e5bd6_lang = "";
const _sfc_main$O = {
  name: "input-store-node",
  inheritAttrs: false,
  props: {
    modelValue: [Number, String, Object, Array, Boolean]
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  }
};
function _sfc_ssrRender$O(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "input" }, _attrs))} data-v-054e5bd6>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`<input${ssrRenderAttrs(mergeProps(_ctx.$attrs, { value: $props.modelValue }))} data-v-054e5bd6></div>`);
}
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/InputStoreNode.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const InputStoreNode = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["ssrRender", _sfc_ssrRender$O], ["__scopeId", "data-v-054e5bd6"]]);
const InputCheckboxNode_vue_vue_type_style_index_0_scoped_e78e5483_lang = "";
const _sfc_main$N = {
  name: "input-checkbox-node",
  inheritAttrs: false,
  props: {
    modelValue: Boolean,
    labelText: String
  }
};
function _sfc_ssrRender$N(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "input input_checkbox" }, _attrs))} data-v-e78e5483><input${ssrRenderAttrs(mergeProps({ type: "checkbox" }, _ctx.$attrs, { value: $props.modelValue }))} data-v-e78e5483><span class="${ssrRenderClass([$props.modelValue ? "checked" : "", "icon-check"])}" data-v-e78e5483></span><label for="" data-v-e78e5483>${ssrInterpolate(_ctx.$props.labelText)}</label></div>`);
}
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/InputCheckboxNode.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const InputCheckboxNode = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["ssrRender", _sfc_ssrRender$N], ["__scopeId", "data-v-e78e5483"]]);
const InputRadioNode_vue_vue_type_style_index_0_scoped_f5f01b3d_lang = "";
const _sfc_main$M = {
  name: "input-radio-node",
  inheritAttrs: false,
  props: {
    modelValue: Boolean,
    labelText: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {},
  created() {
  }
};
function _sfc_ssrRender$M(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["input input_radio", $props.disabled ? "disabled" : ""]
  }, _attrs))} data-v-f5f01b3d><input${ssrRenderAttrs(mergeProps({
    disabled: $props.disabled ? true : false,
    type: "radio"
  }, _ctx.$attrs))} data-v-f5f01b3d><span class="${ssrRenderClass($props.modelValue ? "checked" : "")}" data-v-f5f01b3d></span><label for="" data-v-f5f01b3d>${ssrInterpolate(_ctx.$props.labelText)}</label></div>`);
}
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/InputRadioNode.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const InputRadioNode = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["ssrRender", _sfc_ssrRender$M], ["__scopeId", "data-v-f5f01b3d"]]);
const MessageNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$L = {
  name: "message-node",
  emits: ["showMessage"],
  props: [
    "show"
  ],
  data() {
    return {
      showTemplate: false
    };
  },
  watch: {
    show(newValue) {
      if (newValue === "")
        return;
      this.showTemplate = true;
      setTimeout(() => {
        this.showTemplate = false;
        this.$emit("showMessage", false);
      }, 3e3);
    }
  },
  computed: {}
};
function _sfc_ssrRender$L(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["message", $data.showTemplate ? "active" : ""]
  }, _attrs))}><span>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</span></div>`);
}
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/MessageNode.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const MessageNode = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["ssrRender", _sfc_ssrRender$L]]);
const PreloadWrapNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$K = {
  name: "preload-wrap-node",
  props: {
    route: Object,
    targetPreloadElement: {
      default: false
    },
    paddingBottom: [String, Number]
  },
  computed: {
    targetPreloadElementHandled() {
      switch (typeof this.targetPreloadElement) {
        case "object":
        case "array":
          return isEmpty(this.targetPreloadElement);
        default:
          return Boolean(this.targetPreloadElement);
      }
    }
  },
  methods: {
    routeTo() {
      if (this.route) {
        this.$router.push(this.route);
      }
    }
  },
  updated() {
  }
};
function _sfc_ssrRender$K(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["preload-wrap", $options.targetPreloadElementHandled ? "empty" : ""],
    style: $props.paddingBottom ? { paddingBottom: `${$props.paddingBottom}%` } : {}
  }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/PreloadWrapNode.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const PreloadWrapNode = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["ssrRender", _sfc_ssrRender$K]]);
const UI = [
  ButtonNode,
  InputNode,
  PopupNode,
  SelectModel,
  LoadingNode,
  CloseBtnNode,
  ContainerNode,
  InputStoreNode,
  InputCheckboxNode,
  PreloadWrapNode,
  MessageNode,
  InputRadioNode
];
const commonModule = {
  namespaced: true,
  state: () => ({
    scrollY: null,
    scrollFlag: true,
    windowWidth: null,
    breakpoint: "",
    revs: {},
    progressLoad: {
      visible: false,
      percent: 0
    },
    progress: []
  }),
  getters: {},
  mutations: {
    setScrollFlag(state2, { value, toggle = true }) {
      if (toggle) {
        value ? value = false : value = true;
      }
      state2.scrollFlag = value;
    },
    setWindowWidth(state2, value) {
      state2.windowWidth = value;
    },
    setBreakpoint(state2, value) {
      state2.breakpoint = value;
    },
    setScrollY(state2, value) {
      state2.scrollY = value;
    },
    updateRev(state2, { name, value, toggleValue = true, prop = "visible" }) {
      if (toggleValue)
        value ? value = false : value = true;
      state2.revs[name][prop] = value;
    },
    addRev(state2, object) {
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          let element = object[key];
          element = {
            default: element.default ? element.default : true,
            visible: element.visible ? element.visible : false,
            off: element.off ? element.off : false
          };
          state2.revs[key] = element;
        }
      }
    },
    closeRevs(state2, value) {
      mark:
        for (let key in state2.revs) {
          if (Object.hasOwnProperty.call(state2.revs, key)) {
            const element = state2.revs[key];
            if (element.off)
              continue mark;
            if (Array.isArray(value)) {
              for (let index = 0; index < value.length; index++) {
                const element2 = value[index];
                if (element2 === key)
                  continue mark;
              }
            } else {
              if (value == key)
                continue;
            }
            state2.revs[key].visible = false;
          }
        }
    },
    setProgressLoad(state2, value) {
      state2.progressLoad = value;
    },
    setProgress(state2, value) {
      state2.progress.push(value);
    }
  }
};
const routing = {
  returned: {
    category_base: "",
    page_on_front: "home",
    page_for_posts: "posts",
    permalink_structure: "/%year%/%monthnum%/%postname%/",
    show_on_front: "page",
    tag_base: "",
    url: "http://localhost:8080"
  }
};
const state$2 = {
  auth: {
    route_base: "auth",
    type: "auth",
    apiType: "/jwt-auth/v1/",
    specific_params: [],
    single_params: [],
    params: {},
    basedRequest: {
      route_base: "auth",
      type: "auth",
      apiType: "/jwt-auth/v1/"
    },
    items: {},
    requests: []
  },
  cart: {
    apiType: "/wc/store/v1/",
    route_base: "cart",
    type: "cart",
    single_params: [],
    specific_params: [],
    params: {},
    basedRequest: {
      route_base: "cart",
      type: "cart",
      apiType: "/wc/store/v1/"
    },
    items: {},
    requests: []
  },
  checkout: {
    apiType: "/wc/store/v1/",
    route_base: "checkout",
    type: "checkout",
    single_params: [],
    specific_params: [],
    params: {},
    basedRequest: {
      route_base: "checkout",
      type: "checkout",
      apiType: "/wc/store/v1/"
    },
    items: {},
    requests: []
  },
  pages: {
    route_base: "pages",
    type: "pages",
    apiType: "/wp/v2/",
    specific_params: [],
    single_params: [],
    params: {},
    basedRequest: {
      route_base: "pages",
      type: "pages",
      apiType: "/wp/v2/"
    },
    items: {},
    requests: []
  },
  banners: {
    route_base: "banners",
    type: "banners",
    apiType: "/wp/v2/",
    specific_params: {
      per_page: 10,
      banner_categories: ""
    },
    single_params: [],
    params: {
      per_page: 10,
      banner_categories: ""
    },
    basedRequest: {
      route_base: "banners",
      type: "banners",
      apiType: "/wp/v2/"
    },
    items: {},
    requests: []
  },
  media: {
    route_base: "media",
    type: "media",
    apiType: "/wp/v2/",
    specific_params: [],
    single_params: [],
    params: {},
    basedRequest: {
      route_base: "media",
      type: "media",
      apiType: "/wp/v2/"
    },
    items: {},
    requests: []
  },
  orders: {
    route_base: "orders",
    type: "orders",
    specific_params: {
      per_page: 8,
      page: 1
    },
    apiType: "/wc/v3/",
    single_params: [],
    params: {
      per_page: 8,
      page: 1
    },
    basedRequest: {
      route_base: "orders",
      type: "orders",
      apiType: "/wc/v3/"
    },
    items: {},
    requests: []
  },
  customers: {
    route_base: "customers",
    type: "customers",
    specific_params: [],
    apiType: "/wc/v3/",
    single_params: [],
    params: {},
    basedRequest: {
      route_base: "customers",
      type: "customers",
      apiType: "/wc/v3/"
    },
    items: {},
    requests: []
  },
  products: {
    route_base: "products",
    type: "products",
    specific_params: {
      per_page: 8,
      page: 1,
      category: "",
      slug: "",
      min_price: null,
      max_price: null,
      pa_brand: [],
      pa_tcvet: [],
      pa_material: [],
      type: "simple",
      order: "",
      orderby: ""
    },
    apiType: "/wc/v3/",
    single_params: [],
    params: {
      per_page: 8,
      page: 1,
      category: "",
      slug: "",
      min_price: null,
      max_price: null,
      pa_brand: [],
      pa_tcvet: [],
      pa_material: [],
      type: "simple",
      order: "",
      orderby: ""
    },
    basedRequest: {
      route_base: "products",
      type: "products",
      apiType: "/wc/v3/"
    },
    items: {},
    requests: []
  },
  productsCategories: {
    route_base: "products/categories",
    type: "productsCategories",
    specific_params: {
      per_page: 100,
      exclude: [
        17
      ]
    },
    apiType: "/wc/v3/",
    single_params: [],
    params: {
      per_page: 100,
      exclude: [
        17
      ]
    },
    basedRequest: {
      route_base: "products/categories",
      type: "productsCategories",
      apiType: "/wc/v3/"
    },
    items: {
      "20": {
        id: 20,
        name: "\u0416\u0435\u043D\u0449\u0438\u043D\u0430\u043C",
        slug: "zhenshchinam",
        parent: 0,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 13,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/20"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ]
        }
      },
      "21": {
        id: 21,
        name: "\u042E\u0431\u043A\u0438",
        slug: "iubki",
        parent: 20,
        description: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u043D\u0435 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u0442\u0441\u044F.",
        display: "default",
        image: {
          id: 284,
          date_created: "2022-08-17T23:47:20",
          date_created_gmt: "2022-08-17T20:47:20",
          date_modified: "2022-08-17T23:47:20",
          date_modified_gmt: "2022-08-17T20:47:20",
          src: "http://localhost/wp-content/uploads/2022/08/273_kh_204.png",
          name: "273_kh_204",
          alt: ""
        },
        menu_order: 0,
        count: 12,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/21"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/20"
            }
          ]
        }
      },
      "22": {
        id: 22,
        name: "\u041C\u0443\u0436\u0447\u0438\u043D\u0430\u043C",
        slug: "muzhchinam",
        parent: 0,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 1,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/22"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ]
        }
      },
      "23": {
        id: 23,
        name: "\u0425\u0443\u0434\u0438",
        slug: "%d1%85%d1%83%d0%b4%d0%b8",
        parent: 22,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 1,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/23"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/22"
            }
          ]
        }
      },
      "24": {
        id: 24,
        name: "\u0412\u0435\u0440\u0445\u043D\u044F\u044F \u043E\u0434\u0435\u0436\u0434\u0430",
        slug: "verkhniaia-odezhda",
        parent: 20,
        description: "\u0422\u0440\u0435\u043D\u0434\u043E\u0432\u044B\u0435 \u044E\u0431\u043A\u0438 \u0432\u0441\u0435\u0445 \u0444\u0430\u0441\u043E\u043D\u043E\u0432",
        display: "default",
        image: {
          id: 285,
          date_created: "2022-08-17T23:47:26",
          date_created_gmt: "2022-08-17T20:47:26",
          date_modified: "2022-08-17T23:47:26",
          date_modified_gmt: "2022-08-17T20:47:26",
          src: "http://localhost/wp-content/uploads/2022/08/outerwear2.png",
          name: "outerwear2",
          alt: ""
        },
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/24"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/20"
            }
          ]
        }
      },
      "25": {
        id: 25,
        name: "\u0422\u043E\u043B\u0441\u0442\u043E\u0432\u043A\u0438 \u0438 \u0441\u0432\u0438\u0442\u0448\u043E\u0442\u044B",
        slug: "tolstovki-i-svitshoty",
        parent: 20,
        description: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u0430",
        display: "default",
        image: {
          id: 286,
          date_created: "2022-08-17T23:47:37",
          date_created_gmt: "2022-08-17T20:47:37",
          date_modified: "2022-08-17T23:47:37",
          date_modified_gmt: "2022-08-17T20:47:37",
          src: "http://localhost/wp-content/uploads/2022/08/skirt.png",
          name: "skirt",
          alt: ""
        },
        menu_order: 0,
        count: 1,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/25"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/20"
            }
          ]
        }
      },
      "54": {
        id: 54,
        name: "\u0414\u0435\u0442\u044F\u043C",
        slug: "detiam",
        parent: 0,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/54"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ]
        }
      },
      "55": {
        id: 55,
        name: "\u041D\u043E\u0432\u0438\u043D\u043A\u0438",
        slug: "novinki",
        parent: 0,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/55"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ]
        }
      },
      "56": {
        id: 56,
        name: "\u0414\u043B\u044F \u0434\u043E\u043C\u0430",
        slug: "dlia-doma",
        parent: 0,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/56"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ]
        }
      },
      "57": {
        id: 57,
        name: "\u041A\u043E\u0441\u043C\u0435\u0442\u0438\u043A\u0430",
        slug: "kosmetika",
        parent: 0,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/57"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ]
        }
      },
      "58": {
        id: 58,
        name: "\u0411\u0440\u0435\u043D\u0434\u044B",
        slug: "brendy",
        parent: 0,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/58"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ]
        }
      },
      "59": {
        id: 59,
        name: "Sale",
        slug: "sale",
        parent: 0,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/59"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ]
        }
      },
      "78": {
        id: 78,
        name: "\u0422\u0440\u0430\u043F\u0435\u0446\u0438\u0438",
        slug: "trapetcii",
        parent: 21,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 1,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/78"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/21"
            }
          ]
        }
      },
      "79": {
        id: 79,
        name: "\u041C\u0438\u0434\u0438",
        slug: "midi",
        parent: 21,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 2,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/79"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/21"
            }
          ]
        }
      },
      "80": {
        id: 80,
        name: "\u041C\u0438\u043D\u0438",
        slug: "mini",
        parent: 21,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/80"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/21"
            }
          ]
        }
      },
      "81": {
        id: 81,
        name: "\u041F\u0440\u044F\u043C\u044B\u0435",
        slug: "priamye",
        parent: 21,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/81"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/21"
            }
          ]
        }
      },
      "82": {
        id: 82,
        name: "\u0411\u0440\u044E\u043A\u0438",
        slug: "briuki",
        parent: 20,
        description: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u0430",
        display: "default",
        image: {
          id: 293,
          date_created: "2022-08-18T11:46:40",
          date_created_gmt: "2022-08-18T08:46:40",
          date_modified: "2022-08-18T11:46:40",
          date_modified_gmt: "2022-08-18T08:46:40",
          src: "http://localhost/wp-content/uploads/2022/08/273kh204_razdel_zhenshchiny_1.png",
          name: "273kh204_razdel_zhenshchiny_1",
          alt: ""
        },
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/82"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/20"
            }
          ]
        }
      },
      "83": {
        id: 83,
        name: "\u041F\u043B\u0430\u0442\u044C\u044F",
        slug: "platia",
        parent: 20,
        description: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
        display: "default",
        image: {
          id: 294,
          date_created: "2022-08-18T11:46:46",
          date_created_gmt: "2022-08-18T08:46:46",
          date_modified: "2022-08-18T11:46:46",
          date_modified_gmt: "2022-08-18T08:46:46",
          src: "http://localhost/wp-content/uploads/2022/08/273kh204_razdel_zhenshchiny_2.png",
          name: "273kh204_razdel_zhenshchiny_2",
          alt: ""
        },
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/83"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/20"
            }
          ]
        }
      },
      "84": {
        id: 84,
        name: "\u0410\u043A\u0441\u0435\u0441\u0441\u0443\u0430\u0440\u044B",
        slug: "aksessuary",
        parent: 20,
        description: "\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
        display: "default",
        image: {
          id: 295,
          date_created: "2022-08-18T11:47:05",
          date_created_gmt: "2022-08-18T08:47:05",
          date_modified: "2022-08-18T11:47:05",
          date_modified_gmt: "2022-08-18T08:47:05",
          src: "http://localhost/wp-content/uploads/2022/08/scarf.png",
          name: "scarf",
          alt: ""
        },
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/84"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/20"
            }
          ]
        }
      },
      "85": {
        id: 85,
        name: "\u0422\u043E\u043B\u0441\u0442\u043E\u0432\u043A\u0438",
        slug: "%d1%82%d0%be%d0%bb%d1%81%d1%82%d0%be%d0%b2%d0%ba%d0%b8",
        parent: 25,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 1,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/85"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/25"
            }
          ]
        }
      },
      "86": {
        id: 86,
        name: "\u0411\u043B\u0443\u0437\u043A\u0438",
        slug: "bluzki",
        parent: 20,
        description: "\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F",
        display: "default",
        image: null,
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/86"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/20"
            }
          ]
        }
      },
      "87": {
        id: 87,
        name: "C \u043F\u0440\u0438\u043D\u0442\u043E\u043C",
        slug: "c-%d0%bf%d1%80%d0%b8%d0%bd%d1%82%d0%be%d0%bc",
        parent: 78,
        description: "",
        display: "default",
        image: null,
        menu_order: 0,
        count: 0,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/87"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories"
            }
          ],
          up: [
            {
              href: "http://localhost/wp-json/wc/v3/products/categories/78"
            }
          ]
        }
      }
    },
    requests: [
      {
        params: {
          per_page: 100,
          exclude: [
            17
          ]
        },
        data: [
          87,
          59,
          84,
          86,
          58,
          82,
          24,
          54,
          56,
          20,
          57,
          79,
          80,
          22,
          55,
          83,
          81,
          85,
          25,
          78,
          23,
          21
        ],
        total: 22,
        totalPages: 1
      }
    ]
  },
  productsAttributes: {
    route_base: "products/attributes",
    type: "productsAttributes",
    specific_params: {
      per_page: 100
    },
    apiType: "/wc/v3/",
    single_params: [],
    params: {
      per_page: 100
    },
    basedRequest: {
      route_base: "products/attributes",
      type: "productsAttributes",
      apiType: "/wc/v3/"
    },
    items: {
      "1": {
        id: 1,
        name: "\u0411\u0440\u0435\u043D\u0434",
        slug: "pa_brand",
        type: "select",
        order_by: "menu_order",
        has_archives: false,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/attributes/1"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/attributes"
            }
          ]
        }
      },
      "3": {
        id: 3,
        name: "\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B",
        slug: "pa_material",
        type: "select",
        order_by: "menu_order",
        has_archives: false,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/attributes/3"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/attributes"
            }
          ]
        }
      },
      "4": {
        id: 4,
        name: "\u0420\u0430\u0437\u043C\u0435\u0440",
        slug: "pa_razmer",
        type: "select",
        order_by: "menu_order",
        has_archives: false,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/attributes/4"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/attributes"
            }
          ]
        }
      },
      "5": {
        id: 5,
        name: "\u0426\u0432\u0435\u0442",
        slug: "pa_tcvet",
        type: "select",
        order_by: "menu_order",
        has_archives: false,
        _links: {
          self: [
            {
              href: "http://localhost/wp-json/wc/v3/products/attributes/5"
            }
          ],
          collection: [
            {
              href: "http://localhost/wp-json/wc/v3/products/attributes"
            }
          ]
        }
      }
    },
    requests: [
      {
        params: {
          per_page: 100
        },
        data: [
          1,
          3,
          4,
          5
        ],
        total: 4,
        totalPages: 1
      }
    ]
  },
  productsTermsBrands: {
    route_base: "products/attributes/1/terms",
    type: "productsTermsBrands",
    specific_params: {
      per_page: 100
    },
    apiType: "/wc/v3/",
    single_params: [],
    params: {
      per_page: 100
    },
    basedRequest: {
      route_base: "products/attributes/1/terms",
      type: "productsTermsBrands",
      apiType: "/wc/v3/"
    },
    items: {},
    requests: []
  },
  productsTermsMaterials: {
    route_base: "products/attributes/3/terms",
    type: "productsTermsMaterials",
    specific_params: {
      per_page: 100
    },
    apiType: "/wc/v3/",
    single_params: [],
    params: {
      per_page: 100
    },
    basedRequest: {
      route_base: "products/attributes/3/terms",
      type: "productsTermsMaterials",
      apiType: "/wc/v3/"
    },
    items: {},
    requests: []
  },
  productsTermsSizes: {
    route_base: "products/attributes/4/terms",
    type: "productsTermsSizes",
    specific_params: {
      per_page: 100
    },
    apiType: "/wc/v3/",
    single_params: [],
    params: {
      per_page: 100
    },
    basedRequest: {
      route_base: "products/attributes/4/terms",
      type: "productsTermsSizes",
      apiType: "/wc/v3/"
    },
    items: {},
    requests: []
  },
  productsTermsColors: {
    route_base: "products/attributes/5/terms",
    type: "productsTermsColors",
    specific_params: {
      per_page: 100
    },
    apiType: "/wc/v3/",
    single_params: [],
    params: {
      per_page: 100
    },
    basedRequest: {
      route_base: "products/attributes/5/terms",
      type: "productsTermsColors",
      apiType: "/wc/v3/"
    },
    items: {},
    requests: []
  },
  site: {
    returned: {
      description: "\u0415\u0449\u0451 \u043E\u0434\u0438\u043D \u0441\u0430\u0439\u0442 \u043D\u0430 WordPress",
      docTitle: "",
      loading: false,
      logo: false,
      name: "testsite",
      posts_per_page: "10",
      url: "http://localhost"
    }
  },
  menus: {
    returned: {
      top_header: [
        {
          id: 153,
          parent: "0",
          target: "",
          content: "8 800 770 09 90",
          title: "",
          url: "tel:88007700990"
        },
        {
          id: 154,
          parent: "0",
          target: "",
          content: "8 495 775 09 44",
          title: "",
          url: "tel:84957750944"
        },
        {
          id: 156,
          parent: "0",
          target: "",
          content: "Fashion-\u0431\u043B\u043E\u0433",
          title: "",
          url: "http://localhost/posts/"
        },
        {
          id: 157,
          parent: "0",
          target: "",
          content: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B",
          title: "",
          url: "http://localhost/posts/"
        },
        {
          id: 158,
          parent: "0",
          target: "",
          content: "\u0410\u043A\u0446\u0438\u0438 \u0438 \u043D\u043E\u0432\u043E\u0441\u0442\u0438",
          title: "",
          url: "http://localhost/posts/"
        },
        {
          id: 159,
          parent: "0",
          target: "",
          content: "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043F\u043E \u0432\u0441\u0435\u0439 \u0420\u043E\u0441\u0441\u0438\u0438",
          title: "",
          url: "http://localhost/posts/"
        },
        {
          id: 160,
          parent: "0",
          target: "",
          content: "\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B",
          title: "",
          url: "http://localhost/posts/"
        }
      ],
      main_category: [
        {
          id: 153,
          parent: "0",
          target: "",
          content: "8 800 770 09 90",
          title: "",
          url: "tel:88007700990"
        },
        {
          id: 154,
          parent: "0",
          target: "",
          content: "8 495 775 09 44",
          title: "",
          url: "tel:84957750944"
        },
        {
          id: 156,
          parent: "0",
          target: "",
          content: "Fashion-\u0431\u043B\u043E\u0433",
          title: "",
          url: "http://localhost/posts/"
        },
        {
          id: 157,
          parent: "0",
          target: "",
          content: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B",
          title: "",
          url: "http://localhost/posts/"
        },
        {
          id: 158,
          parent: "0",
          target: "",
          content: "\u0410\u043A\u0446\u0438\u0438 \u0438 \u043D\u043E\u0432\u043E\u0441\u0442\u0438",
          title: "",
          url: "http://localhost/posts/"
        },
        {
          id: 159,
          parent: "0",
          target: "",
          content: "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043F\u043E \u0432\u0441\u0435\u0439 \u0420\u043E\u0441\u0441\u0438\u0438",
          title: "",
          url: "http://localhost/posts/"
        },
        {
          id: 160,
          parent: "0",
          target: "",
          content: "\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B",
          title: "",
          url: "http://localhost/posts/"
        }
      ],
      banners: []
    }
  },
  filter: {
    returned: {
      minCost: null,
      maxCost: null,
      params: {
        page: 1,
        category: null,
        min_price: 1e3,
        max_price: 1e6,
        orderAndOrderBy: {
          id: 0,
          name: "\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
          orderby: "",
          order: ""
        },
        pa_brand: {
          id: 1,
          options: []
        },
        pa_material: {
          id: 3,
          options: []
        },
        pa_razmer: {
          id: 4,
          options: []
        },
        pa_tcvet: {
          id: 5,
          options: []
        }
      },
      defaultValues: {
        sort: [
          {
            id: 0,
            name: "\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
            orderby: "",
            order: ""
          },
          {
            id: 1,
            name: "\u041F\u043E \u0446\u0435\u043D\u0435, \u043F\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430\u043D\u0438\u044E",
            orderby: "price",
            order: "asc"
          },
          {
            id: 2,
            name: "\u041F\u043E \u0446\u0435\u043D\u0435, \u043F\u043E \u0443\u0431\u044B\u0432\u0430\u043D\u0438\u044E",
            orderby: "price",
            order: "desc"
          },
          {
            id: 3,
            name: "\u041F\u043E \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u043E\u0441\u0442\u0438",
            orderby: "popularity",
            order: "asc"
          },
          {
            id: 4,
            name: "\u041F\u043E \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0443",
            orderby: "rating",
            order: "asc"
          }
        ]
      }
    }
  }
};
const __VUE_WORDPRESS__ = {
  routing,
  state: state$2
};
function setNonceToken(obj = {}) {
  let nonceToken = Cookies.get("nonce-token");
  if (!nonceToken) {
    throw "Nonce token undefined";
  }
  obj["Nonce"] = nonceToken;
  return obj;
}
function findAllPositions(str, separator) {
  let stop = false;
  let pos = 0;
  let foundPositions = [];
  while (true) {
    let foundPos = str.indexOf(separator, pos);
    if (foundPos == -1 && !stop) {
      foundPositions.push(str.length);
      stop = true;
    } else {
      foundPositions.push(foundPos);
      pos = foundPos + 1;
    }
    if (stop)
      break;
  }
  return foundPositions;
}
function separateStringByArrayPositions(str, foundPositions) {
  let subStrs = [];
  let start = 0;
  for (let index = 0; index < foundPositions.length; index++) {
    let end = foundPositions[index];
    let substr = str.slice(start, end);
    subStrs.push(substr);
    start += substr.length + 1;
  }
  return subStrs;
}
function createNewDate(value) {
  let separator = value.indexOf("T");
  let yearMonthDate = value.slice(0, separator);
  let hoursMinutesSeconds = value.slice(separator + 1);
  yearMonthDate = separateStringByArrayPositions(
    yearMonthDate,
    findAllPositions(yearMonthDate, "-")
  );
  hoursMinutesSeconds = separateStringByArrayPositions(
    hoursMinutesSeconds,
    findAllPositions(hoursMinutesSeconds, ":")
  );
  return new Date(...yearMonthDate, ...hoursMinutesSeconds);
}
function VUE_WP_INSTANCE() {
  return __VUE_WORDPRESS__;
}
const items$1 = VUE_WP_INSTANCE().state.menus.returned;
const menusModule = {
  namespaced: true,
  state: () => items$1,
  getters: {
    menu: (state2) => ({ name }) => {
      return state2.menus[name];
    }
  }
};
const items = VUE_WP_INSTANCE().state.site.returned;
const siteModule = {
  namespaced: true,
  state: () => items,
  getters: {
    loading: (state2) => () => {
      return state2.site.loading;
    }
  }
};
const instance$f = VUE_WP_INSTANCE().state.pages;
const pagesModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$f.basedRequest.apiType,
      type: instance$f.basedRequest.type,
      route_base: instance$f.basedRequest.route_base,
      params: instance$f.params,
      single_params: instance$f.single_params
    },
    requests: instance$f.requests,
    settings: instance$f.settings,
    items: instance$f.items
  }),
  getters: {
    menu: (state2) => ({ name }) => {
      return state2.menus[name];
    }
  }
};
const instance$e = VUE_WP_INSTANCE().state.banners;
const bannersModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$e.basedRequest.apiType,
      type: instance$e.basedRequest.type,
      route_base: instance$e.basedRequest.route_base,
      params: Object.assign({}, instance$e.params),
      slug: null
    },
    requests: instance$e.requests,
    settings: instance$e.settings,
    items: instance$e.items
  }),
  getters: {},
  mutations: {
    setBannerCategoriesIds(state2, value) {
      state2.basedRequest.params.banner_categories = value;
    }
  }
};
const instance$d = VUE_WP_INSTANCE().state.media;
const mediaModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$d.basedRequest.apiType,
      type: instance$d.basedRequest.type,
      route_base: instance$d.basedRequest.route_base,
      params: Object.assign({}, instance$d.params)
    },
    requests: instance$d.requests,
    settings: instance$d.settings,
    items: instance$d.items
  })
};
const instance$c = VUE_WP_INSTANCE().state.customers;
const customersModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$c.basedRequest.apiType,
      type: instance$c.basedRequest.type,
      route_base: instance$c.basedRequest.route_base,
      slug: null
    },
    requests: instance$c.requests,
    settings: instance$c.settings,
    items: instance$c.items
  }),
  getters: {},
  mutations: {}
};
const instance$b = VUE_WP_INSTANCE().state.orders;
const ordersModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$b.basedRequest.apiType,
      type: instance$b.basedRequest.type,
      route_base: instance$b.basedRequest.route_base,
      slug: null
    },
    requests: instance$b.requests,
    settings: instance$b.settings,
    items: instance$b.items
  }),
  getters: {},
  mutations: {}
};
const instance$a = VUE_WP_INSTANCE().state.productsCategories;
const productsCategoriesModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$a.basedRequest.apiType,
      type: instance$a.basedRequest.type,
      route_base: instance$a.basedRequest.route_base,
      params: Object.assign({}, instance$a.params)
    },
    requests: instance$a.requests,
    settings: instance$a.settings,
    items: instance$a.items
  }),
  getters: {},
  mutations: {}
};
const instance$9 = VUE_WP_INSTANCE().state.products;
const productsModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$9.basedRequest.apiType,
      type: instance$9.basedRequest.type,
      route_base: instance$9.basedRequest.route_base,
      params: Object.assign({}, instance$9.params),
      preparedParams: {},
      showLoading: true
    },
    requests: instance$9.requests,
    items: instance$9.items,
    itemsPaginated: {},
    totalPages: null,
    total: null
  }),
  getters: {
    filtredProducts: (state2, getters2, rootState, rootGetters) => {
      let items2 = [];
      if (!isEmpty(state2.itemsPaginated) && state2.itemsPaginated.hasOwnProperty(state2.basedRequest.params.page)) {
        const ids = state2.itemsPaginated[state2.basedRequest.params.page];
        items2 = ids.map((el) => state2.items[el]);
      }
      if (!isEmpty(items2))
        ;
      return items2;
    },
    filteredProductAttributes: (state2, getters2, rootState, rootGetters) => ({ requestAttributes, item }) => {
      let confirmed = true;
      let filter = {};
      requestAttributes:
        for (const reqAttrKey in requestAttributes) {
          if (Object.hasOwnProperty.call(requestAttributes, reqAttrKey)) {
            const reqAttrObject = requestAttributes[reqAttrKey];
            for (let i = 0; i < item.attributes.length; i++) {
              const itemAtrrObject = item.attributes[i];
              if (itemAtrrObject.id == reqAttrObject.id) {
                for (let index = 0; index < itemAtrrObject.options.length; index++) {
                  const itemOption = itemAtrrObject.options[index];
                  for (let index2 = 0; index2 < reqAttrObject.options.length; index2++) {
                    const inputOption = reqAttrObject.options[index2];
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
    procentPriceSale: (state2) => (product) => {
      return Math.round(
        100 - product.sale_price / product.regular_price * 100
      );
    },
    singleProductAttribute: (state2) => ({ productId, attrId }) => {
      var _a, _b;
      return (_b = (_a = state2.items) == null ? void 0 : _a[productId]) == null ? void 0 : _b.attributes.find((i) => i.id == attrId);
    }
  },
  mutations: {
    setProductsParams(state2, filterParams) {
      for (const key in filterParams) {
        const neastedValue = filterParams[key];
        if (typeof neastedValue === "object" && !neastedValue.hasOwnProperty("options")) {
          for (const neastedValueKey in neastedValue) {
            if (Object.hasOwnProperty.call(neastedValue, neastedValueKey)) {
              const element = neastedValue[neastedValueKey];
              if (state2.basedRequest.params.hasOwnProperty(neastedValueKey)) {
                state2.basedRequest.params[neastedValueKey] = element;
              }
            }
          }
        }
        if (state2.basedRequest.params.hasOwnProperty(key)) {
          if (typeof neastedValue === "number" || typeof neastedValue === "string" || typeof neastedValue === "array") {
            state2.basedRequest.params[key] = neastedValue;
          } else if (typeof neastedValue === "object") {
            if (neastedValue.hasOwnProperty("options")) {
              state2.basedRequest.params[key] = neastedValue.options.map(
                (object) => object.id
              );
            }
          }
        }
      }
      for (const key in filterParams) {
        const filterParam = filterParams[key];
        if (typeof filterParam === "number" || typeof filterParam === "string") {
          state2.basedRequest.preparedParams[key] = filterParam;
        } else {
          state2.basedRequest.preparedParams[key] = cloneDeep(filterParam);
        }
      }
    },
    setTotalPages(state2, value) {
      state2.totalPages = value;
    },
    setTotal(state2, value) {
      state2.total = value;
    },
    setProductsCategoryId(state2, value) {
      state2.basedRequest.params.category = value;
    },
    setItemsPaginated(state2, { pageNumber, value }) {
      state2.itemsPaginated[pageNumber] = value;
    },
    unsetItemsPaginated(state2) {
      state2.itemsPaginated = {};
    }
  },
  actions: {
    filterAndPaginate: ({ state: state2, dispatch, commit, getters: getters2, rootGetters }) => {
      const preparedParams = state2.basedRequest.preparedParams;
      let requestAttributes = {};
      let items2 = [];
      var confirmed = false;
      for (const key in preparedParams) {
        if (Object.hasOwnProperty.call(preparedParams, key)) {
          const param = preparedParams[key];
          if (key.match(/^pa_[a-z]+/) && param.options.length) {
            requestAttributes[key] = param;
          }
        }
      }
      for (const key in state2.items) {
        if (Object.hasOwnProperty.call(state2.items, key)) {
          let item = state2.items[key];
          item.categories.forEach((category) => {
            if (category.id == preparedParams.category) {
              confirmed = true;
            }
          });
          if (item.price > preparedParams.min_price && item.price < preparedParams.max_price && confirmed) {
            confirmed = true;
          } else {
            confirmed = false;
          }
          if (!isEmpty(requestAttributes) && !isEmpty(item.attributes) && confirmed) {
            confirmed = getters2.filteredProductAttributes({
              requestAttributes,
              item
            });
          }
          if (confirmed) {
            items2.push(item);
          }
        }
      }
      commit("unsetItemsPaginated");
      let pre_page = state2.basedRequest.params.per_page;
      let pageCount = Math.ceil(items2.length / pre_page);
      var itemMarker = 0;
      for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
        commit("setItemsPaginated", {
          pageNumber,
          value: items2.slice(itemMarker, itemMarker + pre_page).map((i) => i.id)
        });
        itemMarker = itemMarker + pre_page;
      }
    },
    changePage({ state: state2, dispatch, commit, getters: getters2, rootGetters }, page) {
      let value = Number(page);
      const pushObj = { name: "" };
      if (value != 1)
        pushObj["route_base"] = { page: value };
      let type = state2.basedRequest.type;
      commit("SET_PAGE", { type, value }, { root: true });
      return pushObj;
    },
    updateRequestParams({ dispatch, commit, getters: getters2, rootGetters }) {
      commit("setProductsParams", rootGetters["filter/params"]);
    }
  }
};
const instance$8 = VUE_WP_INSTANCE().state.productsAttributes;
const productsAttributesModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$8.basedRequest.apiType,
      type: instance$8.basedRequest.type,
      route_base: instance$8.basedRequest.route_base,
      params: Object.assign({}, instance$8.params)
    },
    requests: instance$8.requests,
    settings: instance$8.settings,
    items: instance$8.items
  }),
  getters: {
    attributesSlugs(state2) {
      const slugs = [];
      for (let key in state2.items) {
        if (Object.hasOwnProperty.call(state2.items, key)) {
          const element = state2.items[key];
          slugs.push(element.slug);
        }
      }
      return slugs;
    }
  }
};
const instance$7 = VUE_WP_INSTANCE().state.productsTermsBrands;
const productsTermsBrandsModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$7.basedRequest.apiType,
      type: instance$7.basedRequest.type,
      route_base: instance$7.basedRequest.route_base,
      params: Object.assign({}, instance$7.params)
    },
    requests: instance$7.requests,
    settings: instance$7.settings,
    items: instance$7.items || {}
  })
};
const instance$6 = VUE_WP_INSTANCE().state.productsTermsMaterials;
const productsTermsMaterialsModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$6.basedRequest.apiType,
      type: instance$6.basedRequest.type,
      route_base: instance$6.basedRequest.route_base,
      params: Object.assign({}, instance$6.params)
    },
    requests: instance$6.requests,
    settings: instance$6.settings,
    items: instance$6.items
  })
};
const instance$5 = VUE_WP_INSTANCE().state.productsTermsColors;
const productsTermsColorsModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$5.basedRequest.apiType,
      type: instance$5.basedRequest.type,
      route_base: instance$5.basedRequest.route_base,
      params: Object.assign({}, instance$5.params)
    },
    requests: instance$5.requests,
    settings: instance$5.settings,
    items: instance$5.items || {}
  })
};
const instance$4 = VUE_WP_INSTANCE().state.productsTermsSizes;
const productsTermsSizesModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$4.basedRequest.apiType,
      type: instance$4.basedRequest.type,
      route_base: instance$4.basedRequest.route_base,
      params: Object.assign({}, instance$4.params)
    },
    requests: instance$4.requests,
    settings: instance$4.settings,
    items: instance$4.items
  })
};
const instance$3 = VUE_WP_INSTANCE().state.filter.returned;
const filterModule = {
  namespaced: true,
  state: () => ({
    params: Object.assign({}, instance$3.params),
    defaultValues: Object.assign({}, instance$3.defaultValues)
  }),
  getters: {
    params(state2, getters2, rootState) {
      return state2.params;
    },
    sortDefault: () => (one, two) => {
      let dateOne = createNewDate(one.date_created).getTime();
      let dateTwo = createNewDate(two.date_created).getTime();
      if (dateOne > dateTwo)
        return -1;
      if (dateOne < dateTwo)
        return 1;
      return 0;
    },
    sortPriceMinToMax: (state2, getters2, rootState) => (one, two) => {
      if (one.price < two.price)
        return -1;
      if (one.price > two.price)
        return 1;
      return 0;
    },
    sortPriceMaxToMin: () => (one, two) => {
      if (one.price < two.price)
        return 1;
      if (one.price > two.price)
        return -1;
      return 0;
    }
  },
  mutations: {
    setCategoryId(state2, value) {
      state2.params.category = value;
    },
    setMinPrice(state2, value) {
      state2.params.min_price = value;
    },
    setMaxPrice(state2, value) {
      state2.params.max_price = value;
    },
    setMinCost(state2, value) {
      state2.minCost = value;
    },
    setMaxCost(state2, value) {
      state2.maxCost = value;
    },
    setAttributeTerms(state2, { type, value }) {
      const foundItem = state2.params[type].options.find((el, index, array) => {
        let condition = el.id === value.id;
        if (condition)
          array.splice(index, 1);
        return condition;
      });
      if (foundItem)
        return;
      else
        state2.params[type].options.push(value);
    },
    setOrderAndOrderBy(state2, value) {
      state2.params.orderAndOrderBy = value;
    },
    setPage(state2, value) {
      state2.params.page = Number(value);
    },
    unsetDefaultAttributeOptions(state2, atrrSlug) {
      state2.params[atrrSlug].options = [];
    },
    setDefaultPrices(state2) {
      state2.params.min_price = state2.minCost;
      state2.params.max_price = state2.maxCost;
    }
  },
  actions: {
    setDefaultFilter({ state: state2, commit, getters: getters2, rootGetters }) {
      commit("setDefaultPrices");
      const attrs = rootGetters["productsAttributes/attributesSlugs"];
      attrs.forEach((element) => {
        commit("unsetDefaultAttributeOptions", element);
      });
    },
    validateValues({ state: state2, commit, getters: getters2, rootGetters }) {
      if (state2.params.min_price < state2.minCost) {
        commit("setMinPrice", state2.minCost);
      }
      if (state2.params.max_price > state2.maxCost) {
        commit("setMaxPrice", state2.maxCost);
      }
    }
  }
};
const instance$2 = VUE_WP_INSTANCE().state.cart;
const cartModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$2.basedRequest.apiType,
      type: instance$2.basedRequest.type,
      route_base: instance$2.basedRequest.route_base
    },
    store: {},
    aditionalStore: {}
  }),
  getters: {},
  actions: {
    async getCart({ state: state2, getters: getters2, commit, dispatch }) {
      try {
        const requested = await dispatch(
          "mainFetchRequest",
          {
            route_base: state2.basedRequest.route_base,
            apiType: state2.basedRequest.apiType,
            maintainJWT: true
          },
          { root: true }
        );
        const headers = requested.response.headers;
        Cookies.set("nonce-token", headers.nonce);
        commit("setAditionalStoreProperty", {
          key: "customer_id",
          value: Number(headers["user-id"])
        });
        commit("setCart", requested.response.data);
        return requested;
      } catch (error) {
        console.log(error);
      }
    },
    async updateCart({ state: state2, getters: getters2, commit, dispatch }, { route_base, config }) {
      try {
        config.headers = setNonceToken();
        const requested = await dispatch(
          "mainFetchRequest",
          {
            apiType: state2.basedRequest.apiType,
            route_base,
            config,
            method: "post",
            maintainJWT: true,
            reqiredJWT: false
          },
          { root: true }
        );
        commit("setCart", requested.response.data);
        return requested;
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    setCart(state2, value) {
      state2.store = value;
    },
    setAditionalStoreProperty(state2, { key, value }) {
      state2.aditionalStore[key] = value;
    }
  }
};
const instance$1 = VUE_WP_INSTANCE().state.checkout;
const checkoutModule = {
  namespaced: true,
  state: () => ({
    basedRequest: {
      apiType: instance$1.basedRequest.apiType,
      type: instance$1.basedRequest.type,
      route_base: instance$1.basedRequest.route_base
    }
  }),
  getters: {},
  actions: {},
  mutations: {}
};
const instance = VUE_WP_INSTANCE().state.auth;
const authModule = {
  namespaced: true,
  state: () => ({
    userAuth: false,
    basedRequest: {
      apiType: instance.basedRequest.apiType,
      type: instance.basedRequest.type,
      route_base: instance.basedRequest.route_base,
      params: Object.assign({}, instance.params)
    }
  }),
  getters: {},
  actions: {
    updateUserAuth({ dispatch, commit, getters: getters2 }) {
      commit("setUserAuth", Boolean(Cookies.get("jwt-token")));
    },
    login({ dispatch, commit, getters: getters2 }, token) {
      Cookies.set("jwt-token", token);
      commit("setUserAuth", true);
    },
    logout({ dispatch, commit, getters: getters2 }) {
      Cookies.remove("jwt-token");
      commit("setUserAuth", false);
    }
  },
  mutations: {
    setUserAuth(state2, value) {
      state2.userAuth = value;
    }
  }
};
const getters = {
  total: (state2, getters2) => ({ type, params }, property) => {
    let request = getters2.request({ type, params });
    return request ? request[property] : 0;
  },
  settings: (state2, getters2) => (type) => {
    return state2[type]["settings"];
  },
  request: (state2) => ({ type, params }) => {
    return state2[type].requests.find((req) => {
      return isEqual(req.params, params);
    });
  },
  requestByParam: (state2) => ({ type, params }, { param, value }) => {
    return state2[type].requests.find((req) => {
      return req.params[param] == value;
    });
  },
  itemBySlug: (state2) => ({ type, slug }) => {
    let item;
    for (let id in state2[type]["items"]) {
      if (state2[type]["items"][id].slug === slug) {
        item = state2[type]["items"][id];
      }
    }
    return item;
  },
  itemById: (state2, getters2) => ({ type, id }) => {
    let item;
    item = state2[type]["items"][id];
    return item;
  },
  requestedItems: (state2, getters2) => ({ type, params }) => {
    let request = getters2.request({ type, params });
    return request ? request.data.map((id) => state2[type]["items"][id]) : {};
  },
  itemsBased: (state2, getters2) => ({ type }) => {
    return state2[type]["items"] || [];
  },
  itemsMatchedOneProperty: (state2, getters2) => ({ type }, params) => {
    let items2 = [];
    let keys = Object.keys(params);
    for (const key in state2[type]["items"]) {
      if (Object.hasOwnProperty.call(state2[type]["items"], key)) {
        const element = state2[type]["items"][key];
        keys.forEach((key2) => {
          if (element[key2] == params[key2]) {
            items2.push(element);
          }
        });
      }
    }
    return items2;
  },
  itemsMatchedByCallback: (state2, getters2) => ({ type }, params, callback) => {
    let items2 = [];
    let approved = false;
    let keys = Object.keys(params);
    for (const key in state2[type]["items"]) {
      if (Object.hasOwnProperty.call(state2[type]["items"], key)) {
        const element = state2[type]["items"][key];
        let callbackResult2 = callback(element, keys, params, items2, approved);
        if (callbackResult2 === true)
          items2.push(element);
      } else if (callbackResult === void 0) {
        break;
      }
    }
    return items2;
  },
  itemsInclude: (state2, getters2) => ({ type, params }, includeArray = []) => {
    let items2 = {};
    for (const key in state2[type]["items"]) {
      if (Object.hasOwnProperty.call(state2[type]["items"], key)) {
        const element = state2[type]["items"][key];
        includeArray.forEach((include_id) => {
          if (element.id == include_id) {
            items2[element.id] = element;
          }
        });
      }
    }
    return items2 || {};
  },
  mapItemsByKey: (state2, getters2) => ({ type, params }, inputKey) => {
    let ids = [];
    for (const key in state2[type]["items"]) {
      if (Object.hasOwnProperty.call(state2[type]["items"], key)) {
        const element = state2[type]["items"][key];
        ids.push(element[inputKey]);
      }
    }
    return ids || [];
  },
  requestByItemParam: (state2, getters2) => ({ type, param, value }) => {
    return state2[type].requests.find((req) => req.params[param] == value);
  }
};
const mutations = {
  ADD_SETTINGS(state2, { type, settings }) {
    state2[type].settings = settings;
  },
  SET_LOADING(state2, loading) {
    state2.site.loading = loading;
  },
  SET_DOC_TITLE(state2, title) {
    state2.site.docTitle = title;
  },
  ADD_ITEM(state2, { type, item }) {
    if (item && type && !state2[type]["items"].hasOwnProperty(item.id)) {
      state2[type]["items"][item.id] = item;
    }
  },
  ADD_ITEMS_IDS(state2, { type, ids }) {
    state2[type].request.optionalParams.exclude = [...state2[type].request.optionalParams.exclude, ...ids];
  },
  ADD_REQUEST(state2, { type, request }) {
    state2[type].requests.push(request);
  },
  SET_PAGE(state2, { type, value }) {
    state2[type].basedRequest.params.page = value;
  },
  SET_INCLUDE(state2, { type, value }) {
    state2[type].basedRequest.params.include = value;
  },
  SET_PARAM(state2, { type, paramKey, slug }) {
    state2[type].basedRequest.params[paramKey] = slug;
  },
  SET_SINGLE_PARAM(state2, { type, paramKey, slug }) {
    state2[type].basedRequest.single_params[paramKey] = slug;
  },
  SET_VALUE(state2, { type, key, value }) {
    if (type) {
      state2[type][key] = value;
    } else {
      state2[key] = value;
    }
  }
};
let { url: url$1 } = VUE_WP_INSTANCE().routing.returned;
url$1 = new URL(url$1);
url$1 = url$1.protocol + "//" + url$1.hostname;
const defaultAjax = (apiType = "/wp/v2/") => axios.create({
  baseURL: `${url$1}/wp-json${apiType}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 2e4
});
async function mainFetch({
  id = null,
  route_base = "",
  apiType = "/wp/v2/",
  method = "get",
  config = {},
  data = {}
}) {
  let showProgress = config.hasOwnProperty("onDownloadProgress") && config.onDownloadProgress;
  try {
    if (showProgress) {
      config.onDownloadProgress = (progressEvent) => {
        let percentCompleted = Math.floor(
          progressEvent.loaded / progressEvent.total * 100
        );
        store.commit("common/setProgress", percentCompleted);
        store.commit("common/setProgressLoad", {
          visible: true,
          percent: percentCompleted === Infinity ? 100 : percentCompleted
        });
      };
    }
    const response = await defaultAjax(apiType)[method](
      `/${route_base}/${id !== null ? id : ""}`,
      method === "get" ? config : data,
      method === "get" ? void 0 : config
    );
    return response;
  } catch (error) {
    console.log("Error in method 'mainFetch'", error);
  } finally {
    if (showProgress) {
      setTimeout(() => {
        store.commit("common/setProgressLoad", {
          visible: false,
          percent: 0
        });
      }, 500);
    }
  }
}
const actions = {
  updateDocTitle({ state: state2, commit }, { parts = [], sep = " \u2013 " }) {
    commit("SET_DOC_TITLE", parts.join(sep));
    document.title = state2.site.docTitle;
  },
  async getSingleById({ getters: getters2, commit }, { basedRequest: { route_base, type, apiType }, params }) {
    if (getters2.itemById({ type, id: params.id }))
      return;
    let request;
    let response;
    try {
      response = await mainFetch({
        id: params.id,
        route_base,
        config: { params },
        apiType
      });
      commit("ADD_ITEM", { type, item: response.data });
    } catch (error) {
      console.log(error, type);
    }
    return { request, response };
  },
  async getSingleBySlug({ state: state2, getters: getters2, commit }, { basedRequest: { route_base, type, apiType }, params }) {
    if (getters2.itemBySlug({ type, slug: params.slug }))
      return;
    let request;
    let response;
    try {
      response = await mainFetch({ route_base, config: { params }, apiType });
      commit("ADD_ITEM", { type, item: response.data[0] });
    } catch (error) {
      console.log(error, type);
    }
    return { request, response };
  },
  async getItems({ state: state2, getters: getters2, commit }, { route_base, type, params, apiType, onDownloadProgress = null }) {
    let response;
    let request = getters2.request({ type, params });
    params = pickBy(params, identity);
    const config = {
      onDownloadProgress,
      params
    };
    if (!request) {
      try {
        response = await mainFetch({ route_base, config, apiType });
        if (!response) {
          throw "Response Undefined";
        }
        response.data.forEach((item) => commit("ADD_ITEM", { type, item }));
        if (state2[type].hasOwnProperty("requests")) {
          params = cloneDeep(params);
          let ids = response.data.map((i) => i.id);
          request = {
            params,
            total: Number(response.headers["x-wp-total"]),
            totalPages: Number(response.headers["x-wp-totalpages"]),
            data: ids
          };
          commit("ADD_REQUEST", {
            type,
            request
          });
        }
      } catch (error) {
        console.log(error, type);
      }
    } else {
      console.log("\u041F\u043E\u043F\u044B\u0442\u043A\u0430 \u0432\u044B\u0437\u043E\u0432\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u0441 \u0442\u0430\u043A\u0438\u043C\u0438 \u0436\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430\u043C\u0438");
    }
    return { request, response };
  },
  async getItemsBased({ getters: getters2, commit }, { route_base, type, params, apiType }) {
    try {
      const response = await mainFetch({ route_base, params, apiType });
      response.data.forEach((item) => commit("ADD_ITEM", { type, item }));
    } catch (error) {
      console.log(error, type);
    }
  },
  async mainFetchRequest({ getters: getters2, commit, rootState }, {
    route_base,
    apiType,
    method,
    data,
    config = {},
    maintainJWT = false,
    reqiredJWT = false
  }) {
    let response;
    let request;
    let JWTToken;
    try {
      if (reqiredJWT && maintainJWT === false) {
        throw '\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0444\u043B\u0430\u0433\u0430 "reqiredJWT" \u043F\u043E\u0434\u0440\u0430\u0437\u0443\u043C\u0435\u0432\u0430\u0435\u0442 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0443 maintainJWT = true';
      }
      if (maintainJWT) {
        JWTToken = Cookies.get("jwt-token");
        if (JWTToken) {
          if (!config.hasOwnProperty("headers")) {
            config["headers"] = {};
          }
          config.headers["Authorization"] = "Bearer " + JWTToken;
        } else {
          if (reqiredJWT) {
            throw "\u0414\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C \u0442\u043E\u043A\u0435\u043D";
          }
        }
      }
      response = await mainFetch({ route_base, config, apiType, method, data });
    } catch (error) {
      console.log(error, { route_base, config, apiType, method, data });
    }
    return { request, response };
  }
};
const state$1 = {};
const store = createStore({
  modules: {
    common: commonModule,
    menus: menusModule,
    site: siteModule,
    pages: pagesModule,
    banners: bannersModule,
    media: mediaModule,
    customers: customersModule,
    orders: ordersModule,
    productsCategories: productsCategoriesModule,
    productsAttributes: productsAttributesModule,
    products: productsModule,
    productsTermsBrands: productsTermsBrandsModule,
    productsTermsMaterials: productsTermsMaterialsModule,
    productsTermsColors: productsTermsColorsModule,
    productsTermsSizes: productsTermsSizesModule,
    filter: filterModule,
    auth: authModule,
    cart: cartModule,
    checkout: checkoutModule
  },
  state: state$1,
  getters,
  mutations,
  actions
});
const { permalink_structure, category_base, tag_base } = VUE_WP_INSTANCE().routing.returned;
const tagToParam = {
  author: ":author",
  postname: ":slug",
  post_id: ":id(\\d+)",
  category: ":cat1/:cat2?/:cat3?",
  year: ":year(\\d{4})",
  monthnum: ":month(\\d{2})",
  day: ":day(\\d{2})",
  hour: ":hour(\\d{2})",
  minute: ":min(\\d{2})",
  second: ":sec(\\d{2})"
};
const defaultTaxonomyBase = permalink_structure.slice(0, permalink_structure.indexOf("%"));
const paginateParam = ":page(page/\\d+)?";
const paths = {
  authorArchive: `${defaultTaxonomyBase}author/:slug/${paginateParam}`,
  categoryArchive: category_base ? `/${category_base}/${tagToParam.category}/${paginateParam}` : `${defaultTaxonomyBase}category/${tagToParam.category}/${paginateParam}`,
  dateArchive: `${defaultTaxonomyBase}:year(\\d{4})/:month(\\d{2})?/:day(\\d{2})?/${paginateParam}`,
  single: permalink_structure.replace(/\%[a-z_]+\%/g, (match) => tagToParam[match.slice(1, -1)]).slice(0, -1),
  tagArchive: tag_base ? `/${tag_base}/:slug/${paginateParam}` : `${defaultTaxonomyBase}tag/:slug/${paginateParam}`,
  postsPage: (slug) => slug ? `/${slug}/${paginateParam}` : `/${paginateParam}`
};
function pageFromPath(path) {
  let p = path.split("/").filter((i) => i);
  if (p.length > 1 && p[p.length - 2] === "page") {
    console.log(parseInt(p[p.length - 1]));
    return parseInt(p[p.length - 1]);
  } else {
    return 1;
  }
}
const PaginationNode_vue_vue_type_style_index_0_scoped_206c2fad_lang = "";
const _sfc_main$J = {
  props: {
    type: {
      type: String,
      reqired: true
    }
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      totalPages: (state2) => state2.products.totalPages,
      currentPage: (state2) => state2.products.basedRequest.params.page,
      loading: (state2) => state2.site.loading
    })
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      changePage: "products/changePage"
    }),
    async changePageProducts(page) {
      this.$router.push(await this.changePage(page));
    }
  }
};
function _sfc_ssrRender$J(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_loading_node = resolveComponent("loading-node");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "pagination" }, _attrs))} data-v-206c2fad>`);
  _push(ssrRenderComponent(_component_loading_node, { loading: _ctx.loading }, null, _parent));
  _push(`<!--[-->`);
  ssrRenderList(_ctx.totalPages, (page, index) => {
    _push(`<button class="${ssrRenderClass(_ctx.currentPage == page ? "active" : "")}" data-v-206c2fad>${ssrInterpolate(page)}</button>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/PaginationNode.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const PaginationNode = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["ssrRender", _sfc_ssrRender$J], ["__scopeId", "data-v-206c2fad"]]);
const _sfc_main$I = {
  name: "Home",
  components: {
    PaginationNode
  },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      request: {
        type: "posts",
        params: {
          per_page: this.$store.state.site.posts_per_page,
          page: this.page
        },
        showLoading: true
      },
      totalPages: 0
    };
  },
  computed: {
    posts() {
      return this.$store.getters.requestedItems(this.request);
    }
  },
  methods: {
    getPosts() {
      return this.$store.dispatch("getItems", this.request);
    },
    setTotalPages() {
      this.totalPages = this.$store.getters.totalPages(this.request);
    }
  },
  watch: {
    page() {
      this.request.params.page = this.page;
      this.getPosts();
    }
  },
  created() {
    this.getPosts().then(() => {
      this.setTotalPages();
    });
  }
};
function _sfc_ssrRender$I(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_pagination_node = resolveComponent("pagination-node");
  const _component_loading_node = resolveComponent("loading-node");
  _push(`<main${ssrRenderAttrs(_attrs)}><section style="${ssrRenderStyle($options.posts.length ? null : { display: "none" })}">`);
  if ($data.totalPages > 1) {
    _push(ssrRenderComponent(_component_pagination_node, {
      total: $data.totalPages,
      current: $props.page
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</section>`);
  _push(ssrRenderComponent(_component_loading_node, {
    style: _ctx.$store.getters.loading ? null : { display: "none" }
  }, null, _parent));
  _push(`</main>`);
}
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/Posts.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const Posts = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["ssrRender", _sfc_ssrRender$I]]);
const ProductPricesNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$H = {
  components: {},
  props: {
    pricesObject: Object,
    customOptions: {
      type: Object,
      default: {
        percentSale: true,
        brackets: true
      }
    }
  },
  computed: {
    ...mapGetters({
      procentPriceSale: "products/procentPriceSale"
    }),
    ...mapState({}),
    haveSale() {
      var _a, _b, _c;
      if (((_a = this.pricesObject) == null ? void 0 : _a.sale_price) && ((_b = this.pricesObject) == null ? void 0 : _b.sale_price) !== ((_c = this.pricesObject) == null ? void 0 : _c.regular_price)) {
        return true;
      }
    }
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({})
  }
};
function _sfc_ssrRender$H(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a, _b;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-prices" }, _attrs))}>`);
  if ($options.haveSale && $props.customOptions.percentSale) {
    _push(`<div class="product-prices__procent-sale"><span>-${ssrInterpolate(_ctx.procentPriceSale($props.pricesObject))}%</span></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="product-prices__costs">`);
  if ($options.haveSale) {
    _push(`<div class="product-prices__sale-price">${ssrInterpolate((_a = $props.pricesObject) == null ? void 0 : _a.sale_price)}<span class="product-prices__currency"> \u20BD</span></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="${ssrRenderClass([$options.haveSale ? "" : "product-prices__regular-price_only", "product-prices__regular-price"])}">`);
  if ($props.customOptions.brackets) {
    _push(`<span>(</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(` ${ssrInterpolate((_b = $props.pricesObject) == null ? void 0 : _b.regular_price)}<span class="product-prices__currency"> \u20BD</span>`);
  if ($props.customOptions.brackets) {
    _push(`<span>)</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/product/ProductPricesNode.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const ProductPricesNode = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["ssrRender", _sfc_ssrRender$H]]);
const ProductNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$G = {
  components: {
    ProductPricesNode
  },
  props: {
    catalogType: {
      type: Boolean,
      default: true
    },
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      params: {
        id: this.$props.product.id,
        quantity: 1,
        variations: []
      },
      colorsRGBList: []
    };
  },
  computed: {
    ...mapGetters({
      itemsMatchedOneProperty: "itemsMatchedOneProperty",
      singleProductAttribute: "products/singleProductAttribute"
    }),
    ...mapState({
      colorsRequest: (state2) => state2.productsTermsColors.basedRequest
    })
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
    colorsRGB() {
      if (isEmpty(this.product))
        return;
      let colors = [];
      let productColorNames = this.product.attributes.find(
        (el) => el.id == 5
      ).options;
      productColorNames.forEach((element) => {
        let color = this.itemsMatchedOneProperty(
          { type: this.colorsRequest.type },
          { name: element }
        );
        colors.push(color);
      });
      colors.forEach((element) => {
        if (!isEmpty(element[0])) {
          let str = element[0].slug;
          let pos = str.lastIndexOf("-");
          str = str.slice(pos + 1);
          this.colorsRGBList.push(str);
        }
      });
    },
    brand(attrId) {
      var _a, _b, _c;
      return (_c = (_b = this.singleProductAttribute({ productId: (_a = this.product) == null ? void 0 : _a.id, attrId })) == null ? void 0 : _b.options) == null ? void 0 : _c[0];
    },
    sizes(attrId) {
      var _a, _b;
      return (_b = this.singleProductAttribute({ productId: (_a = this.product) == null ? void 0 : _a.id, attrId })) == null ? void 0 : _b.options;
    }
  },
  created() {
  },
  mounted() {
    this.colorsRGB();
  }
};
function _sfc_ssrRender$G(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_product_prices_node = resolveComponent("product-prices-node");
  _push(`<button${ssrRenderAttrs(mergeProps({
    class: ["product", $props.catalogType ? "catalog-type" : ""]
  }, _attrs))}><div class="product__body"><div class="product__image">`);
  if ($props.product.images[3]) {
    _push(`<img${ssrRenderAttr("src", $props.product.images[3].src)} alt="">`);
  } else {
    _push(`<!---->`);
  }
  if ($props.product.images[0]) {
    _push(`<img${ssrRenderAttr("src", $props.product.images[0].src)} alt="">`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="product__content"><div class="product__brand">${ssrInterpolate($options.brand(1))}</div><h3 class="product__title"><button>${ssrInterpolate($props.product.name)}</button></h3>`);
  _push(ssrRenderComponent(_component_product_prices_node, {
    class: "product__prices",
    pricesObject: $props.product
  }, null, _parent));
  _push(`</div><div class="product__actions"><button class="product__favorite icon-favorite"></button><ul class="product__colors"><!--[-->`);
  ssrRenderList($data.colorsRGBList, (color, index) => {
    _push(`<li class="product__color" style="${ssrRenderStyle({ background: `#${color}` })}"></li>`);
  });
  _push(`<!--]--></ul><ul class="product__sizes"><!--[-->`);
  ssrRenderList($options.sizes(4), (index, size) => {
    var _a;
    _push(`<li>${ssrInterpolate((_a = $options.sizes(4)) == null ? void 0 : _a[size])}</li>`);
  });
  _push(`<!--]--></ul></div></div></button>`);
}
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ProductNode.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const ProductNode = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["ssrRender", _sfc_ssrRender$G]]);
const ArrowsSliderNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$F = {
  props: {
    identificator: String
  },
  computed: {}
};
function _sfc_ssrRender$F(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "slider-arrows" }, _attrs))}><div class="${ssrRenderClass(`slider-arrows__arrow slider-arrows__arrow_prev ${$props.identificator}__arrow_prev icon-arrow`)}"></div><div class="${ssrRenderClass(`slider-arrows__arrow slider-arrows__arrow_next ${$props.identificator}__arrow_next icon-arrow`)}"></div></div>`);
}
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/sliders/ArrowsSliderNode.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const ArrowsSliderNode = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["ssrRender", _sfc_ssrRender$F]]);
const swiper_min = "";
const routeToCategoryMixin = {
  methods: {
    routeToCategory(category, parentCategorySlug) {
      if (isEmpty(category))
        return;
      if (category.parent == 0 && (parentCategorySlug === void 0 || parentCategorySlug === "rootCategories")) {
        return this.$router.push({
          name: "SingleCategory",
          params: { mainCategorySlug: category.slug }
        });
      } else {
        return this.$router.push({
          name: "SingleSubCategory",
          params: {
            mainCategorySlug: parentCategorySlug,
            categorySlug: category.slug
          }
        });
      }
    }
  }
};
const itemsLoadHandler = {
  data() {
    return {
      itemsLoaded: false
    };
  },
  computed: {
    ...mapGetters({}),
    ...mapState({})
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
    itemsLoadHandler(callback, quantity = 4) {
      let items2 = [];
      items2 = callback;
      if (isEmpty(items2)) {
        this.itemsLoaded = false;
        items2.length = quantity;
      } else {
        this.itemsLoaded = true;
      }
      return items2;
    }
  }
};
const SliderProductsNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$E = {
  inheritAttrs: false,
  components: {
    Swiper,
    SwiperSlide,
    ProductNode,
    ArrowsSliderNode
  },
  props: {
    productsCategoryId: String,
    title: String,
    breakpoints: Object
  },
  mixins: [itemsLoadHandler, routeToCategoryMixin],
  data() {
    return {
      defaultBreakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      itemById: "itemById",
      itemsMatchedByCallback: "itemsMatchedByCallback"
    }),
    ...mapState({
      productsRequest: (state2) => state2.products.basedRequest,
      productsCategoriesRequest: (state2) => state2.productsCategories.basedRequest
    }),
    products() {
      return this.itemsLoadHandler(
        this.itemsMatchedByCallback(
          this.productsRequest,
          { categories: this.productsCategoryId },
          function(product, keys, params, items2, approved) {
            keys.forEach((key) => {
              if (Array.isArray(product[key])) {
                product[key].forEach((category) => {
                  if (params[key] == category.id)
                    approved = true;
                });
              }
            });
            return approved;
          }
        )
      );
    },
    productsCategory() {
      return this.itemById(
        this.productsCategoriesRequest,
        this.productsCategoryId
      );
    },
    identificator() {
      if (!isEmpty(this.productsCategory)) {
        return this.productsCategory.slug;
      }
    },
    swiperBreakpoints() {
      return this.breakpoints === void 0 ? this.defaultBreakpoints : this.breakpoints;
    }
  },
  methods: {
    ...mapActions({
      getItems: "getItems"
    }),
    ...mapMutations({
      setProductsCategoryId: "products/setProductsCategoryId"
    })
  },
  created() {
    this.setProductsCategoryId(this.productsCategoryId);
    this.getItems(this.productsRequest);
  },
  setup() {
    const onSwiper = (swiper) => {
    };
    const onSlideChange = () => {
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Autoplay, FreeMode]
    };
  }
};
function _sfc_ssrRender$E(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_container_node = resolveComponent("container-node");
  const _component_arrows_slider_node = resolveComponent("arrows-slider-node");
  const _component_swiper = resolveComponent("swiper");
  const _component_swiper_slide = resolveComponent("swiper-slide");
  const _component_preload_wrap_node = resolveComponent("preload-wrap-node");
  const _component_product_node = resolveComponent("product-node");
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "slider-products" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_container_node, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="slider-products__body"${_scopeId}><div class="slider-products__title"${_scopeId}><button${_scopeId}>${ssrInterpolate($props.title)}</button></div><div class="slider-products__slider"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_arrows_slider_node, {
          style: _ctx.itemsLoaded ? null : { display: "none" },
          identificator: $options.identificator
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper, mergeProps(_ctx.$attrs, {
          loop: true,
          "slides-per-view": 2,
          "space-between": 20,
          onSwiper: $setup.onSwiper,
          onSlideChange: $setup.onSlideChange,
          navigation: {
            prevEl: `.${$options.identificator}__arrow_prev`,
            nextEl: `.${$options.identificator}__arrow_next`
          },
          modules: $setup.modules,
          breakpoints: $options.swiperBreakpoints
        }), {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              ssrRenderList($options.products, (product, index) => {
                _push3(ssrRenderComponent(_component_swiper_slide, { key: index }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_preload_wrap_node, {
                        targetPreloadElement: product ? false : true,
                        paddingBottom: product ? 0 : 146
                      }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            if (product) {
                              _push5(ssrRenderComponent(_component_product_node, {
                                product,
                                catalogType: false
                              }, null, _parent5, _scopeId4));
                            } else {
                              _push5(`<!---->`);
                            }
                          } else {
                            return [
                              product ? (openBlock(), createBlock(_component_product_node, {
                                key: 0,
                                product,
                                catalogType: false
                              }, null, 8, ["product"])) : createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_preload_wrap_node, {
                          targetPreloadElement: product ? false : true,
                          paddingBottom: product ? 0 : 146
                        }, {
                          default: withCtx(() => [
                            product ? (openBlock(), createBlock(_component_product_node, {
                              key: 0,
                              product,
                              catalogType: false
                            }, null, 8, ["product"])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1032, ["targetPreloadElement", "paddingBottom"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList($options.products, (product, index) => {
                  return openBlock(), createBlock(_component_swiper_slide, { key: index }, {
                    default: withCtx(() => [
                      createVNode(_component_preload_wrap_node, {
                        targetPreloadElement: product ? false : true,
                        paddingBottom: product ? 0 : 146
                      }, {
                        default: withCtx(() => [
                          product ? (openBlock(), createBlock(_component_product_node, {
                            key: 0,
                            product,
                            catalogType: false
                          }, null, 8, ["product"])) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1032, ["targetPreloadElement", "paddingBottom"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "slider-products__body" }, [
            createVNode("div", { class: "slider-products__title" }, [
              createVNode("button", {
                onClick: ($event) => _ctx.routeToCategory($options.productsCategory)
              }, toDisplayString($props.title), 9, ["onClick"])
            ]),
            createVNode("div", { class: "slider-products__slider" }, [
              withDirectives(createVNode(_component_arrows_slider_node, { identificator: $options.identificator }, null, 8, ["identificator"]), [
                [vShow, _ctx.itemsLoaded]
              ]),
              createVNode(_component_swiper, mergeProps(_ctx.$attrs, {
                loop: true,
                "slides-per-view": 2,
                "space-between": 20,
                onSwiper: $setup.onSwiper,
                onSlideChange: $setup.onSlideChange,
                navigation: {
                  prevEl: `.${$options.identificator}__arrow_prev`,
                  nextEl: `.${$options.identificator}__arrow_next`
                },
                modules: $setup.modules,
                breakpoints: $options.swiperBreakpoints
              }), {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList($options.products, (product, index) => {
                    return openBlock(), createBlock(_component_swiper_slide, { key: index }, {
                      default: withCtx(() => [
                        createVNode(_component_preload_wrap_node, {
                          targetPreloadElement: product ? false : true,
                          paddingBottom: product ? 0 : 146
                        }, {
                          default: withCtx(() => [
                            product ? (openBlock(), createBlock(_component_product_node, {
                              key: 0,
                              product,
                              catalogType: false
                            }, null, 8, ["product"])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1032, ["targetPreloadElement", "paddingBottom"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              }, 16, ["onSwiper", "onSlideChange", "navigation", "modules", "breakpoints"])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section>`);
}
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/sliders/SliderProductsNode.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const SliderProductsNode = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["ssrRender", _sfc_ssrRender$E]]);
const navigation_min = "";
const pagination_min = "";
const autoplay_min = "";
const SliderBannersNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$D = {
  inheritAttrs: false,
  components: {
    Swiper,
    SwiperSlide,
    ArrowsSliderNode
  },
  props: {
    bannerCategoryId: Number,
    identificator: String,
    containerStylesOff: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      itemsBased: "itemsBased",
      itemsInclude: "itemsInclude",
      requestByParam: "requestByParam",
      mapItemsByKey: "mapItemsByKey"
    }),
    ...mapState({
      bannersRequest: (state2) => state2.banners.basedRequest,
      mediaRequest: (state2) => state2.media.basedRequest
    }),
    banners() {
      if (this.bannersIds()) {
        return this.itemsInclude(this.bannersRequest, this.bannersIds());
      } else
        return [];
    },
    mediaBanners() {
      return this.itemsInclude(this.mediaRequest, this.mediaIds());
    }
  },
  methods: {
    ...mapActions({
      getItems: "getItems"
    }),
    ...mapMutations({
      SET_INCLUDE: "SET_INCLUDE",
      setBannerCategoriesIds: "banners/setBannerCategoriesIds"
    }),
    async getBanners() {
      this.setBannerCategoriesIds(this.bannerCategoryId);
      const banners = await this.getItems(this.bannersRequest);
      if (isEmpty(banners.response))
        return;
      this.SET_INCLUDE({
        type: this.mediaRequest.type,
        value: this.mediaIds()
      });
      await this.getItems(this.mediaRequest);
    },
    oneMediaBanners(value) {
      if (this.mediaBanners[value]) {
        return this.mediaBanners[value].guid.rendered;
      } else {
        return "";
      }
    },
    bannersIds() {
      let request = this.requestByParam(this.bannersRequest, {
        param: "banner_categories",
        value: this.bannerCategoryId
      });
      return request ? request.data : void 0;
    },
    mediaIds() {
      return this.mapItemsByKey(this.bannersRequest, "featured_media");
    }
  },
  created() {
    this.getBanners();
  },
  setup() {
    const onSwiper = (swiper) => {
    };
    const onSlideChange = () => {
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Autoplay, FreeMode]
    };
  }
};
function _sfc_ssrRender$D(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_container_node = resolveComponent("container-node");
  const _component_arrows_slider_node = resolveComponent("arrows-slider-node");
  const _component_swiper = resolveComponent("swiper");
  const _component_swiper_slide = resolveComponent("swiper-slide");
  const _component_preload_wrap_node = resolveComponent("preload-wrap-node");
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: ["slider-banners", _ctx.$attrs.class]
  }, _attrs))}>`);
  _push(ssrRenderComponent(_component_container_node, { containerStylesOff: $props.containerStylesOff }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="slider-banners__body"${_scopeId}><div class="slider-banners__items"${_scopeId}>`);
        ssrRenderSlot(_ctx.$slots, "banner-category-name", {}, null, _push2, _parent2, _scopeId);
        _push2(ssrRenderComponent(_component_arrows_slider_node, {
          style: $options.banners.length !== 0 ? null : { display: "none" },
          identificator: $props.identificator
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
        _push2(ssrRenderComponent(_component_swiper, mergeProps(_ctx.$attrs, {
          modules: $setup.modules,
          loop: true,
          navigation: {
            prevEl: `.${$props.identificator}__arrow_prev`,
            nextEl: `.${$props.identificator}__arrow_next`
          },
          freeMode: {
            enabled: true,
            sticky: true
          },
          onSwiper: $setup.onSwiper,
          onSlideChange: $setup.onSlideChange
        }), {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              if ($options.banners.length === 0) {
                _push3(ssrRenderComponent(_component_swiper_slide, null, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_preload_wrap_node, { targetPreloadElement: true }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<div class="slider-banners__image"${_scopeId4}><img${ssrRenderAttr("src", "")} alt=""${_scopeId4}></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "slider-banners__image" }, [
                                createVNode("img", {
                                  src: "",
                                  alt: ""
                                })
                              ])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_preload_wrap_node, { targetPreloadElement: true }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "slider-banners__image" }, [
                              createVNode("img", {
                                src: "",
                                alt: ""
                              })
                            ])
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
              _push3(`<!--[-->`);
              ssrRenderList($options.banners, (banner) => {
                _push3(ssrRenderComponent(_component_swiper_slide, {
                  key: banner.id
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_preload_wrap_node, {
                        targetPreloadElement: $options.oneMediaBanners(banner.featured_media) === ""
                      }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<div class="slider-banners__image"${_scopeId4}><picture${_scopeId4}><source srcset="" type="image/webp"${_scopeId4}><source srcset="" type="image/jpeg"${_scopeId4}><img${ssrRenderAttr("src", $options.oneMediaBanners(banner.featured_media))} alt=""${_scopeId4}></picture></div>`);
                            ssrRenderSlot(_ctx.$slots, "banner-title", { banner }, null, _push5, _parent5, _scopeId4);
                          } else {
                            return [
                              createVNode("div", { class: "slider-banners__image" }, [
                                createVNode("picture", null, [
                                  createVNode("source", {
                                    srcset: "",
                                    type: "image/webp"
                                  }),
                                  createVNode("source", {
                                    srcset: "",
                                    type: "image/jpeg"
                                  }),
                                  createVNode("img", {
                                    src: $options.oneMediaBanners(banner.featured_media),
                                    alt: ""
                                  }, null, 8, ["src"])
                                ])
                              ]),
                              renderSlot(_ctx.$slots, "banner-title", { banner })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_preload_wrap_node, {
                          targetPreloadElement: $options.oneMediaBanners(banner.featured_media) === ""
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "slider-banners__image" }, [
                              createVNode("picture", null, [
                                createVNode("source", {
                                  srcset: "",
                                  type: "image/webp"
                                }),
                                createVNode("source", {
                                  srcset: "",
                                  type: "image/jpeg"
                                }),
                                createVNode("img", {
                                  src: $options.oneMediaBanners(banner.featured_media),
                                  alt: ""
                                }, null, 8, ["src"])
                              ])
                            ]),
                            renderSlot(_ctx.$slots, "banner-title", { banner })
                          ]),
                          _: 2
                        }, 1032, ["targetPreloadElement"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                $options.banners.length === 0 ? (openBlock(), createBlock(_component_swiper_slide, { key: 0 }, {
                  default: withCtx(() => [
                    createVNode(_component_preload_wrap_node, { targetPreloadElement: true }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "slider-banners__image" }, [
                          createVNode("img", {
                            src: "",
                            alt: ""
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList($options.banners, (banner) => {
                  return openBlock(), createBlock(_component_swiper_slide, {
                    key: banner.id
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_preload_wrap_node, {
                        targetPreloadElement: $options.oneMediaBanners(banner.featured_media) === ""
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "slider-banners__image" }, [
                            createVNode("picture", null, [
                              createVNode("source", {
                                srcset: "",
                                type: "image/webp"
                              }),
                              createVNode("source", {
                                srcset: "",
                                type: "image/jpeg"
                              }),
                              createVNode("img", {
                                src: $options.oneMediaBanners(banner.featured_media),
                                alt: ""
                              }, null, 8, ["src"])
                            ])
                          ]),
                          renderSlot(_ctx.$slots, "banner-title", { banner })
                        ]),
                        _: 2
                      }, 1032, ["targetPreloadElement"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "slider-banners__body" }, [
            createVNode("div", { class: "slider-banners__items" }, [
              renderSlot(_ctx.$slots, "banner-category-name"),
              withDirectives(createVNode(_component_arrows_slider_node, { identificator: $props.identificator }, null, 8, ["identificator"]), [
                [vShow, $options.banners.length !== 0]
              ])
            ]),
            createVNode(_component_swiper, mergeProps(_ctx.$attrs, {
              modules: $setup.modules,
              loop: true,
              navigation: {
                prevEl: `.${$props.identificator}__arrow_prev`,
                nextEl: `.${$props.identificator}__arrow_next`
              },
              freeMode: {
                enabled: true,
                sticky: true
              },
              onSwiper: $setup.onSwiper,
              onSlideChange: $setup.onSlideChange
            }), {
              default: withCtx(() => [
                $options.banners.length === 0 ? (openBlock(), createBlock(_component_swiper_slide, { key: 0 }, {
                  default: withCtx(() => [
                    createVNode(_component_preload_wrap_node, { targetPreloadElement: true }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "slider-banners__image" }, [
                          createVNode("img", {
                            src: "",
                            alt: ""
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList($options.banners, (banner) => {
                  return openBlock(), createBlock(_component_swiper_slide, {
                    key: banner.id
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_preload_wrap_node, {
                        targetPreloadElement: $options.oneMediaBanners(banner.featured_media) === ""
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "slider-banners__image" }, [
                            createVNode("picture", null, [
                              createVNode("source", {
                                srcset: "",
                                type: "image/webp"
                              }),
                              createVNode("source", {
                                srcset: "",
                                type: "image/jpeg"
                              }),
                              createVNode("img", {
                                src: $options.oneMediaBanners(banner.featured_media),
                                alt: ""
                              }, null, 8, ["src"])
                            ])
                          ]),
                          renderSlot(_ctx.$slots, "banner-title", { banner })
                        ]),
                        _: 2
                      }, 1032, ["targetPreloadElement"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ]),
              _: 3
            }, 16, ["modules", "navigation", "onSwiper", "onSlideChange"])
          ])
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(`</section>`);
}
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/sliders/SliderBannersNode.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const SliderBannersNode = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["ssrRender", _sfc_ssrRender$D]]);
const SliderBannersFashionBlogNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$C = {
  components: {
    SliderBannersNode
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
function _sfc_ssrRender$C(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_slider_banners_node = resolveComponent("slider-banners-node");
  _push(ssrRenderComponent(_component_slider_banners_node, mergeProps({
    class: "slider-banners-fashion-blog",
    bannerCategoryId: 69,
    identificator: "slider-banners-fashion-blog",
    "space-between": 60,
    breakpoints: {
      "320": {
        slidesPerView: 1.25,
        spaceBetween: 20
      },
      "992": {
        slidesPerView: 2,
        spaceBetween: 50
      }
    }
  }, _attrs), {
    "banner-category-name": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="slider-banners-fashion-blog__title"${_scopeId}>Fashion-\u0431\u043B\u043E\u0433</div>`);
      } else {
        return [
          createVNode("div", { class: "slider-banners-fashion-blog__title" }, "Fashion-\u0431\u043B\u043E\u0433")
        ];
      }
    }),
    "banner-title": withCtx((bannerTitleProps, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="slider-banners-fashion-blog__banner-title"${_scopeId}>${ssrInterpolate(bannerTitleProps.banner.title.rendered)}</div>`);
      } else {
        return [
          createVNode("div", { class: "slider-banners-fashion-blog__banner-title" }, toDisplayString(bannerTitleProps.banner.title.rendered), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/sliders/SliderBannersFashionBlogNode.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const SliderBannersFashionBlogNode = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["ssrRender", _sfc_ssrRender$C]]);
const PageContentNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$B = {
  props: {
    page: Object
  }
};
function _sfc_ssrRender$B(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_container_node = resolveComponent("container-node");
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "page-content" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_container_node, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="page-content__body"${_scopeId}><h3 class="page-content__title"${_scopeId}>${$props.page.title.rendered}</h3><div class="page-content__content"${_scopeId}>${$props.page.content.rendered}</div></div>`);
      } else {
        return [
          createVNode("div", { class: "page-content__body" }, [
            createVNode("h3", {
              class: "page-content__title",
              innerHTML: $props.page.title.rendered
            }, null, 8, ["innerHTML"]),
            createVNode("div", {
              class: "page-content__content",
              innerHTML: $props.page.content.rendered
            }, null, 8, ["innerHTML"])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section>`);
}
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/PageContentNode.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const PageContentNode = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["ssrRender", _sfc_ssrRender$B]]);
const DistributionNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$A = {
  data() {
    return {
      email: "",
      forMen: true,
      forWomen: true
    };
  }
};
function _sfc_ssrRender$A(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_container_node = resolveComponent("container-node");
  const _component_input_node = resolveComponent("input-node");
  const _component_input_checkbox_node = resolveComponent("input-checkbox-node");
  const _component_button_node = resolveComponent("button-node");
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "distr" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_container_node, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<form class="distr__body"${_scopeId}><div class="distr__head"${_scopeId}><div class="distr__title"${_scopeId}>\u041F\u043E\u0434\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C \u043D\u0430 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443</div><p${_scopeId}> \u0411\u0443\u0434\u044C\u0442\u0435 \u0432 \u0447\u0438\u0441\u043B\u0435 \u043F\u0435\u0440\u0432\u044B\u0445, \u043A\u0442\u043E \u0443\u0437\u043D\u0430\u0435\u0442 \u043E \u043D\u043E\u0432\u0438\u043D\u043A\u0430\u0445, \u0440\u0430\u0441\u043F\u0440\u043E\u0434\u0430\u0436\u0430\u0445 \u0438 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u0445 \u043D\u043E\u0432\u043E\u0441\u0442\u044F\u0445 Logotype! </p></div><div class="distr__inputes"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_input_node, {
          class: "main",
          modelValue: $data.email,
          "onUpdate:modelValue": ($event) => $data.email = $event
        }, {
          after: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<label${_scopeId2}>\u0412\u0430\u0448 E-mail:</label>`);
            } else {
              return [
                createVNode("label", null, "\u0412\u0430\u0448 E-mail:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_input_checkbox_node, {
          modelValue: $data.forMen,
          "onUpdate:modelValue": ($event) => $data.forMen = $event,
          labelText: "\u0414\u043B\u044F \u043C\u0443\u0436\u0447\u0438\u043D"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_input_checkbox_node, {
          modelValue: $data.forWomen,
          "onUpdate:modelValue": ($event) => $data.forWomen = $event,
          labelText: "\u0414\u043B\u044F \u0436\u0435\u043D\u0449\u0438\u043D"
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
        _push2(ssrRenderComponent(_component_button_node, {
          class: "distr__btn",
          buttonStyle: "dark"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F`);
            } else {
              return [
                createTextVNode("\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</form>`);
      } else {
        return [
          createVNode("form", { class: "distr__body" }, [
            createVNode("div", { class: "distr__head" }, [
              createVNode("div", { class: "distr__title" }, "\u041F\u043E\u0434\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C \u043D\u0430 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443"),
              createVNode("p", null, " \u0411\u0443\u0434\u044C\u0442\u0435 \u0432 \u0447\u0438\u0441\u043B\u0435 \u043F\u0435\u0440\u0432\u044B\u0445, \u043A\u0442\u043E \u0443\u0437\u043D\u0430\u0435\u0442 \u043E \u043D\u043E\u0432\u0438\u043D\u043A\u0430\u0445, \u0440\u0430\u0441\u043F\u0440\u043E\u0434\u0430\u0436\u0430\u0445 \u0438 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u0445 \u043D\u043E\u0432\u043E\u0441\u0442\u044F\u0445 Logotype! ")
            ]),
            createVNode("div", { class: "distr__inputes" }, [
              createVNode(_component_input_node, {
                class: "main",
                modelValue: $data.email,
                "onUpdate:modelValue": ($event) => $data.email = $event
              }, {
                after: withCtx(() => [
                  createVNode("label", null, "\u0412\u0430\u0448 E-mail:")
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_input_checkbox_node, {
                modelValue: $data.forMen,
                "onUpdate:modelValue": ($event) => $data.forMen = $event,
                labelText: "\u0414\u043B\u044F \u043C\u0443\u0436\u0447\u0438\u043D"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_input_checkbox_node, {
                modelValue: $data.forWomen,
                "onUpdate:modelValue": ($event) => $data.forWomen = $event,
                labelText: "\u0414\u043B\u044F \u0436\u0435\u043D\u0449\u0438\u043D"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            createVNode(_component_button_node, {
              class: "distr__btn",
              buttonStyle: "dark"
            }, {
              default: withCtx(() => [
                createTextVNode("\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F")
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section>`);
}
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/DistributionNode.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const DistributionNode = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["ssrRender", _sfc_ssrRender$A]]);
const PageHeadNode_vue_vue_type_style_index_0_scoped_ed252715_lang = "";
const _sfc_main$z = {
  name: "page-head-node",
  inheritAttrs: false,
  props: {
    additionalTitle: String,
    title: String,
    category: Object
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      itemById: "itemById"
    }),
    ...mapState({
      productsCategoriesRequest: (state2) => state2.productsCategories.basedRequest
    }),
    crumbs() {
      if (!this.category)
        return;
      let category;
      if (this.category.hasOwnProperty("parent")) {
        category = this.category;
      } else
        category = this.itemById({
          type: this.productsCategoriesRequest.type,
          id: this.category.id
        });
      let parent = 0;
      let index = 0;
      const crumbs = [];
      let parentCheck = (category2) => {
        if (!category2)
          return;
        let parentCategoryId = category2.parent;
        if (parentCategoryId != parent) {
          crumbs.push({ name: category2.name, slugs: [category2.slug] });
          if (index !== 0) {
            crumbs[index - 1].slugs.unshift(category2.slug);
          }
          index++;
          const parentCategory = this.itemById({
            type: this.productsCategoriesRequest.type,
            id: parentCategoryId
          });
          parentCheck(parentCategory);
        } else {
          crumbs.push({ name: category2.name, slugs: [category2.slug] });
          if (index !== 0) {
            crumbs[index - 1].slugs.unshift(category2.slug);
          }
          index++;
        }
      };
      parentCheck(category);
      return crumbs;
    }
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({})
  }
};
function _sfc_ssrRender$z(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_container_node = resolveComponent("container-node");
  const _component_router_link = resolveComponent("router-link");
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: ["page-head", $props.title ? "" : "page-head_product"]
  }, _attrs))} data-v-ed252715>`);
  _push(ssrRenderComponent(_component_container_node, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      var _a, _b;
      if (_push2) {
        _push2(`<div${ssrRenderAttrs(mergeProps({ class: "page-head__body" }, _ctx.$attrs))} data-v-ed252715${_scopeId}><div class="page-head__content" data-v-ed252715${_scopeId}>`);
        if (!$props.title) {
          _push2(`<button class="page-head__back icon-arrow" data-v-ed252715${_scopeId}> \u041D\u0430\u0437\u0430\u0434 </button>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<ul class="page-head__breadcrumbs" data-v-ed252715${_scopeId}><li data-v-ed252715${_scopeId}>`);
        _push2(ssrRenderComponent(_component_router_link, { to: "/" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`\u0413\u043B\u0430\u0432\u043D\u0430\u044F`);
            } else {
              return [
                createTextVNode("\u0413\u043B\u0430\u0432\u043D\u0430\u044F")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</li><!--[-->`);
        ssrRenderList((_a = $options.crumbs) == null ? void 0 : _a.reverse(), (crumb, index) => {
          _push2(`<li data-v-ed252715${_scopeId}>`);
          _push2(ssrRenderComponent(_component_router_link, {
            to: `/product-category/${crumb.slugs.join("/")}`
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(` / ${ssrInterpolate(crumb.name)}`);
              } else {
                return [
                  createTextVNode(" / " + toDisplayString(crumb.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</li>`);
        });
        _push2(`<!--]--><li data-v-ed252715${_scopeId}><span data-v-ed252715${_scopeId}>${ssrInterpolate($props.additionalTitle ? "/ " + $props.additionalTitle : "")}</span></li></ul></div>`);
        if ($props.title) {
          _push2(`<h1 class="page-head__title" data-v-ed252715${_scopeId}>${ssrInterpolate($props.title)}</h1>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", mergeProps({ class: "page-head__body" }, _ctx.$attrs), [
            createVNode("div", { class: "page-head__content" }, [
              !$props.title ? (openBlock(), createBlock("button", {
                key: 0,
                class: "page-head__back icon-arrow",
                onClick: ($event) => _ctx.$router.back()
              }, " \u041D\u0430\u0437\u0430\u0434 ", 8, ["onClick"])) : createCommentVNode("", true),
              createVNode("ul", { class: "page-head__breadcrumbs" }, [
                createVNode("li", null, [
                  createVNode(_component_router_link, { to: "/" }, {
                    default: withCtx(() => [
                      createTextVNode("\u0413\u043B\u0430\u0432\u043D\u0430\u044F")
                    ]),
                    _: 1
                  })
                ]),
                (openBlock(true), createBlock(Fragment, null, renderList((_b = $options.crumbs) == null ? void 0 : _b.reverse(), (crumb, index) => {
                  return openBlock(), createBlock("li", { key: index }, [
                    createVNode(_component_router_link, {
                      to: `/product-category/${crumb.slugs.join("/")}`
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" / " + toDisplayString(crumb.name), 1)
                      ]),
                      _: 2
                    }, 1032, ["to"])
                  ]);
                }), 128)),
                createVNode("li", null, [
                  createVNode("span", null, toDisplayString($props.additionalTitle ? "/ " + $props.additionalTitle : ""), 1)
                ])
              ])
            ]),
            $props.title ? (openBlock(), createBlock("h1", {
              key: 0,
              class: "page-head__title"
            }, toDisplayString($props.title), 1)) : createCommentVNode("", true)
          ], 16)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section>`);
}
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/structure/PageHeadNode.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const PageHeadNode = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["ssrRender", _sfc_ssrRender$z], ["__scopeId", "data-v-ed252715"]]);
const MainPageNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$y = {
  name: "main-page-node",
  components: {
    PageHeadNode
  },
  props: {
    pageHeadNodeShow: {
      type: Boolean,
      default: true
    },
    templatePage: Object,
    category: Object,
    additionalTitle: String
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
    ...mapState({})
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({})
  }
};
function _sfc_ssrRender$y(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_page_head_node = resolveComponent("page-head-node");
  _push(`<main${ssrRenderAttrs(mergeProps({
    class: ["page", $props.templatePage ? "" : "page_product"]
  }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "page-head", {}, () => {
    if ($props.pageHeadNodeShow) {
      _push(`<div class="page__head-wrapper">`);
      _push(ssrRenderComponent(_component_page_head_node, {
        title: $props.templatePage ? $props.templatePage.title.rendered : "",
        category: $props.category,
        additionalTitle: $props.additionalTitle
      }, null, _parent));
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
  }, _push, _parent);
  ssrRenderSlot(_ctx.$slots, "page-main", {}, null, _push, _parent);
  _push(`</main>`);
}
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/structure/MainPageNode.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const MainPageNode = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["ssrRender", _sfc_ssrRender$y]]);
const Home_vue_vue_type_style_index_0_lang = "";
const _sfc_main$x = {
  components: {
    SliderProductsNode,
    SliderBannersNode,
    SliderBannersFashionBlogNode,
    PageContentNode,
    DistributionNode,
    MainPageNode
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      request: {
        type: "pages",
        slug: this.slug,
        showLoading: true
      }
    };
  },
  computed: {
    ...mapGetters({
      itemBySlug: "itemBySlug"
    }),
    ...mapState({
      pagesRequest: (state2) => state2.pages.basedRequest,
      windowWidth: (state2) => state2.common.windowWidth
    }),
    templatePage() {
      return this.itemBySlug({ type: this.pagesRequest.type, slug: this.slug });
    }
  },
  methods: {
    ...mapMutations({
      SET_SINGLE_PARAM: "SET_SINGLE_PARAM"
    }),
    ...mapActions({
      getSingleBySlug: "getSingleBySlug",
      updateDocTitle: "updateDocTitle"
    }),
    async getTemplatePage() {
      await this.getSingleBySlug({
        basedRequest: this.pagesRequest,
        params: { slug: this.slug }
      });
      if (this.page)
        ;
    }
  },
  created() {
    this.getTemplatePage();
  }
};
function _sfc_ssrRender$x(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_main_page_node = resolveComponent("main-page-node");
  const _component_slider_banners_node = resolveComponent("slider-banners-node");
  const _component_slider_products_node = resolveComponent("slider-products-node");
  const _component_slider_banners_fashion_blog_node = resolveComponent("slider-banners-fashion-blog-node");
  const _component_distribution_node = resolveComponent("distribution-node");
  const _component_page_content_node = resolveComponent("page-content-node");
  _push(ssrRenderComponent(_component_main_page_node, mergeProps({
    class: "page_home",
    pageHeadNodeShow: false
  }, _attrs), {
    "page-main": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_slider_banners_node, {
          class: "slider-banners-main",
          bannerCategoryId: 68,
          containerStylesOff: _ctx.windowWidth < 1024 ? true : false,
          identificator: "slider-banners-main",
          autoplay: { delay: 5e4, disableOnInteraction: false },
          pagination: "",
          "slides-per-view": 1
        }, {
          "banner-title": withCtx((bannerTitleProps, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="slider-banners-main__title"${_scopeId2}>${ssrInterpolate(bannerTitleProps.banner.title.rendered)}</div>`);
            } else {
              return [
                createVNode("div", { class: "slider-banners-main__title" }, toDisplayString(bannerTitleProps.banner.title.rendered), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_slider_products_node, {
          title: "\u0414\u043B\u044F \u0436\u0435\u043D\u0449\u0438\u043D",
          productsCategoryId: "20"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_slider_products_node, {
          title: "\u0414\u043B\u044F \u043C\u0443\u0436\u0447\u0438\u043D",
          productsCategoryId: "22"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_slider_banners_fashion_blog_node, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_distribution_node, null, null, _parent2, _scopeId));
        if ($options.templatePage) {
          _push2(ssrRenderComponent(_component_page_content_node, { page: $options.templatePage }, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode(_component_slider_banners_node, {
            class: "slider-banners-main",
            bannerCategoryId: 68,
            containerStylesOff: _ctx.windowWidth < 1024 ? true : false,
            identificator: "slider-banners-main",
            autoplay: { delay: 5e4, disableOnInteraction: false },
            pagination: "",
            "slides-per-view": 1
          }, {
            "banner-title": withCtx((bannerTitleProps) => [
              createVNode("div", { class: "slider-banners-main__title" }, toDisplayString(bannerTitleProps.banner.title.rendered), 1)
            ]),
            _: 1
          }, 8, ["containerStylesOff"]),
          createVNode(_component_slider_products_node, {
            title: "\u0414\u043B\u044F \u0436\u0435\u043D\u0449\u0438\u043D",
            productsCategoryId: "20"
          }),
          createVNode(_component_slider_products_node, {
            title: "\u0414\u043B\u044F \u043C\u0443\u0436\u0447\u0438\u043D",
            productsCategoryId: "22"
          }),
          createVNode(_component_slider_banners_fashion_blog_node),
          createVNode(_component_distribution_node),
          $options.templatePage ? (openBlock(), createBlock(_component_page_content_node, {
            key: 0,
            page: $options.templatePage
          }, null, 8, ["page"])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/Home.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const Home = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["ssrRender", _sfc_ssrRender$x]]);
const CatalogSidebarNode_vue_vue_type_style_index_0_scoped_7104860a_lang = "";
const _sfc_main$w = {
  mixins: [routeToCategoryMixin],
  components: {},
  props: {
    mainCategory: Object,
    category: Object,
    total: [String, Number]
  },
  data() {
    return {
      bodyShow: true
    };
  },
  watch: {
    windowWidth(newValue) {
      if (newValue > 767)
        this.bodyShow = true;
    }
  },
  computed: {
    ...mapGetters({
      itemsMatchedOneProperty: "itemsMatchedOneProperty",
      itemById: "itemById"
    }),
    ...mapState({
      windowWidth: (state2) => state2.common.windowWidth,
      productsCategoriesRequest: (state2) => state2.productsCategories.basedRequest
    })
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
    items(id) {
      return this.itemsMatchedOneProperty(this.productsCategoriesRequest, {
        parent: id
      });
    }
  },
  created() {
  }
};
function _sfc_ssrRender$w(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "catalog-sidebar" }, _attrs))} data-v-7104860a><button class="catalog-sidebar__title icon-arrow" style="${ssrRenderStyle(_ctx.windowWidth < 767 ? null : { display: "none" })}" data-v-7104860a> \u041E\u0434\u0435\u0436\u0434\u0430 </button>`);
  if ($props.mainCategory) {
    _push(`<div style="${ssrRenderStyle($data.bodyShow ? null : { display: "none" })}" class="catalog-sidebar__body" data-v-7104860a><button class="${ssrRenderClass([$props.category ? $props.category.id ? "" : "active" : "", "catalog-sidebar__title icon-arrow"])}" data-v-7104860a>${ssrInterpolate(_ctx.windowWidth > 768 ? "\u041E\u0434\u0435\u0436\u0434\u0430" : "\u0412\u0441\u044F \u043E\u0434\u0435\u0436\u0434\u0430")} <span data-v-7104860a>${$props.total ? $props.total : 0}</span></button><div class="catalog-sidebar__items" data-v-7104860a><ul class="catalog-sidebar__list" data-v-7104860a><!--[-->`);
    ssrRenderList($options.items($props.mainCategory.id), (productsCategory) => {
      _push(`<li class="catalog-sidebar__item" data-v-7104860a><button class="${ssrRenderClass([$props.category ? $props.category.id == productsCategory.id ? "active" : "" : "", "catalog-sidebar__category icon-arrow"])}" data-v-7104860a>${ssrInterpolate(productsCategory.name)}<span data-v-7104860a>${ssrInterpolate(productsCategory.count)}</span></button>`);
      if ($props.category) {
        _push(`<ul class="catalog-sidebar__sub-list" style="${ssrRenderStyle($props.category.id == productsCategory.id || $props.category.parent == productsCategory.id ? null : { display: "none" })}" data-v-7104860a><!--[-->`);
        ssrRenderList($options.items(productsCategory.id), (productsSubCategory) => {
          _push(`<li class="catalog-sidebar__sub-item" data-v-7104860a><button class="${ssrRenderClass([
            $props.category.id == productsSubCategory.id ? "active" : "",
            "catalog-sidebar__sub-category icon-arrow"
          ])}" data-v-7104860a>${ssrInterpolate(productsSubCategory.name)}<span data-v-7104860a>${ssrInterpolate(productsSubCategory.count)}</span></button></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li>`);
    });
    _push(`<!--]--></ul></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</section>`);
}
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/CatalogSidebarNode.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const CatalogSidebarNode = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["ssrRender", _sfc_ssrRender$w], ["__scopeId", "data-v-7104860a"]]);
const RevealingListNode_vue_vue_type_style_index_0_scoped_fe726d47_lang = "";
const _sfc_main$v = {
  components: {},
  props: {
    bodyLoaded: {
      type: Boolean,
      default: false
    },
    applyValidate: {
      default: true,
      type: Boolean
    }
  },
  emmits: ["apply", "setDefault"],
  mixins: [popupRevealingMixin],
  data() {
    return {
      errorInvalidValue: false
    };
  },
  computed: {
    ...mapGetters({}),
    ...mapState({})
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
    apply() {
      this.closeRevs();
      return this.$emit("apply");
    },
    setDefault() {
      this.$emit("setDefault");
    }
  }
};
function _sfc_ssrRender$v(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_button_node = resolveComponent("button-node");
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["revealing-list", _ctx.state.visible ? "revealing-list_active" : ""]
  }, _attrs))} data-v-fe726d47><div class="revealing-list__actions" data-v-fe726d47>`);
  _push(ssrRenderComponent(_component_button_node, {
    class: ["revealing-list__button revealing-list__button_main", _ctx.state.default ? "revealing-list__button_main_default" : ""],
    onClick: _ctx.bodyVisible
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="revealing-list__close icon-plus" data-v-fe726d47${_scopeId}></div><div class="revealing-list__title" data-v-fe726d47${_scopeId}>`);
        ssrRenderSlot(_ctx.$slots, "title", {}, null, _push2, _parent2, _scopeId);
        _push2(`</div><div class="revealing-list__arrow icon-arrow" data-v-fe726d47${_scopeId}></div>`);
      } else {
        return [
          createVNode("div", {
            class: "revealing-list__close icon-plus",
            onClick: $options.setDefault
          }, null, 8, ["onClick"]),
          createVNode("div", { class: "revealing-list__title" }, [
            renderSlot(_ctx.$slots, "title", {}, void 0, true)
          ]),
          createVNode("div", { class: "revealing-list__arrow icon-arrow" })
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(`</div><div class="revealing-list__body" style="${ssrRenderStyle(_ctx.state.visible ? null : { display: "none" })}" data-v-fe726d47><div class="revealing-list__main" data-v-fe726d47>`);
  ssrRenderSlot(_ctx.$slots, "main", {}, null, _push, _parent);
  _push(`</div><div class="revealing-list__nested-actions" data-v-fe726d47>`);
  _push(ssrRenderComponent(_component_button_node, {
    class: "revealing-list__button",
    onClick: $options.setDefault
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C`);
      } else {
        return [
          createTextVNode("\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_button_node, {
    class: "revealing-list__button",
    "button-style": "dark",
    onClick: $options.apply,
    disabled: $props.bodyLoaded ? false : true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C`);
      } else {
        return [
          createTextVNode("\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RevealingListNode.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const RevealingListNode = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["ssrRender", _sfc_ssrRender$v], ["__scopeId", "data-v-fe726d47"]]);
const FilterNode_vue_vue_type_style_index_0_scoped_0855e865_lang = "";
const _sfc_main$u = {
  components: {
    RevealingListNode
  },
  emits: ["updateFilter"],
  data() {
    return {
      onlineOnly: true,
      filterShow: true,
      applyValidate: true,
      revealings: {
        sorting: {},
        prices: {}
      }
    };
  },
  watch: {
    attributes(newValue) {
      this.attributesSlugsRevs(newValue);
    }
  },
  computed: {
    ...mapGetters({
      itemsBased: "itemsBased",
      attributesSlugs: "productsAttributes/attributesSlugs"
    }),
    ...mapState({
      minCost: (state2) => state2.filter.minCost || 1e4,
      maxCost: (state2) => state2.filter.maxCost || 1e6,
      min_price: (state2) => state2.filter.params.min_price,
      max_price: (state2) => state2.filter.params.max_price,
      filterParams: (state2) => state2.filter.params,
      productsBrandsRequest: (state2) => state2.productsTermsBrands.basedRequest,
      productsColorsRequest: (state2) => state2.productsTermsColors.basedRequest,
      productsMaterialsRequest: (state2) => state2.productsTermsMaterials.basedRequest,
      productsSizesRequest: (state2) => state2.productsTermsSizes.basedRequest,
      productsAttributesRequest: (state2) => state2.productsAttributes.basedRequest
    }),
    pa_brand() {
      return this.itemsBased(this.productsBrandsRequest);
    },
    pa_material() {
      return this.itemsBased(this.productsMaterialsRequest);
    },
    pa_tcvet() {
      return this.itemsBased(this.productsColorsRequest);
    },
    pa_razmer() {
      return this.itemsBased(this.productsSizesRequest);
    },
    attributes() {
      return this.itemsBased(this.productsAttributesRequest);
    }
  },
  methods: {
    ...mapMutations({
      setMaterials: "filter/setMaterials",
      setBrands: "filter/setBrands",
      setColors: "filter/setColors",
      setSizes: "filter/setSizes",
      setOrderAndOrderBy: "filter/setOrderAndOrderBy",
      setAttributeTerms: "filter/setAttributeTerms",
      setMaxPrice: "filter/setMaxPrice",
      setMinPrice: "filter/setMinPrice",
      updateRev: "common/updateRev",
      addRev: "common/addRev",
      closeRevs: "common/closeRevs",
      unsetDefaultAttributeOptions: "filter/unsetDefaultAttributeOptions",
      setDefaultPrices: "filter/setDefaultPrices"
    }),
    ...mapActions({
      getItemsBased: "getItemsBased",
      getItems: "getItems",
      setDefaultFilter: "filter/setDefaultFilter"
    }),
    attributesSlugsRevs(object) {
      if (isEmpty(object))
        return;
      const items2 = {};
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          const element = object[key];
          items2[element.slug] = {};
        }
      }
      return items2;
    },
    filterParamsChecked(attrSlug, termID) {
      let terms = this.filterParams[attrSlug].options;
      let term = terms.find((i) => i.id == termID);
      if (term)
        return true;
      else
        return false;
    },
    filterVisible() {
      this.filterShow ? this.filterShow = false : this.filterShow = true;
    },
    filterCleanAndLoadDefault() {
      const slugs = this.attributesSlugs;
      slugs.forEach((slug) => {
        this.updateRev({
          name: slug,
          value: true,
          toggleValue: false,
          prop: "default"
        });
      });
      this.setDefaultFilter();
      this.closeRevs();
      this.$emit("updateFilter");
    },
    updateRevealing({ type, value }) {
      this.setAttributeTerms({ type, value });
      let marker = isEmpty(this.filterParams[type].options);
      this.updateRev({
        name: type,
        value: marker,
        toggleValue: false,
        prop: "default"
      });
    },
    setDefaultAttribute(slug) {
      this.updateRev({
        name: slug,
        value: true,
        toggleValue: false,
        prop: "default"
      });
      this.unsetDefaultAttributeOptions(slug);
    }
  },
  created() {
    this.addRev(
      Object.assign(this.revealings, this.attributesSlugsRevs(this.attributes))
    );
    this.getItems(this.productsBrandsRequest);
    this.getItems(this.productsMaterialsRequest);
    this.getItems(this.productsColorsRequest);
    this.getItems(this.productsSizesRequest);
    this.getItems(this.productsAttributesRequest);
  }
};
function _sfc_ssrRender$u(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_container_node = resolveComponent("container-node");
  const _component_button_node = resolveComponent("button-node");
  const _component_revealing_list_node = resolveComponent("revealing-list-node");
  const _component_input_checkbox_node = resolveComponent("input-checkbox-node");
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: ["filter", $data.filterShow ? "filter_active" : ""]
  }, _attrs))} data-v-0855e865>`);
  _push(ssrRenderComponent(_component_container_node, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_button_node, {
          onClick: $options.filterVisible,
          class: "filter__button filter__button_filter-show"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`\u0424\u0438\u043B\u044C\u0442\u0440 \u0442\u043E\u0432\u0430\u0440\u043E\u0432`);
            } else {
              return [
                createTextVNode("\u0424\u0438\u043B\u044C\u0442\u0440 \u0442\u043E\u0432\u0430\u0440\u043E\u0432")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<div class="filter__body" data-v-0855e865${_scopeId}><ul class="filter__list" data-v-0855e865${_scopeId}><li class="filter__item" data-v-0855e865${_scopeId}>`);
        _push2(ssrRenderComponent(_component_revealing_list_node, {
          onApply: ($event) => _ctx.$emit("updateFilter"),
          onSetDefault: _ctx.setDefaultPrices,
          applyValidate: $data.applyValidate,
          name: "prices"
        }, {
          title: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`\u0426\u0435\u043D\u0430`);
            } else {
              return [
                createTextVNode("\u0426\u0435\u043D\u0430")
              ];
            }
          }),
          main: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3)
              ;
            else {
              return [];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</li><!--[-->`);
        ssrRenderList($options.attributes, (attr, index) => {
          _push2(`<li class="filter__item" data-v-0855e865${_scopeId}>`);
          _push2(ssrRenderComponent(_component_revealing_list_node, {
            onApply: ($event) => _ctx.$emit("updateFilter"),
            name: attr.slug,
            onSetDefault: ($event) => $options.setDefaultAttribute(attr.slug),
            bodyLoaded: attr.slug ? true : false
          }, {
            title: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`${ssrInterpolate(attr.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(attr.name), 1)
                ];
              }
            }),
            main: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<ul class="filter__sub-list" data-v-0855e865${_scopeId2}><!--[-->`);
                ssrRenderList(this[attr.slug], ({ id, name }) => {
                  _push3(`<li class="filter__sub-item" data-v-0855e865${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_input_checkbox_node, {
                    modelValue: $options.filterParamsChecked(attr.slug, id),
                    labelText: name,
                    onInput: ($event) => $options.updateRevealing({
                      type: attr.slug,
                      value: { id, name }
                    })
                  }, null, _parent3, _scopeId2));
                  _push3(`</li>`);
                });
                _push3(`<!--]--></ul>`);
              } else {
                return [
                  createVNode("ul", { class: "filter__sub-list" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(this[attr.slug], ({ id, name }) => {
                      return openBlock(), createBlock("li", {
                        class: "filter__sub-item",
                        key: id
                      }, [
                        createVNode(_component_input_checkbox_node, {
                          modelValue: $options.filterParamsChecked(attr.slug, id),
                          labelText: name,
                          onInput: ($event) => $options.updateRevealing({
                            type: attr.slug,
                            value: { id, name }
                          })
                        }, null, 8, ["modelValue", "labelText", "onInput"])
                      ]);
                    }), 128))
                  ])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</li>`);
        });
        _push2(`<!--]--><li class="filter__item" data-v-0855e865${_scopeId}>`);
        _push2(ssrRenderComponent(_component_input_checkbox_node, {
          modelValue: $data.onlineOnly,
          "onUpdate:modelValue": ($event) => $data.onlineOnly = $event,
          labelText: "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043E\u043D\u043B\u0430\u0439\u043D"
        }, null, _parent2, _scopeId));
        _push2(`</li></ul>`);
        _push2(ssrRenderComponent(_component_button_node, {
          onClick: $options.filterCleanAndLoadDefault,
          class: "filter__button filter__button_clean"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B`);
            } else {
              return [
                createTextVNode("\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode(_component_button_node, {
            onClick: $options.filterVisible,
            class: "filter__button filter__button_filter-show"
          }, {
            default: withCtx(() => [
              createTextVNode("\u0424\u0438\u043B\u044C\u0442\u0440 \u0442\u043E\u0432\u0430\u0440\u043E\u0432")
            ]),
            _: 1
          }, 8, ["onClick"]),
          createVNode("div", { class: "filter__body" }, [
            createVNode("ul", { class: "filter__list" }, [
              createVNode("li", { class: "filter__item" }, [
                createVNode(_component_revealing_list_node, {
                  onApply: ($event) => _ctx.$emit("updateFilter"),
                  onSetDefault: _ctx.setDefaultPrices,
                  applyValidate: $data.applyValidate,
                  name: "prices"
                }, {
                  title: withCtx(() => [
                    createTextVNode("\u0426\u0435\u043D\u0430")
                  ]),
                  main: withCtx(() => []),
                  _: 1
                }, 8, ["onApply", "onSetDefault", "applyValidate"])
              ]),
              (openBlock(true), createBlock(Fragment, null, renderList($options.attributes, (attr, index) => {
                return openBlock(), createBlock("li", {
                  class: "filter__item",
                  key: index
                }, [
                  createVNode(_component_revealing_list_node, {
                    onApply: ($event) => _ctx.$emit("updateFilter"),
                    name: attr.slug,
                    onSetDefault: ($event) => $options.setDefaultAttribute(attr.slug),
                    bodyLoaded: attr.slug ? true : false
                  }, {
                    title: withCtx(() => [
                      createTextVNode(toDisplayString(attr.name), 1)
                    ]),
                    main: withCtx(() => [
                      createVNode("ul", { class: "filter__sub-list" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(this[attr.slug], ({ id, name }) => {
                          return openBlock(), createBlock("li", {
                            class: "filter__sub-item",
                            key: id
                          }, [
                            createVNode(_component_input_checkbox_node, {
                              modelValue: $options.filterParamsChecked(attr.slug, id),
                              labelText: name,
                              onInput: ($event) => $options.updateRevealing({
                                type: attr.slug,
                                value: { id, name }
                              })
                            }, null, 8, ["modelValue", "labelText", "onInput"])
                          ]);
                        }), 128))
                      ])
                    ]),
                    _: 2
                  }, 1032, ["onApply", "name", "onSetDefault", "bodyLoaded"])
                ]);
              }), 128)),
              createVNode("li", { class: "filter__item" }, [
                createVNode(_component_input_checkbox_node, {
                  modelValue: $data.onlineOnly,
                  "onUpdate:modelValue": ($event) => $data.onlineOnly = $event,
                  labelText: "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043E\u043D\u043B\u0430\u0439\u043D"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ])
            ]),
            createVNode(_component_button_node, {
              onClick: $options.filterCleanAndLoadDefault,
              class: "filter__button filter__button_clean"
            }, {
              default: withCtx(() => [
                createTextVNode("\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B")
              ]),
              _: 1
            }, 8, ["onClick"])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section>`);
}
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/FilterNode.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const FilterNode = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["ssrRender", _sfc_ssrRender$u], ["__scopeId", "data-v-0855e865"]]);
const CatalogProductsNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$t = {
  components: {
    ProductNode
  },
  mixins: [itemsLoadHandler],
  data() {
    return {};
  },
  watch: {
    itemsPaginated: {
      handler(newValue, oldValue) {
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      filtredProducts: "products/filtredProducts",
      productsIds: "products/productsIds"
    }),
    ...mapState({
      productRequest: (state2) => state2.products.basedRequest,
      itemsPaginated: (state2) => state2.products.itemsPaginated
    }),
    products() {
      return this.itemsLoadHandler(this.filtredProducts, 8);
    }
  },
  methods: {
    ...mapActions({
      getItems: "getItems"
    }),
    ...mapMutations({
      setExclude: "products/setExclude"
    })
  },
  mounted() {
  }
};
function _sfc_ssrRender$t(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_preload_wrap_node = resolveComponent("preload-wrap-node");
  const _component_product_node = resolveComponent("product-node");
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["catalog-products", _ctx.itemsLoaded ? "" : "products-loading"]
  }, _attrs))}><!--[-->`);
  ssrRenderList($options.products, (product, index) => {
    _push(ssrRenderComponent(_component_preload_wrap_node, {
      key: index,
      targetPreloadElement: product ? false : true,
      paddingBottom: product ? 0 : 180
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          if (product) {
            _push2(ssrRenderComponent(_component_product_node, { product }, null, _parent2, _scopeId));
          } else {
            _push2(`<!---->`);
          }
        } else {
          return [
            product ? (openBlock(), createBlock(_component_product_node, {
              key: 0,
              product
            }, null, 8, ["product"])) : createCommentVNode("", true)
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/CatalogProductsNode.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const CatalogProductsNode = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["ssrRender", _sfc_ssrRender$t]]);
const SingleSubCategory_vue_vue_type_style_index_0_lang = "";
const _sfc_main$s = {
  components: {
    RevealingListNode,
    CatalogSidebarNode,
    FilterNode,
    CatalogProductsNode,
    PaginationNode,
    PageContentNode,
    DistributionNode,
    MainPageNode
  },
  props: {
    params: {
      mainCategorySlug: String,
      categorySlug: String
    },
    query: Object
  },
  data() {
    return {
      initMarker: false
    };
  },
  watch: {
    async categoryId(newValue) {
      if (newValue !== null && !this.initMarker) {
        this.initCatalog();
      }
    },
    page(newValue) {
      if (newValue != this.query.page) {
        this.loadMoreProducts();
      }
    }
  },
  computed: {
    ...mapGetters({
      itemBySlug: "itemBySlug",
      total: "total",
      requestByItemParam: "requestByItemParam"
    }),
    ...mapState({
      productsRequest: (state2) => state2.products.basedRequest,
      productsCategoriesRequest: (state2) => state2.productsCategories.basedRequest,
      totalProducts: (state2) => state2.products.total,
      totalPages: (state2) => state2.products.totalPages,
      page: (state2) => state2.products.basedRequest.params.page,
      loading: (state2) => state2.site.loading,
      pagesRequest: (state2) => state2.pages.basedRequest,
      sortOptions: (state2) => state2.filter.defaultValues.sort,
      categoryId: (state2) => state2.filter.params.category,
      orderAndOrderBy: (state2) => state2.filter.params.orderAndOrderBy
    }),
    category() {
      return this.itemBySlug({
        type: this.productsCategoriesRequest.type,
        slug: this.params.categorySlug
      });
    },
    mainCategory() {
      return this.itemBySlug({
        type: this.productsCategoriesRequest.type,
        slug: this.params.mainCategorySlug
      });
    },
    templatePage() {
      return this.itemBySlug({
        type: this.pagesRequest.type,
        slug: this.params.categorySlug
      });
    },
    total() {
      if (isEmpty(this.mainCategory))
        return;
      return this.mainCategory.count;
    }
  },
  methods: {
    ...mapMutations({
      setCategoryId: "filter/setCategoryId",
      setTotalPages: "products/setTotalPages",
      setTotal: "products/setTotal",
      setPage: "filter/setPage",
      setItemsPaginated: "products/setItemsPaginated",
      SET_SINGLE_PARAM: "SET_SINGLE_PARAM",
      setOrderAndOrderBy: "filter/setOrderAndOrderBy"
    }),
    ...mapActions({
      getItems: "getItems",
      updateRequestParams: "products/updateRequestParams",
      filterAndPaginate: "products/filterAndPaginate",
      changePage: "products/changePage",
      validateValues: "filter/validateValues",
      getSingleBySlug: "getSingleBySlug"
    }),
    async updateFilter() {
      this.$router.push(await this.changePage(1));
      this.validateValues();
      this.updateRequestParams();
      this.filterAndPaginate();
      const { request } = await this.getItems(Object.assign({ onDownloadProgress: Function }, this.productsRequest));
      this.setTotalPages(request.totalPages);
      this.setItemsPaginated({
        pageNumber: request.params.page,
        value: request.data
      });
    },
    async loadMoreProducts() {
      const { request } = await this.getItems(this.productsRequest);
      this.setItemsPaginated({
        pageNumber: request.params.page,
        value: request.data
      });
    },
    async initCatalog() {
      if (this.query.page)
        this.setPage(this.query.page);
      await this.updateRequestParams();
      const { request } = await this.getItems(this.productsRequest);
      this.setTotalPages(request.totalPages);
      this.setItemsPaginated({
        pageNumber: request.params.page,
        value: request.data
      });
      this.initMarker = true;
    },
    getTemplatePage() {
      this.getSingleBySlug({
        basedRequest: this.pagesRequest,
        params: { slug: this.params.categorySlug }
      });
    },
    equalOptionSort(value) {
      return isEqual(value, this.orderAndOrderBy);
    }
  },
  created() {
    this.setCategoryId(this.category.id);
    this.getTemplatePage();
  },
  beforeUpdate() {
    this.initMarker = false;
    this.setCategoryId(this.category.id);
    this.getTemplatePage();
  }
};
function _sfc_ssrRender$s(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_main_page_node = resolveComponent("main-page-node");
  const _component_filter_node = resolveComponent("filter-node");
  const _component_container_node = resolveComponent("container-node");
  const _component_catalog_sidebar_node = resolveComponent("catalog-sidebar-node");
  const _component_revealing_list_node = resolveComponent("revealing-list-node");
  const _component_input_radio_node = resolveComponent("input-radio-node");
  const _component_catalog_products_node = resolveComponent("catalog-products-node");
  const _component_pagination_node = resolveComponent("pagination-node");
  const _component_page_content_node = resolveComponent("page-content-node");
  const _component_distribution_node = resolveComponent("distribution-node");
  _push(ssrRenderComponent(_component_main_page_node, mergeProps({
    templatePage: $options.templatePage,
    category: $options.category
  }, _attrs), {
    "page-main": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_filter_node, { onUpdateFilter: $options.updateFilter }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_container_node, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="catalog__body"${_scopeId2}><div class="catalog__main"${_scopeId2}><div class="catalog__sidebar"${_scopeId2}>`);
              if ($options.mainCategory && $options.category) {
                _push3(ssrRenderComponent(_component_catalog_sidebar_node, {
                  mainCategory: $options.mainCategory,
                  category: $options.category,
                  total: $options.total
                }, null, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
              _push3(`</div><div class="catalog__products"${_scopeId2}><div class="catalog__sorting"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_revealing_list_node, {
                bodyLoaded: _ctx.sortOptions ? true : false,
                onApply: $options.updateFilter,
                name: "sorting"
              }, {
                title: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430`);
                  } else {
                    return [
                      createTextVNode("\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430")
                    ];
                  }
                }),
                main: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList(_ctx.sortOptions, (option) => {
                      _push4(ssrRenderComponent(_component_input_radio_node, {
                        modelValue: $options.equalOptionSort(option),
                        labelText: option.name,
                        onInput: ($event) => _ctx.setOrderAndOrderBy(option),
                        checked: option.id === 0,
                        name: "sort",
                        key: option.id
                      }, null, _parent4, _scopeId3));
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.sortOptions, (option) => {
                        return openBlock(), createBlock(_component_input_radio_node, {
                          modelValue: $options.equalOptionSort(option),
                          labelText: option.name,
                          onInput: ($event) => _ctx.setOrderAndOrderBy(option),
                          checked: option.id === 0,
                          name: "sort",
                          key: option.id
                        }, null, 8, ["modelValue", "labelText", "onInput", "checked"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div>`);
              _push3(ssrRenderComponent(_component_catalog_products_node, { categoryId: _ctx.categoryId }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_pagination_node, {
                type: _ctx.productsRequest.type
              }, null, _parent3, _scopeId2));
              _push3(`</div></div></div>`);
              if ($options.templatePage) {
                _push3(ssrRenderComponent(_component_page_content_node, { page: $options.templatePage }, null, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
              _push3(ssrRenderComponent(_component_distribution_node, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "catalog__body" }, [
                  createVNode("div", { class: "catalog__main" }, [
                    createVNode("div", { class: "catalog__sidebar" }, [
                      $options.mainCategory && $options.category ? (openBlock(), createBlock(_component_catalog_sidebar_node, {
                        key: 0,
                        mainCategory: $options.mainCategory,
                        category: $options.category,
                        total: $options.total
                      }, null, 8, ["mainCategory", "category", "total"])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "catalog__products" }, [
                      createVNode("div", { class: "catalog__sorting" }, [
                        createVNode(_component_revealing_list_node, {
                          bodyLoaded: _ctx.sortOptions ? true : false,
                          onApply: $options.updateFilter,
                          name: "sorting"
                        }, {
                          title: withCtx(() => [
                            createTextVNode("\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430")
                          ]),
                          main: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.sortOptions, (option) => {
                              return openBlock(), createBlock(_component_input_radio_node, {
                                modelValue: $options.equalOptionSort(option),
                                labelText: option.name,
                                onInput: ($event) => _ctx.setOrderAndOrderBy(option),
                                checked: option.id === 0,
                                name: "sort",
                                key: option.id
                              }, null, 8, ["modelValue", "labelText", "onInput", "checked"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["bodyLoaded", "onApply"])
                      ]),
                      createVNode(_component_catalog_products_node, { categoryId: _ctx.categoryId }, null, 8, ["categoryId"]),
                      createVNode(_component_pagination_node, {
                        type: _ctx.productsRequest.type
                      }, null, 8, ["type"])
                    ])
                  ])
                ]),
                $options.templatePage ? (openBlock(), createBlock(_component_page_content_node, {
                  key: 0,
                  page: $options.templatePage
                }, null, 8, ["page"])) : createCommentVNode("", true),
                createVNode(_component_distribution_node)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_filter_node, { onUpdateFilter: $options.updateFilter }, null, 8, ["onUpdateFilter"]),
          createVNode(_component_container_node, null, {
            default: withCtx(() => [
              createVNode("div", { class: "catalog__body" }, [
                createVNode("div", { class: "catalog__main" }, [
                  createVNode("div", { class: "catalog__sidebar" }, [
                    $options.mainCategory && $options.category ? (openBlock(), createBlock(_component_catalog_sidebar_node, {
                      key: 0,
                      mainCategory: $options.mainCategory,
                      category: $options.category,
                      total: $options.total
                    }, null, 8, ["mainCategory", "category", "total"])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "catalog__products" }, [
                    createVNode("div", { class: "catalog__sorting" }, [
                      createVNode(_component_revealing_list_node, {
                        bodyLoaded: _ctx.sortOptions ? true : false,
                        onApply: $options.updateFilter,
                        name: "sorting"
                      }, {
                        title: withCtx(() => [
                          createTextVNode("\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430")
                        ]),
                        main: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.sortOptions, (option) => {
                            return openBlock(), createBlock(_component_input_radio_node, {
                              modelValue: $options.equalOptionSort(option),
                              labelText: option.name,
                              onInput: ($event) => _ctx.setOrderAndOrderBy(option),
                              checked: option.id === 0,
                              name: "sort",
                              key: option.id
                            }, null, 8, ["modelValue", "labelText", "onInput", "checked"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["bodyLoaded", "onApply"])
                    ]),
                    createVNode(_component_catalog_products_node, { categoryId: _ctx.categoryId }, null, 8, ["categoryId"]),
                    createVNode(_component_pagination_node, {
                      type: _ctx.productsRequest.type
                    }, null, 8, ["type"])
                  ])
                ])
              ]),
              $options.templatePage ? (openBlock(), createBlock(_component_page_content_node, {
                key: 0,
                page: $options.templatePage
              }, null, 8, ["page"])) : createCommentVNode("", true),
              createVNode(_component_distribution_node)
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/SingleSubCategory.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const SingleSubCategory = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["ssrRender", _sfc_ssrRender$s]]);
const _sfc_main$r = {
  inheritAttrs: false,
  props: {
    quantityPreloadElements: Number,
    iterable: {
      type: [Array, Object]
    }
  },
  computed: {
    arrayPreloadElements() {
      return [...Array(this.quantityPreloadElements).keys()];
    },
    iterableHandled() {
      return isEmpty(this.iterable);
    }
  }
};
function _sfc_ssrRender$r(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_preload_wrap_node = resolveComponent("preload-wrap-node");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "preload-container" }, _attrs))}>`);
  if ($options.iterableHandled) {
    _push(`<div class="${ssrRenderClass(`${_ctx.$attrs.class}s`)}"><!--[-->`);
    ssrRenderList($options.arrayPreloadElements, (item, index) => {
      _push(ssrRenderComponent(_component_preload_wrap_node, {
        targetPreloadElement: true,
        paddingBottom: "35"
      }, null, _parent));
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div else class="${ssrRenderClass(`${_ctx.$attrs.class}s`)}"><!--[-->`);
  ssrRenderList($props.iterable, (cartItem, index) => {
    ssrRenderSlot(_ctx.$slots, "default", { cartItem }, null, _push, _parent);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/structure/PreloadWrapContainerNode.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const PreloadWrapContainerNode = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["ssrRender", _sfc_ssrRender$r]]);
const CategoryGrid_vue_vue_type_style_index_0_scoped_7512a97d_lang = "";
const _sfc_main$q = {
  components: {
    PreloadWrapContainerNode
  },
  mixins: [routeToCategoryMixin, itemsLoadHandler],
  props: {
    productCategory: {
      reqired: true,
      type: Object
    }
  },
  computed: {
    ...mapState({
      pCRequest: (state2) => state2.productsCategories.basedRequest
    }),
    ...mapGetters({
      itemsMatchedByCallback: "itemsMatchedByCallback",
      itemBySlug: "itemBySlug"
    }),
    productsCategories() {
      if (this.productCategory) {
        return this.itemsMatchedByCallback(
          this.pCRequest,
          {
            parent: this.productCategory.id
          },
          function(product, keys, params, items2, approved) {
            keys.forEach((key) => {
              if (items2.length === 6) {
                return void 0;
              }
              if (product[key] == params[key]) {
                approved = true;
              }
            });
            return approved;
          }
        );
      }
    }
  }
};
function _sfc_ssrRender$q(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_preload_wrap_node = resolveComponent("preload-wrap-node");
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "category-grid" }, _attrs))} data-v-7512a97d><div class="category-grid__body" data-v-7512a97d>`);
  if ($options.productsCategories === void 0 || $options.productsCategories.length === 0) {
    _push(`<div class="category-grid__items" data-v-7512a97d><!--[-->`);
    ssrRenderList([0, 1, 2, 3, 4, 5], (item, index) => {
      _push(`<article class="category-grid__item" data-v-7512a97d>`);
      _push(ssrRenderComponent(_component_preload_wrap_node, {
        targetPreloadElement: true,
        paddingBottom: "100"
      }, null, _parent));
      _push(`</article>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="category-grid__items" data-v-7512a97d><!--[-->`);
  ssrRenderList($options.productsCategories, (productCategory) => {
    _push(`<article class="category-grid__item" data-v-7512a97d>`);
    _push(ssrRenderComponent(_component_preload_wrap_node, null, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          if (productCategory) {
            _push2(`<button data-v-7512a97d${_scopeId}><div class="category-grid__image" data-v-7512a97d${_scopeId}>`);
            if (productCategory.image) {
              _push2(`<img${ssrRenderAttr("src", productCategory.image.src)} alt="" data-v-7512a97d${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="category-grid__content" data-v-7512a97d${_scopeId}><div class="category-grid__title" data-v-7512a97d${_scopeId}>${ssrInterpolate(productCategory.name)}</div><div class="category-grid__subtitle" data-v-7512a97d${_scopeId}>${ssrInterpolate(productCategory.description)}</div></div></button>`);
          } else {
            _push2(`<!---->`);
          }
        } else {
          return [
            productCategory ? (openBlock(), createBlock("button", {
              key: 0,
              onClick: ($event) => _ctx.routeToCategory(productCategory, productCategory.slug)
            }, [
              createVNode("div", { class: "category-grid__image" }, [
                productCategory.image ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: productCategory.image.src,
                  alt: ""
                }, null, 8, ["src"])) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "category-grid__content" }, [
                createVNode("div", { class: "category-grid__title" }, toDisplayString(productCategory.name), 1),
                createVNode("div", { class: "category-grid__subtitle" }, toDisplayString(productCategory.description), 1)
              ])
            ], 8, ["onClick"])) : createCommentVNode("", true)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</article>`);
  });
  _push(`<!--]--></div></div></section>`);
}
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/CategoryGrid.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const CategoryGrid = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["ssrRender", _sfc_ssrRender$q], ["__scopeId", "data-v-7512a97d"]]);
const SingleCategory_vue_vue_type_style_index_0_lang = "";
const _sfc_main$p = {
  components: {
    CatalogSidebarNode,
    CategoryGrid,
    SliderProductsNode,
    SliderBannersNode,
    MainPageNode
  },
  props: {
    params: {
      mainCategorySlug: String
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState({
      productsRequest: (state2) => state2.products.basedRequest,
      pCRequest: (state2) => state2.productsCategories.basedRequest,
      pagesRequest: (state2) => state2.pages.basedRequest
    }),
    ...mapGetters({
      itemBySlug: "itemBySlug",
      requestByItemParam: "requestByItemParam"
    }),
    productCategory() {
      return this.itemBySlug({
        type: this.pCRequest.type,
        slug: this.params.mainCategorySlug
      });
    },
    templatePage() {
      return this.itemBySlug({
        type: this.pagesRequest.type,
        slug: this.params.mainCategorySlug
      });
    },
    total() {
      if (isEmpty(this.productCategory))
        return;
      return this.productCategory.count;
    }
  },
  methods: {
    ...mapMutations({
      SET_SINGLE_PARAM: "SET_SINGLE_PARAM"
    }),
    ...mapActions({
      getSingleBySlug: "getSingleBySlug"
    }),
    async getTemplatePage() {
      this.getSingleBySlug({
        basedRequest: this.pagesRequest,
        params: { slug: this.params.mainCategorySlug }
      });
    },
    async getProductCategory() {
      if (isEmpty(this.productCategory)) {
        await this.getSingleBySlug({
          basedRequest: this.pCRequest,
          params: { slug: this.params.mainCategorySlug }
        });
      }
    }
  },
  created() {
    this.getTemplatePage(this.params.mainCategorySlug);
  }
};
function _sfc_ssrRender$p(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_main_page_node = resolveComponent("main-page-node");
  const _component_container_node = resolveComponent("container-node");
  const _component_catalog_sidebar_node = resolveComponent("catalog-sidebar-node");
  const _component_slider_banners_node = resolveComponent("slider-banners-node");
  const _component_category_grid = resolveComponent("category-grid");
  const _component_slider_products_node = resolveComponent("slider-products-node");
  _push(ssrRenderComponent(_component_main_page_node, mergeProps({
    templatePage: $options.templatePage,
    category: $options.productCategory
  }, _attrs), {
    "page-main": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_container_node, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<section class="main-category"${_scopeId2}><div class="main-category__main"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_catalog_sidebar_node, {
                mainCategory: $options.productCategory,
                total: $options.total
              }, null, _parent3, _scopeId2));
              _push3(`<div class="main-category__sections"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_slider_banners_node, {
                class: "slider-banners-main-category",
                bannerCategoryId: 68,
                containerStylesOff: true,
                identificator: "slider-banners-main_main-category",
                autoplay: { delay: 5e4, disableOnInteraction: false },
                pagination: "",
                "slides-per-view": 1
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_category_grid, { productCategory: $options.productCategory }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_slider_products_node, {
                title: "\u0414\u043B\u044F \u0436\u0435\u043D\u0449\u0438\u043D",
                productsCategoryId: "20",
                breakpoints: {
                  "320": {
                    slidesPerView: 2,
                    spaceBetween: 20
                  },
                  "768": {
                    slidesPerView: 3,
                    spaceBetween: 20
                  },
                  "1200": {
                    slidesPerView: 4,
                    spaceBetween: 30
                  }
                }
              }, null, _parent3, _scopeId2));
              _push3(`</div></div></section>`);
            } else {
              return [
                createVNode("section", { class: "main-category" }, [
                  createVNode("div", { class: "main-category__main" }, [
                    createVNode(_component_catalog_sidebar_node, {
                      mainCategory: $options.productCategory,
                      total: $options.total
                    }, null, 8, ["mainCategory", "total"]),
                    createVNode("div", { class: "main-category__sections" }, [
                      createVNode(_component_slider_banners_node, {
                        class: "slider-banners-main-category",
                        bannerCategoryId: 68,
                        containerStylesOff: true,
                        identificator: "slider-banners-main_main-category",
                        autoplay: { delay: 5e4, disableOnInteraction: false },
                        pagination: "",
                        "slides-per-view": 1
                      }),
                      createVNode(_component_category_grid, { productCategory: $options.productCategory }, null, 8, ["productCategory"]),
                      createVNode(_component_slider_products_node, {
                        title: "\u0414\u043B\u044F \u0436\u0435\u043D\u0449\u0438\u043D",
                        productsCategoryId: "20",
                        breakpoints: {
                          "320": {
                            slidesPerView: 2,
                            spaceBetween: 20
                          },
                          "768": {
                            slidesPerView: 3,
                            spaceBetween: 20
                          },
                          "1200": {
                            slidesPerView: 4,
                            spaceBetween: 30
                          }
                        }
                      })
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_container_node, null, {
            default: withCtx(() => [
              createVNode("section", { class: "main-category" }, [
                createVNode("div", { class: "main-category__main" }, [
                  createVNode(_component_catalog_sidebar_node, {
                    mainCategory: $options.productCategory,
                    total: $options.total
                  }, null, 8, ["mainCategory", "total"]),
                  createVNode("div", { class: "main-category__sections" }, [
                    createVNode(_component_slider_banners_node, {
                      class: "slider-banners-main-category",
                      bannerCategoryId: 68,
                      containerStylesOff: true,
                      identificator: "slider-banners-main_main-category",
                      autoplay: { delay: 5e4, disableOnInteraction: false },
                      pagination: "",
                      "slides-per-view": 1
                    }),
                    createVNode(_component_category_grid, { productCategory: $options.productCategory }, null, 8, ["productCategory"]),
                    createVNode(_component_slider_products_node, {
                      title: "\u0414\u043B\u044F \u0436\u0435\u043D\u0449\u0438\u043D",
                      productsCategoryId: "20",
                      breakpoints: {
                        "320": {
                          slidesPerView: 2,
                          spaceBetween: 20
                        },
                        "768": {
                          slidesPerView: 3,
                          spaceBetween: 20
                        },
                        "1200": {
                          slidesPerView: 4,
                          spaceBetween: 30
                        }
                      }
                    })
                  ])
                ])
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/SingleCategory.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const SingleCategory = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["ssrRender", _sfc_ssrRender$p]]);
const CartBtnNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$o = {
  props: {
    params: Object,
    route_base: String
  },
  data() {
    return {
      buttonDisabled: false,
      reqiredParams: false,
      message: {
        current: {
          name: "",
          type: ""
        },
        list: {
          default: {
            name: "",
            type: ""
          },
          added: {
            name: "added",
            type: "success"
          },
          sizeWrong: {
            name: "sizeWrong",
            type: "error"
          },
          allError: {
            name: "allError",
            type: "error"
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters({}),
    ...mapState({}),
    messageClasses() {
      return {
        "icon-check": this.message.current.type === "success",
        "error": this.message.current.type === "error"
      };
    }
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      updateCart: "cart/updateCart"
    }),
    async updateCartAndHandleResponse() {
      switch (this.route_base) {
        case "cart/add-item":
          const params = cloneDeep(this.params);
          params.variations = [];
          let valid = this.validationVariations();
          if (valid === false) {
            this.message.current = this.message.list.sizeWrong;
            return;
          }
          break;
        case "cart/remove-item":
          if (!this.params.hasOwnProperty("key")) {
            throw "Need cart-item key for delete";
          }
          break;
        case "cart/update-item":
          if (!this.params.hasOwnProperty("key") && this.params.hasOwnProperty("quantity")) {
            throw "Need cart-item params.key and/or params.quantity for update";
          }
          break;
        default:
          throw "\u041F\u043E\u043F\u044B\u0442\u043A\u0430 \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043D\u0435\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u0438\u043B\u0438 \u043D\u0435\u043E\u0436\u0438\u0434\u0430\u043D\u043D\u044B\u0439 (\u043D\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u043C\u044B\u0439) \u043C\u0430\u0440\u0448\u0440\u0443\u0442";
      }
      this.buttonDisabled = true;
      const requested = await this.updateCart({
        route_base: this.route_base,
        config: { params: this.params }
      });
      this.buttonDisabled = false;
      if (requested === void 0)
        this.message.current = this.message.list.allError;
      switch (this.route_base) {
        case "cart/add-item":
          this.message.current = this.message.list.added;
          break;
      }
    },
    validationVariations() {
      let valid = true;
      for (let index = 0; index < this.params.variations.length; index++) {
        const element = this.params.variations[index];
        if (element.value) {
          continue;
        } else {
          valid = false;
          break;
        }
      }
      return valid;
    }
  }
};
function _sfc_ssrRender$o(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_message_node = resolveComponent("message-node");
  if ($props.params) {
    _push(`<button${ssrRenderAttrs(mergeProps({
      class: "cart-btn",
      disabled: $data.buttonDisabled || $props.params.id === null
    }, _attrs))}>`);
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    _push(ssrRenderComponent(_component_message_node, {
      class: $options.messageClasses,
      onShowMessage: ($event) => $data.message.current = $data.message.list.default,
      show: $data.message.current.name
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          if ($data.message.current.name === "added") {
            _push2(`<!--[--> \u0422\u043E\u0432\u0430\u0440 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D.<button class="message-link"${_scopeId}> \u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437?</button><!--]-->`);
          } else if ($data.message.current.name === "allError") {
            _push2(`<!--[--> \u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438... <!--]-->`);
          } else if ($data.message.current.name === "sizeWrong") {
            _push2(`<!--[--> \u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440. <!--]-->`);
          } else {
            _push2(`<!---->`);
          }
        } else {
          return [
            $data.message.current.name === "added" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
              createTextVNode(" \u0422\u043E\u0432\u0430\u0440 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D."),
              createVNode("button", {
                onClick: ($event) => _ctx.$router.push({ name: "Checkout" }),
                class: "message-link"
              }, " \u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437?", 8, ["onClick"])
            ], 64)) : $data.message.current.name === "allError" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
              createTextVNode(" \u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438... ")
            ], 64)) : $data.message.current.name === "sizeWrong" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
              createTextVNode(" \u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440. ")
            ], 64)) : createCommentVNode("", true)
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</button>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/cart-and-ordering/CartBtnNode.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const CartBtnNode = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["ssrRender", _sfc_ssrRender$o]]);
const SliderSingleNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$n = {
  inheritAttrs: false,
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    images: Array
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      windowWidth: (state2) => state2.common.windowWidth
    })
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({})
  },
  created() {
  },
  setup() {
    let thumbsSwiper = ref(null);
    function setThumbsSwiper(swiper) {
      thumbsSwiper.value = swiper;
    }
    const onSwiper = (swiper) => {
    };
    const onSlideChange = () => {
    };
    return {
      onSwiper,
      onSlideChange,
      thumbsSwiper,
      setThumbsSwiper,
      modules: [Thumbs]
    };
  }
};
function _sfc_ssrRender$n(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_container_node = resolveComponent("container-node");
  const _component_swiper = resolveComponent("swiper");
  const _component_swiper_slide = resolveComponent("swiper-slide");
  const _component_preload_wrap_node = resolveComponent("preload-wrap-node");
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "slider-single" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_container_node, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="slider-single__sliders sw-cont"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_swiper, {
          class: "slider-single__thumb-slider sw-cont",
          style: _ctx.windowWidth > 767 ? null : { display: "none" },
          onSwiper: $setup.setThumbsSwiper,
          watchSlidesProgress: true,
          modules: $setup.modules,
          breakpoints: {
            "320": {
              spaceBetween: "15",
              direction: "horizontal"
            },
            "768": {
              direction: "horizontal",
              slidesPerView: 3,
              spaceBetween: 0
            },
            "1024": {
              spaceBetween: 10,
              direction: "vertical",
              slidesPerView: "auto"
            }
          }
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              ssrRenderList($props.images, (image, index) => {
                _push3(ssrRenderComponent(_component_swiper_slide, { key: index }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<div class="slider-single__image"${_scopeId3}><picture${_scopeId3}><source srcset="" type="image/webp"${_scopeId3}><source srcset="" type="image/jpeg"${_scopeId3}><img${ssrRenderAttr("src", image == null ? void 0 : image.src)} alt=""${_scopeId3}></picture></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "slider-single__image" }, [
                          createVNode("picture", null, [
                            createVNode("source", {
                              srcset: "",
                              type: "image/webp"
                            }),
                            createVNode("source", {
                              srcset: "",
                              type: "image/jpeg"
                            }),
                            createVNode("img", {
                              src: image == null ? void 0 : image.src,
                              alt: ""
                            }, null, 8, ["src"])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList($props.images, (image, index) => {
                  return openBlock(), createBlock(_component_swiper_slide, { key: index }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "slider-single__image" }, [
                        createVNode("picture", null, [
                          createVNode("source", {
                            srcset: "",
                            type: "image/webp"
                          }),
                          createVNode("source", {
                            srcset: "",
                            type: "image/jpeg"
                          }),
                          createVNode("img", {
                            src: image == null ? void 0 : image.src,
                            alt: ""
                          }, null, 8, ["src"])
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper, mergeProps({ class: "slider-single__main-slider sw-cont" }, _ctx.$attrs, {
          thumbs: { swiper: $setup.thumbsSwiper },
          modules: $setup.modules,
          onSwiper: $setup.onSwiper,
          breakpoints: {
            "768": {
              slidesPerView: 1
            },
            "1200": {
              slidesPerView: 2
            }
          }
        }), {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              ssrRenderList($props.images, (image, index) => {
                _push3(ssrRenderComponent(_component_swiper_slide, { key: index }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_preload_wrap_node, {
                        paddingBottom: (image == null ? void 0 : image.src) ? "" : 50,
                        targetPreloadElement: (image == null ? void 0 : image.src) ? false : true
                      }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<div class="slider-single__image"${_scopeId4}><picture${_scopeId4}><source srcset="" type="image/webp"${_scopeId4}><source srcset="" type="image/jpeg"${_scopeId4}><img${ssrRenderAttr("src", image == null ? void 0 : image.src)} alt=""${_scopeId4}></picture></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "slider-single__image" }, [
                                createVNode("picture", null, [
                                  createVNode("source", {
                                    srcset: "",
                                    type: "image/webp"
                                  }),
                                  createVNode("source", {
                                    srcset: "",
                                    type: "image/jpeg"
                                  }),
                                  createVNode("img", {
                                    src: image == null ? void 0 : image.src,
                                    alt: ""
                                  }, null, 8, ["src"])
                                ])
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_preload_wrap_node, {
                          paddingBottom: (image == null ? void 0 : image.src) ? "" : 50,
                          targetPreloadElement: (image == null ? void 0 : image.src) ? false : true
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "slider-single__image" }, [
                              createVNode("picture", null, [
                                createVNode("source", {
                                  srcset: "",
                                  type: "image/webp"
                                }),
                                createVNode("source", {
                                  srcset: "",
                                  type: "image/jpeg"
                                }),
                                createVNode("img", {
                                  src: image == null ? void 0 : image.src,
                                  alt: ""
                                }, null, 8, ["src"])
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["paddingBottom", "targetPreloadElement"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList($props.images, (image, index) => {
                  return openBlock(), createBlock(_component_swiper_slide, { key: index }, {
                    default: withCtx(() => [
                      createVNode(_component_preload_wrap_node, {
                        paddingBottom: (image == null ? void 0 : image.src) ? "" : 50,
                        targetPreloadElement: (image == null ? void 0 : image.src) ? false : true
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "slider-single__image" }, [
                            createVNode("picture", null, [
                              createVNode("source", {
                                srcset: "",
                                type: "image/webp"
                              }),
                              createVNode("source", {
                                srcset: "",
                                type: "image/jpeg"
                              }),
                              createVNode("img", {
                                src: image == null ? void 0 : image.src,
                                alt: ""
                              }, null, 8, ["src"])
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["paddingBottom", "targetPreloadElement"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "slider-single__sliders sw-cont" }, [
            withDirectives(createVNode(_component_swiper, {
              class: "slider-single__thumb-slider sw-cont",
              onSwiper: $setup.setThumbsSwiper,
              watchSlidesProgress: true,
              modules: $setup.modules,
              breakpoints: {
                "320": {
                  spaceBetween: "15",
                  direction: "horizontal"
                },
                "768": {
                  direction: "horizontal",
                  slidesPerView: 3,
                  spaceBetween: 0
                },
                "1024": {
                  spaceBetween: 10,
                  direction: "vertical",
                  slidesPerView: "auto"
                }
              }
            }, {
              default: withCtx(() => [
                (openBlock(true), createBlock(Fragment, null, renderList($props.images, (image, index) => {
                  return openBlock(), createBlock(_component_swiper_slide, { key: index }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "slider-single__image" }, [
                        createVNode("picture", null, [
                          createVNode("source", {
                            srcset: "",
                            type: "image/webp"
                          }),
                          createVNode("source", {
                            srcset: "",
                            type: "image/jpeg"
                          }),
                          createVNode("img", {
                            src: image == null ? void 0 : image.src,
                            alt: ""
                          }, null, 8, ["src"])
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ]),
              _: 1
            }, 8, ["onSwiper", "modules"]), [
              [vShow, _ctx.windowWidth > 767]
            ]),
            createVNode(_component_swiper, mergeProps({ class: "slider-single__main-slider sw-cont" }, _ctx.$attrs, {
              thumbs: { swiper: $setup.thumbsSwiper },
              modules: $setup.modules,
              onSwiper: $setup.onSwiper,
              breakpoints: {
                "768": {
                  slidesPerView: 1
                },
                "1200": {
                  slidesPerView: 2
                }
              }
            }), {
              default: withCtx(() => [
                (openBlock(true), createBlock(Fragment, null, renderList($props.images, (image, index) => {
                  return openBlock(), createBlock(_component_swiper_slide, { key: index }, {
                    default: withCtx(() => [
                      createVNode(_component_preload_wrap_node, {
                        paddingBottom: (image == null ? void 0 : image.src) ? "" : 50,
                        targetPreloadElement: (image == null ? void 0 : image.src) ? false : true
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "slider-single__image" }, [
                            createVNode("picture", null, [
                              createVNode("source", {
                                srcset: "",
                                type: "image/webp"
                              }),
                              createVNode("source", {
                                srcset: "",
                                type: "image/jpeg"
                              }),
                              createVNode("img", {
                                src: image == null ? void 0 : image.src,
                                alt: ""
                              }, null, 8, ["src"])
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["paddingBottom", "targetPreloadElement"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ]),
              _: 1
            }, 16, ["thumbs", "modules", "onSwiper"])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section>`);
}
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/sliders/SliderSingleNode.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const SliderSingleNode = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["ssrRender", _sfc_ssrRender$n]]);
const SocialNetworksNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$m = {};
function _sfc_ssrRender$m(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_button_node = resolveComponent("button-node");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "social-networks" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_button_node, { class: "social-networks__button icon icon-image_tg" }, null, _parent));
  _push(ssrRenderComponent(_component_button_node, { class: "social-networks__button icon icon-image_vk" }, null, _parent));
  _push(ssrRenderComponent(_component_button_node, { class: "social-networks__button icon icon-image_ms" }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SocialNetworksNode.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const SocialNetworksNode = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["ssrRender", _sfc_ssrRender$m]]);
const SingleProduct_vue_vue_type_style_index_0_lang = "";
const _sfc_main$l = {
  components: {
    CartBtnNode,
    SliderBannersFashionBlogNode,
    SliderSingleNode,
    SliderProductsNode,
    SocialNetworksNode,
    DistributionNode,
    ProductPricesNode,
    MainPageNode
  },
  props: {
    params: {
      productSlug: String
    },
    query: {}
  },
  data() {
    return {
      cartItemParams: {
        id: null,
        quantity: 1,
        variations: [
          {
            name: "size",
            value: ""
          }
        ]
      },
      slidersData: {
        breakpoints: {
          singleMain: {
            320: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20
            }
          }
        }
      }
    };
  },
  watch: {
    product(newValue) {
      if (!isEmpty(newValue)) {
        this.cartItemParams.id = newValue.id;
      }
    }
  },
  computed: {
    ...mapGetters({
      itemBySlug: "itemBySlug"
    }),
    ...mapState({
      productsRequest: (state2) => state2.products.basedRequest
    }),
    product() {
      return this.itemBySlug({
        type: this.productsRequest.type,
        slug: this.params.productSlug
      });
    }
  },
  methods: {
    ...mapMutations({
      setCategoryId: "filter/setCategoryId"
    }),
    ...mapActions({
      getItems: "getItems",
      getSingleBySlug: "getSingleBySlug"
    }),
    attribute(attrId) {
      if (isEmpty(this.product))
        return;
      return this.product.attributes.find((i) => i.id == attrId);
    },
    async getProduct() {
      var _a;
      if (isEmpty(this.product)) {
        await this.getSingleBySlug({
          basedRequest: this.productsRequest,
          params: { slug: this.params.productSlug, per_page: 1 }
        });
      }
      this.cartItemParams.id = (_a = this.product) == null ? void 0 : _a.id;
    },
    setVariation(attribute, value) {
      let settedValue = this.cartItemParams.variations[0].value;
      this.cartItemParams.variations[0].value = settedValue ? "" : value;
    }
  },
  created() {
    this.getProduct();
  },
  mounted() {
    new Sticky(".sidebar-single", {
      wrap: false,
      marginTop: 100,
      marginBottom: 100,
      stickyFor: 1024,
      stickyClass: "stuck",
      stickyContainer: ".single__main"
    });
  }
};
function _sfc_ssrRender$l(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_main_page_node = resolveComponent("main-page-node");
  const _component_container_node = resolveComponent("container-node");
  const _component_slider_single_node = resolveComponent("slider-single-node");
  const _component_button_node = resolveComponent("button-node");
  const _component_product_prices_node = resolveComponent("product-prices-node");
  const _component_cart_btn_node = resolveComponent("cart-btn-node");
  const _component_social_networks_node = resolveComponent("social-networks-node");
  const _component_slider_products_node = resolveComponent("slider-products-node");
  const _component_slider_banners_fashion_blog_node = resolveComponent("slider-banners-fashion-blog-node");
  const _component_distribution_node = resolveComponent("distribution-node");
  _push(ssrRenderComponent(_component_main_page_node, mergeProps({
    category: $options.product ? $options.product.categories[1] : void 0,
    additionalTitle: $options.product ? $options.product.name : void 0
  }, _attrs), {
    "page-main": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="single"${_scopeId}><div class="single__body"${_scopeId}><div class="single__main"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_container_node, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
            if (_push3) {
              _push3(`<div class="single__columns"${_scopeId2}><div class="single__content content-single sw-cont"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_slider_single_node, {
                images: (_a = $options.product) == null ? void 0 : _a.images
              }, null, _parent3, _scopeId2));
              _push3(`</div><div class="single__sidebar sidebar-single"${_scopeId2}><div class="sidebar-single__item sidebar-single__top"${_scopeId2}><h1 class="sidebar-single__title"${_scopeId2}>${ssrInterpolate((_b = $options.attribute(1)) == null ? void 0 : _b.options[0])} <span${_scopeId2}>${ssrInterpolate((_c = $options.product) == null ? void 0 : _c.name)}</span></h1><div class="sidebar-single__brand"${_scopeId2}><span${_scopeId2}>${ssrInterpolate((_d = $options.attribute(1)) == null ? void 0 : _d.options[0])}</span></div></div><div class="sidebar-single__item sidebar-single__sizes"${_scopeId2}><div class="sidebar-single__sizes-top"${_scopeId2}><button${_scopeId2}>\u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440</button></div><ul${_scopeId2}><!--[-->`);
              ssrRenderList((_e = $options.attribute(4)) == null ? void 0 : _e.options, (index, size) => {
                var _a2;
                _push3(`<li${_scopeId2}>`);
                _push3(ssrRenderComponent(_component_button_node, {
                  class: $data.cartItemParams.variations[0].value && ((_a2 = $options.attribute(4)) == null ? void 0 : _a2.options[size]) === $data.cartItemParams.variations[0].value ? "checked" : "",
                  onClick: ($event) => {
                    var _a3;
                    return $options.setVariation(
                      $options.attribute(4),
                      (_a3 = $options.attribute(4)) == null ? void 0 : _a3.options[size]
                    );
                  }
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    var _a3, _b2;
                    if (_push4) {
                      _push4(`${ssrInterpolate((_a3 = $options.attribute(4)) == null ? void 0 : _a3.options[size])}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString((_b2 = $options.attribute(4)) == null ? void 0 : _b2.options[size]), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
                _push3(`</li>`);
              });
              _push3(`<!--]--></ul></div>`);
              _push3(ssrRenderComponent(_component_product_prices_node, {
                class: "sidebar-single__item sidebar-single__prices",
                pricesObject: $options.product
              }, null, _parent3, _scopeId2));
              _push3(`<div class="sidebar-single__item sidebar-single__actions"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_cart_btn_node, {
                class: "sidebar-single__addtocart button button_dark cart-btn_textabele",
                params: $data.cartItemParams,
                route_base: "cart/add-item"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`\u041A\u0443\u043F\u0438\u0442\u044C`);
                  } else {
                    return [
                      createTextVNode("\u041A\u0443\u043F\u0438\u0442\u044C")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_button_node, { class: "sidebar-single__favorite icon icon-favorite" }, null, _parent3, _scopeId2));
              _push3(`</div>`);
              _push3(ssrRenderComponent(_component_social_networks_node, { class: "sidebar-single__item" }, null, _parent3, _scopeId2));
              _push3(`</div></div><div class="single__rows"${_scopeId2}><div class="single__row single__data data-single"${_scopeId2}><div class="data-single__info"${_scopeId2}><div class="data-single__title"${_scopeId2}>\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0442\u043E\u0432\u0430\u0440\u0435</div><ul class="data-single__list"${_scopeId2}><!--[-->`);
              ssrRenderList((_f = $options.product) == null ? void 0 : _f.attributes, (attr, index) => {
                _push3(`<li${_scopeId2}><span class="data-single__name"${_scopeId2}>${ssrInterpolate(attr.name)}</span><ul class="data-single__values"${_scopeId2}><!--[-->`);
                ssrRenderList(attr.options, (term, index2) => {
                  _push3(`<li class="data-single__value"${_scopeId2}>${ssrInterpolate(term)}</li>`);
                });
                _push3(`<!--]--></ul></li>`);
              });
              _push3(`<!--]--></ul></div></div><div class="single__row"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_slider_products_node, {
                title: "\u0421\u043E\u043F\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u044B",
                productsCategoryId: "20",
                breakpoints: $data.slidersData.breakpoints.singleMain
              }, null, _parent3, _scopeId2));
              _push3(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "single__columns" }, [
                  createVNode("div", { class: "single__content content-single sw-cont" }, [
                    createVNode(_component_slider_single_node, {
                      images: (_g = $options.product) == null ? void 0 : _g.images
                    }, null, 8, ["images"])
                  ]),
                  createVNode("div", { class: "single__sidebar sidebar-single" }, [
                    createVNode("div", { class: "sidebar-single__item sidebar-single__top" }, [
                      createVNode("h1", { class: "sidebar-single__title" }, [
                        createTextVNode(toDisplayString((_h = $options.attribute(1)) == null ? void 0 : _h.options[0]) + " ", 1),
                        createVNode("span", null, toDisplayString((_i = $options.product) == null ? void 0 : _i.name), 1)
                      ]),
                      createVNode("div", { class: "sidebar-single__brand" }, [
                        createVNode("span", null, toDisplayString((_j = $options.attribute(1)) == null ? void 0 : _j.options[0]), 1)
                      ])
                    ]),
                    createVNode("div", { class: "sidebar-single__item sidebar-single__sizes" }, [
                      createVNode("div", { class: "sidebar-single__sizes-top" }, [
                        createVNode("button", null, "\u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440")
                      ]),
                      createVNode("ul", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList((_k = $options.attribute(4)) == null ? void 0 : _k.options, (index, size) => {
                          var _a2;
                          return openBlock(), createBlock("li", { key: index }, [
                            createVNode(_component_button_node, {
                              class: $data.cartItemParams.variations[0].value && ((_a2 = $options.attribute(4)) == null ? void 0 : _a2.options[size]) === $data.cartItemParams.variations[0].value ? "checked" : "",
                              onClick: ($event) => {
                                var _a3;
                                return $options.setVariation(
                                  $options.attribute(4),
                                  (_a3 = $options.attribute(4)) == null ? void 0 : _a3.options[size]
                                );
                              }
                            }, {
                              default: withCtx(() => {
                                var _a3;
                                return [
                                  createTextVNode(toDisplayString((_a3 = $options.attribute(4)) == null ? void 0 : _a3.options[size]), 1)
                                ];
                              }),
                              _: 2
                            }, 1032, ["class", "onClick"])
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode(_component_product_prices_node, {
                      class: "sidebar-single__item sidebar-single__prices",
                      pricesObject: $options.product
                    }, null, 8, ["pricesObject"]),
                    createVNode("div", { class: "sidebar-single__item sidebar-single__actions" }, [
                      createVNode(_component_cart_btn_node, {
                        class: "sidebar-single__addtocart button button_dark cart-btn_textabele",
                        params: $data.cartItemParams,
                        route_base: "cart/add-item"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u041A\u0443\u043F\u0438\u0442\u044C")
                        ]),
                        _: 1
                      }, 8, ["params"]),
                      createVNode(_component_button_node, { class: "sidebar-single__favorite icon icon-favorite" })
                    ]),
                    createVNode(_component_social_networks_node, { class: "sidebar-single__item" })
                  ])
                ]),
                createVNode("div", { class: "single__rows" }, [
                  createVNode("div", { class: "single__row single__data data-single" }, [
                    createVNode("div", { class: "data-single__info" }, [
                      createVNode("div", { class: "data-single__title" }, "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0442\u043E\u0432\u0430\u0440\u0435"),
                      createVNode("ul", { class: "data-single__list" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList((_l = $options.product) == null ? void 0 : _l.attributes, (attr, index) => {
                          return openBlock(), createBlock("li", { key: index }, [
                            createVNode("span", { class: "data-single__name" }, toDisplayString(attr.name), 1),
                            createVNode("ul", { class: "data-single__values" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(attr.options, (term, index2) => {
                                return openBlock(), createBlock("li", {
                                  key: index2,
                                  class: "data-single__value"
                                }, toDisplayString(term), 1);
                              }), 128))
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "single__row" }, [
                    createVNode(_component_slider_products_node, {
                      title: "\u0421\u043E\u043F\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u044B",
                      productsCategoryId: "20",
                      breakpoints: $data.slidersData.breakpoints.singleMain
                    }, null, 8, ["breakpoints"])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div><div class="single__bottom"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_slider_products_node, {
          title: "\u0421 \u044D\u0442\u0438\u043C \u0442\u043E\u0432\u0430\u0440\u043E\u043C \u0442\u0430\u043A\u0436\u0435 \u043F\u043E\u043A\u0443\u043F\u0430\u044E\u0442",
          productsCategoryId: "20"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_slider_banners_fashion_blog_node, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_distribution_node, null, null, _parent2, _scopeId));
        _push2(`</div></div></div>`);
      } else {
        return [
          createVNode("div", { class: "single" }, [
            createVNode("div", { class: "single__body" }, [
              createVNode("div", { class: "single__main" }, [
                createVNode(_component_container_node, null, {
                  default: withCtx(() => {
                    var _a, _b, _c, _d, _e, _f;
                    return [
                      createVNode("div", { class: "single__columns" }, [
                        createVNode("div", { class: "single__content content-single sw-cont" }, [
                          createVNode(_component_slider_single_node, {
                            images: (_a = $options.product) == null ? void 0 : _a.images
                          }, null, 8, ["images"])
                        ]),
                        createVNode("div", { class: "single__sidebar sidebar-single" }, [
                          createVNode("div", { class: "sidebar-single__item sidebar-single__top" }, [
                            createVNode("h1", { class: "sidebar-single__title" }, [
                              createTextVNode(toDisplayString((_b = $options.attribute(1)) == null ? void 0 : _b.options[0]) + " ", 1),
                              createVNode("span", null, toDisplayString((_c = $options.product) == null ? void 0 : _c.name), 1)
                            ]),
                            createVNode("div", { class: "sidebar-single__brand" }, [
                              createVNode("span", null, toDisplayString((_d = $options.attribute(1)) == null ? void 0 : _d.options[0]), 1)
                            ])
                          ]),
                          createVNode("div", { class: "sidebar-single__item sidebar-single__sizes" }, [
                            createVNode("div", { class: "sidebar-single__sizes-top" }, [
                              createVNode("button", null, "\u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440")
                            ]),
                            createVNode("ul", null, [
                              (openBlock(true), createBlock(Fragment, null, renderList((_e = $options.attribute(4)) == null ? void 0 : _e.options, (index, size) => {
                                var _a2;
                                return openBlock(), createBlock("li", { key: index }, [
                                  createVNode(_component_button_node, {
                                    class: $data.cartItemParams.variations[0].value && ((_a2 = $options.attribute(4)) == null ? void 0 : _a2.options[size]) === $data.cartItemParams.variations[0].value ? "checked" : "",
                                    onClick: ($event) => {
                                      var _a3;
                                      return $options.setVariation(
                                        $options.attribute(4),
                                        (_a3 = $options.attribute(4)) == null ? void 0 : _a3.options[size]
                                      );
                                    }
                                  }, {
                                    default: withCtx(() => {
                                      var _a3;
                                      return [
                                        createTextVNode(toDisplayString((_a3 = $options.attribute(4)) == null ? void 0 : _a3.options[size]), 1)
                                      ];
                                    }),
                                    _: 2
                                  }, 1032, ["class", "onClick"])
                                ]);
                              }), 128))
                            ])
                          ]),
                          createVNode(_component_product_prices_node, {
                            class: "sidebar-single__item sidebar-single__prices",
                            pricesObject: $options.product
                          }, null, 8, ["pricesObject"]),
                          createVNode("div", { class: "sidebar-single__item sidebar-single__actions" }, [
                            createVNode(_component_cart_btn_node, {
                              class: "sidebar-single__addtocart button button_dark cart-btn_textabele",
                              params: $data.cartItemParams,
                              route_base: "cart/add-item"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("\u041A\u0443\u043F\u0438\u0442\u044C")
                              ]),
                              _: 1
                            }, 8, ["params"]),
                            createVNode(_component_button_node, { class: "sidebar-single__favorite icon icon-favorite" })
                          ]),
                          createVNode(_component_social_networks_node, { class: "sidebar-single__item" })
                        ])
                      ]),
                      createVNode("div", { class: "single__rows" }, [
                        createVNode("div", { class: "single__row single__data data-single" }, [
                          createVNode("div", { class: "data-single__info" }, [
                            createVNode("div", { class: "data-single__title" }, "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0442\u043E\u0432\u0430\u0440\u0435"),
                            createVNode("ul", { class: "data-single__list" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList((_f = $options.product) == null ? void 0 : _f.attributes, (attr, index) => {
                                return openBlock(), createBlock("li", { key: index }, [
                                  createVNode("span", { class: "data-single__name" }, toDisplayString(attr.name), 1),
                                  createVNode("ul", { class: "data-single__values" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(attr.options, (term, index2) => {
                                      return openBlock(), createBlock("li", {
                                        key: index2,
                                        class: "data-single__value"
                                      }, toDisplayString(term), 1);
                                    }), 128))
                                  ])
                                ]);
                              }), 128))
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "single__row" }, [
                          createVNode(_component_slider_products_node, {
                            title: "\u0421\u043E\u043F\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u044B",
                            productsCategoryId: "20",
                            breakpoints: $data.slidersData.breakpoints.singleMain
                          }, null, 8, ["breakpoints"])
                        ])
                      ])
                    ];
                  }),
                  _: 1
                })
              ]),
              createVNode("div", { class: "single__bottom" }, [
                createVNode(_component_slider_products_node, {
                  title: "\u0421 \u044D\u0442\u0438\u043C \u0442\u043E\u0432\u0430\u0440\u043E\u043C \u0442\u0430\u043A\u0436\u0435 \u043F\u043E\u043A\u0443\u043F\u0430\u044E\u0442",
                  productsCategoryId: "20"
                }),
                createVNode(_component_slider_banners_fashion_blog_node),
                createVNode(_component_distribution_node)
              ])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/SingleProduct.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const SingleProduct = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["ssrRender", _sfc_ssrRender$l]]);
const CartItemNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$k = {
  components: {
    CartBtnNode,
    ProductPricesNode
  },
  props: {
    cartItem: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      paramsRemoveItem: {
        key: this.cartItem.key
      },
      paramsUpdateMinusItem: {
        key: this.cartItem.key,
        quantity: this.cartItem.quantity - 1
      },
      paramsUpdatePlusItem: {
        key: this.cartItem.key,
        quantity: this.cartItem.quantity + 1
      }
    };
  },
  computed: {
    ...mapGetters({
      singleProductAttribute: "products/singleProductAttribute"
    }),
    ...mapState({})
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      getSingleById: "getSingleById"
    }),
    brand(attrId) {
      var _a, _b, _c;
      return (_c = (_b = this.singleProductAttribute({ productId: (_a = this.cartItem) == null ? void 0 : _a.id, attrId })) == null ? void 0 : _b.options) == null ? void 0 : _c[0];
    },
    color(attrId) {
      var _a, _b, _c;
      return (_c = (_b = this.singleProductAttribute({ productId: (_a = this.cartItem) == null ? void 0 : _a.id, attrId })) == null ? void 0 : _b.options) == null ? void 0 : _c[0];
    },
    size(attrId) {
      var _a, _b, _c;
      return (_c = (_b = this.singleProductAttribute({ productId: (_a = this.cartItem) == null ? void 0 : _a.id, attrId })) == null ? void 0 : _b.options) == null ? void 0 : _c[0];
    }
  },
  mounted() {
  }
};
function _sfc_ssrRender$k(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g;
  const _component_product_prices_node = resolveComponent("product-prices-node");
  const _component_cart_btn_node = resolveComponent("cart-btn-node");
  if ($props.cartItem) {
    _push(`<div${ssrRenderAttrs(mergeProps({ calss: "cart-item" }, _attrs))}><div class="cart-item__body"><div class="cart-item__image"><picture><source srcset="" type="image/webp"><source srcset="" type="image/jpeg"><img${ssrRenderAttr("src", (_b = (_a = $props.cartItem) == null ? void 0 : _a.images) == null ? void 0 : _b[0].src)} alt=""></picture></div><div class="cart-item__content"><div class="cart-item__brand">${ssrInterpolate($options.brand(1))}</div><div class="cart-item__name">${ssrInterpolate((_c = $props.cartItem) == null ? void 0 : _c.name)}</div><div class="cart-item__color">${ssrInterpolate($options.color(2))}</div><div class="cart-item__size">\u0420\u0430\u0437\u043C\u0435\u0440: ${ssrInterpolate($options.size(4))}</div>`);
    _push(ssrRenderComponent(_component_product_prices_node, {
      class: "cart-item__prices",
      pricesObject: (_d = $props.cartItem) == null ? void 0 : _d.prices,
      customOptions: {
        percentSale: false,
        brackets: false
      }
    }, null, _parent));
    _push(`</div><div class="cart-item__count">`);
    _push(ssrRenderComponent(_component_cart_btn_node, {
      class: ["cart-item__button cart-btn_iconable icon-minus", { disabled: ((_e = $props.cartItem) == null ? void 0 : _e.quantity) == 1 }],
      disabled: ((_f = $props.cartItem) == null ? void 0 : _f.quantity) == 1,
      params: $data.paramsUpdateMinusItem,
      route_base: "cart/update-item"
    }, null, _parent));
    _push(`<div class="cart-item__quantity">${ssrInterpolate((_g = $props.cartItem) == null ? void 0 : _g.quantity)}</div>`);
    _push(ssrRenderComponent(_component_cart_btn_node, {
      class: "cart-item__button cart-btn_iconable icon-plus",
      params: $data.paramsUpdatePlusItem,
      route_base: "cart/update-item"
    }, null, _parent));
    _push(`</div><div class="cart-item__other"><div class="cart-item__bonus">+ 0 \u0431\u0430\u043B\u043B\u043E\u0432</div>`);
    _push(ssrRenderComponent(_component_cart_btn_node, {
      class: "cart-item__button cart-item__button_trash icon-trash",
      params: $data.paramsRemoveItem,
      route_base: "cart/remove-item"
    }, null, _parent));
    _push(`</div></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/cart-and-ordering/CartItemNode.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const CartItemNode = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["ssrRender", _sfc_ssrRender$k]]);
const PageHeadTruncatedNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$j = {
  props: {
    backLinkName: String,
    pageTitle: String
  }
};
function _sfc_ssrRender$j(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_container_node = resolveComponent("container-node");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-head_truncated" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_container_node, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="page-head_truncated__body"${_scopeId}><div class="page-head_truncated__row"${_scopeId}><button class="page-head_truncated__back icon-long_arrow"${_scopeId}>${ssrInterpolate($props.backLinkName)}</button></div><div class="page-head_truncated__row"${_scopeId}><div class="page-head_truncated__title"${_scopeId}>${ssrInterpolate($props.pageTitle)}</div></div></div>`);
      } else {
        return [
          createVNode("div", { class: "page-head_truncated__body" }, [
            createVNode("div", { class: "page-head_truncated__row" }, [
              createVNode("button", {
                class: "page-head_truncated__back icon-long_arrow",
                onClick: ($event) => _ctx.$router.back()
              }, toDisplayString($props.backLinkName), 9, ["onClick"])
            ]),
            createVNode("div", { class: "page-head_truncated__row" }, [
              createVNode("div", { class: "page-head_truncated__title" }, toDisplayString($props.pageTitle), 1)
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/structure/PageHeadTruncatedNode.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const PageHeadTruncatedNode = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["ssrRender", _sfc_ssrRender$j]]);
const MiddleContentNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$i = {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
    ...mapState({})
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({})
  },
  created() {
  }
};
function _sfc_ssrRender$i(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_preload_wrap_node = resolveComponent("preload-wrap-node");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "middle-content" }, _attrs))}><div class="middle-content__body"><ul class="middle-content__items">`);
  ssrRenderSlot(_ctx.$slots, "items", {}, null, _push, _parent);
  _push(`</ul><div class="middle-content__sidebar">`);
  _push(ssrRenderComponent(_component_preload_wrap_node, { targetPreloadElement: _ctx.cartStore }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "sidebar", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "sidebar")
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/cart-and-ordering/MiddleContentNode.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const MiddleContentNode = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$i]]);
const Cart_vue_vue_type_style_index_0_lang = "";
const _sfc_main$h = {
  components: {
    CartItemNode,
    MainPageNode,
    PageHeadTruncatedNode,
    MiddleContentNode,
    PreloadWrapContainerNode
  },
  data() {
    return {
      promo: ""
    };
  },
  watch: {
    cartItems: {
      handler(cartItems) {
        if ((cartItems == null ? void 0 : cartItems.length) && (cartItems == null ? void 0 : cartItems.length) !== 0) {
          let idsCartItems = cartItems.map((el) => el.id);
          let basedRequest = cloneDeep(this.productsRequest);
          basedRequest.params = { "_include": idsCartItems };
          this.getItems(basedRequest);
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters({
      itemsBased: "itemsBased"
    }),
    ...mapState({
      userAuth: (state2) => state2.auth.userAuth,
      productsRequest: (state2) => state2.products.basedRequest,
      cartItems: (state2) => state2.cart.store.items,
      cartStore: (state2) => state2.cart.store,
      userAuth: (state2) => state2.auth.userAuth,
      cartStore: (state2) => state2.cart.store,
      loginPopup(state2) {
        return state2.common.revs.login;
      }
    })
  },
  methods: {
    ...mapMutations({
      SET_VALUE: "SET_VALUE",
      updateRev: "common/updateRev",
      updateRev: "common/updateRev"
    }),
    ...mapActions({
      getItems: "getItems",
      mainFetchRequest: "mainFetchRequest"
    }),
    toCheckout() {
      if (this.userAuth === false) {
        this.updateRev({
          name: "login",
          value: this.loginPopup.visible
        });
        return;
      }
      this.$router.push({ name: "Checkout" });
    }
  }
};
function _sfc_ssrRender$h(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_main_page_node = resolveComponent("main-page-node");
  const _component_page_head_truncated_node = resolveComponent("page-head-truncated-node");
  const _component_container_node = resolveComponent("container-node");
  const _component_middle_content_node = resolveComponent("middle-content-node");
  const _component_PreloadWrapContainerNode = resolveComponent("PreloadWrapContainerNode");
  const _component_cart_item_node = resolveComponent("cart-item-node");
  const _component_input_node = resolveComponent("input-node");
  const _component_button_node = resolveComponent("button-node");
  _push(ssrRenderComponent(_component_main_page_node, _attrs, {
    "page-head": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_page_head_truncated_node, {
          backLinkName: "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E",
          pageTitle: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_page_head_truncated_node, {
            backLinkName: "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E",
            pageTitle: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430"
          })
        ];
      }
    }),
    "page-main": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_container_node, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            var _a, _b;
            if (_push3) {
              _push3(`<div class="cart"${_scopeId2}><div class="cart__body"${_scopeId2}>`);
              if (((_a = _ctx.cartItems) == null ? void 0 : _a.length) || Object.keys(_ctx.cartStore).length === 0) {
                _push3(ssrRenderComponent(_component_middle_content_node, null, {
                  items: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_PreloadWrapContainerNode, {
                        class: "cart__item",
                        quantityPreloadElements: 4,
                        iterable: _ctx.cartItems
                      }, {
                        default: withCtx((slotProps, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(_component_cart_item_node, {
                              cartItem: slotProps.cartItem
                            }, null, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(_component_cart_item_node, {
                                cartItem: slotProps.cartItem
                              }, null, 8, ["cartItem"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_PreloadWrapContainerNode, {
                          class: "cart__item",
                          quantityPreloadElements: 4,
                          iterable: _ctx.cartItems
                        }, {
                          default: withCtx((slotProps) => [
                            createVNode(_component_cart_item_node, {
                              cartItem: slotProps.cartItem
                            }, null, 8, ["cartItem"])
                          ]),
                          _: 1
                        }, 8, ["iterable"])
                      ];
                    }
                  }),
                  sidebar: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    var _a2, _b2, _c, _d, _e, _f;
                    if (_push4) {
                      _push4(`<div class="middle-content__sidebar-inner"${_scopeId3}><div class="middle-content__block middle-content__block_promo"${_scopeId3}><div class="middle-content__key middle-content__key_medium"${_scopeId3}>\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434</div><div class="middle-content__item"${_scopeId3}>`);
                      _push4(ssrRenderComponent(_component_input_node, {
                        placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434",
                        class: "main",
                        modelValue: $data.promo,
                        "onUpdate:modelValue": ($event) => $data.promo = $event
                      }, null, _parent4, _scopeId3));
                      _push4(ssrRenderComponent(_component_button_node, {
                        buttonStyle: "green",
                        disabled: !$data.promo
                      }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C`);
                          } else {
                            return [
                              createTextVNode("\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                      _push4(`</div></div><div class="middle-content__block"${_scopeId3}><div class="middle-content__item"${_scopeId3}><div class="middle-content__key"${_scopeId3}>\u0421\u043A\u0438\u0434\u043A\u0430</div><div class="middle-content__value"${_scopeId3}>- 0<span class="middle-content__currency"${_scopeId3}> \u20BD</span></div></div><div class="middle-content__item"${_scopeId3}><div class="middle-content__key"${_scopeId3}>\u0421\u043A\u0438\u0434\u043A\u0430 \u043F\u0440\u0438 \u043E\u043D\u043B\u0430\u0439\u043D \u043E\u043F\u043B\u0430\u0442\u0435</div><div class="middle-content__value"${_scopeId3}>- 0<span class="middle-content__currency"${_scopeId3}> \u20BD</span></div></div><div class="middle-content__item"${_scopeId3}><div class="middle-content__key"${_scopeId3}>\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432</div><div class="middle-content__value icon-info"${_scopeId3}>${ssrInterpolate((_a2 = _ctx.cartStore.items) == null ? void 0 : _a2.length)} \u0448\u0442.</div></div></div><div class="middle-content__block"${_scopeId3}><div class="middle-content__item"${_scopeId3}><div class="middle-content__key middle-content__key_big"${_scopeId3}>\u0418\u0442\u043E\u0433\u043E</div><div class="middle-content__value middle-content__value_big"${_scopeId3}>${ssrInterpolate((_c = (_b2 = _ctx.cartStore) == null ? void 0 : _b2.totals) == null ? void 0 : _c.total_price)}<span class="middle-content__currency"${_scopeId3}> \u20BD</span></div></div><div class="middle-content__item"${_scopeId3}><div class="middle-content__key"${_scopeId3}>\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0431\u0435\u0437 \u0443\u0447\u0451\u0442\u0430 \u0441\u043A\u0438\u0434\u043E\u043A:</div><div class="middle-content__value"${_scopeId3}></div></div><div class="middle-content__item"${_scopeId3}><div class="middle-content__key"${_scopeId3}>\u0411\u0430\u043B\u043E\u0432 \u0431\u0443\u0434\u0435\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u043E:</div><div class="middle-content__value"${_scopeId3}></div></div>`);
                      _push4(ssrRenderComponent(_component_button_node, {
                        buttonStyle: "green",
                        onClick: $options.toCheckout
                      }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044E `);
                          } else {
                            return [
                              createTextVNode("\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044E ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                      _push4(`</div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "middle-content__sidebar-inner" }, [
                          createVNode("div", { class: "middle-content__block middle-content__block_promo" }, [
                            createVNode("div", { class: "middle-content__key middle-content__key_medium" }, "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434"),
                            createVNode("div", { class: "middle-content__item" }, [
                              createVNode(_component_input_node, {
                                placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434",
                                class: "main",
                                modelValue: $data.promo,
                                "onUpdate:modelValue": ($event) => $data.promo = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_button_node, {
                                buttonStyle: "green",
                                disabled: !$data.promo
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ])
                          ]),
                          createVNode("div", { class: "middle-content__block" }, [
                            createVNode("div", { class: "middle-content__item" }, [
                              createVNode("div", { class: "middle-content__key" }, "\u0421\u043A\u0438\u0434\u043A\u0430"),
                              createVNode("div", { class: "middle-content__value" }, [
                                createTextVNode("- 0"),
                                createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                              ])
                            ]),
                            createVNode("div", { class: "middle-content__item" }, [
                              createVNode("div", { class: "middle-content__key" }, "\u0421\u043A\u0438\u0434\u043A\u0430 \u043F\u0440\u0438 \u043E\u043D\u043B\u0430\u0439\u043D \u043E\u043F\u043B\u0430\u0442\u0435"),
                              createVNode("div", { class: "middle-content__value" }, [
                                createTextVNode("- 0"),
                                createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                              ])
                            ]),
                            createVNode("div", { class: "middle-content__item" }, [
                              createVNode("div", { class: "middle-content__key" }, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432"),
                              createVNode("div", { class: "middle-content__value icon-info" }, toDisplayString((_d = _ctx.cartStore.items) == null ? void 0 : _d.length) + " \u0448\u0442.", 1)
                            ])
                          ]),
                          createVNode("div", { class: "middle-content__block" }, [
                            createVNode("div", { class: "middle-content__item" }, [
                              createVNode("div", { class: "middle-content__key middle-content__key_big" }, "\u0418\u0442\u043E\u0433\u043E"),
                              createVNode("div", { class: "middle-content__value middle-content__value_big" }, [
                                createTextVNode(toDisplayString((_f = (_e = _ctx.cartStore) == null ? void 0 : _e.totals) == null ? void 0 : _f.total_price), 1),
                                createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                              ])
                            ]),
                            createVNode("div", { class: "middle-content__item" }, [
                              createVNode("div", { class: "middle-content__key" }, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0431\u0435\u0437 \u0443\u0447\u0451\u0442\u0430 \u0441\u043A\u0438\u0434\u043E\u043A:"),
                              createVNode("div", { class: "middle-content__value" })
                            ]),
                            createVNode("div", { class: "middle-content__item" }, [
                              createVNode("div", { class: "middle-content__key" }, "\u0411\u0430\u043B\u043E\u0432 \u0431\u0443\u0434\u0435\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u043E:"),
                              createVNode("div", { class: "middle-content__value" })
                            ]),
                            createVNode(_component_button_node, {
                              buttonStyle: "green",
                              onClick: $options.toCheckout
                            }, {
                              default: withCtx(() => [
                                createTextVNode("\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044E ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<div${_scopeId2}> \u0421\u0435\u0439\u0447\u0430\u0441 \u0432\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430. \u041F\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0436\u0435 \u0435\u0451! </div>`);
              }
              _push3(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "cart" }, [
                  createVNode("div", { class: "cart__body" }, [
                    ((_b = _ctx.cartItems) == null ? void 0 : _b.length) || Object.keys(_ctx.cartStore).length === 0 ? (openBlock(), createBlock(_component_middle_content_node, { key: 0 }, {
                      items: withCtx(() => [
                        createVNode(_component_PreloadWrapContainerNode, {
                          class: "cart__item",
                          quantityPreloadElements: 4,
                          iterable: _ctx.cartItems
                        }, {
                          default: withCtx((slotProps) => [
                            createVNode(_component_cart_item_node, {
                              cartItem: slotProps.cartItem
                            }, null, 8, ["cartItem"])
                          ]),
                          _: 1
                        }, 8, ["iterable"])
                      ]),
                      sidebar: withCtx(() => {
                        var _a2, _b2, _c;
                        return [
                          createVNode("div", { class: "middle-content__sidebar-inner" }, [
                            createVNode("div", { class: "middle-content__block middle-content__block_promo" }, [
                              createVNode("div", { class: "middle-content__key middle-content__key_medium" }, "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434"),
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode(_component_input_node, {
                                  placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434",
                                  class: "main",
                                  modelValue: $data.promo,
                                  "onUpdate:modelValue": ($event) => $data.promo = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_button_node, {
                                  buttonStyle: "green",
                                  disabled: !$data.promo
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ])
                            ]),
                            createVNode("div", { class: "middle-content__block" }, [
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u0421\u043A\u0438\u0434\u043A\u0430"),
                                createVNode("div", { class: "middle-content__value" }, [
                                  createTextVNode("- 0"),
                                  createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                                ])
                              ]),
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u0421\u043A\u0438\u0434\u043A\u0430 \u043F\u0440\u0438 \u043E\u043D\u043B\u0430\u0439\u043D \u043E\u043F\u043B\u0430\u0442\u0435"),
                                createVNode("div", { class: "middle-content__value" }, [
                                  createTextVNode("- 0"),
                                  createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                                ])
                              ]),
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432"),
                                createVNode("div", { class: "middle-content__value icon-info" }, toDisplayString((_a2 = _ctx.cartStore.items) == null ? void 0 : _a2.length) + " \u0448\u0442.", 1)
                              ])
                            ]),
                            createVNode("div", { class: "middle-content__block" }, [
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key middle-content__key_big" }, "\u0418\u0442\u043E\u0433\u043E"),
                                createVNode("div", { class: "middle-content__value middle-content__value_big" }, [
                                  createTextVNode(toDisplayString((_c = (_b2 = _ctx.cartStore) == null ? void 0 : _b2.totals) == null ? void 0 : _c.total_price), 1),
                                  createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                                ])
                              ]),
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0431\u0435\u0437 \u0443\u0447\u0451\u0442\u0430 \u0441\u043A\u0438\u0434\u043E\u043A:"),
                                createVNode("div", { class: "middle-content__value" })
                              ]),
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u0411\u0430\u043B\u043E\u0432 \u0431\u0443\u0434\u0435\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u043E:"),
                                createVNode("div", { class: "middle-content__value" })
                              ]),
                              createVNode(_component_button_node, {
                                buttonStyle: "green",
                                onClick: $options.toCheckout
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044E ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
                          ])
                        ];
                      }),
                      _: 1
                    })) : (openBlock(), createBlock("div", { key: 1 }, " \u0421\u0435\u0439\u0447\u0430\u0441 \u0432\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430. \u041F\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0436\u0435 \u0435\u0451! "))
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_container_node, null, {
            default: withCtx(() => {
              var _a;
              return [
                createVNode("div", { class: "cart" }, [
                  createVNode("div", { class: "cart__body" }, [
                    ((_a = _ctx.cartItems) == null ? void 0 : _a.length) || Object.keys(_ctx.cartStore).length === 0 ? (openBlock(), createBlock(_component_middle_content_node, { key: 0 }, {
                      items: withCtx(() => [
                        createVNode(_component_PreloadWrapContainerNode, {
                          class: "cart__item",
                          quantityPreloadElements: 4,
                          iterable: _ctx.cartItems
                        }, {
                          default: withCtx((slotProps) => [
                            createVNode(_component_cart_item_node, {
                              cartItem: slotProps.cartItem
                            }, null, 8, ["cartItem"])
                          ]),
                          _: 1
                        }, 8, ["iterable"])
                      ]),
                      sidebar: withCtx(() => {
                        var _a2, _b, _c;
                        return [
                          createVNode("div", { class: "middle-content__sidebar-inner" }, [
                            createVNode("div", { class: "middle-content__block middle-content__block_promo" }, [
                              createVNode("div", { class: "middle-content__key middle-content__key_medium" }, "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434"),
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode(_component_input_node, {
                                  placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434",
                                  class: "main",
                                  modelValue: $data.promo,
                                  "onUpdate:modelValue": ($event) => $data.promo = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_button_node, {
                                  buttonStyle: "green",
                                  disabled: !$data.promo
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ])
                            ]),
                            createVNode("div", { class: "middle-content__block" }, [
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u0421\u043A\u0438\u0434\u043A\u0430"),
                                createVNode("div", { class: "middle-content__value" }, [
                                  createTextVNode("- 0"),
                                  createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                                ])
                              ]),
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u0421\u043A\u0438\u0434\u043A\u0430 \u043F\u0440\u0438 \u043E\u043D\u043B\u0430\u0439\u043D \u043E\u043F\u043B\u0430\u0442\u0435"),
                                createVNode("div", { class: "middle-content__value" }, [
                                  createTextVNode("- 0"),
                                  createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                                ])
                              ]),
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432"),
                                createVNode("div", { class: "middle-content__value icon-info" }, toDisplayString((_a2 = _ctx.cartStore.items) == null ? void 0 : _a2.length) + " \u0448\u0442.", 1)
                              ])
                            ]),
                            createVNode("div", { class: "middle-content__block" }, [
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key middle-content__key_big" }, "\u0418\u0442\u043E\u0433\u043E"),
                                createVNode("div", { class: "middle-content__value middle-content__value_big" }, [
                                  createTextVNode(toDisplayString((_c = (_b = _ctx.cartStore) == null ? void 0 : _b.totals) == null ? void 0 : _c.total_price), 1),
                                  createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                                ])
                              ]),
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0431\u0435\u0437 \u0443\u0447\u0451\u0442\u0430 \u0441\u043A\u0438\u0434\u043E\u043A:"),
                                createVNode("div", { class: "middle-content__value" })
                              ]),
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u0411\u0430\u043B\u043E\u0432 \u0431\u0443\u0434\u0435\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u043E:"),
                                createVNode("div", { class: "middle-content__value" })
                              ]),
                              createVNode(_component_button_node, {
                                buttonStyle: "green",
                                onClick: $options.toCheckout
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044E ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
                          ])
                        ];
                      }),
                      _: 1
                    })) : (openBlock(), createBlock("div", { key: 1 }, " \u0421\u0435\u0439\u0447\u0430\u0441 \u0432\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430. \u041F\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0436\u0435 \u0435\u0451! "))
                  ])
                ])
              ];
            }),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/Cart.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const Cart = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$h]]);
const Checkout_vue_vue_type_style_index_0_lang = "";
const _sfc_main$g = {
  components: {
    MainPageNode,
    PreloadWrapContainerNode,
    PageHeadTruncatedNode,
    MiddleContentNode
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      userAuth: (state2) => state2.auth.userAuth,
      cartItems: (state2) => state2.cart.store.items,
      cartStore: (state2) => state2.cart.store,
      checkoutRequest: (state2) => state2.checkout.basedRequest
    })
  },
  methods: {
    ...mapMutations({
      SET_VALUE: "SET_VALUE",
      updateRev: "common/updateRev"
    }),
    ...mapActions({
      mainFetchRequest: "mainFetchRequest"
    }),
    ordering() {
      this.mainFetchRequest({
        apiType: this.checkoutRequest.apiType,
        route_base: this.checkoutRequest.route_base,
        method: "get",
        data: {},
        config: { headers: setNonceToken() },
        maintainJWT: true,
        reqiredJWT: true
      });
    }
  },
  created() {
  }
};
function _sfc_ssrRender$g(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_main_page_node = resolveComponent("main-page-node");
  const _component_page_head_truncated_node = resolveComponent("page-head-truncated-node");
  const _component_container_node = resolveComponent("container-node");
  const _component_middle_content_node = resolveComponent("middle-content-node");
  const _component_PreloadWrapContainerNode = resolveComponent("PreloadWrapContainerNode");
  const _component_button_node = resolveComponent("button-node");
  _push(ssrRenderComponent(_component_main_page_node, _attrs, {
    "page-head": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_page_head_truncated_node, {
          backLinkName: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430",
          pageTitle: "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_page_head_truncated_node, {
            backLinkName: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430",
            pageTitle: "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430"
          })
        ];
      }
    }),
    "page-main": withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_container_node, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="checkout"${_scopeId2}><div class="checkout__body"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_middle_content_node, null, {
                items: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_PreloadWrapContainerNode, {
                      class: "cart__item",
                      quantityPreloadElements: 4,
                      iterable: _ctx.cartItems
                    }, {
                      default: withCtx((slotProps, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<div class="order-item"${_scopeId4}><div class="order-item__image"${_scopeId4}><picture${_scopeId4}><source srcset="" type="image/webp"${_scopeId4}><source srcset="" type="image/jpeg"${_scopeId4}><img${ssrRenderAttr("src", slotProps.cartItem.images[0].src)} alt=""${_scopeId4}></picture></div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "order-item" }, [
                              createVNode("div", { class: "order-item__image" }, [
                                createVNode("picture", null, [
                                  createVNode("source", {
                                    srcset: "",
                                    type: "image/webp"
                                  }),
                                  createVNode("source", {
                                    srcset: "",
                                    type: "image/jpeg"
                                  }),
                                  createVNode("img", {
                                    src: slotProps.cartItem.images[0].src,
                                    alt: ""
                                  }, null, 8, ["src"])
                                ])
                              ])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_PreloadWrapContainerNode, {
                        class: "cart__item",
                        quantityPreloadElements: 4,
                        iterable: _ctx.cartItems
                      }, {
                        default: withCtx((slotProps) => [
                          createVNode("div", { class: "order-item" }, [
                            createVNode("div", { class: "order-item__image" }, [
                              createVNode("picture", null, [
                                createVNode("source", {
                                  srcset: "",
                                  type: "image/webp"
                                }),
                                createVNode("source", {
                                  srcset: "",
                                  type: "image/jpeg"
                                }),
                                createVNode("img", {
                                  src: slotProps.cartItem.images[0].src,
                                  alt: ""
                                }, null, 8, ["src"])
                              ])
                            ])
                          ])
                        ]),
                        _: 1
                      }, 8, ["iterable"])
                    ];
                  }
                }),
                sidebar: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  var _a, _b, _c, _d, _e, _f;
                  if (_push4) {
                    _push4(`<div class="middle-content__sidebar"${_scopeId3}><div class="middle-content__block"${_scopeId3}><div class="middle-content__item"${_scopeId3}><div class="middle-content__key"${_scopeId3}>\u0421\u043A\u0438\u0434\u043A\u0430</div><div class="middle-content__value"${_scopeId3}>- 0<span class="middle-content__currency"${_scopeId3}> \u20BD</span></div></div><div class="middle-content__item"${_scopeId3}><div class="middle-content__key"${_scopeId3}>\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432</div><div class="middle-content__value icon-info"${_scopeId3}>${ssrInterpolate((_a = _ctx.cartStore.items) == null ? void 0 : _a.length)} \u0448\u0442.</div></div></div><div class="middle-content__block"${_scopeId3}><div class="middle-content__item"${_scopeId3}><div class="middle-content__key middle-content__key_big"${_scopeId3}>\u0418\u0442\u043E\u0433\u043E</div><div class="middle-content__value middle-content__value_big"${_scopeId3}>${ssrInterpolate((_c = (_b = _ctx.cartStore) == null ? void 0 : _b.totals) == null ? void 0 : _c.total_price)} <span class="middle-content__currency"${_scopeId3}> \u20BD</span></div></div><div class="middle-content__item"${_scopeId3}><div class="middle-content__key"${_scopeId3}>\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0431\u0435\u0437 \u0443\u0447\u0451\u0442\u0430 \u0441\u043A\u0438\u0434\u043E\u043A:</div><div class="middle-content__value"${_scopeId3}></div></div><div class="middle-content__item"${_scopeId3}><div class="middle-content__key"${_scopeId3}>\u0411\u0430\u043B\u043E\u0432 \u0431\u0443\u0434\u0435\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u043E:</div><div class="middle-content__value"${_scopeId3}></div></div>`);
                    _push4(ssrRenderComponent(_component_button_node, {
                      buttonStyle: "dark",
                      onClick: _ctx.toCheckout
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C `);
                        } else {
                          return [
                            createTextVNode("\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "middle-content__sidebar" }, [
                        createVNode("div", { class: "middle-content__block" }, [
                          createVNode("div", { class: "middle-content__item" }, [
                            createVNode("div", { class: "middle-content__key" }, "\u0421\u043A\u0438\u0434\u043A\u0430"),
                            createVNode("div", { class: "middle-content__value" }, [
                              createTextVNode("- 0"),
                              createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                            ])
                          ]),
                          createVNode("div", { class: "middle-content__item" }, [
                            createVNode("div", { class: "middle-content__key" }, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432"),
                            createVNode("div", { class: "middle-content__value icon-info" }, toDisplayString((_d = _ctx.cartStore.items) == null ? void 0 : _d.length) + " \u0448\u0442.", 1)
                          ])
                        ]),
                        createVNode("div", { class: "middle-content__block" }, [
                          createVNode("div", { class: "middle-content__item" }, [
                            createVNode("div", { class: "middle-content__key middle-content__key_big" }, "\u0418\u0442\u043E\u0433\u043E"),
                            createVNode("div", { class: "middle-content__value middle-content__value_big" }, [
                              createTextVNode(toDisplayString((_f = (_e = _ctx.cartStore) == null ? void 0 : _e.totals) == null ? void 0 : _f.total_price) + " ", 1),
                              createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                            ])
                          ]),
                          createVNode("div", { class: "middle-content__item" }, [
                            createVNode("div", { class: "middle-content__key" }, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0431\u0435\u0437 \u0443\u0447\u0451\u0442\u0430 \u0441\u043A\u0438\u0434\u043E\u043A:"),
                            createVNode("div", { class: "middle-content__value" })
                          ]),
                          createVNode("div", { class: "middle-content__item" }, [
                            createVNode("div", { class: "middle-content__key" }, "\u0411\u0430\u043B\u043E\u0432 \u0431\u0443\u0434\u0435\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u043E:"),
                            createVNode("div", { class: "middle-content__value" })
                          ]),
                          createVNode(_component_button_node, {
                            buttonStyle: "dark",
                            onClick: _ctx.toCheckout
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "checkout" }, [
                  createVNode("div", { class: "checkout__body" }, [
                    createVNode(_component_middle_content_node, null, {
                      items: withCtx(() => [
                        createVNode(_component_PreloadWrapContainerNode, {
                          class: "cart__item",
                          quantityPreloadElements: 4,
                          iterable: _ctx.cartItems
                        }, {
                          default: withCtx((slotProps) => [
                            createVNode("div", { class: "order-item" }, [
                              createVNode("div", { class: "order-item__image" }, [
                                createVNode("picture", null, [
                                  createVNode("source", {
                                    srcset: "",
                                    type: "image/webp"
                                  }),
                                  createVNode("source", {
                                    srcset: "",
                                    type: "image/jpeg"
                                  }),
                                  createVNode("img", {
                                    src: slotProps.cartItem.images[0].src,
                                    alt: ""
                                  }, null, 8, ["src"])
                                ])
                              ])
                            ])
                          ]),
                          _: 1
                        }, 8, ["iterable"])
                      ]),
                      sidebar: withCtx(() => {
                        var _a, _b, _c;
                        return [
                          createVNode("div", { class: "middle-content__sidebar" }, [
                            createVNode("div", { class: "middle-content__block" }, [
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u0421\u043A\u0438\u0434\u043A\u0430"),
                                createVNode("div", { class: "middle-content__value" }, [
                                  createTextVNode("- 0"),
                                  createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                                ])
                              ]),
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432"),
                                createVNode("div", { class: "middle-content__value icon-info" }, toDisplayString((_a = _ctx.cartStore.items) == null ? void 0 : _a.length) + " \u0448\u0442.", 1)
                              ])
                            ]),
                            createVNode("div", { class: "middle-content__block" }, [
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key middle-content__key_big" }, "\u0418\u0442\u043E\u0433\u043E"),
                                createVNode("div", { class: "middle-content__value middle-content__value_big" }, [
                                  createTextVNode(toDisplayString((_c = (_b = _ctx.cartStore) == null ? void 0 : _b.totals) == null ? void 0 : _c.total_price) + " ", 1),
                                  createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                                ])
                              ]),
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0431\u0435\u0437 \u0443\u0447\u0451\u0442\u0430 \u0441\u043A\u0438\u0434\u043E\u043A:"),
                                createVNode("div", { class: "middle-content__value" })
                              ]),
                              createVNode("div", { class: "middle-content__item" }, [
                                createVNode("div", { class: "middle-content__key" }, "\u0411\u0430\u043B\u043E\u0432 \u0431\u0443\u0434\u0435\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u043E:"),
                                createVNode("div", { class: "middle-content__value" })
                              ]),
                              createVNode(_component_button_node, {
                                buttonStyle: "dark",
                                onClick: _ctx.toCheckout
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ])
                          ])
                        ];
                      }),
                      _: 1
                    })
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_container_node, null, {
            default: withCtx(() => [
              createVNode("div", { class: "checkout" }, [
                createVNode("div", { class: "checkout__body" }, [
                  createVNode(_component_middle_content_node, null, {
                    items: withCtx(() => [
                      createVNode(_component_PreloadWrapContainerNode, {
                        class: "cart__item",
                        quantityPreloadElements: 4,
                        iterable: _ctx.cartItems
                      }, {
                        default: withCtx((slotProps) => [
                          createVNode("div", { class: "order-item" }, [
                            createVNode("div", { class: "order-item__image" }, [
                              createVNode("picture", null, [
                                createVNode("source", {
                                  srcset: "",
                                  type: "image/webp"
                                }),
                                createVNode("source", {
                                  srcset: "",
                                  type: "image/jpeg"
                                }),
                                createVNode("img", {
                                  src: slotProps.cartItem.images[0].src,
                                  alt: ""
                                }, null, 8, ["src"])
                              ])
                            ])
                          ])
                        ]),
                        _: 1
                      }, 8, ["iterable"])
                    ]),
                    sidebar: withCtx(() => {
                      var _a, _b, _c;
                      return [
                        createVNode("div", { class: "middle-content__sidebar" }, [
                          createVNode("div", { class: "middle-content__block" }, [
                            createVNode("div", { class: "middle-content__item" }, [
                              createVNode("div", { class: "middle-content__key" }, "\u0421\u043A\u0438\u0434\u043A\u0430"),
                              createVNode("div", { class: "middle-content__value" }, [
                                createTextVNode("- 0"),
                                createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                              ])
                            ]),
                            createVNode("div", { class: "middle-content__item" }, [
                              createVNode("div", { class: "middle-content__key" }, "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432"),
                              createVNode("div", { class: "middle-content__value icon-info" }, toDisplayString((_a = _ctx.cartStore.items) == null ? void 0 : _a.length) + " \u0448\u0442.", 1)
                            ])
                          ]),
                          createVNode("div", { class: "middle-content__block" }, [
                            createVNode("div", { class: "middle-content__item" }, [
                              createVNode("div", { class: "middle-content__key middle-content__key_big" }, "\u0418\u0442\u043E\u0433\u043E"),
                              createVNode("div", { class: "middle-content__value middle-content__value_big" }, [
                                createTextVNode(toDisplayString((_c = (_b = _ctx.cartStore) == null ? void 0 : _b.totals) == null ? void 0 : _c.total_price) + " ", 1),
                                createVNode("span", { class: "middle-content__currency" }, " \u20BD")
                              ])
                            ]),
                            createVNode("div", { class: "middle-content__item" }, [
                              createVNode("div", { class: "middle-content__key" }, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0431\u0435\u0437 \u0443\u0447\u0451\u0442\u0430 \u0441\u043A\u0438\u0434\u043E\u043A:"),
                              createVNode("div", { class: "middle-content__value" })
                            ]),
                            createVNode("div", { class: "middle-content__item" }, [
                              createVNode("div", { class: "middle-content__key" }, "\u0411\u0430\u043B\u043E\u0432 \u0431\u0443\u0434\u0435\u0442 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u043E:"),
                              createVNode("div", { class: "middle-content__value" })
                            ]),
                            createVNode(_component_button_node, {
                              buttonStyle: "dark",
                              onClick: _ctx.toCheckout
                            }, {
                              default: withCtx(() => [
                                createTextVNode("\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ])
                      ];
                    }),
                    _: 1
                  })
                ])
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/Checkout.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const Checkout = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$g]]);
const _sfc_main$f = {};
function _sfc_ssrRender$f(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "favorite" }, _attrs))}> favorite </div>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/Favorite.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const Favorite = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$f]]);
const _sfc_main$e = {};
function _sfc_ssrRender$e(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "personal" }, _attrs))}>personal</div>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/Personal.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const Personal = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$e]]);
const _sfc_main$d = {};
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-page" }, _attrs))}>blog page</div>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/BlogPage.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const BlogPage = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$d]]);
const { show_on_front, page_for_posts, page_on_front } = VUE_WP_INSTANCE().routing.returned;
const rootRoute = show_on_front === "page" && page_on_front ? {
  path: "/",
  component: Home,
  name: "Home",
  props: () => ({ slug: page_on_front })
} : {
  path: paths.postsPage(),
  component: Home,
  name: "Home",
  props: (route) => ({ page: pageFromPath(route.path) })
};
const postsPageRoute = show_on_front === "page" && page_for_posts ? {
  path: paths.postsPage(page_for_posts),
  component: Posts,
  name: "Posts",
  props: (route) => ({ page: pageFromPath(route.path) })
} : null;
const truncatedComponents = [
  {
    path: "/cart",
    component: Cart,
    name: "Cart"
  },
  {
    path: "/checkout",
    component: Checkout,
    name: "Checkout"
  }
];
const commonComponents = [
  rootRoute,
  postsPageRoute,
  {
    path: "/product-category/:mainCategorySlug",
    component: SingleCategory,
    name: "SingleCategory",
    props: (route) => ({ params: route.params })
  },
  {
    path: "/product-category/:mainCategorySlug/:categorySlug",
    component: SingleSubCategory,
    name: "SingleSubCategory",
    props: (route) => ({ params: route.params, query: route.query })
  },
  {
    path: "/product/:productSlug",
    component: SingleProduct,
    name: "SingleProduct",
    props: (route) => ({ params: route.params, query: route.query })
  },
  {
    path: "/favorite",
    component: Favorite,
    name: "Favorite"
  },
  {
    path: "/personal",
    component: Personal,
    name: "Personal"
  },
  {
    path: "/blog-page",
    component: BlogPage,
    name: "BlogPage"
  }
];
const routes = truncatedComponents.concat(commonComponents).filter((route) => route);
const { url, state } = VUE_WP_INSTANCE().routing.returned;
const router = createRouter({
  routes,
  history: createMemoryHistory()
});
let userAuth = state == null ? void 0 : state.auth.userAuth;
router.beforeEach((to, from) => {
  if (userAuth === false && to.name === "Checkout") {
    return { name: "Cart" };
  }
});
const HeaderLightNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$c = {
  components: {},
  computed: {
    ...mapGetters({}),
    ...mapState({})
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({})
  }
};
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_container_node = resolveComponent("container-node");
  const _component_router_link = resolveComponent("router-link");
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "header header_light" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_container_node, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="header_light__body"${_scopeId}><div class="header__logo header_light__logo"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_router_link, { to: "/" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`LO<span${_scopeId2}>GOTYPE</span>`);
            } else {
              return [
                createTextVNode("LO"),
                createVNode("span", null, "GOTYPE")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div><div class="header_light__call"${_scopeId}><button class="header_light__call-icon icon-call"${_scopeId}></button><div class="header_light__text"${_scopeId}>\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043F\u043E \u0420\u043E\u0441\u0441\u0438\u0438</div><div class="header_light__tel"${_scopeId}>8 800 999 09 99</div></div></div>`);
      } else {
        return [
          createVNode("div", { class: "header_light__body" }, [
            createVNode("div", { class: "header__logo header_light__logo" }, [
              createVNode(_component_router_link, { to: "/" }, {
                default: withCtx(() => [
                  createTextVNode("LO"),
                  createVNode("span", null, "GOTYPE")
                ]),
                _: 1
              })
            ]),
            createVNode("div", { class: "header_light__call" }, [
              createVNode("button", { class: "header_light__call-icon icon-call" }),
              createVNode("div", { class: "header_light__text" }, "\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043F\u043E \u0420\u043E\u0441\u0441\u0438\u0438"),
              createVNode("div", { class: "header_light__tel" }, "8 800 999 09 99")
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</header>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/structure/HeaderLightNode.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const HeaderLightNode = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$c]]);
const NavNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$b = {
  props: {
    menuName: {
      type: String
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      items: (state2) => state2.menus.top_header
    })
  }
};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<nav${ssrRenderAttrs(mergeProps({ class: "header-nav" }, _attrs))}><ul class="header-nav__list">`);
  ssrRenderSlot(_ctx.$slots, "choise-location", {}, null, _push, _parent);
  _push(`<!--[-->`);
  ssrRenderList(_ctx.items, (item) => {
    _push(`<li class="header-nav__item"><button class="header-nav__btn">${ssrInterpolate(item.content)}</button></li>`);
  });
  _push(`<!--]--></ul>`);
  ssrRenderSlot(_ctx.$slots, "my-account", {}, null, _push, _parent);
  _push(`</nav>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/header/NavNode.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const NavNode = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$b]]);
const SearchNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$a = {
  props: {},
  data() {
    return {
      searchInputValue: String
    };
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      windowWidth: (state2) => state2.common.windowWidth,
      scrollY: (state2) => state2.common.scrollY,
      popup: (state2) => state2.common.revs.search
    })
  },
  methods: {
    ...mapMutations({
      updateRev: "common/updateRev"
    }),
    ...mapActions({}),
    popupVisability() {
      this.updateRev({
        name: "search",
        value: this.popup.visible
      });
    },
    popupInputButton() {
      if (this.searchInputValue) {
        this.searchInputValue = "";
      } else {
        this.popupVisible();
      }
    }
  }
};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_popup_node = resolveComponent("popup-node");
  const _component_close_btn_node = resolveComponent("close-btn-node");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "search" }, _attrs))}><button style="${ssrRenderStyle(_ctx.windowWidth > 1024 && _ctx.scrollY < 99 ? null : { display: "none" })}" class="search__header-button"><button class="search__header-btn icon-search"></button><span>\u041F\u043E\u0438\u0441\u043A</span></button><button class="search__header-btn icon-search" style="${ssrRenderStyle(_ctx.windowWidth < 1024 || _ctx.scrollY > 99 ? null : { display: "none" })}"></button>`);
  _push(ssrRenderComponent(_component_popup_node, { name: "search" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<form action=""${_scopeId}><div class="icon-search"${_scopeId}></div><input${ssrRenderAttr("value", $data.searchInputValue)} placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441..." type="text"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_close_btn_node, { onClick: $options.popupInputButton }, null, _parent2, _scopeId));
        _push2(`</form>`);
      } else {
        return [
          createVNode("form", { action: "" }, [
            createVNode("div", { class: "icon-search" }),
            withDirectives(createVNode("input", {
              "onUpdate:modelValue": ($event) => $data.searchInputValue = $event,
              placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441...",
              type: "text"
            }, null, 8, ["onUpdate:modelValue"]), [
              [vModelText, $data.searchInputValue]
            ]),
            createVNode(_component_close_btn_node, {
              onClick: withModifiers($options.popupInputButton, ["prevent"])
            }, null, 8, ["onClick"])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/header/SearchNode.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const SearchNode = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$a]]);
const HeaderButtonNode_vue_vue_type_style_index_0_scoped_2a22a724_lang = "";
const _sfc_main$9 = {
  props: {
    link: String,
    itemsCounter: Number
  },
  components: {},
  computed: {
    ...mapGetters({}),
    ...mapState({})
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({})
  }
};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(ssrRenderComponent(_component_router_link, mergeProps({
    class: "header-button",
    to: $props.link
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="header-button__counter" data-v-2a22a724${_scopeId}>${ssrInterpolate($props.itemsCounter)}</span><div class="header-button__icon" data-v-2a22a724${_scopeId}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
        _push2(`</div>`);
      } else {
        return [
          createVNode("span", { class: "header-button__counter" }, toDisplayString($props.itemsCounter), 1),
          createVNode("div", { class: "header-button__icon" }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/header/HeaderButtonNode.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const HeaderButtonNode = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$9], ["__scopeId", "data-v-2a22a724"]]);
const CategoriesNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$8 = {
  mixins: [routeToCategoryMixin],
  props: {
    parent: {
      type: Number,
      reqired: true
    },
    parentCategorySlug: {
      type: String
    },
    neastedLevel: Number,
    mobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      nestedActive: false
    };
  },
  computed: {
    ...mapState({
      request: (state2) => state2.productsCategories.basedRequest,
      list(state2) {
        return state2.common.revs[this.slug];
      }
    }),
    ...mapGetters({
      itemsMatchedOneProperty: "itemsMatchedOneProperty",
      itemsBased: "itemsBased",
      itemById: "itemById"
    }),
    productsCategories() {
      let categories = this.itemsMatchedOneProperty(this.request, {
        parent: this.parent
      });
      if (!categories === [] && this.parent != 0) {
        categories.unshift(
          this.itemById({ type: this.request.type, id: this.parent })
        );
      }
      return categories;
    },
    neastedStr() {
      let neastedStr = "";
      for (let index = 0; index < this.neastedLevel; index++) {
        neastedStr += "-sub";
      }
      return neastedStr;
    }
  },
  methods: {
    ...mapMutations({
      setScrollFlag: "common/setScrollFlag",
      addRev: "common/addRev",
      updateRev: "common/updateRev",
      closeRevs: "common/closeRevs"
    }),
    ...mapActions({}),
    buttonClick(productCategory, parentCategorySlug) {
      if (this.mobile) {
        this.closeRevs(["headerMenu", "rootCategories"]);
        if (productCategory.parent == 0 && this.slug === "rootCategories") {
          this.updateRev({
            name: [productCategory.slug],
            value: this.$store.state.common.revs[productCategory.slug].visible
          });
        } else {
          this.setScrollFlag({ value: true, toogle: false });
          this.updateRev({
            name: "headerMenu",
            value: false,
            toggleValue: false
          });
          this.closeRevs();
          this.routeToCategory(productCategory, parentCategorySlug);
        }
      } else {
        this.routeToCategory(productCategory, parentCategorySlug);
      }
    }
  },
  created() {
    !this.parentCategorySlug ? this.slug = "rootCategories" : this.slug = this.parentCategorySlug;
    this.addRev({ [this.slug]: {} });
    this.updateRev({
      name: "rootCategories",
      value: true,
      toggleValue: false
    });
    this.updateRev({
      name: "rootCategories",
      value: true,
      toggleValue: false,
      prop: "off"
    });
  }
};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["categories", $props.mobile ? "categories_mobile" : ""]
  }, _attrs))}>`);
  if ($options.productsCategories && $options.productsCategories.length) {
    _push(`<ul class="${ssrRenderClass(
      _ctx.list.visible && $props.mobile && _ctx.slug !== "rootCategories" ? `categories${$options.neastedStr}-list categories${$options.neastedStr}-list_active` : `categories${$options.neastedStr}-list`
    )}" style="${ssrRenderStyle(($props.mobile && _ctx.list ? _ctx.list.visible : true) ? null : { display: "none" })}"><!--[-->`);
    ssrRenderList($options.productsCategories, (productCategory) => {
      _push(`<li class="${ssrRenderClass(`categories${$options.neastedStr}-list__item  icon-arrow`)}"><button class="${ssrRenderClass(`categories${$options.neastedStr}-list__button`)}">${ssrInterpolate(productCategory.id == $props.parent ? "\u0412\u0421\u0415 \u0422\u041E\u0412\u0410\u0420\u042B" : productCategory.name)}</button>`);
      ssrRenderSlot(_ctx.$slots, "default", {
        onNestedActiveUpd: (bool) => $data.nestedActive = bool,
        parent: productCategory.id,
        parentCategorySlug: productCategory.slug
      }, null, _push, _parent);
      _push(`</li>`);
    });
    _push(`<!--]--></ul>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/header/CategoriesNode.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const CategoriesNode = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$8]]);
const HeaderMenuPopupNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$7 = {
  components: {
    NavNode,
    CategoriesNode
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      windowWidth: (state2) => state2.common.windowWidth,
      popup(state2) {
        return state2.common.revs.headerMenu;
      },
      loginPopup(state2) {
        return state2.common.revs.login;
      }
    })
  },
  methods: {
    ...mapMutations({
      updateRev: "common/updateRev",
      setScrollFlag: "common/setScrollFlag"
    }),
    ...mapActions({}),
    menuVisability() {
      this.updateRev({ name: "headerMenu", value: this.popup.visible });
      this.setScrollFlag({ value: this.popup.visible });
    },
    loginPopupVisible() {
      this.updateRev({
        name: "login",
        value: this.loginPopup.visible
      });
    }
  }
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_popup_node = resolveComponent("popup-node");
  const _component_categories_node = resolveComponent("categories-node");
  const _component_nav_node = resolveComponent("nav-node");
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "header-menu",
    style: _ctx.windowWidth < 1024 ? null : { display: "none" }
  }, _attrs))}><button class="header-burger-icon"><i></i><i></i><i></i></button>`);
  _push(ssrRenderComponent(_component_popup_node, { name: "headerMenu" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_categories_node, {
          parent: 0,
          neastedLevel: 0,
          mobile: true
        }, {
          default: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_categories_node, {
                neastedLevel: 1,
                parent: slotProps.parent,
                parentCategorySlug: slotProps.parentCategorySlug,
                mobile: true
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_categories_node, {
                  neastedLevel: 1,
                  parent: slotProps.parent,
                  parentCategorySlug: slotProps.parentCategorySlug,
                  mobile: true
                }, null, 8, ["parent", "parentCategorySlug"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_nav_node, { name: "top_header" }, {
          "choise-location": withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li class="header-nav__item icon-favorite"${_scopeId2}><button class="header-nav__btn"${_scopeId2}>\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435</button></li><li class="header-nav__item icon-profile"${_scopeId2}><button class="header-nav__btn"${_scopeId2}>\u041F\u0440\u043E\u0444\u0438\u043B\u044C</button></li>`);
            } else {
              return [
                createVNode("li", { class: "header-nav__item icon-favorite" }, [
                  createVNode("button", {
                    class: "header-nav__btn",
                    onClick: ($event) => _ctx.$router.push("/favorite")
                  }, "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435", 8, ["onClick"])
                ]),
                createVNode("li", { class: "header-nav__item icon-profile" }, [
                  createVNode("button", {
                    class: "header-nav__btn",
                    onClick: $options.loginPopupVisible
                  }, "\u041F\u0440\u043E\u0444\u0438\u043B\u044C", 8, ["onClick"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_categories_node, {
            parent: 0,
            neastedLevel: 0,
            mobile: true
          }, {
            default: withCtx((slotProps) => [
              createVNode(_component_categories_node, {
                neastedLevel: 1,
                parent: slotProps.parent,
                parentCategorySlug: slotProps.parentCategorySlug,
                mobile: true
              }, null, 8, ["parent", "parentCategorySlug"])
            ]),
            _: 1
          }),
          createVNode(_component_nav_node, { name: "top_header" }, {
            "choise-location": withCtx(() => [
              createVNode("li", { class: "header-nav__item icon-favorite" }, [
                createVNode("button", {
                  class: "header-nav__btn",
                  onClick: ($event) => _ctx.$router.push("/favorite")
                }, "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435", 8, ["onClick"])
              ]),
              createVNode("li", { class: "header-nav__item icon-profile" }, [
                createVNode("button", {
                  class: "header-nav__btn",
                  onClick: $options.loginPopupVisible
                }, "\u041F\u0440\u043E\u0444\u0438\u043B\u044C", 8, ["onClick"])
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/header/HeaderMenuPopupNode.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const HeaderMenuPopupNode = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7]]);
const HeaderNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$6 = {
  components: {
    NavNode,
    SearchNode,
    HeaderButtonNode,
    CategoriesNode,
    HeaderMenuPopupNode
  },
  data() {
    return {
      popupShow: false,
      headerWrapper: {
        height: 99,
        default: true
      }
    };
  },
  watch: {
    scrollY(newValue) {
      if (this.windowWidth < 1024) {
        this.headerWrapper.default = true;
        return;
      }
      if (newValue > this.headerWrapper.height) {
        this.headerWrapper.default = false;
      } else {
        this.headerWrapper.default = true;
      }
    }
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      userAuth: (state2) => state2.auth.userAuth,
      cartItemsQuantity: (state2) => {
        var _a;
        return (_a = state2.cart.store.items) == null ? void 0 : _a.length;
      },
      breakpoint: (state2) => state2.common.breakpoint,
      scrollY: (state2) => state2.common.scrollY,
      windowWidth: (state2) => state2.common.windowWidth,
      loginPopup(state2) {
        return state2.common.revs.login;
      }
    })
  },
  methods: {
    ...mapMutations({
      addRev: "common/addRev",
      updateRev: "common/updateRev"
    }),
    ...mapActions({}),
    loginPopupVisible() {
      this.updateRev({
        name: "login",
        value: this.loginPopup.visible
      });
    }
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_container_node = resolveComponent("container-node");
  const _component_nav_node = resolveComponent("nav-node");
  const _component_header_menu_popup_node = resolveComponent("header-menu-popup-node");
  const _component_router_link = resolveComponent("router-link");
  const _component_categories_node = resolveComponent("categories-node");
  const _component_search_node = resolveComponent("search-node");
  const _component_header_button_node = resolveComponent("header-button-node");
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))}><div class="${ssrRenderClass([$data.headerWrapper.default ? "" : "header__wrapper_scrolled", "header__wrapper"])}"><div class="header__body"><div class="header-top" style="${ssrRenderStyle(_ctx.windowWidth > 1024 ? null : { display: "none" })}">`);
  _push(ssrRenderComponent(_component_container_node, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_nav_node, { name: "top_header" }, {
          "choise-location": withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li class="header-nav__item"${_scopeId2}><button class="header-nav__btn"${_scopeId2}> \u0433.\u041C\u043E\u0441\u043A\u0432\u0430 </button></li>`);
            } else {
              return [
                createVNode("li", { class: "header-nav__item" }, [
                  createVNode("button", {
                    class: "header-nav__btn",
                    onClick: ($event) => _ctx.$router.push("/")
                  }, " \u0433.\u041C\u043E\u0441\u043A\u0432\u0430 ", 8, ["onClick"])
                ])
              ];
            }
          }),
          "number-one": withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<a href="tel:88009999999"${_scopeId2}>88009999999</a>`);
            } else {
              return [
                createVNode("a", { href: "tel:88009999999" }, "88009999999")
              ];
            }
          }),
          "my-account": withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<button class="header-nav__btn icon-profile"${_scopeId2}>${ssrInterpolate(_ctx.userAuth ? "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442" : "\u0412\u0445\u043E\u0434/\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F")}</button>`);
            } else {
              return [
                createVNode("button", {
                  class: "header-nav__btn icon-profile",
                  onClick: $options.loginPopupVisible
                }, toDisplayString(_ctx.userAuth ? "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442" : "\u0412\u0445\u043E\u0434/\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F"), 9, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_nav_node, { name: "top_header" }, {
            "choise-location": withCtx(() => [
              createVNode("li", { class: "header-nav__item" }, [
                createVNode("button", {
                  class: "header-nav__btn",
                  onClick: ($event) => _ctx.$router.push("/")
                }, " \u0433.\u041C\u043E\u0441\u043A\u0432\u0430 ", 8, ["onClick"])
              ])
            ]),
            "number-one": withCtx(() => [
              createVNode("a", { href: "tel:88009999999" }, "88009999999")
            ]),
            "my-account": withCtx(() => [
              createVNode("button", {
                class: "header-nav__btn icon-profile",
                onClick: $options.loginPopupVisible
              }, toDisplayString(_ctx.userAuth ? "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442" : "\u0412\u0445\u043E\u0434/\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F"), 9, ["onClick"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="header-main">`);
  _push(ssrRenderComponent(_component_container_node, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="header-main__body"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_header_menu_popup_node, null, null, _parent2, _scopeId));
        _push2(`<div class="header__logo"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_router_link, { to: "/" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`LO<span${_scopeId2}>GOTYPE</span>`);
            } else {
              return [
                createTextVNode("LO"),
                createVNode("span", null, "GOTYPE")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div><div class="header-bot header-bot_scroller" style="${ssrRenderStyle(_ctx.windowWidth > 1024 && _ctx.scrollY > 99 ? null : { display: "none" })}"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_categories_node, {
          parent: 0,
          neastedLevel: 0
        }, {
          default: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_categories_node, {
                neastedLevel: 1,
                parent: slotProps.parent,
                parentCategorySlug: slotProps.parentCategorySlug
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_categories_node, {
                  neastedLevel: 1,
                  parent: slotProps.parent,
                  parentCategorySlug: slotProps.parentCategorySlug
                }, null, 8, ["parent", "parentCategorySlug"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
        _push2(ssrRenderComponent(_component_search_node, null, null, _parent2, _scopeId));
        _push2(`<div class="header-main__actions"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_header_button_node, {
          link: "/favorite",
          class: "icon-favorite"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<span${_scopeId2}></span>`);
            } else {
              return [
                createVNode("span")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_header_button_node, {
          itemsCounter: _ctx.cartItemsQuantity,
          link: "/cart",
          class: "icon-cart"
        }, null, _parent2, _scopeId));
        _push2(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "header-main__body" }, [
            createVNode(_component_header_menu_popup_node),
            createVNode("div", { class: "header__logo" }, [
              createVNode(_component_router_link, { to: "/" }, {
                default: withCtx(() => [
                  createTextVNode("LO"),
                  createVNode("span", null, "GOTYPE")
                ]),
                _: 1
              })
            ]),
            withDirectives(createVNode("div", { class: "header-bot header-bot_scroller" }, [
              createVNode(_component_categories_node, {
                parent: 0,
                neastedLevel: 0
              }, {
                default: withCtx((slotProps) => [
                  createVNode(_component_categories_node, {
                    neastedLevel: 1,
                    parent: slotProps.parent,
                    parentCategorySlug: slotProps.parentCategorySlug
                  }, null, 8, ["parent", "parentCategorySlug"])
                ]),
                _: 1
              })
            ], 512), [
              [vShow, _ctx.windowWidth > 1024 && _ctx.scrollY > 99]
            ]),
            createVNode(_component_search_node),
            createVNode("div", { class: "header-main__actions" }, [
              createVNode(_component_header_button_node, {
                link: "/favorite",
                class: "icon-favorite"
              }, {
                default: withCtx(() => [
                  createVNode("span")
                ]),
                _: 1
              }),
              createVNode(_component_header_button_node, {
                itemsCounter: _ctx.cartItemsQuantity,
                link: "/cart",
                class: "icon-cart"
              }, null, 8, ["itemsCounter"])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="header-bot" style="${ssrRenderStyle(_ctx.windowWidth > 1024 && _ctx.scrollY < 99 ? null : { display: "none" })}">`);
  _push(ssrRenderComponent(_component_container_node, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_categories_node, {
          parent: 0,
          neastedLevel: 0
        }, {
          default: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_categories_node, {
                neastedLevel: 1,
                parent: slotProps.parent,
                parentCategorySlug: slotProps.parentCategorySlug
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_categories_node, {
                  neastedLevel: 1,
                  parent: slotProps.parent,
                  parentCategorySlug: slotProps.parentCategorySlug
                }, null, 8, ["parent", "parentCategorySlug"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_categories_node, {
            parent: 0,
            neastedLevel: 0
          }, {
            default: withCtx((slotProps) => [
              createVNode(_component_categories_node, {
                neastedLevel: 1,
                parent: slotProps.parent,
                parentCategorySlug: slotProps.parentCategorySlug
              }, null, 8, ["parent", "parentCategorySlug"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></header>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/structure/HeaderNode.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const HeaderNode = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6]]);
const _sfc_main$5 = {
  components: {},
  props: {
    spoilerBlockName: {
      reqired: true,
      type: String
    },
    spoilersAmount: {
      reqired: true,
      type: Number
    }
  },
  data() {
    return {
      spoilers: {}
    };
  },
  computed: {
    ...mapGetters({}),
    ...mapState({}),
    setSpoilers() {
      for (let i = 0; i < this.spoilersAmount; i++) {
        let spoilerName = this.spoilerBlockName + "Spoiler" + (i + 1);
        this.spoilers[spoilerName] = {
          default: true,
          visible: false,
          off: false
        };
      }
    }
  },
  methods: {
    ...mapMutations({
      addRev: "common/addRev",
      updateRev: "common/updateRev",
      closeRevs: "common/closeRevs"
    }),
    ...mapActions({})
  },
  created() {
    this.addRev(this.spoilers);
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "spoiler" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", { spoilers: $data.spoilers }, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SpoilersBlockNode.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const SpoilersBlockNode = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5]]);
const FooterNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$4 = {
  components: {
    SocialNetworksNode,
    SpoilersBlockNode
  },
  data() {
    return {};
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_container_node = resolveComponent("container-node");
  const _component_router_link = resolveComponent("router-link");
  const _component_spoilers_block_node = resolveComponent("spoilers-block-node");
  const _component_social_networks_node = resolveComponent("social-networks-node");
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))}><section class="footer__main">`);
  _push(ssrRenderComponent(_component_container_node, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="footer__main-body"${_scopeId}><div class="footer__logo"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_router_link, { to: "/" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`LO<span${_scopeId2}>GOTYPE</span>`);
            } else {
              return [
                createTextVNode("LO"),
                createVNode("span", null, "GOTYPE")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
        _push2(ssrRenderComponent(_component_spoilers_block_node, {
          class: "footer__columns",
          spoilerBlockName: "footer",
          spoilersAmount: 3
        }, {
          default: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="footer__column"${_scopeId2}>${ssrInterpolate(slotProps.spoilers[Object.keys(slotProps.spoilers)[0]])} <div class="footer__block"${_scopeId2}><div class="footer__text"${_scopeId2}>\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u0432 \u0441\u043E\u0446. \u0441\u0435\u0442\u044F\u0445</div>`);
              _push3(ssrRenderComponent(_component_social_networks_node, null, null, _parent3, _scopeId2));
              _push3(`</div><div class="footer__block"${_scopeId2}><div class="footer__text"${_scopeId2}>\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043F\u043E \u0420\u043E\u0441\u0441\u0438\u0438:</div><div class="footer__text_big"${_scopeId2}><a href="tel:88009999999"${_scopeId2}>88009999999</a></div></div><div class="footer__block"${_scopeId2}><div class="footer__text"${_scopeId2}>\u0410\u0434\u0440\u0435\u0441 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430:</div><div class="footer__text_medium"${_scopeId2}> \u0433. \u041C\u043E\u0441\u043A\u0432\u0430, \u0421\u043C\u043E\u043B\u0435\u043D\u0441\u043A\u0430\u044F \u043F\u043B\u043E\u0449\u0430\u0434\u044C, 0 </div><div class="footer__text_semi-transp"${_scopeId2}>\u0414\u0440\u0443\u0433\u0438\u0435 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u044B</div></div></div><div class="footer__column"${_scopeId2}><div class="footer__title"${_scopeId2}>\u041F\u043E\u043A\u0443\u043F\u043A\u0438 \u043E\u043D\u043B\u0430\u0439\u043D</div><ul class="footer__list"${_scopeId2}><li${_scopeId2}>\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043F\u043E \u0432\u0441\u0435\u0439 \u0420\u043E\u0441\u0441\u0438\u0438</li><li${_scopeId2}>\u041E\u043F\u043B\u0430\u0442\u0430</li><li${_scopeId2}>\u0412\u044B\u0431\u043E\u0440 \u0440\u0430\u0437\u043C\u0435\u0440\u0430</li><li${_scopeId2}>\u0412\u043E\u0437\u0432\u0440\u0430\u0442</li><li${_scopeId2}>\u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430</li></ul></div><div class="footer__column"${_scopeId2}><div class="footer__title"${_scopeId2}>\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044F\u043C</div><ul class="footer__list"${_scopeId2}><li${_scopeId2}>\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B</li><li${_scopeId2}>\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u043B\u043E\u044F\u043B\u044C\u043D\u043E\u0441\u0442\u0438</li><li${_scopeId2}>\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0435 \u0431\u043E\u043D\u0443\u0441\u044B</li><li${_scopeId2}>\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430</li><li${_scopeId2}>\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B</li><li${_scopeId2}>\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B</li><li${_scopeId2}>\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C</li><li${_scopeId2}>\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043F\u0440\u043E\u0434\u0430\u0436\u0438</li></ul></div><div class="footer__column"${_scopeId2}><div class="footer__title"${_scopeId2}>\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F</div><ul class="footer__list"${_scopeId2}><li${_scopeId2}>\u0412\u0430\u043A\u0430\u043D\u0441\u0438\u0438</li><li${_scopeId2}>Fashion-\u0431\u043B\u043E\u0433</li><li${_scopeId2}>\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438</li><li${_scopeId2}>\u041F\u0440\u0435\u0441\u0441-\u043E\u0444\u0438\u0441</li><li${_scopeId2}>\u041F\u0440\u0435\u0441\u0441-\u0440\u0435\u043B\u0438\u0437\u044B</li><li${_scopeId2}>\u041F\u0430\u0440\u0442\u043D\u0435\u0440\u0430\u043C</li><li${_scopeId2}>\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</li></ul></div>`);
            } else {
              return [
                createVNode("div", { class: "footer__column" }, [
                  createTextVNode(toDisplayString(slotProps.spoilers[Object.keys(slotProps.spoilers)[0]]) + " ", 1),
                  createVNode("div", { class: "footer__block" }, [
                    createVNode("div", { class: "footer__text" }, "\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u0432 \u0441\u043E\u0446. \u0441\u0435\u0442\u044F\u0445"),
                    createVNode(_component_social_networks_node)
                  ]),
                  createVNode("div", { class: "footer__block" }, [
                    createVNode("div", { class: "footer__text" }, "\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043F\u043E \u0420\u043E\u0441\u0441\u0438\u0438:"),
                    createVNode("div", { class: "footer__text_big" }, [
                      createVNode("a", { href: "tel:88009999999" }, "88009999999")
                    ])
                  ]),
                  createVNode("div", { class: "footer__block" }, [
                    createVNode("div", { class: "footer__text" }, "\u0410\u0434\u0440\u0435\u0441 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430:"),
                    createVNode("div", { class: "footer__text_medium" }, " \u0433. \u041C\u043E\u0441\u043A\u0432\u0430, \u0421\u043C\u043E\u043B\u0435\u043D\u0441\u043A\u0430\u044F \u043F\u043B\u043E\u0449\u0430\u0434\u044C, 0 "),
                    createVNode("div", { class: "footer__text_semi-transp" }, "\u0414\u0440\u0443\u0433\u0438\u0435 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u044B")
                  ])
                ]),
                createVNode("div", { class: "footer__column" }, [
                  createVNode("div", { class: "footer__title" }, "\u041F\u043E\u043A\u0443\u043F\u043A\u0438 \u043E\u043D\u043B\u0430\u0439\u043D"),
                  createVNode("ul", { class: "footer__list" }, [
                    createVNode("li", null, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043F\u043E \u0432\u0441\u0435\u0439 \u0420\u043E\u0441\u0441\u0438\u0438"),
                    createVNode("li", null, "\u041E\u043F\u043B\u0430\u0442\u0430"),
                    createVNode("li", null, "\u0412\u044B\u0431\u043E\u0440 \u0440\u0430\u0437\u043C\u0435\u0440\u0430"),
                    createVNode("li", null, "\u0412\u043E\u0437\u0432\u0440\u0430\u0442"),
                    createVNode("li", null, "\u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430")
                  ])
                ]),
                createVNode("div", { class: "footer__column" }, [
                  createVNode("div", { class: "footer__title" }, "\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044F\u043C"),
                  createVNode("ul", { class: "footer__list" }, [
                    createVNode("li", null, "\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B"),
                    createVNode("li", null, "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u043B\u043E\u044F\u043B\u044C\u043D\u043E\u0441\u0442\u0438"),
                    createVNode("li", null, "\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0435 \u0431\u043E\u043D\u0443\u0441\u044B"),
                    createVNode("li", null, "\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430"),
                    createVNode("li", null, "\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B"),
                    createVNode("li", null, "\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B"),
                    createVNode("li", null, "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C"),
                    createVNode("li", null, "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043F\u0440\u043E\u0434\u0430\u0436\u0438")
                  ])
                ]),
                createVNode("div", { class: "footer__column" }, [
                  createVNode("div", { class: "footer__title" }, "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F"),
                  createVNode("ul", { class: "footer__list" }, [
                    createVNode("li", null, "\u0412\u0430\u043A\u0430\u043D\u0441\u0438\u0438"),
                    createVNode("li", null, "Fashion-\u0431\u043B\u043E\u0433"),
                    createVNode("li", null, "\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438"),
                    createVNode("li", null, "\u041F\u0440\u0435\u0441\u0441-\u043E\u0444\u0438\u0441"),
                    createVNode("li", null, "\u041F\u0440\u0435\u0441\u0441-\u0440\u0435\u043B\u0438\u0437\u044B"),
                    createVNode("li", null, "\u041F\u0430\u0440\u0442\u043D\u0435\u0440\u0430\u043C"),
                    createVNode("li", null, "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B")
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "footer__main-body" }, [
            createVNode("div", { class: "footer__logo" }, [
              createVNode(_component_router_link, { to: "/" }, {
                default: withCtx(() => [
                  createTextVNode("LO"),
                  createVNode("span", null, "GOTYPE")
                ]),
                _: 1
              })
            ]),
            createVNode(_component_spoilers_block_node, {
              class: "footer__columns",
              spoilerBlockName: "footer",
              spoilersAmount: 3
            }, {
              default: withCtx((slotProps) => [
                createVNode("div", { class: "footer__column" }, [
                  createTextVNode(toDisplayString(slotProps.spoilers[Object.keys(slotProps.spoilers)[0]]) + " ", 1),
                  createVNode("div", { class: "footer__block" }, [
                    createVNode("div", { class: "footer__text" }, "\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u0432 \u0441\u043E\u0446. \u0441\u0435\u0442\u044F\u0445"),
                    createVNode(_component_social_networks_node)
                  ]),
                  createVNode("div", { class: "footer__block" }, [
                    createVNode("div", { class: "footer__text" }, "\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043F\u043E \u0420\u043E\u0441\u0441\u0438\u0438:"),
                    createVNode("div", { class: "footer__text_big" }, [
                      createVNode("a", { href: "tel:88009999999" }, "88009999999")
                    ])
                  ]),
                  createVNode("div", { class: "footer__block" }, [
                    createVNode("div", { class: "footer__text" }, "\u0410\u0434\u0440\u0435\u0441 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430:"),
                    createVNode("div", { class: "footer__text_medium" }, " \u0433. \u041C\u043E\u0441\u043A\u0432\u0430, \u0421\u043C\u043E\u043B\u0435\u043D\u0441\u043A\u0430\u044F \u043F\u043B\u043E\u0449\u0430\u0434\u044C, 0 "),
                    createVNode("div", { class: "footer__text_semi-transp" }, "\u0414\u0440\u0443\u0433\u0438\u0435 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u044B")
                  ])
                ]),
                createVNode("div", { class: "footer__column" }, [
                  createVNode("div", { class: "footer__title" }, "\u041F\u043E\u043A\u0443\u043F\u043A\u0438 \u043E\u043D\u043B\u0430\u0439\u043D"),
                  createVNode("ul", { class: "footer__list" }, [
                    createVNode("li", null, "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043F\u043E \u0432\u0441\u0435\u0439 \u0420\u043E\u0441\u0441\u0438\u0438"),
                    createVNode("li", null, "\u041E\u043F\u043B\u0430\u0442\u0430"),
                    createVNode("li", null, "\u0412\u044B\u0431\u043E\u0440 \u0440\u0430\u0437\u043C\u0435\u0440\u0430"),
                    createVNode("li", null, "\u0412\u043E\u0437\u0432\u0440\u0430\u0442"),
                    createVNode("li", null, "\u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430")
                  ])
                ]),
                createVNode("div", { class: "footer__column" }, [
                  createVNode("div", { class: "footer__title" }, "\u041F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u044F\u043C"),
                  createVNode("ul", { class: "footer__list" }, [
                    createVNode("li", null, "\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B"),
                    createVNode("li", null, "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u043B\u043E\u044F\u043B\u044C\u043D\u043E\u0441\u0442\u0438"),
                    createVNode("li", null, "\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0435 \u0431\u043E\u043D\u0443\u0441\u044B"),
                    createVNode("li", null, "\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430"),
                    createVNode("li", null, "\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B"),
                    createVNode("li", null, "\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B"),
                    createVNode("li", null, "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C"),
                    createVNode("li", null, "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043F\u0440\u043E\u0434\u0430\u0436\u0438")
                  ])
                ]),
                createVNode("div", { class: "footer__column" }, [
                  createVNode("div", { class: "footer__title" }, "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F"),
                  createVNode("ul", { class: "footer__list" }, [
                    createVNode("li", null, "\u0412\u0430\u043A\u0430\u043D\u0441\u0438\u0438"),
                    createVNode("li", null, "Fashion-\u0431\u043B\u043E\u0433"),
                    createVNode("li", null, "\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438"),
                    createVNode("li", null, "\u041F\u0440\u0435\u0441\u0441-\u043E\u0444\u0438\u0441"),
                    createVNode("li", null, "\u041F\u0440\u0435\u0441\u0441-\u0440\u0435\u043B\u0438\u0437\u044B"),
                    createVNode("li", null, "\u041F\u0430\u0440\u0442\u043D\u0435\u0440\u0430\u043C"),
                    createVNode("li", null, "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B")
                  ])
                ])
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section><section class="footer__footer">`);
  _push(ssrRenderComponent(_component_container_node, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="footer__footer-body"${_scopeId}><div class="footer__text"${_scopeId}>\xA9 \u0410\u041E \xABLOGOTYPE\xBB, 2022</div><div class="footer__text footer__text_semi-transp"${_scopeId}> \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 </div></div>`);
      } else {
        return [
          createVNode("div", { class: "footer__footer-body" }, [
            createVNode("div", { class: "footer__text" }, "\xA9 \u0410\u041E \xABLOGOTYPE\xBB, 2022"),
            createVNode("div", { class: "footer__text footer__text_semi-transp" }, " \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 ")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section></footer>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/structure/FooterNode.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const FooterNode = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
const LoginNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$3 = {
  props: {},
  data() {
    return {
      currentTab: 1,
      userData: {
        first_name: "",
        last_name: "",
        username: "",
        email: "antoshka@gmail.com",
        password: "antoshka"
      }
    };
  },
  computed: {
    ...mapState({
      customersRequest: (state2) => state2.customers.basedRequest,
      authRequest: (state2) => state2.auth.basedRequest,
      userAuth: (state2) => state2.auth.userAuth
    }),
    ...mapGetters({})
  },
  methods: {
    ...mapMutations({
      SET_VALUE: "SET_VALUE"
    }),
    ...mapActions({
      mainFetchRequest: "mainFetchRequest",
      getCart: "cart/getCart",
      login: "auth/login",
      logout: "auth/logout"
    }),
    loginFromMail() {
      let str = this.userData.email;
      return str.slice(0, str.indexOf("@"));
    },
    async registerCustomer() {
      this.userData.username = this.loginFromMail();
      await this.mainFetchRequest(
        Object.assign(cloneDeep(this.customersRequest), {
          method: "post",
          data: this.userData
        })
      );
    },
    async loginCustomer() {
      const requested = await this.mainFetchRequest({
        route_base: "token",
        apiType: this.authRequest.apiType,
        method: "post",
        data: {
          username: this.loginFromMail(),
          password: this.userData.password
        },
        maintainJWT: false
      });
      this.login(requested.response.data.token);
      this.getCart();
    },
    async logoutCustomer() {
      this.logout();
      this.getCart();
    }
  },
  created() {
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_button_node = resolveComponent("button-node");
  const _component_input_radio_node = resolveComponent("input-radio-node");
  const _component_input_node = resolveComponent("input-node");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "login" }, _attrs))}>`);
  if (_ctx.userAuth) {
    _push(`<div class="login__logined"><div class="login__greeting">\u0412\u044B \u0432\u043E\u0448\u043B\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443</div>`);
    _push(ssrRenderComponent(_component_button_node, {
      buttonStyle: "dark",
      onClick: ($event) => $options.logoutCustomer()
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate("\u0412\u044B\u0439\u0442\u0438")}`);
        } else {
          return [
            createTextVNode(toDisplayString("\u0412\u044B\u0439\u0442\u0438"))
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div>`);
  } else {
    _push(`<div class=""><div class="login__buttons"><button class="${ssrRenderClass([$data.currentTab === 1 ? "active" : "", "login__title"])}">\u0412\u0445\u043E\u0434</button><button class="${ssrRenderClass([$data.currentTab === 2 ? "active" : "", "login__title"])}">\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F</button></div><div class="login__columns"><div style="${ssrRenderStyle($data.currentTab == 1 ? null : { display: "none" })}" class="login__column tab-login"><div class="login-tab__body"><div class="login-tab__form"><form><div class="login-tab__radio-inputes">`);
    _push(ssrRenderComponent(_component_input_radio_node, {
      name: "typeLogin",
      labelText: "\u0427\u0435\u0440\u0435\u0437 \u043B\u043E\u0433\u0438\u043D",
      modelValue: true
    }, null, _parent));
    _push(ssrRenderComponent(_component_input_radio_node, {
      disabled: true,
      name: "typeLogin",
      labelText: "\u0427\u0435\u0440\u0435\u0437 \u0421\u041C\u0421-\u043A\u043E\u0434",
      modelValue: false
    }, null, _parent));
    _push(`</div>`);
    _push(ssrRenderComponent(_component_input_node, {
      class: "main",
      type: "text",
      modelValue: $data.userData.email,
      "onUpdate:modelValue": ($event) => $data.userData.email = $event
    }, {
      after: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<label${_scopeId}>\u041F\u043E\u0447\u0442\u0430</label>`);
        } else {
          return [
            createVNode("label", null, "\u041F\u043E\u0447\u0442\u0430")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(ssrRenderComponent(_component_input_node, {
      class: "main",
      type: "password",
      modelValue: $data.userData.password,
      "onUpdate:modelValue": ($event) => $data.userData.password = $event
    }, {
      after: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<label${_scopeId}>\u041F\u0430\u0440\u043E\u043B\u044C</label>`);
        } else {
          return [
            createVNode("label", null, "\u041F\u0430\u0440\u043E\u043B\u044C")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(ssrRenderComponent(_component_button_node, {
      buttonStyle: "dark",
      onClick: ($event) => $options.loginCustomer()
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate("\u0412\u043E\u0439\u0442\u0438")}`);
        } else {
          return [
            createTextVNode(toDisplayString("\u0412\u043E\u0439\u0442\u0438"))
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</form></div></div></div><div style="${ssrRenderStyle($data.currentTab === 2 ? null : { display: "none" })}" class="login__column tab-register"><div class="register-tab__body"><form>`);
    _push(ssrRenderComponent(_component_input_node, {
      class: "main",
      type: "text",
      modelValue: $data.userData.first_name,
      "onUpdate:modelValue": ($event) => $data.userData.first_name = $event
    }, {
      after: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<label${_scopeId}>\u0418\u043C\u044F</label>`);
        } else {
          return [
            createVNode("label", null, "\u0418\u043C\u044F")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(ssrRenderComponent(_component_input_node, {
      class: "main",
      type: "text",
      modelValue: $data.userData.last_name,
      "onUpdate:modelValue": ($event) => $data.userData.last_name = $event
    }, {
      after: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<label${_scopeId}>\u0424\u0430\u043C\u0438\u043B\u0438\u044F</label>`);
        } else {
          return [
            createVNode("label", null, "\u0424\u0430\u043C\u0438\u043B\u0438\u044F")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(ssrRenderComponent(_component_input_node, {
      class: "main",
      type: "text",
      modelValue: $data.userData.email,
      "onUpdate:modelValue": ($event) => $data.userData.email = $event
    }, {
      after: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<label${_scopeId}>\u041F\u043E\u0447\u0442\u0430</label>`);
        } else {
          return [
            createVNode("label", null, "\u041F\u043E\u0447\u0442\u0430")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(ssrRenderComponent(_component_input_node, {
      class: "main",
      type: "password",
      modelValue: $data.userData.password,
      "onUpdate:modelValue": ($event) => $data.userData.password = $event
    }, {
      after: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<label${_scopeId}>\u041F\u0430\u0440\u043E\u043B\u044C</label>`);
        } else {
          return [
            createVNode("label", null, "\u041F\u0430\u0440\u043E\u043B\u044C")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(ssrRenderComponent(_component_button_node, {
      buttonStyle: "dark",
      onClick: $options.registerCustomer
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F`);
        } else {
          return [
            createTextVNode("\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</form></div></div></div></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/structure/LoginNode.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const LoginNode = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const LoadingLineNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$2 = {
  components: {},
  watch: {},
  computed: {
    ...mapGetters({}),
    ...mapState({
      progressLoad: (state2) => state2.common.progressLoad
    })
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({})
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    style: [
      _ctx.progressLoad.visible ? null : { display: "none" },
      { width: _ctx.progressLoad.percent + "%" }
    ],
    class: "loading-line"
  }, _attrs))}></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/LoadingLineNode.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const LoadingLineNode = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const AllWidgetsNode_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = {
  components: {
    LoadingLineNode,
    LoginNode
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      loginPopup(state2) {
        return state2.common.revs.login;
      }
    })
  },
  methods: {
    ...mapMutations({
      addRev: "common/addRev",
      updateRev: "common/updateRev"
    }),
    ...mapActions({}),
    loginPopupVisible() {
      this.updateRev({
        name: "login",
        value: this.loginPopup.visible
      });
    }
  },
  mounted() {
    this.updateRev({
      name: "login",
      value: false,
      toggleValue: false
    });
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_loading_line_node = resolveComponent("loading-line-node");
  const _component_popup_node = resolveComponent("popup-node");
  const _component_login_node = resolveComponent("login-node");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "widgets" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_loading_line_node, null, null, _parent));
  _push(ssrRenderComponent(_component_popup_node, {
    class: "login",
    name: "login"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_login_node, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_login_node)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/structure/AllWidgetsNode.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AllWidgetsNode = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const App_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  components: {
    HeaderLightNode,
    HeaderNode,
    FooterNode,
    AllWidgetsNode
  },
  data() {
    return {};
  },
  watch: {
    scrollFlag() {
      this.scrollDocument();
    }
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      scrollFlag: (state2) => state2.common.scrollFlag,
      windowWidth: (state2) => state2.common.windowWidth,
      productsCategories: (state2) => state2.productsCategories
    })
  },
  methods: {
    ...mapMutations({
      SET_VALUE: "SET_VALUE",
      setWindowWidth: "common/setWindowWidth",
      setScrollY: "common/setScrollY",
      setBreakpoint: "common/setBreakpoint",
      closeRevs: "common/closeRevs"
    }),
    ...mapActions({
      getItems: "getItems",
      getCart: "cart/getCart",
      updateUserAuth: "auth/updateUserAuth"
    }),
    onResize(value) {
      this.setWindowWidth(value);
    },
    scrollDocument() {
      if (this.scrollFlag) {
        document.documentElement.style.overflow = "auto";
        return;
      }
      document.documentElement.style.overflow = "hidden";
    },
    truncatedComponent(value) {
      return truncatedComponents.find((el) => el.name === value) ? true : false;
    }
  },
  created() {
    this.updateUserAuth();
    if (isEmpty(this.productsCategories.items) && isEmpty(this.productsCategories.requests)) {
      this.getItems(this.productsCategories.basedRequest);
    }
    this.getCart();
  },
  mounted() {
    window.addEventListener(
      "resize",
      (e) => this.onResize(e.target.innerWidth)
    );
    window.onscroll = () => {
      this.setScrollY(window.scrollY);
    };
  },
  updated() {
    console.log("app upd");
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  const _component_all_widgets_node = resolveComponent("all-widgets-node");
  const _component_header_light_node = resolveComponent("header-light-node");
  const _component_header_node = resolveComponent("header-node");
  const _component_footer_node = resolveComponent("footer-node");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_router_view, null, {
    default: withCtx(({ Component, route }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_all_widgets_node, null, null, _parent2, _scopeId));
        if ($options.truncatedComponent(route.name)) {
          _push2(ssrRenderComponent(_component_header_light_node, null, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        if (!$options.truncatedComponent(route.name)) {
          _push2(ssrRenderComponent(_component_header_node, null, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(Component), null, null), _parent2, _scopeId);
        if (!$options.truncatedComponent(route.name)) {
          _push2(ssrRenderComponent(_component_footer_node, null, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode(_component_all_widgets_node),
          $options.truncatedComponent(route.name) ? (openBlock(), createBlock(_component_header_light_node, { key: 0 })) : createCommentVNode("", true),
          !$options.truncatedComponent(route.name) ? (openBlock(), createBlock(_component_header_node, { key: 1 })) : createCommentVNode("", true),
          (openBlock(), createBlock(resolveDynamicComponent(Component))),
          !$options.truncatedComponent(route.name) ? (openBlock(), createBlock(_component_footer_node, { key: 2 })) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
function createApp() {
  const app = createSSRApp(App);
  UI.forEach((component) => {
    app.component(component.name, component);
  });
  app.use(router).use(store);
  return { app, router };
}
async function render(url2, manifest) {
  const { app, router: router2 } = createApp();
  await router2.push(url2);
  await router2.isReady();
  const ctx = {};
  const html = await renderToString(app, ctx);
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return [html, preloadLinks];
}
function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = /* @__PURE__ */ new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = basename(file);
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }
          }
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    return "";
  }
}
export {
  render
};
