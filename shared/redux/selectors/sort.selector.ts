import { createSelector } from "@reduxjs/toolkit";
import { selectFilteredProducts } from "./products.selector";
import { RootState } from "../store/store";

export const selectedSortBy = (state: RootState) => state.sort.sortBy;

export const selectSortedProducts = createSelector(
  [selectFilteredProducts, selectedSortBy],
  (products, sortBy) => {
    const sortedProducts = [...products];

    switch (sortBy) {
      case "popular":
        // Сортировка по популярности
        return sortedProducts.sort(
          (a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0),
        );

      case "ratedBy":
        // Сортировка по рейтингу (предполагаем есть поле rating)
        return sortedProducts.sort((a, b) => b.rating - a.rating);

      case "alphabetAsc":
        // От A до Z
        return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));

      case "alphabetDesc":
        // От Z до A
        return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));

      case "priceDesc":
        // Сначала дорогие
        return sortedProducts.sort((a, b) => b.price - a.price);

      case "priceAsc":
        // Сначала дешевые
        return sortedProducts.sort((a, b) => a.price - b.price);

      default:
        return sortedProducts;
    }
  },
);
