import { PermissionScope } from "@/core/Dtos/LoginDto";
import { User } from "@/core/models/user";
import { PERMISSIONS, userHasPermission } from "@/lib/auth/permissionHelper";
import { isAdmin, isManager } from "@/lib/helpers/roleHelpers";
import { ActorContext, TargetUserFacts } from "./ability";

export function userToActorContext(user: User): ActorContext {
  return {
    id: user.id,
    isAdmin: isAdmin(user.roles ?? []),
    isManager: isManager(user.roles ?? []),
    permissions:
      user.permissions?.map((up) => ({
        code: up.code,
        scope: up.scope == PermissionScope.All ? "All" : "Self",
      })) ?? [],
  };
}

export function userToFacts(user: User): TargetUserFacts {
  return {
    id: user.id,
    isAdmin: isAdmin(user.roles ?? []),
    isManager: isManager(user.roles ?? []),
    permissions:
      user.permissions?.map((up) => ({
        code: up.code,
        scope: up.scope == PermissionScope.All ? "All" : "Self",
      })) ?? [],
    hasAccessGrant: userHasPermission(
      user.permissions ?? [],
      PERMISSIONS.access.grant,
    ),
    kind: "TargetUser",
  };
}
