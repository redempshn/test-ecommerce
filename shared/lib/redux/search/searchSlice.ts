import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Status = "idle" | "loading" | "succeeded" | "failed";

interface SearchState {
  status: Status;
  query: string;
  debouncedQuery: string;
}

const initialState: SearchState = {
  status: "idle",
  query: "",
  debouncedQuery: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },

    setDebouncedQuery(state, action: PayloadAction<string>) {
      state.debouncedQuery = action.payload;
    },

    clearSearchQuery(state) {
      state.query = "";
      state.debouncedQuery = "";
    },
  },
});

export const { setSearchQuery, setDebouncedQuery, clearSearchQuery } =
  searchSlice.actions;

export default searchSlice.reducer;
