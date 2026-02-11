"use client";

import Activefilters from "@/features/filters/ActiveFilters";
import FilterBrand from "@/features/filters/FilterBrand";
import FilterCategory from "@/features/filters/FilterCategory";
import FilterPriceRange from "@/features/filters/FilterPriceRange";
import { useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectHasActiveFilters } from "@/shared/lib/redux/filters/filters.selector";
import Button from "@/shared/ui/Button";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface DrawerProps {
  onToggle: () => void;
  currentStatus: boolean;
}
const Drawer = ({ onToggle, currentStatus }: DrawerProps) => {
  const hasActiveFilters = useAppSelector(selectHasActiveFilters);

  useEffect(() => {
    document.body.style.overflow = currentStatus ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [currentStatus]);

  return (
    <>
      {currentStatus && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
          onClick={onToggle}
        />
      )}
      <div
        className={
          currentStatus
            ? "max-w-sm max-h-screen bg-white flex flex-col absolute inset-0 z-100 border-r border-r-gray-200"
            : "hidden"
        }
      >
        <div className="flex justify-between items-center p-4 border-b-gray-300 shadow-sm mb-1">
          <p className="text-2xl font-bold">Filters</p>
          <IoClose size={30} onClick={onToggle} />
        </div>

        <div className="flex flex-col grow relative">
          {hasActiveFilters && <Activefilters />}

          <FilterCategory />
          <FilterBrand />
          <FilterPriceRange />
        </div>

        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={onToggle}
            label="Accept filters"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          />
        </div>
      </div>
    </>
  );
};

export default Drawer;
