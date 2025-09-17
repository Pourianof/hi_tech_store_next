import { Category } from "@/core/models/category";
import { generateResultModelFromResponse } from "./apiHelper";

const CATEGORIES_BASE_URL = `${process.env.API_SERVER_ADDRESS}/categories`;

export async function getCategories() {
  const respond = await fetch(CATEGORIES_BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return generateResultModelFromResponse<Category[]>(respond);
}

export async function createCategory(category: FormData, token: string) {
  const respond = await fetch(CATEGORIES_BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: category,
  });

  return generateResultModelFromResponse<Category[]>(respond);
}

export async function deleteCategory(categoryId: number, token: string) {
  const response = await fetch(`${CATEGORIES_BASE_URL}/${categoryId}`, {
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
  token: string
) {
  return generateResultModelFromResponse(
    await fetch(`${CATEGORIES_BASE_URL}/${categoryId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: updatingCategory,
    })
  );
}
