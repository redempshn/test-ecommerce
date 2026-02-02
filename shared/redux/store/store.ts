import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slises/cartSlice";
import productReducer from "../slises/productSlice";
import filtersReducer from "../slises/filtersSlice";
import sortReducer from "../slises/sortSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    filters: filtersReducer,
    sort: sortReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
