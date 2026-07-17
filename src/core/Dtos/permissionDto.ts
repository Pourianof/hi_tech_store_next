import {
  PermissionModificationAction,
  PermissionScope,
} from "../features/permissions/schema";

export interface PermissionUpdateDto {
  permissions: SinglePermissionChange[];
}

export interface SinglePermissionChange {
  permissionCode: string;
  scope: PermissionScope;
  action: PermissionModificationAction;
}
