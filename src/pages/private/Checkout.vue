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
          <MessageNode :item="messages.notSelectPaymentMethod"
            >Выберите метод оплаты</MessageNode
          >
          <MessageNode :item="messages.orderingError"
            >Произошла ошибка при оформлении заказа. Попробуйте
            снова</MessageNode
          >
          <div class="checkout__body">
            <MiddleContentNode>
              <template #items>
                <PreloadWrapNode :targetPreloadElement="!draftOrderLoaded">
                  <CheckoutBlockNode key="Корзина" value="" icon="cart"
                    ><template #main>
                      <ul class="checkout-block__products">
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
                                <img
                                  :src="slotProps.cartItem.images[0].src"
                                  alt=""
                                />
                              </picture>
                            </div>
                          </div>
                        </PreloadWrapContainerNode></ul></template
                  ></CheckoutBlockNode>
                </PreloadWrapNode>

                <PreloadWrapNode :targetPreloadElement="!draftOrderLoaded">
                  <CheckoutBlockNode
                    key="Контакты получателя"
                    value=""
                    icon="profile"
                    popupName="checkoutContacts"
                  >
                    <template #popup> </template
                  ></CheckoutBlockNode>
                </PreloadWrapNode>
                <PreloadWrapNode :targetPreloadElement="!draftOrderLoaded">
                  <CheckoutBlockNode
                    key="Доставка"
                    value="Выберите удобный вариант доставки"
                    icon="delivery"
                    popupName="checkoutDelivery"
                  >
                    <template #popup> </template
                  ></CheckoutBlockNode>
                </PreloadWrapNode>
                <PreloadWrapNode :targetPreloadElement="!draftOrderLoaded">
                  <CheckoutBlockNode
                    key="Оплата"
                    value="Онлайн оплата картой (скидка 5%)"
                    icon="cash"
                    popupName="checkoutPayment"
                  >
                    <template #popup>
                      <InputRadioNode
                        v-for="(item, index) in paymentGatewaysItems"
                        :key="index"
                        :modelValue="draftOrder.payment_method === item.id"
                        :labelText="item.method_title"
                        @input="changePaymentMethod(item.id)"
                        name="paymentGateway"
                        :disabled="!item.enabled"
                      ></InputRadioNode> </template
                  ></CheckoutBlockNode>
                </PreloadWrapNode>
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
                      buttonStyle="dark"
                      @click="postCheckout"
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
import { isEmpty } from "lodash-es";

import { getNonceToken } from "@/api/helpers.js";
import MainPageNode from "@/components/structure/MainPageNode.vue";
import PreloadWrapContainerNode from "@/components/structure/PreloadWrapContainerNode.vue";
import PageHeadTruncatedNode from "@/components/structure/PageHeadTruncatedNode.vue";
import MiddleContentNode from "@/components/cart-and-ordering/MiddleContentNode.vue";
import CheckoutBlockNode from "@/components/cart-and-ordering/CheckoutBlockNode.vue";

export default {
  components: {
    MainPageNode,
    PreloadWrapContainerNode,
    PageHeadTruncatedNode,
    MiddleContentNode,
    CheckoutBlockNode,
  },
  data() {
    return {
      draftOrderLoaded: false,
      draftOrder: {},
    };
  },
  watch: {
    cartStore: {
      handler(newValue) {
        if (!isEmpty(newValue) && isEmpty(this.draftOrder)) {
          // console.log(getNonceToken());
          this.getCheckout();
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      userAuth: (state) => state.auth.userAuth,
      cartItems: (state) => state.cart.store.items,
      cartStore: (state) => state.cart.store,
      checkoutRequest: (state) => state.checkout.basedRequest,
      paymentGatewaysItems: (state) => state.paymentGateways.items,
      messages: (state) => state.common.messages,
    }),
  },
  methods: {
    ...mapMutations({
      SET_VALUE: "SET_VALUE",
      updateRev: "common/updateRev",
      updateMessage: "common/updateMessage",
      setCurrentURLPayment: "auth/setCurrentURLPayment",
    }),
    ...mapActions({
      mainFetchRequest: "mainFetchRequest",
      updateMessage: "common/updateMessage",
      getCart: "cart/getCart",
      // getItems: "getItems",
    }),
    getCheckout() {
      this.mainFetchRequest({
        apiType: this.checkoutRequest.apiType,
        route_base: this.checkoutRequest.route_base,
        method: "get",
        data: {},
        config: { headers: getNonceToken() },
      }).then(
        (result) => {
          if (result?.response?.data) {
            this.draftOrderLoaded = true;
            this.draftOrder = result.response.data;
          }
        },
        (error) => console.log(error)
      );
    },
    postCheckout() {
      if (!this.draftOrder.payment_method) {
        this.updateMessage({ name: "notSelectPaymentMethod" });
        return;
      }
      this.mainFetchRequest({
        apiType: this.checkoutRequest.apiType,
        route_base: this.checkoutRequest.route_base,
        method: "post",
        data: this.draftOrder,
        config: { headers: getNonceToken() },
      }).then(
        (result) => {
          console.log(result);
          this.setCurrentURLPayment(result.response.data.payment_result.redirect_url);
          this.$router.push({ name: "Payment" });

          this.getCart();
        },
        (error) => {
          console.log(error);
          //(!) - ошибка генериться на уровне выше
          this.updateMessage({ name: "orderingError" });
        }
      );
    },
    changePaymentMethod(id) {
      this.draftOrder.payment_method = id;
    },
  },
};
</script>

<style lang="scss">
.checkout {
  // .checkout__body
  &__body {
  }
  // .checkout__block
  &__block {
  }
}

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
