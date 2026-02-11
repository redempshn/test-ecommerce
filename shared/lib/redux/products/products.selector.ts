import { createSelector } from "@reduxjs/toolkit";
import { productsAdapter } from "../adapter";
import { RootState } from "../store/store";

export const selectProductsState = (state: RootState) => state.products;
export const selectProductsStatus = (state: RootState) => state.products.status;

// Селекторы из adapter
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectEntities: selectProductEntities,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors<RootState>((state) => state.products);

// Базовые селекторы фильтров (чтобы не импортировать из filters.selector)
export const selectSelectedCategories = (state: RootState) =>
  state.filters.categories;

export const selectSelectedBrands = (state: RootState) => state.filters.brands;

export const selectSelectedPriceRange = (state: RootState) =>
  state.filters.priceRange;

// Границы цен из всех продуктов
export const selectPriceBounds = createSelector(
  [selectAllProducts],
  (products) => {
    if (products.length === 0) {
      return { min: 0.99, max: 2499 };
    }

    const prices = products.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  },
);

// 👇 ПЕРЕНЕСЛИ СЮДА из filters.selector.ts
// Эффективный диапазон (выбранный или полный)
export const selectEffectivePriceRange = createSelector(
  [selectSelectedPriceRange, selectPriceBounds],
  (selectedRange, bounds) => selectedRange ?? bounds,
);

// Фильтрованные продукты
export const selectFilteredProducts = createSelector(
  [
    selectAllProducts,
    selectSelectedCategories,
    selectSelectedBrands,
    selectEffectivePriceRange,
  ],
  (products, selectedCategories, selectedBrands, priceRange) => {
    return products.filter((product) => {
      // Фильтр по категориям
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) {
          return false;
        }
      }

      // Фильтр по брендам
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(product.brand)) {
          return false;
        }
      }

      // Фильтр по цене
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false;
      }

      return true;
    });
  },
);

// Количество найденных продуктов
export const selectFilteredProductsCount = createSelector(
  [selectFilteredProducts],
  (products) => products.length,
);

// Категории с количеством
export const selectAllCategories = createSelector(
  [selectAllProducts],
  (products) => {
    const map = products.reduce<Record<string, number>>((acc, product) => {
      acc[product.category] = (acc[product.category] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(map).map(([category, count]) => ({
      category,
      count,
    }));
  },
);

// Бренды с количеством
export const selectAllBrands = createSelector(
  [selectAllProducts],
  (products) => {
    const map = products.reduce<Record<string, number>>((acc, product) => {
      acc[product.brand] = (acc[product.brand] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(map).map(([brand, count]) => ({
      brand,
      count,
    }));
  },
);
