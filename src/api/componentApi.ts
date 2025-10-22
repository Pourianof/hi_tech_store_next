import { CategoryComponent } from "@/core/models/category";
import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";
import { ProductComponentModel } from "@/core/models/product";
import { ComponentModelDto } from "@/core/Dtos/componentDto";

export async function getAllComponentApi(): Promise<
  ResultModel<CategoryComponent[]>
> {
  return generateResultModelFromResponse(
    await fetch(`${process.env.API_SERVER_ADDRESS}/components`)
  );
}

export async function submitComponentApi(
  component: Omit<CategoryComponent, "componentTypeId">,
  accessToken: string
): Promise<ResultModel<CategoryComponent>> {
  return generateResultModelFromResponse(
    await fetch(`${process.env.API_SERVER_ADDRESS}/components`, {
      method: "POST",
      body: JSON.stringify(component),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );
}

export async function getAllComponentModelsApi(
  componentTypeId: number
): Promise<ResultModel<ProductComponentModel[]>> {
  return generateResultModelFromResponse(
    await fetch(
      `${process.env.API_SERVER_ADDRESS}/components/${componentTypeId}/models`
    )
  );
}

export async function submitComponentModelApi(
  componentTypeId: number,
  componentModelDto: ComponentModelDto,
  accessToken: string
): Promise<ResultModel<ProductComponentModel>> {
  return generateResultModelFromResponse(
    await fetch(
      `${process.env.API_SERVER_ADDRESS}/components/${componentTypeId}/models`,
      {
        method: "POST",
        body: JSON.stringify(componentModelDto),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  );
}
