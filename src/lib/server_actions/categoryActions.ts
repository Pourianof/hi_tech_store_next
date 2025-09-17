"use server";

import { deleteCategory, getCategories } from "@/api/categoryApi";
import { Category } from "@/core/models/category";
import { workWithSession } from "../helpers/sessionHelper";

export async function getCategoriesAction() {
  return getCategories();
}

export async function registerCategoryAction(category: Category) {}

export async function deleteCategoryAction(categoryId: number) {
  return workWithSession((session) =>
    deleteCategory(categoryId, session.apiToken)
  );
}
