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

export async function deleteCategory(categoryId: number, token: string) {
  console.log(`${CATEGORIES_BASE_URL}/${categoryId}`);

  const response = await fetch(`${CATEGORIES_BASE_URL}/${categoryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return generateResultModelFromResponse(response, false);
}
