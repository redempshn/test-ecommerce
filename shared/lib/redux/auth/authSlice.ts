import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./auth.types";
import {
  loginUser,
  logoutUser,
  registerUser,
  restoreSession,
} from "./authThunk";

const initialState: AuthState = {
  user: null,
  role: "guest",
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.role = "guest";
      state.status = "idle";
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          name: action.payload.name,
          role: action.payload.role,
        };
        state.role = action.payload.role;
        state.status = "authenticated";
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
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          name: action.payload.name,
          role: action.payload.role,
        };
        state.role = action.payload.role;
        state.status = "authenticated";
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.role = "guest";
        state.status = "idle";
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.role = "guest";
        state.status = "idle";
      })

      // register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          name: action.payload.name,
          role: action.payload.role,
        };
        state.role = action.payload.role;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
