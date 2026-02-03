import { Product, ProductVariation } from "./product";

export class CartItem {
  public finalPrice: number;
  constructor(
    public readonly product: Product,
    public readonly variation: ProductVariation,
    public readonly amount: number,
  ) {
    this.finalPrice = this.getPayingProductPrice() * this.amount;
  }

  getPayingProductPrice() {
    return (
      this.variation.price -
      ((this.product.discount ?? 0) / 100) * this.variation.price
    );
  }
}
