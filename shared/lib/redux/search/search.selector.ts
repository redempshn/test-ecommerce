import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { selectAllProducts } from "../products/products.selector";

export const selectSearchQuery = (state: RootState) => state.search.query;

export const selectDebouncedQuery = (state: RootState) =>
  state.search.debouncedQuery;

export const selectSearchedProducts = createSelector(
  [selectAllProducts, selectDebouncedQuery],
  (products, query) => {
    if (!query || !query.trim()) return [];

    const q = query.toLowerCase();

    return products.filter((product) =>
      product.title.toLowerCase().includes(q),
    );
  },
);

export const selectSearchResultsCount = createSelector(
  [selectSearchedProducts],
  (results) => results.length,
);

export const selectLimitedSearchResults = createSelector(
  [selectSearchedProducts],
  (results) => results.slice(0, 5),
);
