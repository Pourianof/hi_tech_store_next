import { ProductSummary } from "./product";

export enum OrderPaymentState {
  Paid = "Paid",
  Pending = "Pending",
  Failed = "Failed",
}

export interface Order {
  orderId: number;
  createdAt: number;
  paymentState: OrderPaymentState;
  items: {
    productId: number;
    amount: number;
    price: number;
    discount?: number;
  }[];
}

export interface OrderWithProduct {
  orderId: number;
  createdAt: number;
  paymentState: OrderPaymentState;
  items: OrderItemWithProduct[];
}

export interface OrderItemWithProduct {
  id: number;
  product: ProductSummary;
  count: number;
  orderPayTimePrice: number;
  discount?: number;
}
