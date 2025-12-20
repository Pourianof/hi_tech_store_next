const server = process.env.API_SERVER_ADDRESS!;

export const apiRoutes = {
  orders: {
    get base() {
      return `${server}/orders`;
    },
  },
  carts: {
    get base() {
      return `${server}/carts`;
    },
    get items() {
      return `${this.base}/items`;
    },
  },
};
