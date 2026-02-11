import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchProducts = createAsyncThunk(
  "search/products",
  async (query: string) => {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${query}&limit=5`,
    );
    const data = await res.json();

    return {
      products: data.products,
      total: data.total,
    };
  },
);
