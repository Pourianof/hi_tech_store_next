"use server";

import { GetProductsFilters } from "@/api/filterApi";

export function getProductFiltersAction() {
  return GetProductsFilters();
}
