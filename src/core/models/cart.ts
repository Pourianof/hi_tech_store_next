import { Product } from "./product";

export interface Cart {
  items: {
    productId: number;
    amount: number;
  }[];
}

export interface CartWithProduct {
  items: {
    product: Product;
    amount: number;
  }[];
}
