import { BrandModel } from "../models/brand";
import {
  ProductComponent,
  ProductMedia,
  ProductProperty,
  ProductVariation,
} from "../models/product";

export interface ProductCreationDto {
  title: string;
  description?: string;
  price: number;
  media: File;
}

export type ProductMediaDto = ProductMedia;

export interface ProductDto {
  productId: number;
  title: string;
  brandModel: BrandModel;
  description?: string;
  authorId?: string | number;
  properties?: ProductProperty[];
  categoryId: number;
  components: ProductComponent[];
  averageScore: number;
  scoreCounts: number;
  myScore?: number;
  variations: ProductVariation[];
}

export interface ProductVariationCreationDto {
  price: number;
  color: number;
  inventory: number;
  mediaMetaData: MediaMetaDataDto[];
}

export interface MediaMetaDataDto {
  isMain?: boolean;
  index: number;
}
