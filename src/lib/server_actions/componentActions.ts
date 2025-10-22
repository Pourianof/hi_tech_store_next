"use server";
import {
  getAllComponentApi,
  getAllComponentModelsApi,
  submitComponentApi,
  submitComponentModelApi,
} from "@/api/componentApi";
import { CategoryComponent } from "@/core/models/category";
import { workWithSession } from "../helpers/sessionHelper";
import { ComponentModelDto } from "@/core/Dtos/componentDto";

export async function getAllComponentsAction() {
  return getAllComponentApi();
}

export async function submitComponentAction(
  component: Omit<CategoryComponent, "componentTypeId">
) {
  return workWithSession((session) =>
    submitComponentApi(component, session.apiToken)
  );
}

export async function getAllComponentModelsAction(componentTypeId: number) {
  return getAllComponentModelsApi(componentTypeId);
}

export async function submitComponentModelAction(
  componentTypeId: number,
  componentModelDto: ComponentModelDto
) {
  return workWithSession((session) =>
    submitComponentModelApi(
      componentTypeId,
      componentModelDto,
      session.apiToken
    )
  );
}
