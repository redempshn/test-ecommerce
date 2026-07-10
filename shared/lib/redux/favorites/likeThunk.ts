import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "@/shared/utils/axiosInstance";
import { Product } from "@/shared/types/product";

interface LikedProductResponse {
  products: {
    userId: number;
    productId: number;
    createdAt: string;
    product: Product;
  }[];
  totalPrice: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface likedProductPayload {
  page?: number;
  limit?: number;
  sort?: string;
}

export const fetchLikedProduct = createAsyncThunk<
  LikedProductResponse,
  likedProductPayload,
  { rejectValue: string }
>("products/likedProducts", async (params = {}, { rejectWithValue }) => {
  try {
    const queryParams = new URLSearchParams();

    if (params.sort) {
      queryParams.append("sort", params.sort);
    }

    if (params.page !== undefined) {
      queryParams.append("page", params.page.toString());
    }

    if (params.limit !== undefined) {
      queryParams.append("limit", params.limit.toString());
    }

    const url = `/api/user/likes${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const { data } = await axiosInstance.get<LikedProductResponse>(url);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch liked products";
      return rejectWithValue(message);
    }

    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("Unexpected error occurred");
  }
});

export interface AddProductToFavoritesPayload {
  productId: number;
}

interface AddToFavoritesResponse {
  product: {
    userId: number;
    productId: number;
    createdAt: string;
  };
}

export const AddProductToFavorites = createAsyncThunk<
  AddToFavoritesResponse,
  AddProductToFavoritesPayload,
  { rejectValue: string }
>("products/AddToFavorites", async ({ productId }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post("/api/user/likes", {
      productId,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Add to favorites list failed.";
      return rejectWithValue(message);
    }

    return rejectWithValue("Unexpected error");
  }
});

export const DeleteFromFavorites = createAsyncThunk<
  { productId: number },
  { productId: number },
  { rejectValue: string }
>(
  "products/deleteFromFavorites",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/user/likes/${productId}`,
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Cant delete product from favorites.";
        return rejectWithValue(message);
      }

      return rejectWithValue("Unexpected error");
    }
  },
);
