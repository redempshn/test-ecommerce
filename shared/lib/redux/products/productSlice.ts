import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchProductBySlug,
  fetchProductFilters,
  fetchProducts,
} from "./productThunk";
import { productsAdapter } from "../adapter";

type Status = "idle" | "loading" | "succeeded" | "failed";

export interface ActiveFilters {
  [key: string]: string[];
}

export interface ProductFilter {
  name: string;
  values: string[];
}

const initialState = productsAdapter.getInitialState({
  status: "idle" as Status,
  error: null as string | null,
  filters: [] as ProductFilter[],
  activeFilters: {} as ActiveFilters,
  currentCategory: null as string | null,
  pagination: null as {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null,
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setActiveFilter(
      state,
      action: PayloadAction<{ name: string; value: string }>,
    ) {
      const { name, value } = action.payload;
      if (!state.activeFilters[name]) {
        state.activeFilters[name] = [];
      }
      state.activeFilters[name].push(value);
    },
    removeActiveFilter(
      state,
      action: PayloadAction<{ name: string; value: string }>,
    ) {
      const { name, value } = action.payload;
      state.activeFilters[name] = state.activeFilters[name].filter(
        (v) => v !== value,
      );
      if (state.activeFilters[name].length === 0) {
        delete state.activeFilters[name];
      }
    },
    clearActiveFilters(state) {
      state.activeFilters = {};
    },
    setCurrentCategory(state, action: PayloadAction<string | null>) {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.setAll(state, action.payload.products);
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch products";
      })

      .addCase(fetchProductBySlug.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.setOne(state, action.payload.product);
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch product";
      })

      .addCase(fetchProductFilters.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductFilters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filters = action.payload.filters;
      })
      .addCase(fetchProductFilters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch filters";
      });
  },
});

export default productSlice.reducer;
