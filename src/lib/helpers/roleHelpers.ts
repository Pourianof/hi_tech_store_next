export function isManager(role: string | undefined | null) {
  return role?.toLowerCase() === "manager";
}

export function isAdmin(role: string | undefined | null) {
  return role?.toLowerCase() === "admin";
}

export function isNormalUser(role: string | undefined | null) {
  return role?.toLowerCase() === "user";
}
