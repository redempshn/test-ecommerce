import { Brand } from "@/shared/types/product";
import axiosInstance from "@/shared/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBrands = createAsyncThunk<
  Brand[],
  void,
  { rejectValue: string }
>("brands/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<{ brands: Brand[] }>(
      "/api/brands",
    );
    return data.brands;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch brands",
      );
    }
    return rejectWithValue("Unexpected error");
  }
});
