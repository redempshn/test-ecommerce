import axiosInstance from "@/shared/utils/axiosInstance";
import { Role } from "@prisma/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: Role;
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/login",
      { email, password },
      { withCredentials: true },
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Login failed";
      return rejectWithValue(message);
    }

    return rejectWithValue("Unexpected error");
  }
});

export const restoreSession = createAsyncThunk<
  LoginResponse,
  void,
  { rejectValue: string }
>("auth/restoreSession", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get("/api/auth/me", {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.error ?? "Not authenticated",
      );
    }
    return rejectWithValue("Unexpected error");
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post(
        "/api/auth/logout",
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      return rejectWithValue("Logout failed");
    }
  },
);

export const registerUser = createAsyncThunk<
  LoginResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post("/api/auth/register", {
      name,
      email,
      password,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Registration failed";

      console.error("Server response:", error.response?.data);
      return rejectWithValue(message);
    }
    return rejectWithValue("Unexpected error");
  }
});

export const requestPasswordReset = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>("auth/requestPasswordReset", async ({ email }, { rejectWithValue }) => {
  try {
    await axiosInstance.post("/api/auth/forgot-password", { email });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Request failed");
    }
    return rejectWithValue("Unexpected error");
  }
});

export const resetPassword = createAsyncThunk<
  void,
  { token: string; password: string },
  { rejectValue: string }
>("auth/resetPassword", async ({ token, password }, { rejectWithValue }) => {
  try {
    await axiosInstance.post("/api/auth/reset-password", {
      token,
      password,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Reset failed");
    }
    return rejectWithValue("Unexpected error");
  }
});

export const updateProfile = createAsyncThunk<
  LoginResponse,
  { name?: string; email?: string },
  { rejectValue: string }
>("auth/updateProfile", async (updates, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put("/api/user/profile", updates, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Update failed");
    }
    return rejectWithValue("Unexpected error");
  }
});
