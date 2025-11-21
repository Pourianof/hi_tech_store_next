export const routes = {
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
  },
};
