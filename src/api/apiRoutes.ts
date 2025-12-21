const server = `${process.env.API_SERVER_ADDRESS!}/api`;

export const apiRoutes = {
  auth: {
    base: `${server}/auth`,
    get login() {
      return `${this.base}/login`;
    },
    get register() {
      return `${this.base}/register`;
    },
  },
  brands: {
    base: `${server}/brands`,
  },
  brandModels: {
    base: `${server}/brandmodels`,
  },
  categories: {
    base: `${server}/categories`,
    forCategory(categoryId: number) {
      return `${this.base}/${categoryId}`;
    },
  },
  components: {
    base: `${server}/components`,
    modelsOf(componentTypeId: number) {
      return `${this.base}/${componentTypeId}/models`;
    },
  },
  filters: {
    base: `${server}/filters`,
  },
  products: {
    base: `${server}/products`,
    forProduct(productId: number) {
      return `${this.base}/${productId}`;
    },
  },
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
