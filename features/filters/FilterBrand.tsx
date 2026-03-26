"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";

import Accordion from "@/shared/ui/Accordion";
import Checkbox from "@/shared/ui/CheckBox";
import { useState } from "react";

const FilterBrand = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.products);

  const handleDeleteBrands = () => {};

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? "w-full" : "border-b border-gray-200"}>
      <Accordion
        isOpen={isOpen}
        showDetails={}
        toggleAccordion={toggleAccordion}
        onDelete={handleDeleteBrands}
        title="Brands"
      >
        {filters.map(({ name, values }) => {
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
