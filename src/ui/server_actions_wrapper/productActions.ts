import { PagedResults } from "@/core/Dtos/pagedResult";
import { ProductModel } from "@/core/models/productModel";
import { ResultModel } from "@/core/models/resultModel";
import {
  getMyProductsAction,
  getOnSaleProductsAction,
  getProductsAction,
  getSimilarProductsOfAction,
} from "@/lib/server_actions/productActions";

async function getProducts(
  searchQueries?: Record<string, string>,
): Promise<ResultModel<PagedResults<ProductModel>>> {
  const result = await getProductsAction(searchQueries);
  if (searchQueries?.searchTerm) {
    console.log(" ⭕⭕ ", result);
  }
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
  const result = await getSimilarProductsOfAction(productId);

  if (result.status == "success") {
    result.data = result.data.map((p) => ProductModel.CreateWithDto(p));
  }

  return result as ResultModel<ProductModel[]>;
}

async function getMyProducts(searchQueries?: Record<string, string>) {
  const result = await getMyProductsAction(searchQueries);

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
  getMyProductsAction: getMyProducts,
};
