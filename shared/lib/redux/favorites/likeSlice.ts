import { createSlice } from "@reduxjs/toolkit";
import {
  AddProductToFavorites,
  DeleteFromFavorites,
  fetchLikedProduct,
} from "./likeThunk";
import { Product } from "@/shared/types/product";

type Status = "idle" | "loading" | "succeeded" | "failed";

export interface LikedProductsProps {
  productId: number;
}

const initialState = {
  favoritesIds: [] as number[],
  favoritesProducts: [] as Product[],
  totalPrice: 0 as number,
  status: "idle" as Status,
  error: null as string | null,
  pagination: null as {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null,
};

const likeSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLikedProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favoritesProducts = action.payload.products.map(
          (item) => item.product,
        );
        state.favoritesIds = action.payload.products.map(
          (item) => item.productId,
        );
        state.totalPrice = action.payload.totalPrice;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchLikedProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch favorites products";
      })
      .addCase(AddProductToFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AddProductToFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favoritesIds.push(action.payload.product.productId);
      })
      .addCase(AddProductToFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? "Failed to add this product to favorites";
      })
      .addCase(DeleteFromFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(DeleteFromFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";

        const deletedProduct = state.favoritesProducts.find(
          (product) => product.id === action.payload.productId,
        );

        if (deletedProduct) {
          state.totalPrice -= deletedProduct.price;
        }

        state.favoritesProducts = state.favoritesProducts.filter(
          (product) => product.id !== action.payload.productId,
        );
        state.favoritesIds = state.favoritesIds.filter(
          (id) => id !== action.payload.productId,
        );

        if (state.pagination) {
          state.pagination.total -= 1;
          state.pagination.totalPages = Math.ceil(
            state.pagination.total / state.pagination.limit,
          );
        }
      })
      .addCase(DeleteFromFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? "Failed to delete this product from favorites";
      });
  },
});

export default likeSlice.reducer;
