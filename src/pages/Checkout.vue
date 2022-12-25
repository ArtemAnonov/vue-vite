<template>
  <MainPageNode>
    <template #page-head>
      <PageHeadTruncatedNode
        backLinkName="Корзина"
        pageTitle="Оформление заказа"
      ></PageHeadTruncatedNode>
    </template>
    <template #page-main>
      <ContainerNode>
        <div class="checkout">
          <div class="checkout__body">
            <MiddleContentNode>
              <template #items>
                <PreloadWrapContainerNode
                  class="cart__item"
                  :quantityPreloadElements="4"
                  :iterable="cartItems"
                  v-slot="slotProps"
                >
                  <div class="order-item">
                    <div class="order-item__image">
                      <picture>
                        <source srcset="" type="image/webp" />
                        <source srcset="" type="image/jpeg" />
                        <img :src="slotProps.cartItem.images[0].src" alt="" />
                      </picture>
                    </div>
                  </div>
                </PreloadWrapContainerNode>
              </template>
              <template #sidebar>
                <div class="middle-content__sidebar-inner">
                  <div class="middle-content__block">
                    <div class="middle-content__item">
                      <div class="middle-content__key">Скидка</div>
                      <div class="middle-content__value">
                        - 0<span class="middle-content__currency"> ₽</span>
                      </div>
                    </div>
                    <div class="middle-content__item">
                      <div class="middle-content__key">Количество товаров</div>
                      <div class="middle-content__value icon-info">
                        {{ cartStore.items?.length }} шт.
                      </div>
                    </div>
                  </div>
                  <div class="middle-content__block">
                    <div class="middle-content__item">
                      <div class="middle-content__key middle-content__key_big">
                        Итого
                      </div>
                      <div
                        class="middle-content__value middle-content__value_big"
                      >
                        {{ cartStore?.totals?.total_price }}
                        <span class="middle-content__currency"> ₽</span>
                      </div>
                    </div>
                    <div class="middle-content__item">
                      <div class="middle-content__key">
                        Стоимость без учёта скидок:
                      </div>
                      <div class="middle-content__value"></div>
                    </div>
                    <div class="middle-content__item">
                      <div class="middle-content__key">
                        Балов будет начислено:
                      </div>
                      <div class="middle-content__value"></div>
                    </div>
                    <ButtonNode
                      class="middle-content__button-submit"
                      :disabled="true"
                      buttonStyle="dark"
                      @click="ordering"
                      >Заказать
                    </ButtonNode>
                  </div>
                </div>
              </template>
            </MiddleContentNode>
          </div>
        </div>
      </ContainerNode>
    </template>
  </MainPageNode>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { getNonceToken } from "@/api/utils";
import MainPageNode from "@/components/structure/MainPageNode.vue";
import PreloadWrapContainerNode from "@/components/structure/PreloadWrapContainerNode.vue";
import PageHeadTruncatedNode from "@/components/structure/PageHeadTruncatedNode.vue";
import MiddleContentNode from "@/components/cart-and-ordering/MiddleContentNode.vue";

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
        config: { headers: getNonceToken() },
        maintainJWT: true,
        reqiredJWT: true,
      });
    },
  },

  created() {},
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
      font-size: 0.75rem;
    }
  }
}

  .middle-content {
    &__block {
      &:nth-child(1),
      &:nth-child(2) {
        &::after {
          display: block;
        }
      }
    }
  }
</style>
