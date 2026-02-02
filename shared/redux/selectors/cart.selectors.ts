import { RootState } from "../store/store";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartUniqueItemsCount = (state: RootState) =>
  state.cart.items.length;

export const selectedCartTotalPrice = (state: RootState): number =>
  state.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

export const selectCartItemByProductId =
  (productId: number) => (state: RootState) =>
    state.cart.items.find((item) => item.product.id === productId);

// тут нужно получать список того, сколько товара в наличии, от этого будет отталкиваться сортировка и внешний вид товара.
// export const AvaibleStatus = (state: RootState) =>
//   state.cart.items.find((item) => );
