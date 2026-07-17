export interface LoginDto {
  token: string;
  refreshToken: string;
  expiresAt: number;
  user: {
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    avatarUrl?: string;
    permissions: UserPermissionDto[];
  };
}

export interface UserPermissionDto {
  code: string;
  scope: PermissionScope;
}

export enum PermissionScope {
  All,
  Self,
}
