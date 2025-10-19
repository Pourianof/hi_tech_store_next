export interface BrandModel {
  modelId: number;
  brandName: string;
  modelName: string;
  descriotion: null;
}

export interface Brand {
  brandId: number;
  name: string;
  description?: string;
  image?: string;
  brandModels: BrandModel[];
}
