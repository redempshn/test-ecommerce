"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectHasActiveFilters } from "@/shared/lib/redux/filters/filters.selector";
import { resetFilters } from "@/shared/lib/redux/filters/filtersSlice";
import { selectProductsStatus } from "@/shared/lib/redux/products/products.selector";
import { fetchProducts } from "@/shared/lib/redux/products/productThunk";
import { selectSortedProducts } from "@/shared/lib/redux/sort/sort.selector";
import EmptyState from "@/shared/ui/EmptyState";
import ErrorState from "@/shared/ui/Error";
import Skeleton from "@/shared/ui/Skeleton";
import ProductCard from "@/widgets/ui/ProductCard";
import { useEffect } from "react";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectSortedProducts);
  const status = useAppSelector(selectProductsStatus);

  const hasActiveFilters = useAppSelector(selectHasActiveFilters);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "idle" || status === "loading") {
    return <Skeleton />;
  }

  if (status === "failed") {
    return <ErrorState />;
  }

  if (products.length === 0) {
    if (hasActiveFilters) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products match your filters</p>
          <button
            onClick={() => dispatch(resetFilters())}
            className="text-blue-600 underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      );
    }
    return <EmptyState />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <ul className="h-full grid grid-cols-4 gap-4 self-start mb-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
