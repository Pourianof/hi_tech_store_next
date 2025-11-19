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
    get payment() {
      return `${this.base}/payment`;
    },
  },
};
