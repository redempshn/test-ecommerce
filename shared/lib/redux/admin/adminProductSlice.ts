import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  fetchAdminProducts,
  updateProduct,
} from "./AdminProductsThunk";
import { productsAdapter } from "../adapter";

const initialState = productsAdapter.getInitialState({
  status: "idle" as "idle" | "loading" | "succeeded" | "failed",
  error: null as string | null,
  pagination: null as {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null,
});

const adminProductsSlice = createSlice({
  name: "productsadmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.addOne(state, action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create product";
      })

      // UPDATE
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.upsertOne(state, action.payload.product);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update product";
      })

      // DELETE
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.removeOne(state, action.payload.id);
        if (state.pagination) {
          state.pagination.total -= 1;
          state.pagination.totalPages = Math.ceil(
            state.pagination.total / state.pagination.limit,
          );
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete product";
      })

      // FETCH ADMIN PRODUCTS
      .addCase(fetchAdminProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.setAll(state, action.payload.products);
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

export default adminProductsSlice.reducer;
