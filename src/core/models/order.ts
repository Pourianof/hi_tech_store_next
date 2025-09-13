export interface Order {
  orderId: number;
  submitDate: number;
  total: number;
  deliveryDate: number;
  reciever: {
    fullname: string;
    address: string;
  };
  items: {
    productId: number;
    amount: number;
    price: number;
    discount?: number;
  }[];
}
