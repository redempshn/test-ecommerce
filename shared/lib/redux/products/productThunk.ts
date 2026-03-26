import { Product } from "@/shared/types/product";
import axiosInstance from "@/shared/utils/axiosInstance";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductResponse } from "../admin/AdminProductsThunk";

export interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductParams {
  attributes?: string[];
  slug?: string;
  created?: string;
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  ProductParams,
  { rejectValue: string }
>("products/fetchProducts", async (params = {}, { rejectWithValue }) => {
  try {
    const queryParams = new URLSearchParams();

    if (params.search) {
      queryParams.append("search", params.search);
    }

    if (params.created) {
      queryParams.append("created", params.created);
    }

    if (params.slug) {
      queryParams.append("slug", params.slug);
    }

    if (params.category) {
      queryParams.append("category", params.category);
    }

    if (params.sort) {
      queryParams.append("sort", params.sort);
    }

    if (params.page !== undefined) {
      queryParams.append("page", params.page.toString());
    }

    if (params.limit !== undefined) {
      queryParams.append("limit", params.limit.toString());
    }

    if (params.attributes && params.attributes.length > 0) {
      params.attributes.forEach((attr) => {
        queryParams.append("attributes", attr);
      });
    }

    const url = `/api/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const { data } = await axiosInstance.get<ProductsResponse>(url);

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

export const fetchProductBySlug = createAsyncThunk<
  ProductResponse,
  { slug: string },
  { rejectValue: string }
>("products/fetchProductBySlug", async ({ slug }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<ProductResponse>(
      `/api/products/${slug}`,
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

interface ProductFiltersResponse {
  filters: {
    name: string;
    values: string[];
  }[];
}

export const fetchProductFilters = createAsyncThunk<
  ProductFiltersResponse,
  { slug: string },
  { rejectValue: string }
>("products/fetchProductFilters", async ({ slug }, { rejectWithValue }) => {
  try {
    const url = `/api/products/filters?slug=${slug}`;

    const { data } = await axiosInstance.get<ProductFiltersResponse>(url);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch product filters";
      return rejectWithValue(message);
    }

    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("Unexpected error occurred");
  }
});
