"use server";
import { createNewProduct, getColors, getProducts } from "@/api/productApi";
import { ResultModel } from "@/core/models/resultModel";
import { workWithSession } from "../helpers/sessionHelper";
import { PagedResults } from "@/core/Dtos/pagedResult";
import { ProductModel } from "@/core/models/productModel";

export async function createProduct(product: FormData): Promise<ResultModel> {
  return workWithSession((session) => {
    return createNewProduct(product, session.apiToken);
  });
}

export async function getProductColorsAction() {
  return getColors();
}

export async function getProductsAction(
  searchQueries?: Record<string, string>,
): Promise<ResultModel<PagedResults<ProductModel>>> {
  const result = await getProducts(searchQueries);

  if (result.status == "success") {
    result.data.items = result.data.items.map((p) =>
      ProductModel.CreateWithDto(p),
    );
  }

  return result as ResultModel<PagedResults<ProductModel>>;
}
