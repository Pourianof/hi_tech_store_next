import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";
import { Product } from "@/core/models/product";
import { ProductDto } from "@/core/Dtos/ProductDto";
import { apiRoutes } from "./apiRoutes";
import { PagedResults } from "@/core/Dtos/pagedResult";

export async function createNewProduct(product: FormData, accessToken: string) {
  const respond = await fetch(apiRoutes.products.base, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: product,
  });

  return generateResultModelFromResponse(respond);
}

export async function getProducts(
  searchQueries?: Record<string, string>,
): Promise<ResultModel<PagedResults<ProductDto>>> {
  const url = new URL(apiRoutes.products.base);
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
  productId: number,
): Promise<ResultModel<Product>> {
  const respond = await fetch(apiRoutes.products.forProduct(productId));

  return generateResultModelFromResponse(respond);
}
