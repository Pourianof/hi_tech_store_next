import { ProductDto } from "../Dtos/ProductDto";
import { BrandModel } from "./brand";
import {
  Product,
  ProductColor,
  ProductComponent,
  ProductMedia,
  ProductProperty,
  ProductVariation,
} from "./product";

export class ProductModel implements Product {
  static CreateWith(productData: Product): ProductModel {
    const variations = productData.variations.map((pv) =>
      ProductVariationModel.CreateWith(pv),
    );
    const productModel = new ProductModel(
      productData.productId,
      productData.title,
      productData.brandModel,
      productData.properties,
      productData.averageScore,
      productData.scoreCounts,
      productData.categoryId,
      productData.components,
      variations,
      productData.discount,
      productData.myScore,
      productData.description,
      productData.authorId,
    );

    variations.forEach((pv) => (pv.product = productModel));
    return productModel;
  }

  static CreateWithDto(productData: ProductDto): ProductModel {
    const variations = productData.variations.map((pv) =>
      ProductVariationModel.CreateWith(pv),
    );
    const productModel = new ProductModel(
      productData.productId,
      productData.title,
      productData.brandModel,
      productData.properties ?? [],
      productData.averageScore,
      productData.scoreCounts,
      productData.categoryId,
      productData.components,
      variations,
      0,
      productData.myScore,
      productData.description,
      productData.authorId,
    );

    variations.forEach((pv) => (pv.product = productModel));
    return productModel;
  }

  private constructor(
    public productId: number,
    public title: string,
    public brandModel: BrandModel,
    public properties: ProductProperty[],
    public averageScore: number,
    public scoreCounts: number,
    public categoryId: number,
    public components: ProductComponent[],
    public variations: ProductVariationModel[],
    public discount?: number | undefined,
    public myScore?: number | undefined,
    public description?: string | undefined,
    public authorId?: string | number | undefined,
  ) {}

  get mainVariation() {
    return (
      this.variations.find((v) => {
        return v.media.find((m) => {
          if (m.isMain) {
            return m;
          }
        });
      }) || this.variations.at(0)
    );
  }

  getMainMedia() {
    const productVariation = this.mainVariation;

    if (productVariation) {
      return productVariation.getCandidateImageMedia();
    }
  }

  toRawProduct(): Product {
    return {
      averageScore: this.averageScore,
      brandModel: this.brandModel,
      categoryId: this.categoryId,
      components: this.components,
      productId: this.productId,
      properties: this.properties,
      scoreCounts: this.scoreCounts,
      title: this.title,
      variations: this.variations.map((pv) => pv.toRawVariation()),
      authorId: this.authorId,
      description: this.description,
      discount: this.discount,
      myScore: this.myScore,
    };
  }
}

export class ProductVariationModel implements ProductVariation {
  static CreateWith(
    variation: ProductVariation,
    product?: ProductModel,
  ): ProductVariationModel {
    return new ProductVariationModel(
      variation.productVariationId,
      variation.color,
      variation.inventory,
      variation.media,
      variation.price,
      product,
      variation.discount,
    );
  }

  product!: ProductModel;

  private constructor(
    public productVariationId: number,
    public color: ProductColor,
    public inventory: number,
    public media: ProductMedia[],
    public price: number,
    product?: ProductModel,
    public discount?: number | undefined,
  ) {
    this.product = product!;
  }

  getCandidateImageMedia() {
    const coverImage = this.media?.find((m) => m.isMain);
    if (!coverImage && this.media?.length) {
      return this.media?.find((m) => m.type == "Image");
    }
    return coverImage;
  }

  get hasDiscount() {
    return !!this?.discount;
  }

  get finalPrice() {
    return this.price - (this.discount ?? 0);
  }

  get discountPercentage() {
    return (100 * (this.discount ?? 0)) / this.price;
  }

  toRawVariation(): ProductVariation {
    return {
      color: this.color,
      inventory: this.inventory,
      media: this.media,
      price: this.price,
      productVariationId: this.productVariationId,
      discount: this.discount,
    };
  }
}
