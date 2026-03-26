"use client";

import FilterDropDown from "@/entities/FilterDropDown";
import Activefilters from "@/features/filters/ActiveFilters";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { useFilterParams } from "@/shared/lib/hooks/useFilterParams";
import { selectAllbrands } from "@/shared/lib/redux/brands/brandsSlice";
import { fetchBrands } from "@/shared/lib/redux/brands/brandsThunk";
import { selectProductsByCategorySlug } from "@/shared/lib/redux/products/products.selector";
import {
  fetchProductFilters,
  fetchProducts,
} from "@/shared/lib/redux/products/productThunk";
import ErrorState from "@/shared/ui/Error";
import Skeleton from "@/shared/ui/Skeleton";
import ProductCard from "@/widgets/ui/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ProductProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: ProductProps) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { status, error, pagination, filters } = useAppSelector(
    (state) => state.products,
  );

  const { activeAttributes } = useFilterParams(slug);

  const brands = useAppSelector(selectAllbrands);

  const sort = searchParams.get("sort") || undefined;
  const attributes = searchParams.getAll("attributes") || undefined;
  const attributesKey = attributes.join(",");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  const products = useAppSelector((state) =>
    selectProductsByCategorySlug(state, slug),
  );

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchProducts({ slug, sort, attributes, page, limit }));
    dispatch(fetchProductFilters({ slug }));
  }, [dispatch, slug, sort, attributesKey, page, limit]);

  const updateCategoryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") {
      params.set("page", "1");
    }

    router.push(`/products/category/${slug}?${params.toString()}`);
  };

  if (status === "idle" || status === "loading" || !products) {
    return <Skeleton />;
  }

  if (status === "failed") {
    return <ErrorState />;
  }

  return (
    <>
      <div className="bg-[#f6f8fd] w-full h-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between py-4">
            <div className="flex gap-2">
              {filters.map((filter) => (
                <FilterDropDown
                  key={filter.name}
                  name={filter.name}
                  values={filter.values}
                />
              ))}
            </div>

            <select
              value={sort || ""}
              onChange={(e) => updateCategoryParams("sort", e.target.value)}
              className="px-4 py-2 border border-gray-200 bg-white rounded-lg cursor-pointer transition"
            >
              <option value="name_asc">Name: A-Z</option>
              <option value="name_desc">Name: Z-A</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {activeAttributes.length > 0 && <Activefilters />}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-5">
        <ul className="h-full grid grid-cols-5 gap-4 self-start mb-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>

        {pagination && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-slate-700">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} results
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  updateCategoryParams("page", (page - 1).toString())
                }
                disabled={page === 1}
                className="py-1 px-2 border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    onClick={() =>
                      updateCategoryParams("page", pageNum.toString())
                    }
                    className={`cursor-pointer py-1 px-3 border rounded-lg ${
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
                onClick={() =>
                  updateCategoryParams("page", (page + 1).toString())
                }
                disabled={page === pagination.totalPages}
                className="py-1 px-2 border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
