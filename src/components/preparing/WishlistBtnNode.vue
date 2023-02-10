<template>
  <button
    class="wishlist-btn"
    :class="{ 'wishlist-btn_active': contained }"
    :disabled="buttonDisabled"
    @click="updateWishlistAndHandleResponse"
  >
    <slot></slot>

  </button>
</template>

<script>
import Cookies from "js-cookie";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: {
    /**
     * {Number} productData.product_id
     * {Number} productData.variation_id
     * {Array} productData.meta
     */
    productData: Object,
  },
  data() {
    return {
      buttonDisabled: false,
      contained: false,
      itemId: null,
    };
  },
  watch: {
    wishlistItems: {
      handler(wishlistItems) {
        this.itemId = this.productContanedInWishlist(
          this.productData.product_id
        );
        this.contained = Boolean(this.itemId);
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    ...mapState({
      basedRequest: (state) => state.wishlist.basedRequest,
      wishlistItems: (state) => state.wishlist.items,
    }),
    ...mapGetters({
      productContanedInWishlist: "wishlist/productContanedInWishlist",
      singleItem: "wishlist/singleItem",
    }),
  },
  methods: {
    ...mapMutations({ ADD_ITEM: "ADD_ITEM", REMOVE_ITEM: "REMOVE_ITEM" }),
    ...mapActions({
      getWishlistProductsByShareKey: "wishlist/getWishlistProductsByShareKey",
      updateWishlist: "wishlist/updateWishlist",
      updateMessage: "common/updateMessage",
    }),

    async updateWishlistAndHandleResponse() {
      this.buttonDisabled = true;
      const response = await this.updateWishlist({
        // basedRequest: this.basedRequest,
        contained: this.contained,
        itemId: this.itemId,
        productData: this.productData,
      });
      this.buttonDisabled = false;

      if (response === undefined) this.updateMessage("allError");
      else {
        if (typeof response.data === "object") {
          this.updateMessage("productAddedToWishlist");
          this.ADD_ITEM({
            type: this.basedRequest.type,
            item: response.data[0],
          });
        } else {
          this.REMOVE_ITEM({ type: this.basedRequest.type, id: this.itemId });
        }
      }
    },
  },
};
</script>

<style lang="scss">
.wishlist-btn {
  &_active {
    &::before {
      color: #231f20 !important;
    }
  }
}
</style>
