"use client";

import Activefilters from "@/entities/ActiveFilters";
import FilterBrand from "@/entities/FilterBrand";
import FilterCategory from "@/entities/FilterCategory";
import FilterPriceRange from "@/entities/FilterPriceRange";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { selectHasActiveFilters } from "@/shared/redux/selectors/filters.selector";
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
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onToggle} />
      )}
      <div
        className={
          currentStatus
            ? "max-w-sm max-h-screen bg-white flex flex-col absolute inset-0 z-100"
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
            onClick={() => {}}
            label="Accept filters"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          />
        </div>
      </div>
    </>
  );
};

export default Drawer;
