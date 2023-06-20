export interface UserData {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  isValidate: boolean;
  img?: string;
  isDeleted?: boolean;
}
export interface UpdateUserPassword {
  role: Role.NORMAL_USER_ROLE | Role.PREMIUM_USER_ROLE;
  email?: string;
  password?: string;
  newPassword?: string;
  img?: string;
  isDeleted?: boolean;
}
export interface UpdateUserEmail {
  role: Role.NORMAL_USER_ROLE | Role.PREMIUM_USER_ROLE;
  email?: string;
  newEmail?: string;
  password?: string;
  img?: string;
  isDeleted?: boolean;
}
export interface Jwt {
  id: string;
  iat: string;
  exp: string;
}
export enum Role {
  ADMIN_ROLE = "ADMIN_ROLE",
  PREMIUM_USER_ROLE = "PREMIUM_USER_ROLE",
  NORMAL_USER_ROLE = "NORMAL_USER_ROLE",
}
