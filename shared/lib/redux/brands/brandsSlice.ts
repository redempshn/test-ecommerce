import { Brand } from "@/shared/types/product";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchBrands } from "./brandsThunk";
import { RootState } from "../store/store";

const brandsAdapter = createEntityAdapter<Brand>();

const initialState = brandsAdapter.getInitialState({
  status: "idle" as "idle" | "loading" | "succeeded" | "failed",
  error: null as string | null,
});

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        brandsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch categories";
      });
  },
});

export const { selectAll: selectAllbrands } = brandsAdapter.getSelectors(
  (state: RootState) => state.brands,
);

export default brandsSlice.reducer;
