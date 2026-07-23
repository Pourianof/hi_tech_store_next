import { UserPermissionDto } from "../Dtos/LoginDto";

export interface User {
  id: string;
  userName: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  roles?: string[];
  avatarUrl?: string;
  permissions?: UserPermissionDto[];
  dataAt: string;
}
