/**
 * In a real app this catalog would come from an API call (GET /api/permissions).
 * Kept static here for a self-contained example — swap `usePermissionCatalog`
 * in PermissionForm.tsx for a real fetch when wiring this up.
 */
export interface PermissionCatalogItem {
  code: string;
  label: string;
  group: string;
}

export const PERMISSION_CATALOG: PermissionCatalogItem[] = [
  {
    code: "access:grant",
    label: "Grant access to other users",
    group: "Access",
  },
  {
    code: "product:create",
    label: "Create products",
    group: "Product",
  },
  {
    code: "product:edit",
    label: "Edit products",
    group: "Product",
  },
  {
    code: "product:delete",
    label: "Delete products",
    group: "Product",
  },
  {
    code: "comment:moderate",
    label: "Moderate comments",
    group: "Comment",
  },
  {
    code: "discount:create",
    label: "Create discounts",
    group: "Discount",
  },
  {
    code: "discount:list",
    label: "View discounts",
    group: "Discount",
  },
  {
    code: "discount:edit",
    label: "Edit discounts",
    group: "Discount",
  },
  {
    code: "discount:delete",
    label: "Delete discounts",
    group: "Discount",
  },
];

/**
 * Maps backend PermissionErrors.* codes (see nameof(PermissionErrors.X) in the
 * unit tests) to a message that makes sense to whoever is filling the form.
 */
export const PERMISSION_ERROR_MESSAGES: Record<string, string> = {
  UserNotFound: "The selected user could not be found.",
  NotAuthorizedToModifyTargetUsersPermissions:
    "This user has a role assigned, so only an admin can change their permissions.",
  AdminModifyAdminRestriction:
    "Admins cannot modify another admin's permissions.",
  GrantPermissionRequiredGrantAccess:
    'You need the "Grant access" permission to modify anyone\'s permissions.',
  InvalidPermission: "One of the selected permissions does not exist.",
  ForbiddenAccessGranting:
    'Only an admin can grant the "Grant access" permission to someone else.',
  CannotGrantPermissionYouDoNotHave:
    "You can only grant permissions that you already hold yourself.",
  CannotGrantPermissionScopeWhichHigherThanYou:
    "You cannot grant or revoke a scope wider than your own for this permission.",
  LockingPermissionListForAccessGrantedTargetUser:
    "This user can grant access to others, so their permission list is locked and cannot be edited here.",
};

export function resolveErrorMessage(code: string, fallback?: string): string {
  return PERMISSION_ERROR_MESSAGES[code] ?? fallback ?? code;
}
