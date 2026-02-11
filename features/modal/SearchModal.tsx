"use client";

import { useDebounce } from "@/shared/lib/hooks/useDebunce";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import {
  selectLimitedSearchResults,
  selectSearchQuery,
  selectSearchResultsCount,
} from "@/shared/lib/redux/search/search.selector";
import {
  clearSearchQuery,
  setDebouncedQuery,
  setSearchQuery,
} from "@/shared/lib/redux/search/searchSlice";
import { closeSearchModal } from "@/shared/lib/redux/ui/uiSlice";
import Modal from "@/shared/ui/Modal";
import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

const SearchModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isSearchModalOpen);

  const handleClose = (clearQuery = true) => {
    dispatch(closeSearchModal());
    if (clearQuery) {
      dispatch(clearSearchQuery());
    }
  };

  const query = useAppSelector(selectSearchQuery);
  const results = useAppSelector(selectLimitedSearchResults);
  const total = useAppSelector(selectSearchResultsCount);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    dispatch(setDebouncedQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <CiSearch size={24} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
            autoFocus
            className="flex-1 outline-none text-base text-gray-500 placeholder:text-sm"
          />
          <button
            onClick={() => handleClose(false)}
            className="p-1 cursor-pointer"
          >
            <IoClose
              size={24}
              className="text-gray-400 transition hover:text-black"
            />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-4">
          {query === "" && (
            <p className="text-center text-gray-500">
              Start typing to search...
            </p>
          )}

          {query !== "" && total === 0 && debouncedQuery !== query && (
            <p className="text-center text-gray-500">Searching...</p>
          )}

          {query !== "" && total === 0 && (
            <p className="text-center text-gray-500">
              There are no products matching the search criteria.
            </p>
          )}

          {query !== "" && total > 0 && (
            <div className="flex flex-col mb-4">
              {results.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  onClick={() => {
                    dispatch(closeSearchModal());
                    dispatch(clearSearchQuery());
                  }}
                  className="flex items-center justify-between bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                >
                  <div className="flex items-center">
                    <div className="relative w-16 h-16 shrink-0 mr-4">
                      <Image
                        src={product.images[0]}
                        alt={`${product.title} image`}
                        className="object-contain"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <p className="text-base font-medium truncate">
                      {product.title}
                    </p>
                  </div>
                  <p className="mr-4">${product.price}</p>
                </Link>
              ))}
            </div>
          )}

          {total > 0 && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={() => dispatch(closeSearchModal())}
              className="text-gray-500 hover:text-blue-500 transition"
            >
              View all results ({total})
            </Link>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;
