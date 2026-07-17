import { PermissionScope, UserPermissionDto } from "@/core/Dtos/LoginDto";

export const PERMISSIONS = {
  product: {
    create: "product:create",
    edit: "product:edit",
    delete: "product:delete",
  },
  discount: {
    create: "discount:create",
    edit: "discount:edit",
    view: "discount:list",
    delete: "discount:delete",
  },
  access: {
    grant: "access:grant",
  },
};

export function userHasPermission(
  userPermissions: UserPermissionDto[],
  permission: string,
  scope?: PermissionScope,
) {
  return !!userPermissions.find(
    (p) => p.code == permission && (scope == undefined || scope == p.scope),
  );
}
