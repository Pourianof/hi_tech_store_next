import { Product } from "./product";

export class CartItem {
  public finalPrice: number;
  constructor(
    public readonly product: Product,
    public readonly amount: number
  ) {
    this.finalPrice = this.getPayingProductPrice() * this.amount;
  }

  getPayingProductPrice() {
    return (
      this.product.price -
      ((this.product.discount ?? 0) / 100) * this.product.price
    );
  }
}
