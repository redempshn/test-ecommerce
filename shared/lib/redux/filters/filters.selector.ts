import { createSelector } from "@reduxjs/toolkit";

import {
  selectSelectedCategories,
  selectSelectedBrands,
  selectSelectedPriceRange,
  selectPriceBounds,
} from "../products/products.selector";

// Проверка: изменен ли диапазон цен
export const selectIsPriceRangeChanged = createSelector(
  [selectSelectedPriceRange],
  (selectedRange) => selectedRange !== null,
);

// Селектор всех активных фильтров
export const selectActiveFilters = createSelector(
  [
    selectSelectedCategories,
    selectSelectedBrands,
    selectSelectedPriceRange,
    selectPriceBounds,
  ],
  (categories, brands, priceRange, priceBounds) => {
    const filters: Array<{
      type: "category" | "brand" | "price";
      value: string;
      label: string;
      id: string;
    }> = [];

    // Добавляем категории
    categories.forEach((category) => {
      filters.push({
        type: "category",
        value: category,
        label: category,
        id: `category-${category}`,
      });
    });

    // Добавляем бренды
    brands.forEach((brand) => {
      filters.push({
        type: "brand",
        value: brand,
        label: brand,
        id: `brand-${brand}`,
      });
    });

    // Добавляем цену (только если изменена)
    if (
      priceRange &&
      (priceRange.min !== priceBounds.min || priceRange.max !== priceBounds.max)
    ) {
      filters.push({
        type: "price",
        value: `${priceRange.min}-${priceRange.max}`,
        label: `$${priceRange.min} - $${priceRange.max}`,
        id: "price-range",
      });
    }

    return filters;
  },
);

// Проверка: есть ли активные фильтры?
export const selectHasActiveFilters = createSelector(
  [selectActiveFilters],
  (filters) => filters.length > 0,
);
