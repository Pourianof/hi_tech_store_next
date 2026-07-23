"use server";
import {
  getMyDataApi,
  getUsersListApi,
  updateUser,
  updateUserAvatarApi,
} from "@/api/userApi";
import { workWithSession } from "../helpers/sessionHelper";
import { UserUpdateDto } from "@/core/Dtos/UserDto";

export async function updateUserAction(userData: UserUpdateDto) {
  return workWithSession(({ apiToken }) => updateUser(apiToken, userData));
}

export const updateUserAvatarAction = updateUserAvatarApi;
export const getUsersListAction = getUsersListApi;
export const getMyDataAction = getMyDataApi;
