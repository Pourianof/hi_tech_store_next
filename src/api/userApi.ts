import { UserUpdateDto } from "@/core/Dtos/UserDto";
import { apiRoutes } from "./apiRoutes";
import { generateResultModelFromResponse } from "./apiHelper";
import { fetchWrapper } from "./fetchWrapper";
import { User } from "@/core/models/user";

export async function updateUser(accessToken: string, data: UserUpdateDto) {
  const respond = await fetch(`${apiRoutes.users.me}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return generateResultModelFromResponse(respond);
}

export async function updateUserAvatarApi(newAvatar: FormData) {
  return fetchWrapper.put<User>(apiRoutes.users.avatar, newAvatar);
}
