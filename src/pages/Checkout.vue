<template>
  <main-page-node>
    <template #page-head>
      <page-head-truncated-node backLinkName="Корзина" pageTitle="Оформление заказа"></page-head-truncated-node>
    </template>
    <template #page-main>
      <container-node>
        <div class="checkout">
          <div class="checkout__body">
            <middle-content-node>
              <template #items>
                <PreloadWrapContainerNode class="cart__item" :quantityPreloadElements="4" :iterable="cartItems"
                  v-slot="slotProps">
                  <div class="order-item">
                    <div class="order-item__image">
                      <picture>
                        <source srcset="" type="image/webp">
                        <source srcset="" type="image/jpeg">
                        <img :src="slotProps.cartItem.images[0].src" alt="">
                      </picture>
                    </div>
                  </div>
                </PreloadWrapContainerNode>
              </template>
              <template #sidebar>
                <div class="middle-content__sidebar">
                  <div class="middle-content__block">
                    <div class="middle-content__item">
                      <div class="middle-content__key">Скидка</div>
                      <div class="middle-content__value">- 0<span class="middle-content__currency"> ₽</span></div>
                    </div>
                    <div class="middle-content__item">
                      <div class="middle-content__key">Количество товаров</div>
                      <div class="middle-content__value icon-info">{{ cartStore.items?.length }} шт.</div>
                    </div>

                  </div>
                  <div class="middle-content__block">
                    <div class="middle-content__item">
                      <div class="middle-content__key middle-content__key_big">Итого</div>
                      <div class="middle-content__value middle-content__value_big">
                        {{ cartStore?.totals?.total_price }}
                        <span class="middle-content__currency"> ₽</span>
                      </div>
                    </div>
                    <div class="middle-content__item">
                      <div class="middle-content__key">Стоимость без учёта скидок:</div>
                      <div class="middle-content__value"></div>
                    </div>
                    <div class="middle-content__item">
                      <div class="middle-content__key">Балов будет начислено:</div>
                      <div class="middle-content__value"></div>
                    </div>
                    <button-node buttonStyle="dark" @click="toCheckout">Заказать
                    </button-node>
                  </div>
                </div>
              </template>
            </middle-content-node>
          </div>
        </div>
      </container-node>
    </template>
  </main-page-node>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { setNonceToken } from "@/api/utils";
import MainPageNode from '@/components/structure/MainPageNode.vue'
import PreloadWrapContainerNode from "@/components/structure/PreloadWrapContainerNode.vue";
import PageHeadTruncatedNode from '@/components/structure/PageHeadTruncatedNode.vue'
import MiddleContentNode from '@/components/cart-and-ordering/MiddleContentNode.vue'

export default {
  components: {
    MainPageNode,
    PreloadWrapContainerNode,
    PageHeadTruncatedNode,
    MiddleContentNode,
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      userAuth: (state) => state.auth.userAuth,
      cartItems: (state) => state.cart.store.items,
      cartStore: (state) => state.cart.store,
      checkoutRequest: (state) => state.checkout.basedRequest,
    }),
  },
  methods: {
    ...mapMutations({
      SET_VALUE: "SET_VALUE",
      updateRev: "common/updateRev",
    }),
    ...mapActions({
      mainFetchRequest: "mainFetchRequest",
    }),

    ordering() {
      const requested = this.mainFetchRequest({
        apiType: this.checkoutRequest.apiType,
        route_base: this.checkoutRequest.route_base,
        method: "get",
        data: {},
        config: { headers: setNonceToken() },
        maintainJWT: true,
        reqiredJWT: true,
      });
    },
  },

  created() {

  },
};
</script>

<style lang="scss">
.order-item {
  width: 4rem;

  &__image {
    img {
      width: 100%;
      height: 6rem;
      position: relative;
      overflow: hidden;
      font-size: .75rem;
    }
  }
}
</style>
