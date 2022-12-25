<template>
  <!-- -->
  <div class="app" @click="closeRevs()">
    <router-view
      v-if="showAppContent"
      v-slot="{ Component, route }"
    >
      <all-widgets-node></all-widgets-node>
      <header-light-node
        v-if="truncatedComponent(route.name)"
      ></header-light-node>
      <header-node v-if="!truncatedComponent(route.name)"></header-node>
      <component :is="Component"></component>
      <footer-node v-if="!truncatedComponent(route.name)"></footer-node>
    </router-view>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { isEmpty } from "lodash-es";
import { truncatedComponents, routes } from "@/router/routes";
import HeaderLightNode from "@/components/structure/HeaderLightNode.vue";
import HeaderNode from "@/components/structure/HeaderNode.vue";
import FooterNode from "@/components/structure/FooterNode.vue";
import AllWidgetsNode from "@/components/structure/AllWidgetsNode.vue";

export default {
  components: {
    HeaderLightNode,
    HeaderNode,
    FooterNode,
    AllWidgetsNode,
  },
  data() {
    return {
      /**
       * Default value false for not-SSR mode for cosmetic "correct" load page.
       * For prod php-template not important
       */
      showAppContent: import.meta.env.SSR ? true : false,
    };
  },
  watch: {
    scrollFlag() {
      this.scrollDocument();
    },
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      scrollFlag: (state) => state.common.scrollFlag,
      productsCategories: (state) => state.productsCategories,
      windowWidth: (state) => state.common.windowWidth,

    }),
  },
  methods: {
    ...mapMutations({
      SET_VALUE: "SET_VALUE",
      setWindowWidth: "common/setWindowWidth",
      setScrollY: "common/setScrollY",
      setBreakpoint: "common/setBreakpoint",
      closeRevs: "common/closeRevs",
      setBrowserReady: 'common/setBrowserReady'
    }),
    ...mapActions({
      getItems: "getItems",
      getCart: "cart/getCart",
      updateUserAuth: "auth/updateUserAuth",
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
    },
  },
  /**
   * Аунтификация и загрузка корзины. Загрузка категорий, если они по какой-то причинне
   * не загружены из web php
   */
  created() {
    this.updateUserAuth();
    if (import.meta.env.VITE_LIKE_A_SPA) {
      this.getItems(this.productsCategories.basedRequest);
    }
    this.getCart();
  },

  mounted() {
    window.addEventListener("DOMContentLoaded", (event) => {
      this.showAppContent = true;
      this.setBrowserReady((typeof window !== 'undefined' && typeof document !== 'undefined') ? true : false)
    });

    this.onResize(window.innerWidth)
    window.addEventListener("resize", (e) =>
      this.onResize(e.target.innerWidth)
    );

    window.onscroll = () => {
      this.setScrollY(window.scrollY);
    };

    // let rendererEvent = new Event('renderer-ready')
    // window.document.dispatchEvent(rendererEvent)
  },
};
</script>

<style lang="scss">
#app {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.app {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.sw-cont {
  max-width: 100%;
  max-height: 100%;
  min-height: 0;
  min-width: 0;
}
</style>
