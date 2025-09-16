import { ProductMedia } from "../models/product";

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
  price: number;
  media: ProductMediaDto[];
  averageScore: number;
  scoreCounts: number;
  myScore?: number;
}
