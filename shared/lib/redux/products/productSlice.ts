import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts } from "./productThunk";
import { productsAdapter } from "../adapter";

type Status = "idle" | "loading" | "succeeded" | "failed";
type ProductStatus = "idle" | "loading" | "succeeded" | "failed";

const initialState = productsAdapter.getInitialState({
  status: "idle" as Status,
  productStatus: "idle" as ProductStatus,
  error: null as string | null,
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchProducts(state, action: PayloadAction<string>) {
      state.entities;
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
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      })

      .addCase(fetchProductById.pending, (state) => {
        state.productStatus = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productStatus = "succeeded";
        productsAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productStatus = "failed";
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default productSlice.reducer;
