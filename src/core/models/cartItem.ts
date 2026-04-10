import { Product, ProductVariation } from "./product";
import { ProductModel, ProductVariationModel } from "./productModel";

export class CartItem {
  public finalPrice: number;
  public productModel: ProductModel;
  public productVariationModel: ProductVariationModel;

  constructor(
    public readonly product: Product,
    public readonly variation: ProductVariation,
    public readonly amount: number,
  ) {
    this.productModel = ProductModel.CreateWith(product);
    this.productVariationModel = ProductVariationModel.CreateWith(
      variation,
      this.productModel,
    );

    this.finalPrice = this.getPayingProductPrice() * this.amount;
  }

  getPayingProductPrice() {
    return this.productVariationModel.finalPrice;
  }

  get actualPrice() {
    return this.productVariationModel.price * this.amount;
  }

  get totalDiscount() {
    return (this.productVariationModel.discount ?? 0) * this.amount;
  }
}
