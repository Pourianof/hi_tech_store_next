import { Category } from "@/core/models/category";
import { generateResultModelFromResponse } from "./apiHelper";
import { apiRoutes } from "./apiRoutes";
import { PagedResults } from "@/core/Dtos/pagedResult";

export const CATEGORY_TAG = "getTag";
export async function getCategories() {
  const respond = await fetch(apiRoutes.categories.base, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    next: {
      tags: [CATEGORY_TAG],
    },
  });

  return generateResultModelFromResponse<PagedResults<Category>>(respond);
}

export async function createCategory(category: FormData, token: string) {
  const respond = await fetch(apiRoutes.categories.base, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: category,
  });

  return generateResultModelFromResponse<Category[]>(respond);
}

export async function deleteCategory(categoryId: number, token: string) {
  const response = await fetch(apiRoutes.categories.forCategory(categoryId), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return generateResultModelFromResponse(response);
}

export async function updateCategory(
  categoryId: number,
  updatingCategory: FormData,
  token: string,
) {
  return generateResultModelFromResponse(
    await fetch(apiRoutes.categories.forCategory(categoryId), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: updatingCategory,
    }),
  );
}
