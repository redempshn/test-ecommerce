"use client";

import Dashboard from "@/entities/Dashboard";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectAllProducts } from "@/shared/lib/redux/products/products.selector";
import {
  fetchProductFilters,
  fetchProducts,
} from "@/shared/lib/redux/products/productThunk";
import ErrorState from "@/shared/ui/Error";
import Skeleton from "@/shared/ui/Skeleton";
import ProductCard from "@/widgets/ui/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AllProducts = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const products = useAppSelector(selectAllProducts);
  const searchParams = useSearchParams();

  const { status, error, pagination } = useAppSelector(
    (state) => state.products,
  );

  const sort = searchParams.get("sort") || undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "15");

  useEffect(() => {
    dispatch(fetchProducts({ sort, page, limit }));
  }, [dispatch, page, limit, sort]);

  if (status === "idle" || status === "loading") {
    return <Skeleton />;
  }

  if (error) {
    return <ErrorState />;
  }

  const updatePublicParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") {
      params.set("page", "1");
    }

    router.push(`/products?${params.toString()}`);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No products match your filters</p>
        <button
          // onClick={() => dispatch(resetFilters())}
          className="text-blue-600 underline cursor-pointer"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mb-5">
      <Dashboard updatePublicParams={updatePublicParams} sort={sort} />

      <ul className="h-full grid grid-cols-5 gap-4 self-start mb-5">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </ul>

      {pagination && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-slate-700">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} results
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => updatePublicParams("page", (page - 1).toString())}
              disabled={page === 1}
              className="px-4 py-2 border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft />
            </button>

            <div className="flex items-center gap-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => updatePublicParams("page", pageNum.toString())}
                  className={`cursor-pointer px-4 py-2 border rounded-lg ${
                    pageNum === page
                      ? "bg-blue-500 text-white"
                      : "hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => updatePublicParams("page", (page + 1).toString())}
              disabled={page === pagination.totalPages}
              className="px-4 py-2 border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
