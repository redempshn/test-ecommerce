import { Product } from "@/shared/types/product";
import { createAsyncThunk } from "@reduxjs/toolkit";

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, thunkAPI) => {
  try {
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: ProductsResponse = await response.json();
    return data.products;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Network error");
  }
});

export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>("products/fetchProductById", async (productId, thunkAPI) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Network error");
  }
});
