export type UserRole = "guest" | "user" | "admin";
export type UserStatus = "idle" | "loading" | "authenticated" | "error";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  role: UserRole;
  status: UserStatus;
  error: string | null;
}
