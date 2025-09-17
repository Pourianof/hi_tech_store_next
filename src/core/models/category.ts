export interface Category {
  categoryId: number;
  name: string;
  description: string;
  parentCategoryId?: number;
  image?: string;
}
