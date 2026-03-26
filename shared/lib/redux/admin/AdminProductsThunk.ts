import { Product } from "@/shared/types/product";
import axiosInstance from "@/shared/utils/axiosInstance";
import { ProductFormSchema } from "@/shared/validations/product.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as z from "zod";

type ProductPayload = z.infer<typeof ProductFormSchema>;

export interface ProductResponse {
  product: Product;
}

export const createProduct = createAsyncThunk<
  ProductResponse,
  ProductPayload,
  { rejectValue: string }
>("admin/products/create", async (productData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<ProductResponse>(
      "/api/admin/products",
      productData,
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Not product data",
      );
    }
    return rejectWithValue("Unexpected error");
  }
});

export const updateProduct = createAsyncThunk<
  ProductResponse,
  { id: number; data: ProductPayload },
  { rejectValue: string }
>(
  "admin/products/update",
  async ({ id, data: productData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<ProductResponse>(
        `/api/admin/products/${id}`,
        productData,
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to update product";
        return rejectWithValue(message);
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("Unexpected error occurred");
    }
  },
);

export const deleteProduct = createAsyncThunk<
  { id: number },
  number,
  { rejectValue: string }
>("admin/products/delete", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/api/admin/products/${id}`);

    return { id };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to delete product";
      return rejectWithValue(message);
    }

    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("Unexpected error occurred");
  }
});

export interface FetchAdminProductsParams {
  search?: string;
  category?: string;
  status?: "DRAFT" | "ACTIVE" | "INACTIVE" | "all";
  sort?: string;
  page?: number;
  limit?: number;
  created?: string;
}

export interface FetchAdminProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// FETCH ADMIN PRODUCTS
export const fetchAdminProducts = createAsyncThunk<
  FetchAdminProductsResponse,
  FetchAdminProductsParams,
  { rejectValue: string }
>("admin/products/fetchAll", async (params = {}, { rejectWithValue }) => {
  try {
    // Строим query параметры
    const queryParams = new URLSearchParams();

    if (params.search) {
      queryParams.append("search", params.search);
    }

    if (params.category) {
      queryParams.append("category", params.category);
    }

    if (params.sort) {
      queryParams.append("sort", params.sort);
    }

    if (params.status) {
      queryParams.append("status", params.status);
    }

    if (params.page) {
      queryParams.append("page", params.page.toString());
    }

    if (params.limit) {
      queryParams.append("limit", params.limit.toString());
    }

    if (params.created) {
      queryParams.append("created", params.created);
    }

    const url = `/api/admin/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const { data } = await axiosInstance.get<FetchAdminProductsResponse>(url);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch products";
      return rejectWithValue(message);
    }

    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("Unexpected error occurred");
  }
});

export const fetchAdminProductById = createAsyncThunk<
  ProductResponse,
  { id: number },
  { rejectValue: string }
>("admin/products/fetchById", async ({ id }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<ProductResponse>(
      `/api/admin/products/${id}`,
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch product by id";
      return rejectWithValue(message);
    }

    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("Unexpected error occurred");
  }
});
