"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectProductsStatus } from "@/shared/lib/redux/products/products.selector";
import { fetchProducts } from "@/shared/lib/redux/products/productThunk";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectProductsStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center h-96">
      <div className="flex flex-col text-center">
        <h1 className="text-2xl uppercase">Our home page</h1>
        <p className="text-sm text-gray-600 uppercase">
          place where you can find what you looking for!
        </p>
      </div>
    </div>
  );
}

// const dispatch = useAppDispatch();

// useEffect(() => {
//   dispatch(restoreSession());
// }, []);
