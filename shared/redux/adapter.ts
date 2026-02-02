import { createEntityAdapter } from "@reduxjs/toolkit";
import { Product } from "@/shared/types/product";

export const productsAdapter = createEntityAdapter<Product>();
