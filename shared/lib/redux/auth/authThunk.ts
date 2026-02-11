import { API_URL } from "@/config";
import axiosInstance from "@/shared/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "guest";
  token: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/api/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    };

    const { data } = await axiosInstance.post(
      `${API_URL}/api/user/login`,
      { email, password },
      config,
    );

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Login failed");
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
    const token = localStorage.getItem("userToken");

    if (!token) {
      return rejectWithValue("No token");
    }

    const { data } = await axios.get(`${API_URL}/api/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    localStorage.removeItem("userToken"); // чистим невалидный токен
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Auth failed");
    }
    return rejectWithValue("Unexpected error");
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/api/user/logout");
      localStorage.removeItem("userToken");
    } catch (error) {
      console.log(error);
      localStorage.removeItem("userToken");
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
    const { data } = await axiosInstance.post("/api/user/register", {
      name,
      email,
      password,
    });

    localStorage.setItem("userToken", data.token);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Registration failed",
      );
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
    await axiosInstance.post("/api/user/forgot-password", { email });
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
    await axiosInstance.post("/api/user/reset-password", {
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
    const { data } = await axiosInstance.put("/api/user/profile", updates);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message ?? "Update failed");
    }
    return rejectWithValue("Unexpected error");
  }
});

export const refreshToken = createAsyncThunk<
  { token: string },
  void,
  { rejectValue: string }
>("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post("/api/user/refresh-token");
    localStorage.setItem("userToken", data.token);
    return data;
  } catch (error) {
    localStorage.removeItem("userToken");
    if (axios.isAxiosError(error)) {
      return rejectWithValue("Refresh failed");
    }
    return rejectWithValue("Unexpected error");
  }
});
