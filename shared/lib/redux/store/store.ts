import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../cart/cartSlice";
import productReducer from "../products/productSlice";
import filtersReducer from "../filters/filtersSlice";
import sortReducer from "../sort/sortSlice";
import authReducer from "../auth/authSlice";
import uiReducer from "../ui/uiSlice";
import searchReducer from "../search/searchSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    filters: filtersReducer,
    sort: sortReducer,
    auth: authReducer,
    ui: uiReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
