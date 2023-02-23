export function handleMonth(n) {
  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];
  return months[n];
}

export const messages = {
  orderingError: {
    name: "orderingError",
    type: "error",
    html: `Произошла ошибка при оформлении заказа. Попробуйте
    снова`,
  },
  notSelectPaymentMethod: {
    name: "notSelectPaymentMethod",
    type: "error",
    html: "Выберите метод оплаты",
  },
  notSelectProductSize: {
    name: "notSelectProductSize",
    type: "error",
    html: "Необходимо выбрать размер.",
  },
  allError: {
    name: "allError",
    type: "error",
    html: `Произошла ошибка при выполнении операции`,
  },
  //
  productAddedToWishlist: {
    name: "productAddedToWishlist",
    type: "success",
    html: {
      template: `
      Товар добавлен в Ваш список желаний.<ButtonNode
        @click="$router.push({ name: 'PersonalWishlist' })"
      >
        Избранное
      </ButtonNode>`,
    },
  },
  currentPaymentURLNotSet: {
    name: "currentPaymentURLNotSet",
    type: "error",
    html: {
      template: `Ссылка на страницу оплаты не была получена. Попробуйте оплатить из

      <button
        @click="$router.push({ name: 'PersonalOrders' })"
        class="message-link"
      >
        Личного кабинета
      </button>`,
    },
  },
  productAddedToCart: {
    name: "productAddedToCart",
    type: "success",
    html: {
      template: `Товар добавлен.<button
      @click="$router.push({ name: 'Checkout' })"
      class="message-link"
    >
      Оформить заказ?
    </button>`,
    },
  },
};
