"use server";
import {
  addMediaToVariationApi,
  commentForProductApi,
  createNewProduct,
  getColors,
  getCommentsOfProductApi,
  getOnSaleProductsApi,
  getProducts,
  removeVariationsMediaApi,
  updateProductApi,
  updateProductVariationDetailsApi,
} from "@/api/productApi";
import { ResultModel } from "@/core/models/resultModel";
import { workWithSession } from "../helpers/sessionHelper";

export async function createProduct(product: FormData): Promise<ResultModel> {
  return workWithSession((session) => {
    return createNewProduct(product, session.apiToken);
  });
}

export async function getProductColorsAction() {
  return getColors();
}

export const getProductsAction = getProducts;
export const getOnSaleProductsAction = getOnSaleProductsApi;
export const commentForProductAction = commentForProductApi;
export const getCommentsOfProductAction = getCommentsOfProductApi;
export const updateProductVariationDetailsAction =
  updateProductVariationDetailsApi;
export const addMediaToVariationAction = addMediaToVariationApi;
export const removeVariationsMediaAction = removeVariationsMediaApi;
export const updateProductAction = updateProductApi;
