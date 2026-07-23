import { QueryParams } from "@/core/Dtos/QueryParams";
import { apiRoutes } from "./apiRoutes";
import { fetchWrapper } from "./fetchWrapper";
import { UserNotification } from "@/core/models/notification";
import { PagedResults } from "@/core/Dtos/pagedResult";

export function getUserNotificationsApi(
  options?: QueryParams<{
    includes?: string[];
    excludes?: string[];
    after?: Date;
  }>,
) {
  return fetchWrapper.get<PagedResults<UserNotification>>(
    apiRoutes.notifications.me,
    {
      page: options?.page,
      limit: options?.limit,
      ...(options?.includes?.length
        ? {
            "type[in]": options.includes.join(","),
          }
        : {}),
      ...(options?.excludes?.length
        ? {
            "type[nin]": options.excludes.join(","),
          }
        : {}),
      ...(options?.after
        ? {
            "createdAt[gte]": options.after.toISOString(),
          }
        : {}),
    },
  );
}
