import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoriesThunk";
import { Category } from "@/shared/types/product";
import { RootState } from "../store/store";

const categoriesAdapter = createEntityAdapter<Category>();

const initialState = categoriesAdapter.getInitialState({
  status: "idle" as "idle" | "loading" | "succeeded" | "failed",
  error: null as string | null,
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        categoriesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch categories";
      });
  },
});

export const { selectAll: selectAllCategories } =
  categoriesAdapter.getSelectors((state: RootState) => state.categories);

export default categoriesSlice.reducer;
