import { CategoryComponent } from "@/core/models/category";
import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";
import { ProductComponentModel } from "@/core/models/product";
import { ComponentModelDto } from "@/core/Dtos/componentDto";
import { apiRoutes } from "./apiRoutes";
import { PagedResults } from "@/core/Dtos/pagedResult";

export async function getAllComponentApi(): Promise<
  ResultModel<PagedResults<CategoryComponent>>
> {
  return generateResultModelFromResponse(
    await fetch(apiRoutes.components.base),
  );
}

export async function submitComponentApi(
  component: Omit<CategoryComponent, "componentTypeId">,
  accessToken: string,
): Promise<ResultModel<CategoryComponent>> {
  return generateResultModelFromResponse(
    await fetch(apiRoutes.components.base, {
      method: "POST",
      body: JSON.stringify(component),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  );
}

export async function getAllComponentModelsApi(
  componentTypeId: number,
): Promise<ResultModel<ProductComponentModel[]>> {
  return generateResultModelFromResponse(
    await fetch(apiRoutes.components.modelsOf(componentTypeId)),
  );
}

export async function submitComponentModelApi(
  componentTypeId: number,
  componentModelDto: ComponentModelDto,
  accessToken: string,
): Promise<ResultModel<ProductComponentModel>> {
  return generateResultModelFromResponse(
    await fetch(apiRoutes.components.modelsOf(componentTypeId), {
      method: "POST",
      body: JSON.stringify(componentModelDto),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  );
}
