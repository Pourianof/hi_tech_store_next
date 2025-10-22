"use server";

import {
  createNewBrandModelApi,
  getAllBrandApi,
  getAllBrandModelsApi,
} from "@/api/brandApi";
import { workWithSession } from "../helpers/sessionHelper";

export async function getAllBrandModelsAction() {
  return getAllBrandModelsApi();
}

export async function getAllBrandsAction() {
  return getAllBrandApi();
}

export async function createNewBrandModelAction(brandModelData: FormData) {
  return workWithSession((session) =>
    createNewBrandModelApi(brandModelData, session.apiToken)
  );
}
