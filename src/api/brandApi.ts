import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";
import { Brand, BrandModel } from "@/core/models/brand";
import { apiRoutes } from "./apiRoutes";

export async function getAllBrandModelsApi(): Promise<
  ResultModel<BrandModel[]>
> {
  return generateResultModelFromResponse(
    await fetch(apiRoutes.brandModels.base)
  );
}

export async function getAllBrandApi(): Promise<ResultModel<Brand[]>> {
  return generateResultModelFromResponse(await fetch(apiRoutes.brands.base));
}

export async function createNewBrandModelApi(
  brandModelDto: FormData,
  accessToken: string
): Promise<ResultModel<BrandModel>> {
  return generateResultModelFromResponse(
    await fetch(apiRoutes.brandModels.base, {
      method: "POST",
      body: brandModelDto,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );
}
