import { ProductCommentCreationDto } from "@/core/Dtos/commentDto";
import { PagedResults } from "@/core/Dtos/pagedResult";
import { ProductDto, ProductMediaDto } from "@/core/Dtos/ProductDto";
import { ProductBasicInfoDto } from "@/core/models/cart";
import { Comment } from "@/core/models/comment";
import { Product, ProductColor, ProductVariation } from "@/core/models/product";
import { ResultModel } from "@/core/models/resultModel";
import { ProductUpdateFormDto } from "@/core/schemas/productUpdateSchema";
import { ProductVariationDetailsUpdateDto } from "@/core/schemas/productVariationDetailsUpdateSchema";
import { generateResultModelFromResponse } from "./apiHelper";
import { apiRoutes } from "./apiRoutes";
import { fetchWrapper } from "./fetchWrapper";
import { ProductCategoryValues } from "@/core/schemas/productCreationSchema";

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

export function getSimilarProductsOfApi(productId: number) {
  return fetchWrapper.get<ProductDto[]>(
    apiRoutes.products.similarProductsOf(productId),
  );
}

export async function getMyProductsApi(searchQueries?: Record<string, string>) {
  return fetchWrapper.get<PagedResults<ProductDto>>(
    apiRoutes.users.myProducts,
    searchQueries,
  );
}

export async function updateProductVariationDetailsApi(
  variationId: number,
  updateDto: ProductVariationDetailsUpdateDto,
) {
  return fetchWrapper.patch<ProductVariation>(
    apiRoutes.variations.forVariation(variationId),
    updateDto,
  );
}

export async function addMediaToVariationApi(
  variationId: number,
  newMediaDto: FormData,
) {
  return fetchWrapper.post<ProductMediaDto>(
    apiRoutes.variations.mediaFor(variationId),
    newMediaDto,
  );
}

export async function removeVariationsMediaApi(
  variationId: number,
  mediaId: number,
) {
  return fetchWrapper.delete(
    apiRoutes.variations.variationMedia(variationId, mediaId),
  );
}

export async function updateProductApi(
  productId: number,
  updateDto: ProductUpdateFormDto,
) {
  return fetchWrapper.patch<ProductBasicInfoDto>(
    apiRoutes.products.forProduct(productId),
    updateDto,
  );
}

export async function updateProductCategoryApi(
  productId: number,
  updateDto: ProductCategoryValues,
) {
  return fetchWrapper.put<ProductDto>(
    apiRoutes.products.categoryFor(productId),
    updateDto,
  );
}
