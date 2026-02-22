import { RootState } from "../store/store";

export const selectUser = (state: RootState) => state.auth.user;

// export const selectAuthStatus = (state: RootState) => state.auth.status;
// export const selectAuthError = (state: RootState) => state.auth.error;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.status === "authenticated" && state.auth.user !== null;

export const currentStatus = (state: RootState) => state.auth.status;
export const currentRole = (state: RootState) => state.auth.user?.role;
