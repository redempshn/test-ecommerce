import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SortType =
  | "popular"
  | "ratedBy"
  | "alphabetAsc"
  | "alphabetDesc"
  | "priceDesc"
  | "priceAsc";

interface SortProps {
  sortBy: SortType;
}

const initialState: SortProps = {
  sortBy: "popular",
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<SortType>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = sortSlice.actions;

export default sortSlice.reducer;
