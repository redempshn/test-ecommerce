import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceRangeState {
  min: number;
  max: number;
}

type FiltersState = {
  categories: string[];
  priceRange: PriceRangeState | null;
  brands: string[];
};

const initialState: FiltersState = {
  categories: [],
  priceRange: null,
  brands: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleCategory(state, action: PayloadAction<string>) {
      const category = action.payload;
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter((c) => c !== category);
      } else {
        state.categories.push(category);
      }
    },
    deleteCategory(state) {
      state.categories = [];
    },
    toggleBrand(state, action: PayloadAction<string>) {
      const brand = action.payload;
      if (state.brands.includes(brand)) {
        state.brands = state.brands.filter((b) => b !== brand);
      } else {
        state.brands.push(brand);
      }
    },
    deleteBrands(state) {
      state.brands = [];
    },
    setPriceRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.priceRange = action.payload;
    },
    resetPriceRange(state) {
      state.priceRange = null;
    },
    resetFilters(state) {
      state.categories = [];
      state.brands = [];
      state.priceRange = null;
    },
  },
});

export const {
  toggleCategory,
  deleteCategory,
  toggleBrand,
  deleteBrands,
  setPriceRange,
  resetPriceRange,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
