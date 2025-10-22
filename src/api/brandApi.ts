import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";
import { Brand, BrandModel } from "@/core/models/brand";

export async function getAllBrandModelsApi(): Promise<
  ResultModel<BrandModel[]>
> {
  return generateResultModelFromResponse(
    await fetch(`${process.env.API_SERVER_ADDRESS}/brandmodels`)
  );
}

export async function getAllBrandApi(): Promise<ResultModel<Brand[]>> {
  return generateResultModelFromResponse(
    await fetch(`${process.env.API_SERVER_ADDRESS}/brands`)
  );
}

export async function createNewBrandModelApi(
  brandModelDto: FormData,
  accessToken: string
): Promise<ResultModel<BrandModel>> {
  return generateResultModelFromResponse(
    await fetch(`${process.env.API_SERVER_ADDRESS}/brandModels`, {
      method: "POST",
      body: brandModelDto,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );
}
