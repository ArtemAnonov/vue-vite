<template>
  <MainPageNode>
    <template #page-head>
      <PageHeadTruncatedNode pageTitle="Оплата"></PageHeadTruncatedNode>
    </template>
    <template #page-main>
      <ContainerNode>
        <div class="payment">
          <MessageNode :item="message"
            >Ссылка на страницу оплаты не была получена. Попробуйте оплатить из

            <button
              @click="$router.push({ name: 'Orders' })"
              class="message-link"
            >
              Личного кабинета
            </button></MessageNode
          >
          <ButtonNode @click="openPaymentPage">Оплатить сейчас</ButtonNode>
        </div>
      </ContainerNode>
    </template>
  </MainPageNode>
</template>
<script>
import { useStore } from "vuex";
import MainPageNode from "@/components/structure/MainPageNode.vue";

export default {
  components: {
    MainPageNode,
  },
  setup() {
    const store = useStore();
    const message = store.state.common.messages.currentPaymentURLNotSet;

    const currentPaymentURL = store.state.auth.currentURLPayment;
    function openPaymentPage() {
      if (currentPaymentURL) {
        window.open(currentPaymentURL);
      } else {
        store.dispatch("common/updateMessage", {
          name: "currentPaymentURLNotSet",
        });
      }
    }
    return { message, openPaymentPage };
  },
};
</script>
<style lang="scss">
</style>