export interface Product {
  productId: number;
  title: string;
  price: number;
  discount?: number;
  averageScore: number;
  scoreCounts: number;
  myScore?: number;
  media?: ProductMedia[];
}

export interface ProductMedia {
  isMain: boolean;
  productMediaId: number;
  type: "Video" | "Image";
  url: string;
}
