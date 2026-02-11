"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import {
  deleteBrands,
  toggleBrand,
} from "@/shared/lib/redux/filters/filtersSlice";
import {
  selectAllBrands,
  selectSelectedBrands,
} from "@/shared/lib/redux/products/products.selector";
import Accordion from "@/shared/ui/Accordion";
import Checkbox from "@/shared/ui/CheckBox";
import { useState } from "react";

const FilterBrand = () => {
  const [isOpen, setIsOpen] = useState(false);

  const brands = useAppSelector(selectAllBrands);
  const selectedBrands = useAppSelector(selectSelectedBrands);
  const dispatch = useAppDispatch();

  const handleDeleteBrands = () => {
    dispatch(deleteBrands());
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? "w-full" : "border-b border-gray-200"}>
      <Accordion
        isOpen={isOpen}
        showDetails={selectedBrands.length}
        toggleAccordion={toggleAccordion}
        onDelete={handleDeleteBrands}
        title="Brands"
      >
        {brands.map(({ brand, count }) => {
          const isChecked = selectedBrands.includes(brand);

          return (
            <div key={brand} className="flex items-center justify-between">
              <Checkbox
                label={brand}
                checked={isChecked}
                onChange={() => dispatch(toggleBrand(brand))}
              />
              <span className="text-base text-gray-300">{count}</span>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
};

export default FilterBrand;
