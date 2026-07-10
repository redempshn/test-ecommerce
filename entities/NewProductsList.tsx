"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { fetchNewProducts } from "@/shared/lib/redux/products/productThunk";
import ProductCard from "@/widgets/ui/ProductCard";
import { useEffect } from "react";

const NewProductsList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.newProducts);
  const newProductsStatus = useAppSelector(
    (state) => state.products.newProductsStatus,
  );

  useEffect(() => {
    if (newProductsStatus === "idle") {
      dispatch(fetchNewProducts({ limit: 5 }));
    }
  }, [dispatch, newProductsStatus]);

  return (
    <div className="border border-gray-200 rounded bg-white p-3 mt-4">
      <p className="text-xl text-black mb-5">New products:</p>
      <ul className="h-full grid grid-cols-5 gap-4 self-start mb-5">
        {products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default NewProductsList;
