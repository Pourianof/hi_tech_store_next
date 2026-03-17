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
    get discountState() {
      return `${this.base}/discount/state`;
    },
  },
  users: {
    base: `${server}/users`,
    get me() {
      return `${this.base}/me`;
    },
  },
  discounts: {
    base: `${server}/discounts`,
    get codes() {
      return `${this.base}/codes`;
    },
    get entities() {
      return `${this.base}/entities`;
    },
    get randomCode() {
      return `${this.codes}/random-code`;
    },
    forCode(code: string | number) {
      return `${this.codes}/${code}`;
    },
  },
};
