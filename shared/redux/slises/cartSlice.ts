import { Product } from "@/shared/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  product: Product;
  quantity: number;
};

interface CartProps {
  items: CartItem[];
}

const initialState: CartProps = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      // payload is single product
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      //remove by product id
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    decrementItem(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.product.id === action.payload);

      if (!item) return;

      if (item.quantity === 1) {
        state.items = state.items.filter(
          (i) => i.product.id !== action.payload
        );
      } else {
        item.quantity -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, decrementItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
