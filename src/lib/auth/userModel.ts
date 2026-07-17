import { PermissionScope, UserPermissionDto } from "@/core/Dtos/LoginDto";
import { User } from "../../core/models/user";
import { userHasPermission } from "./permissionHelper";

export class UserModel {
  static build(user: User) {
    return new UserModel(
      user.firstName ?? user.name,
      user.lastName,
      user.email,
      user.permissions,
      user.roles,
      user.avatarUrl,
    );
  }
  public name: string;

  private constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public permissions: UserPermissionDto[] = [],
    public roles?: string[],
    public avatarUrl?: string,
  ) {
    this.name = firstName;
  }

  hasPermission(permission: string, scope?: PermissionScope) {
    return userHasPermission(this.permissions, permission, scope);
  }

  hasAllPermissions(permissions: UserPermission[]) {
    return permissions.reduce(
      (pre, perm) =>
        pre && userHasPermission(this.permissions, perm.code, perm.scope),
      true,
    );
  }

  hasAnyPermissions(permissions: UserPermission[]) {
    return permissions.reduce(
      (pre, perm) =>
        pre || userHasPermission(this.permissions, perm.code, perm.scope),
      false,
    );
  }
}

type UserPermission = { scope?: PermissionScope; code: string };
