import { Category } from "@/shared/types/product";
import axiosInstance from "@/shared/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<{ categories: Category[] }>(
      "/api/categories",
    );
    return data.categories;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch categories",
      );
    }
    return rejectWithValue("Unexpected error");
  }
});
