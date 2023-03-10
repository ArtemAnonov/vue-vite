<template>
  <div class="payment">
    <div class="payment__body">
      <!-- Заказ оформлен! -->
      <div v-if="draftOrder.payment_method === 'cod'"
        class="payment__block">
        С деталями вы можете ознакомиться в Личном Кабинете.
      </div>
      <div
        v-else
        class="payment__block">
        Для оплаты перейдите по ссылке.
        <ButtonNode @click="openPaymentPage">Оплатить сейчас</ButtonNode>
      </div>
      <BaseButtonNode @click="$router.push('/')">На главную</BaseButtonNode>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";

export default {
  components: {
  },
  setup() {
    const { state, dispatch, commit } = useStore();
    const currentPaymentURL = state.auth.currentURLPayment;
    function openPaymentPage() {
      if (currentPaymentURL) {
        window.open(currentPaymentURL);
      } else {
        dispatch("common/updateMessage", "currentPaymentURLNotSet");
      }
    }
    onBeforeRouteLeave(() => {
      commit("checkout/setDraftOrder");
    });
    return {
      openPaymentPage,
      draftOrder: computed(() => state.checkout.draftOrder),
    };
  },
};
</script>
<style lang="scss">
</style>
