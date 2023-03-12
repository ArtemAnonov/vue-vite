<template>
  <!-- -->
  <div class="app"
    @click="updateAllOpeningTypeItems({})">
    <RouterView v-if="showAppContent"
      v-slot="{ Component, route }">
      <WidgetsNode />
      <HeaderLightNode v-if="truncatedComponent(route.name)"/>
      <TheHeaderNode v-else/>
      <component :is="Component"/>
      <FooterNode v-if="!truncatedComponent(route.name)"/>
    </RouterView>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {
  mapState, mapGetters, mapMutations, mapActions,
} from "vuex";
import { isEmpty } from "lodash-es";
import { truncatedComponents } from "@/router/routes";
import HeaderLightNode from "@/components/structure/HeaderLightNode.vue";
import TheHeaderNode from "@/components/structure/TheHeaderNode.vue";
import FooterNode from "@/components/structure/FooterNode.vue";
import WidgetsNode from "@/components/structure/WidgetsNode.vue";

export default {
  components: {
    HeaderLightNode,
    TheHeaderNode,
    FooterNode,
    WidgetsNode,
  },
  data() {
    return {
      /**
       * Default value false for not-SSR mode for cosmetic "correct" load page.
       * For prod php-template not important
       */
      showAppContent: !!import.meta.env.SSR,
    };
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
  watch: {
    scrollFlag() {
      this.scrollDocument();
    },
    userAuth: {
      /**
       * getUser() в первом блоке не актуален, так как метод
       * вызывается из login()
       */
      async handler(userAuth) {
        if (userAuth === true && !this.userData?.id) {
          if (!Cookies.get("tinv_wlk_log")) {
            await this.getUser();
            await this.getWishlistByUser();
          } else {
            this.getUser();
          }
          this.getWishlistProductsByShareKey();
        }
        if (userAuth === false) {
          if (!Cookies.get("tinv_wishlistkey")) {
            await this.getWishlistByUser();
          }
          this.getWishlistProductsByShareKey();
        }
      },
      immediate: true,
    },
  },
  /**
   * Аутентификация(*) и загрузка корзины. Загрузка категорий, если они по какой-то причинне
   * не загружены из web php
   * (*) Аутентификация перенесена в router/indexs
   */
  created() {
    this.getCart();
  },

  mounted() {
    window.addEventListener("DOMContentLoaded", () => {
      this.showAppContent = true;
      this.setBrowserReady(
        !!(typeof window !== "undefined" && typeof document !== "undefined"),
      );
    });
    this.setWindowWidth(window.innerWidth);
    window.addEventListener("resize", (e) => this.onResize(e.target.innerWidth));
    window.onscroll = () => {
      this.setScrollY(window.scrollY);
    };
  },
  methods: {
    ...mapMutations({
      setValue: "setValue",
      setWindowWidth: "common/setWindowWidth",
      setScrollY: "common/setScrollY",
      setBreakpoint: "common/setBreakpoint",
      closeRevs: "common/closeRevs",
      setBrowserReady: "common/setBrowserReady",
      setUserData: "auth/setUserData",
      updateSensitiveData: "updateSensitiveData",
    }),
    ...mapActions({
      getItems: "getItems",
      getCart: "cart/getCart",
      getUser: "auth/getUser",
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
        // document.body.style.paddingRight = "0px";

        return;
      }
      document.body.style.overflow = "hidden";
      // document.body.style.paddingRight = "20px";
    },
    /**
     * (~)
     * @param {*} value
     */
    truncatedComponent(value) {
      return !!truncatedComponents[0].children.find((el) => el.name === value);
    },
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

.message-link {
  color: $cBlue;
  margin-left: 4px;
}

h2 {
  font-size: 1.8rem;
  line-height: 2rem;
  font-weight: 400;

  @media (max-width: ($md3+px)) {
      font-size: 1.4rem;
      line-height: 1.8rem;
  }
}

</style>
