"use client";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";

import {
  selectAllCategories,
  selectSelectedCategories,
} from "@/shared/redux/selectors/products.selector";
import {
  deleteCategory,
  toggleCategory,
} from "@/shared/redux/slises/filtersSlice";
import Accordion from "@/shared/ui/Accordion";
import Checkbox from "@/shared/ui/CheckBox";
import { useState } from "react";

const FilterCategory = () => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCategories = useAppSelector(selectSelectedCategories);
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectAllCategories);

  const handleDeleteCategory = () => {
    dispatch(deleteCategory());
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? "w-full" : "border-b border-gray-200"}>
      <Accordion
        isOpen={isOpen}
        showDetails={selectedCategories.length}
        toggleAccordion={toggleAccordion}
        onDelete={handleDeleteCategory}
        title="Category"
      >
        {categories.map(({ category, count }) => {
          const isChecked = selectedCategories.includes(category);

          return (
            <div key={category} className="flex items-center justify-between">
              <Checkbox
                label={category}
                checked={isChecked}
                onChange={() => dispatch(toggleCategory(category))}
              />
              <span className="text-base text-gray-300">{count}</span>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
};

export default FilterCategory;
