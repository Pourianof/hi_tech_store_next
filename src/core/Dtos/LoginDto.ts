export interface LoginDto {
  token: string;
  user: {
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}
