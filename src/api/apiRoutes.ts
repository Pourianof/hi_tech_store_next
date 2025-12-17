const server = process.env.API_SERVER_ADDRESS!;

export const apiRoutes = {
  carts: {
    get base() {
      return `${server}/carts`;
    },
    get items() {
      return `${this.base}/items`;
    },
  },
};
