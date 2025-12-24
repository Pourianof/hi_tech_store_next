"use server";
import { updateUser } from "@/api/userApi";
import { workWithSession } from "../helpers/sessionHelper";
import { UserUpdateDto } from "@/core/Dtos/UserDto";

export async function updateUserAction(userData: UserUpdateDto) {
  return workWithSession(({ apiToken }) => updateUser(apiToken, userData));
}
