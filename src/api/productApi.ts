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

export async function getProducts(): Promise<ResultModel<Product[]>> {
  const respond = await fetch(API_URL);

  return generateResultModelFromResponse(respond);
}

export async function getSingleProduct(
  productId: number
): Promise<ResultModel<Product>> {
  const respond = await fetch(`${API_URL}/${productId}`);

  return generateResultModelFromResponse(respond);
}
