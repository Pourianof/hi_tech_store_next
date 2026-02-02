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
