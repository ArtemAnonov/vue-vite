<template>
  <main-page-node>
    <template #page-head>
      <page-head-truncated-node backLinkName="На главную" pageTitle="Корзина"></page-head-truncated-node>
    </template>
    <template #page-main>
      <container-node>
        <div class="cart">
          <div class="cart__body">
            <template v-if="cartItems?.length || Object.keys(cartStore).length === 0">
              <middle-content-node>
                <template #items>
                  <PreloadWrapContainerNode class="cart__item" :quantityPreloadElements="4" :iterable="cartItems"
                    v-slot="slotProps">
                    <cart-item-node :cartItem="slotProps.cartItem">
                    </cart-item-node>
                  </PreloadWrapContainerNode>
                </template>
                <template #sidebar>
                  <div class="middle-content__sidebar-inner">
                    <div class="middle-content__block middle-content__block_promo">
                      <div class="middle-content__key middle-content__key_medium">Промокод</div>
                      <div class="middle-content__item">
                        <input-node placeholder="Введите промокод" class="main" v-model="promo"></input-node>
                        <button-node buttonStyle="green" :disabled="!promo">Применить</button-node>
                      </div>
                    </div>
                    <div class="middle-content__block">
                      <div class="middle-content__item">
                        <div class="middle-content__key">Скидка</div>
                        <div class="middle-content__value">- 0<span class="middle-content__currency"> ₽</span></div>
                      </div>
                      <div class="middle-content__item">
                        <div class="middle-content__key">Скидка при онлайн оплате</div>
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
                        <div class="middle-content__value middle-content__value_big">{{ cartStore?.totals?.total_price
                        }}<span class="middle-content__currency"> ₽</span></div>
                      </div>
                      <div class="middle-content__item">
                        <div class="middle-content__key">Стоимость без учёта скидок:</div>
                        <div class="middle-content__value"></div>
                      </div>
                      <div class="middle-content__item">
                        <div class="middle-content__key">Балов будет начислено:</div>
                        <div class="middle-content__value"></div>
                      </div>
                      <button-node buttonStyle="green" @click="toCheckout">Перейти к оформлению
                      </button-node>
                    </div>
                  </div>
                </template>
              </middle-content-node>
            </template>
            <template v-else>
              <div>
                Сейчас ваша корзина пуста. Пополните же её!
              </div>
            </template>
          </div>
        </div>
      </container-node>
    </template>
  </main-page-node>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { cloneDeep } from 'lodash-es'
import CartItemNode from "@/components/cart-and-ordering/CartItemNode.vue";
import MainPageNode from '@/components/structure/MainPageNode.vue'
import PageHeadTruncatedNode from '@/components/structure/PageHeadTruncatedNode.vue'
import MiddleContentNode from '@/components/cart-and-ordering/MiddleContentNode.vue'
import PreloadWrapContainerNode from "@/components/structure/PreloadWrapContainerNode.vue";

export default {
  components: {
    CartItemNode,
    MainPageNode,
    PageHeadTruncatedNode,
    MiddleContentNode,
    PreloadWrapContainerNode
  },
  data() {
    return {
      promo: ''
    }
  },
  watch: {
    /**
     * (!)
     * Служит костылем
     */
    cartItems: {
      handler(cartItems) {
        if (cartItems?.length && cartItems?.length !== 0) {
          let idsCartItems = cartItems.map((el) => el.id)
          let basedRequest = cloneDeep(this.productsRequest)
          basedRequest.params = { '_include': idsCartItems }
          this.getItems(basedRequest)
        }
      },
      immediate: true
    }
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
      userAuth: (state) => state.auth.userAuth,
      cartStore: (state) => state.cart.store,
      loginPopup(state) {
        return state.common.revs.login
      }
    }),
  },
  methods: {
    ...mapMutations({
      SET_VALUE: "SET_VALUE",
      updateRev: "common/updateRev",
      updateRev: "common/updateRev",

    }),
    ...mapActions({
      getItems: "getItems",
      mainFetchRequest: "mainFetchRequest",
    }),
    toCheckout() {
      if (this.userAuth === false) {
        this.updateRev({
          name: "login",
          value: this.loginPopup.visible,
        });
        return
      }
      this.$router.push({ name: 'Checkout' })
    },
  },

};
</script>

<style lang="scss">
.cart {

  // .cart__body
  &__body {}

  // .cart__item
  &__item {}

  .preload-wrap {
    margin-bottom: 1rem;
  }
}
</style>
