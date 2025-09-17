"use server";

import {
  CATEGORY_TAG,
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/api/categoryApi";
import { workWithSession } from "../helpers/sessionHelper";

export async function getCategoriesAction() {
  return getCategories();
}

export async function registerCategoryAction(category: FormData) {
  return workWithSession((session) =>
    createCategory(category, session.apiToken)
  );
}

export async function deleteCategoryAction(categoryId: number) {
  return workWithSession((session) =>
    deleteCategory(categoryId, session.apiToken)
  );
}

export async function updateCategoryAction(
  categoryId: number,
  updatingCategory: FormData
) {
  return workWithSession(
    (session) => updateCategory(categoryId, updatingCategory, session.apiToken),
    [CATEGORY_TAG]
  );
}
