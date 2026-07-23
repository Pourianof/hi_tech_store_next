import { UserUpdateDto } from "@/core/Dtos/UserDto";
import { apiRoutes } from "./apiRoutes";
import { generateResultModelFromResponse } from "./apiHelper";
import { fetchWrapper } from "./fetchWrapper";
import { User } from "@/core/models/user";
import { PagedResults } from "@/core/Dtos/pagedResult";
import { QueryParams } from "@/core/Dtos/QueryParams";

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

export async function getUsersListApi(params?: QueryParams) {
  return fetchWrapper.get<PagedResults<User>>(apiRoutes.users.base, params);
}

export async function getUserById(id: string) {
  return fetchWrapper.get<User>(apiRoutes.users.forUser(id));
}

export async function getMyDataApi() {
  return fetchWrapper.get<User>(apiRoutes.users.me);
}
