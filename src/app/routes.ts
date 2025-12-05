export const routes = {
  get main() {
    return "/";
  },
  auth: {
    base: "/auth",
    get login() {
      return `${this.base}/login`;
    },
    get register() {
      return `${this.base}/register`;
    },
  },
  order: {
    base: "/order",
    get checkout() {
      return `${this.base}/checkout`;
    },
    get paymentConfirmation() {
      return `${this.base}/payment`;
    },
    get payment() {
      return `${this.base}/pay-order`;
    },
    get cart() {
      return `${this.base}/cart`;
    },
    get orderPaymentConfirmation() {
      return `${this.base}/order-payment-confirmation`;
    },
    get failedPayment() {
      return `${this.base}/failed-payment`;
    },
    get succeedPayment() {
      return `${this.base}/success-payment`;
    },
  },
};
