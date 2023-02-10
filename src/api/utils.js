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
  currentPaymentURLNotSet: {
    name: "currentPaymentURLNotSet",
    type: "error",
    html: `Ссылка на страницу оплаты не была получена. Попробуйте оплатить из

    <button
      @click="$router.push({ name: 'Orders' })"
      class="message-link"
    >
      Личного кабинета
    </button>`,
  },
  notSelectPaymentMethod: {
    name: "notSelectPaymentMethod",
    type: "error",
    html: "Выберите метод оплаты",
  },
  productAddedToCart: {
    name: "productAddedToCart",
    type: "success",
    html: `
    Товар добавлен.<button
      @click="$router.push({ name: 'Checkout' })"
      class="message-link"
    >
      Оформить заказ?
    </button>`,
  },
  productAddedToWishlist: {
    name: "productAddedToWishlist",
    type: "success",
    html: `
    Товар добавлен в Ваш список желаний.<ButtonNode
      @click="$router.push({ name: 'Wishlist' })"
    >
      Избранное
    </ButtonNode>`,
  },
  notSelectProductSize: {
    name: "notSelectProductSize",
    type: "error",
    html: "Необходимо выбрать размер.",
  },
  allError: {
    name: "allError",
    type: "error",
    html: "роизошла ошибка при выполнении операции...",
  },
};
