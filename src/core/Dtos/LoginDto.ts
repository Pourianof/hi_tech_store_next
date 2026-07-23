import { User } from "../models/user";

export interface LoginDto {
  token: string;
  refreshToken: string;
  expiresAt: number;
  user: User;
}

export interface UserPermissionDto {
  code: string;
  scope: PermissionScope;
}

export enum PermissionScope {
  All,
  Self,
}
