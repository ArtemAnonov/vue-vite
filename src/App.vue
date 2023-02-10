<template>
  <!-- -->
  <div class="app" @click="updateAllOpeningTypeItems({})">
    <router-view v-if="showAppContent" v-slot="{ Component, route }">
      <WidgetsNode />
      <HeaderLightNode v-if="truncatedComponent(route.name)"></HeaderLightNode>
      <HeaderNode v-else></HeaderNode>
      <component :is="Component"></component>
      <FooterNode v-if="!truncatedComponent(route.name)"></FooterNode>
    </router-view>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { truncatedComponents, routes } from "@/router/routes";
import { isEmpty } from "lodash-es";
import HeaderLightNode from "@/components/structure/HeaderLightNode.vue";
import HeaderNode from "@/components/structure/HeaderNode.vue";
import FooterNode from "@/components/structure/FooterNode.vue";
import WidgetsNode from "@/components/structure/WidgetsNode.vue";

export default {
  components: {
    HeaderLightNode,
    HeaderNode,
    FooterNode,
    WidgetsNode,
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
    userAuth: {
      async handler(userAuth) {
        if (userAuth === true && isEmpty(this.userData)) {
          await this.getUser();
          await this.getWishlistByUser();
          this.getWishlistProductsByShareKey();
        }
        if (userAuth === false) {
          this.setUserData()
          await this.getWishlistByUser();
          this.getWishlistProductsByShareKey();
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      userAuth: (state) => state.auth.userAuth,
      userData: (state) => state.auth.userData,
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
      setBrowserReady: "common/setBrowserReady",
      setUserData: 'auth/setUserData',
    }),
    ...mapActions({
      getItems: "getItems",
      getCart: "cart/getCart",
      getUser: "auth/getUser",
      updateUserAuth: "auth/updateUserAuth",
      updateAllOpeningTypeItems: "common/updateAllOpeningTypeItems",
      getWishlistByUser: "wishlist/getWishlistByUser",
      getWishlistProductsByShareKey: "wishlist/getWishlistProductsByShareKey",
    }),
    onResize(value) {
      this.setWindowWidth(value);
    },
    scrollDocument() {
      if (this.scrollFlag) {
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0px";

        return;
      }
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "20px";
    },
    truncatedComponent(value) {
      return truncatedComponents.find((el) => el.name === value) ? true : false;
    },
  },
  /**
   * Аутентификация(*) и загрузка корзины. Загрузка категорий, если они по какой-то причинне
   * не загружены из web php
   * (*) Аутентификация перенесена в router/indexs
   */
  created() {
    // this.updateUserAuth();
    if (import.meta.env.VITE_LIKE_A_SPA) {
      this.getItems({basedRequest: this.productsCategories.basedRequest});
    }
    this.getCart();
  },

  mounted() {
    window.addEventListener("DOMContentLoaded", (event) => {
      this.showAppContent = true;
      this.setBrowserReady(
        typeof window !== "undefined" && typeof document !== "undefined"
          ? true
          : false
      );
    });
    this.setWindowWidth(window.innerWidth);
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
  height: 100%;
  min-width: 0;
}
</style>
