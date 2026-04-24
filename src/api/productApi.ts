import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";
import { Product, ProductColor } from "@/core/models/product";
import { ProductDto } from "@/core/Dtos/ProductDto";
import { apiRoutes } from "./apiRoutes";
import { PagedResults } from "@/core/Dtos/pagedResult";
import { fetchWrapper } from "./fetchWrapper";
import { ProductCommentCreationDto } from "@/core/Dtos/commentDto";
import { Comment } from "@/core/models/comment";

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
  const respond = (await fetchWrapper.get(
    apiRoutes.products.base,
    searchQueries,
  )) as ResultModel<PagedResults<ProductDto>>;

  return respond;
}

export async function getSingleProduct(
  productId: number,
): Promise<ResultModel<Product>> {
  const respond = await fetch(apiRoutes.products.forProduct(productId));

  return generateResultModelFromResponse(respond);
}

export function getColors() {
  return fetchWrapper.get<ProductColor[]>(apiRoutes.colors.base);
}

export function getOnSaleProductsApi() {
  return fetchWrapper.get<PagedResults<ProductDto>>(apiRoutes.products.onSales);
}

export function commentForProductApi(
  productId: number,
  comment: ProductCommentCreationDto,
) {
  return fetchWrapper.post(
    apiRoutes.products.commentForProdut(productId),
    comment,
  );
}

export function getCommentsOfProductApi(productId: number) {
  return fetchWrapper.get<PagedResults<Comment>>(
    apiRoutes.products.commentForProdut(productId),
  );
}
