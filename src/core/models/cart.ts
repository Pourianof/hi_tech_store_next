import { BrandModel } from "./brand";
import { ProductVariation } from "./product";

export interface Cart {
  items: {
    productVariationId: number;
    amount: number;
  }[];
}

export interface CartWithProduct {
  items: MinimalProductDto[];
}

export interface ProductBasicInfoDto {
  productId: number;
  authorId: string;
  title: string;
  description?: string;
  brandModel: BrandModel;
}

export interface MinimalProductDto {
  productId: number;
  title: string;
  description?: string;
  variations: ProductVariationWithCartAmount[];
}

export interface ProductVariationWithCartAmount {
  variation: ProductVariation;
  amount: number;
}
