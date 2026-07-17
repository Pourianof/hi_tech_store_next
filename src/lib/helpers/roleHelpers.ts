type Roles = (string | undefined | null)[];
export function isManager(roles: Roles) {
  return findRole(roles, "manager");
}

export function isAdmin(roles: Roles) {
  return !!findRole(roles, "admin");
}

export function isNormalUser(roles: Roles) {
  return !!findRole(roles, "user");
}

function findRole(roles: Roles, targetRole: string) {
  return !!roles?.find((r) => r?.toLowerCase() == targetRole);
}
