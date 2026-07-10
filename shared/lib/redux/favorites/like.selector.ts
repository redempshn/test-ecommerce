import { RootState } from "../store/store";

export const selectFavoritesProducts = (state: RootState) =>
  state.favorites.favoritesProducts;

export const selectIsLiked = (state: RootState, productId: number) =>
  state.favorites.favoritesIds.includes(productId);

export const selectFavoritesTotalPrice = (state: RootState) =>
  state.favorites.totalPrice;

// export const selectFavoritesTotalPrice = (state: RootState) =>
//   state.favorites.favoritesProducts.reduce(
//     (sum, product) => sum + product.price,
//     0,
//   );
// баг. нужно считать всю сумму. а оно считает только на странице.
