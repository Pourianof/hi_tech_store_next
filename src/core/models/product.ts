import { BrandModel } from "./brand";

export interface Product {
  productId: number;
  title: string;
  price: number;
  discount?: number;
  averageScore: number;
  scoreCounts: number;
  myScore?: number;
  media?: ProductMedia[];
  properties: ProductProperty[];
  components: ProductComponent[];
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
