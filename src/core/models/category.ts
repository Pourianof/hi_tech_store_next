export interface Category {
  categoryId: number;
  name: string;
  description: string;
  parentCategoryId?: number;
  image?: string;
  icon?: string;
  properties: CategoryProperty[];
}

export enum PropertyType {
  String = 0,
  Number = 1,
  Boolean = 2,
  DateTime = 3,
}

export interface CategoryProperty {
  propertyId?: number;
  name: string;
  description?: string;
  propertyType: PropertyType;
}

export interface CategoryComponent {
  componentTypeId: number;
  name: string;
  description?: string;
  properties: CategoryProperty[];
}
