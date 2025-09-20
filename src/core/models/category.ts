export interface Category {
  categoryId: number;
  name: string;
  description: string;
  parentCategoryId?: number;
  image?: string;
  properties: CategoryProperty[];
}

export interface CategoryProperty {
  propertyId?: number;
  name: string;
  description?: string;
}
