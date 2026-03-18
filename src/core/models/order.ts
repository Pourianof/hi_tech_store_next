import { ProductMediaDto } from "../Dtos/ProductDto";
import { MinimalProductDto } from "./cart";
import { ProductColor } from "./product";

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
  productVariation: ProductVariationWithMinimalProduct;
  count: number;
  orderPayTimePrice: number;
  discount?: number;
}
export interface ProductVariationWithMinimalProduct {
  productVariationId: number;
  price: number;
  color: ProductColor;
  media: ProductMediaDto[];
  product: Omit<MinimalProductDto, "variations">;
}
