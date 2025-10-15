import { CategoryComponent } from "@/core/models/category";
import { ResultModel } from "@/core/models/resultModel";
import { generateResultModelFromResponse } from "./apiHelper";

export async function getAllComponentActionApi(): Promise<
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
