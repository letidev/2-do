export type UserRole = "user" | "admin";

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  id: string;
}

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

export interface RegisterUserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}
