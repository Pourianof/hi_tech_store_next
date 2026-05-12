import { getMyProductsApi, getSimilarProductsOfApi } from "@/api/productApi";
import { PagedResults } from "@/core/Dtos/pagedResult";
import { ProductModel } from "@/core/models/productModel";
import { ResultModel } from "@/core/models/resultModel";
import {
  getOnSaleProductsAction,
  getProductsAction,
} from "@/lib/server_actions/productActions";

async function getProducts(
  searchQueries?: Record<string, string>,
): Promise<ResultModel<PagedResults<ProductModel>>> {
  const result = await getProductsAction(searchQueries);
  if (result.status == "success") {
    result.data.items = result.data.items.map((p) =>
      ProductModel.CreateWithDto(p),
    );
  }
  return result as ResultModel<PagedResults<ProductModel>>;
}

async function getOnSaleProducts() {
  const result = await getOnSaleProductsAction();

  if (result.status == "success") {
    result.data.items = result.data.items.map((p) =>
      ProductModel.CreateWithDto(p),
    );
  }

  return result as ResultModel<PagedResults<ProductModel>>;
}

async function getSimilarProductsOf(productId: number) {
  const result = await getSimilarProductsOfApi(productId);

  if (result.status == "success") {
    result.data = result.data.map((p) => ProductModel.CreateWithDto(p));
  }

  return result as ResultModel<ProductModel[]>;
}

async function getMyProductsAction(searchQueries?: Record<string, string>) {
  const result = await getMyProductsApi(searchQueries);

  if (result.status == "success") {
    result.data.items = result.data.items.map((p) =>
      ProductModel.CreateWithDto(p),
    );
  }

  return result as ResultModel<PagedResults<ProductModel>>;
}

export const productActions = {
  getProducts,
  getOnSaleProducts,
  getSimilarProductsOf,
  getMyProductsAction,
};
