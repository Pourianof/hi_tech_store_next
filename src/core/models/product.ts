import { BrandModel } from "./brand";

export interface Product {
  productId: number;
  title: string;
  discount?: number;
  averageScore: number;
  scoreCounts: number;
  myScore?: number;
  properties: ProductProperty[];
  components: ProductComponent[];
  description?: string;
  authorId?: string | number;
  categoryId: number;
  variations: ProductVariation[];
}

export interface ProductVariation {
  productVariationId: number;
  color: {
    colorId: number;
    code: string;
    name: string;
  };
  inventory: number;
  media: ProductMedia[];
  price: number;
}

export interface ProductSummary {
  productId: number;
  price: number;
  title: string;
  description?: string;
  media: ProductMedia[];
}

export interface ProductProperty {
  value: string;
  name: string;
  propertyId: number;
  valueType: 0;
}

export interface ProductMedia {
  isMain: boolean;
  productMediaId: number;
  type: "Video" | "Image";
  url: string;
}

export interface ProductComponent {
  componentTypeId: number;
  name: string;
  description: string;
  models: ProductComponentModel[];
}

export interface ProductComponentModel {
  componentModelId: number;
  componentTypeId: number;
  brandModel: BrandModel;
  description: string;
  properties: ProductProperty[];
}
