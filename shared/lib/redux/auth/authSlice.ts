import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  registerUser,
  restoreSession,
} from "./authThunk";
import { Role } from "@prisma/client";

interface AuthState {
  user: {
    id: number;
    email: string;
    name: string;
    role: Role;
  } | null;
  status: "idle" | "loading" | "pending" | "authenticated" | "error";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload?.user) {
          state.user = {
            id: action.payload.user.id,
            email: action.payload.user.email,
            name: action.payload.user.name,
            role: action.payload.user.role,
          };
          state.status = "pending";
          state.error = null;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "Registration failed";
      })
      // login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload?.user) {
          state.user = {
            id: action.payload.user.id,
            email: action.payload.user.email,
            name: action.payload.user.name,
            role: action.payload.user.role,
          };
          state.status = "authenticated";
          state.error = null;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "Login failed";
      })

      // restore session
      .addCase(restoreSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        if (action.payload?.user) {
          state.user = {
            id: action.payload.user.id,
            email: action.payload.user.email,
            name: action.payload.user.name,
            role: action.payload.user.role,
          };
          state.status = "authenticated";
          state.error = null;
        }
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.status = "idle";
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
