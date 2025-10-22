import {
  ProductComponent,
  ProductMedia,
  ProductProperty,
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
  price: number;
  title: string;
  description?: string;
  authorId?: string | number;
  properties?: ProductProperty[];
  media: ProductMedia[];
  categoryId: number;
  components: ProductComponent[];
  averageScore: number;
  scoreCounts: number;
  myScore?: number;
}
