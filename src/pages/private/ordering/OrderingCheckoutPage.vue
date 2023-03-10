<template>
  <div class="checkout">
    <div class="checkout__body">
      <MiddleContentNode>
        <template #items>
          <PreloadWrapNode :targetPreloadElement="isEmpty(draftOrder)">
            <CheckoutBlockNode title="Корзина"
              class="checkout-block_cart"
              :value="`${cartStore?.items?.length} ед. товара`"
              :clickAction="() => {$router.push({name: 'OrderingCart'})}"
              icon="cart">
              <template #main>
                <ul class="checkout-block__products">
                  <PreloadWrapContainerNode v-slot="slotProps"
                    class="cart__item"
                    :quantityPreloadElements="4"
                    :iterable="cartStore.items">
                    <div class="order-item">
                      <div class="order-item__image">
                        <picture>
                          <source srcset=""
                            type="image/webp" >
                          <source srcset=""
                            type="image/jpeg" >
                          <img :src="slotProps.item.images[0].src"
                            alt="" >
                        </picture>
                      </div>
                    </div>
                  </PreloadWrapContainerNode>
                </ul>
              </template></CheckoutBlockNode>
          </PreloadWrapNode>

          <!-- <PreloadWrapNode :targetPreloadElement="isEmpty(draftOrder)">
            <CheckoutBlockNode title="Контакты получателя"
              value=""
              icon="profile"
              popupName="checkoutContacts">
              <template #popup/>
            </CheckoutBlockNode>
          </PreloadWrapNode>
          <PreloadWrapNode :targetPreloadElement="isEmpty(draftOrder)">
            <CheckoutBlockNode title="Доставка"
              value="Выберите удобный вариант доставки"
              icon="delivery"
              popupName="checkoutDelivery">
              <template #popup/>
            </CheckoutBlockNode>
          </PreloadWrapNode> -->
          <PreloadWrapNode :targetPreloadElement="isEmpty(draftOrder)">
            <CheckoutBlockNode title="Оплата"
              popupName="checkoutPayment"
              :value="`${draftOrder?.payment_method ? currentPaymentGatewayTitle : 'Выберите способ оплаты'}`"
              icon="cash"
            >
              <template #popup>
                <InputRadioNode v-for="(item, index) in paymentGatewaysItems"
                  :key="index"
                  :modelValue="draftOrder.payment_method === item.id"
                  :labelText="item.method_title"
                  name="paymentGateway"
                  :disabled="!item.enabled"
                  @input="changePaymentMethod(item.id)"/>
              </template>
            </CheckoutBlockNode>
          </PreloadWrapNode>
        </template>
        <template #sidebar>
          <div class="middle-content__sidebar-inner">
            <div class="middle-content__block">
              <!-- <div class="middle-content__item">
                <div class="middle-content__key">Скидка</div>
                <div class="middle-content__value">
                  - 0<span class="middle-content__currency"> ₽</span>
                </div>
              </div> -->
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
                <div class="middle-content__value middle-content__value_big">
                  {{ cartStore?.totals?.total_price }}
                  <span class="middle-content__currency"> ₽</span>
                </div>
              </div>
              <!-- <div class="middle-content__item">
                <div class="middle-content__key">
                  Стоимость без учёта скидок:
                </div>
                <div class="middle-content__value"/>
              </div>
              <div class="middle-content__item">
                <div class="middle-content__key">
                  Балов будет начислено:
                </div>
                <div class="middle-content__value"/>
              </div> -->
              <ButtonNode class="middle-content__button-submit"
                buttonStyle="dark"
                @click="postCheckout()">Заказать
              </ButtonNode>
            </div>
          </div>
        </template>
      </MiddleContentNode>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions, useStore } from "vuex";
import { isEmpty } from "lodash-es";
import { computed, watch, ref } from "vue";
import PreloadWrapContainerNode from "@/components/structure/PreloadWrapContainerNode.vue";
import MiddleContentNode from "@/components/ordering/MiddleContentNode.vue";
import CheckoutBlockNode from "@/components/ordering/CheckoutBlockNode.vue";

export default {
  components: {
    PreloadWrapContainerNode,
    MiddleContentNode,
    CheckoutBlockNode,
  },
  setup() {
    const { state, dispatch, commit } = useStore();
    const cartStore = computed(() => state.cart.store);
    const draftOrder = computed(() => state.checkout.draftOrder);
    const paymentGatewaysItems = computed(() => state.paymentGateways.items);
    watch(cartStore, (newValue) => {
      if (!isEmpty(newValue) && isEmpty(state.checkout.draftOrder)) {
        // (?) работает только с таким т.о. и больше в dev (ошибка CORS)
        // setTimeout(() => {
        // }, 3000);
        dispatch("checkout/getCheckout");
      }
    }, { immediate: true });
    return {
      isEmpty,
      cartStore,
      draftOrder,
      paymentGatewaysItems,
      postCheckout: () => dispatch("checkout/postCheckout"),
      changePaymentMethod: (value) => commit("checkout/changePaymentMethod", value),
      currentPaymentGatewayTitle: (computed(() => paymentGatewaysItems.value[draftOrder.value?.payment_method]?.method_title)),
    };
  },
};
</script>

<style lang="scss">
.checkout {

  // .checkout__body
  &__body {}

  // .checkout__block
  &__block {}

  .popup {
    &__wrapper {
      // @media (min-width: ($md3+px)) {
      // height: 50%;

      // }
    }
  }

  .cart__items {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 4rem);
  }
  .input_radio {
    margin-bottom: .5rem;
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

.checkout-block_cart{
  .checkout-block__top {
    position: relative;
    padding: 0 0 1rem 0;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      height: 1px;
      background: rgba(0,0,0,.08);
    }
  }
}
</style>
