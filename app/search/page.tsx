"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectSearchedProducts } from "@/shared/lib/redux/search/search.selector";
import {
  setDebouncedQuery,
  setSearchQuery,
} from "@/shared/lib/redux/search/searchSlice";
import ProductCard from "@/widgets/ui/ProductCard";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const dispatch = useAppDispatch();
  const resolvedParams = use(searchParams);
  const initialQuery = resolvedParams.q || "";
  const results = useAppSelector(selectSearchedProducts);
  const router = useRouter();

  const [localQuery, setLocalQuery] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(localQuery)}`);
  };

  useEffect(() => {
    dispatch(setSearchQuery(initialQuery));
    dispatch(setDebouncedQuery(initialQuery));
  }, [initialQuery, dispatch]);

  return (
    <div className="max-w-7xl mx-auto mt-4">
      <div className="flex flex-col mb-5">
        {initialQuery === "" ? (
          <span className="text-base text-black mb-2">
            There is no parameters for searching. Try to type below.
          </span>
        ) : (
          <span className="text-base text-black mb-2">
            Search - {initialQuery}
          </span>
        )}

        <form onSubmit={handleSearch} className="w-full flex items-center">
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search"
            className="mr-5 flex-1 outline-none py-2 px-2 border border-gray-200 rounded-2xl text-base text-gray-500 placeholder:text-sm"
          />
          <button
            type="submit"
            className="text-white rounded-2xl transition py-2 px-4 bg-blue-500 hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mb-5">
        <ul className="h-full grid grid-cols-4 gap-4 self-start">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>

        {results.length === 0 && (
          <div className="w-full">
            <p className="text-center text-gray-500">
              There are no products matching the search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
