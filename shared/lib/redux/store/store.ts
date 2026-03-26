import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../cart/cartSlice";
import productReducer from "../products/productSlice";
// import filtersReducer from "../filters/filtersSlice";
import sortReducer from "../sort/sortSlice";
import authReducer from "../auth/authSlice";
import uiReducer from "../ui/uiSlice";
import searchReducer from "../search/searchSlice";
import adminProductsReducer from "../admin/adminProductSlice";
import categoriesReducer from "../categories/categoriesSlice";
import brandsReducer from "../brands/brandsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    sort: sortReducer,
    auth: authReducer,
    ui: uiReducer,
    search: searchReducer,
    adminProducts: adminProductsReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
