import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";
import { Product } from "@/core/models/product";

const API_URL = `${process.env.API_SERVER_ADDRESS}/products`;

export async function createNewProduct(product: FormData, accessToken: string) {
  const respond = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: product,
  });

  return generateResultModelFromResponse(respond);
}

export async function getProducts(
  searchQueries?: Record<string, string>
): Promise<ResultModel<Product[]>> {
  const url = new URL(API_URL);
  if (searchQueries) {
    Object.keys(searchQueries).forEach((key) => {
      if (!!searchQueries[key]?.trim()) {
        url.searchParams.append(key, searchQueries[key]);
      }
    });
  }
  const respond = await fetch(url);

  return generateResultModelFromResponse(respond);
}

export async function getSingleProduct(
  productId: number
): Promise<ResultModel<Product>> {
  const respond = await fetch(`${API_URL}/${productId}`);

  return generateResultModelFromResponse(respond);
}
