"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import {
  selectFavoritesProducts,
  selectFavoritesTotalPrice,
} from "@/shared/lib/redux/favorites/like.selector";
import { fetchLikedProduct } from "@/shared/lib/redux/favorites/likeThunk";
import ErrorState from "@/shared/ui/Error";
import Skeleton from "@/shared/ui/Skeleton";
import ProductCard from "@/widgets/ui/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Favorites() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const likedProducts = useAppSelector(selectFavoritesProducts);
  const searchParams = useSearchParams();

  const totalPrice = useAppSelector(selectFavoritesTotalPrice);

  const { status, error, pagination } = useAppSelector(
    (state) => state.favorites,
  );

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  useEffect(() => {
    dispatch(fetchLikedProduct({ page, limit }));
  }, [dispatch, page, limit]);

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

    router.push(`/account/favorites?${params.toString()}`);
  };

  if (likedProducts.length === 0) {
    return (
      <div className="text-center">
        <p className="text-base">There is no liked product.</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <ul className="grid grid-cols-4 gap-4 self-start mb-5">
        {likedProducts.map((product) => (
          <ProductCard key={product.id} product={product} showRemove={true} />
        ))}
      </ul>

      <div className="flex items-center">
        <div className="text-base mr-4">
          total price:{" "}
          <span className="text-lg font-medium text-red-500">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <button className="cursor-pointer px-4 py-2 bg-gray-200 text-black rounded hover:bg-blue-500 hover:text-white transition">
          Add all to cart
        </button>
      </div>

      {pagination && (
        <div className="mt-6 flex items-center justify-between mb-5">
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
}
