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
}

export interface ProductProperty {
  value: string;
  name: string;
  propertyId: number;
}

export interface ProductMedia {
  isMain: boolean;
  productMediaId: number;
  type: "Video" | "Image";
  url: string;
}
