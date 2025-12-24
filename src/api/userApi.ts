import { UserUpdateDto } from "@/core/Dtos/UserDto";
import { apiRoutes } from "./apiRoutes";
import { generateResultModelFromResponse } from "./apiHelper";

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
