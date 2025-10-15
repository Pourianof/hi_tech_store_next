"use server";
import {
  getAllComponentActionApi,
  submitComponentApi,
} from "@/api/componentApi";
import { CategoryComponent } from "@/core/models/category";
import { workWithSession } from "../helpers/sessionHelper";

export async function getAllComponentsAction() {
  return getAllComponentActionApi();
}

export async function submitComponentAction(
  component: Omit<CategoryComponent, "componentTypeId">
) {
  return workWithSession((session) =>
    submitComponentApi(component, session.apiToken)
  );
}
