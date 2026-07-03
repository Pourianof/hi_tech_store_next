import { UserPermissionDto } from "../Dtos/LoginDto";

export interface User {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  roles?: string[];
  avatarUrl?: string;
  permissions?: UserPermissionDto[];
}
