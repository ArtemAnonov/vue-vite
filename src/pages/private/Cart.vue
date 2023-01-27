<template>
  <MainPageNode>
    <template #page-head>
      <PageHeadTruncatedNode
        backLinkName="На главную"
        pageTitle="Корзина"
      ></PageHeadTruncatedNode>
    </template>
    <template #page-main>
      <ContainerNode>
        <div class="cart">
          <div class="cart__body">
            <template
              v-if="cartItems?.length || Object.keys(cartStore).length === 0"
            >
              <MiddleContentNode>
                <template #items>
                  <PreloadWrapContainerNode
                    class="cart__item"
                    :quantityPreloadElements="4"
                    :iterable="cartItems"
                    v-slot="slotProps"
                  >
                    <Cart-Item-Node :cartItem="slotProps.cartItem">
                    </Cart-Item-Node>
                  </PreloadWrapContainerNode>
                </template>
                <template #sidebar>
                  <div class="middle-content__sidebar-inner">
                    <div
                      class="middle-content__block middle-content__block_promo"
                    >
                      <div
                        class="middle-content__key middle-content__key_medium"
                      >
                        Промокод
                      </div>
                      <div class="middle-content__item">
                        <InputNode
                          placeholder="Введите промокод"
                          class="main"
                          v-model="promo"
                        ></InputNode>
                        <ButtonNode buttonStyle="green" :disabled="!promo"
                          >Применить</ButtonNode
                        >
                      </div>
                    </div>
                    <div class="middle-content__block">
                      <div class="middle-content__item">
                        <div class="middle-content__key">Скидка</div>
                        <div class="middle-content__value">
                          - 0<span class="middle-content__currency"> ₽</span>
                        </div>
                      </div>
                      <div class="middle-content__item">
                        <div class="middle-content__key">
                          Скидка при онлайн оплате
                        </div>
                        <div class="middle-content__value">
                          - 0<span class="middle-content__currency"> ₽</span>
                        </div>
                      </div>
                      <div class="middle-content__item">
                        <div class="middle-content__key">
                          Количество товаров
                        </div>
                        <div class="middle-content__value icon-info">
                          {{ cartStore.items?.length }} шт.
                        </div>
                      </div>
                    </div>
                    <div class="middle-content__block">
                      <div class="middle-content__item">
                        <div
                          class="middle-content__key middle-content__key_big"
                        >
                          Итого
                        </div>
                        <div
                          class="
                            middle-content__value middle-content__value_big
                          "
                        >
                          {{ cartStore?.totals?.total_price
                          }}<span class="middle-content__currency"> ₽</span>
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
                        buttonStyle="green"
                        @click.stop="toCheckout"
                        :disabled="!cartItems?.length"
                        >Перейти к оформлению
                      </ButtonNode>
                    </div>
                  </div>
                </template>
              </MiddleContentNode>
            </template>
            <template v-else>
              <div>Сейчас ваша корзина пуста. Пополните же её!</div>
            </template>
          </div>
        </div>
      </ContainerNode>
    </template>
  </MainPageNode>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { cloneDeep } from "lodash-es";
import CartItemNode from "@/components/cart-and-ordering/CartItemNode.vue";
import MainPageNode from "@/components/structure/MainPageNode.vue";
import PageHeadTruncatedNode from "@/components/structure/PageHeadTruncatedNode.vue";
import MiddleContentNode from "@/components/cart-and-ordering/MiddleContentNode.vue";
import PreloadWrapContainerNode from "@/components/structure/PreloadWrapContainerNode.vue";

export default {
  components: {
    CartItemNode,
    MainPageNode,
    PageHeadTruncatedNode,
    MiddleContentNode,
    PreloadWrapContainerNode,
  },
  data() {
    return {
      promo: "",
    };
  },
  watch: {
    /**
     * (!)
     * Служит костылем
     */
    cartItems: {
      handler(cartItems) {
        if (import.meta.env.VITE_LIKE_A_SPA) {
          if (cartItems?.length && cartItems?.length !== 0) {
            let idsCartItems = cartItems.map((el) => el.id);
            let basedRequest = cloneDeep(this.productsRequest);
            basedRequest.params = { _include: idsCartItems };
            this.getItems(basedRequest);
          }
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters({
      itemsBased: "itemsBased",
    }),
    ...mapState({
      userAuth: (state) => state.auth.userAuth,
      productsRequest: (state) => state.products.basedRequest,
      cartItems: (state) => state.cart.store.items,
      cartStore: (state) => state.cart.store,
      cartStore: (state) => state.cart.store,
    }),
  },
  methods: {
    ...mapMutations({
      SET_VALUE: "SET_VALUE",
      setPopup: "common/setPopup",
    }),
    ...mapActions({
      getItems: "getItems",
    }),
    toCheckout() {
      if (this.userAuth === false) {
        this.setPopup({ name: "login" });
        return;
      }
      this.$router.push({ name: "Checkout" });
    },
  },
};
</script>

<style lang="scss">
.cart {
  // .cart__body
  &__body {
  }

  // .cart__item
  &__item {
  }

  .preload-wrap {
    margin-bottom: 1rem;
  }

  .middle-content {
    &__items {
      border-top: 0.0625rem solid rgba(0, 0, 0, 0.08);

      @media (max-width: ($md2+px)) {
        margin: 0;
        grid-column: 2/3;
      }

      @media (max-width: ($md3+px)) {
        grid-column: 1/2;
      }
    }
    &__block {
      &:nth-child(1),
      &:nth-child(2) {
        &::after {
          display: block;
        }
      }
    }
  }
}
</style>
