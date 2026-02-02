import { useDispatch, useSelector } from "react-redux";

import { selectIsPriceRangeChanged } from "@/shared/redux/selectors/filters.selector";
import { useState } from "react";
import {
  resetPriceRange,
  setPriceRange,
} from "@/shared/redux/slises/filtersSlice";
import Accordion from "@/shared/ui/Accordion";
import PriceRangeSlider from "@/shared/ui/PriceRangeSlider";
import {
  selectEffectivePriceRange,
  selectPriceBounds,
} from "@/shared/redux/selectors/products.selector";

const FilterPriceRange = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const priceBounds = useSelector(selectPriceBounds); // полный диапазон
  const currentRange = useSelector(selectEffectivePriceRange); // текущий выбранный
  const isPriceRangeChanged = useSelector(selectIsPriceRangeChanged); // флаг изменения

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleRangeChange = (values: { min: number; max: number }) => {
    dispatch(setPriceRange(values));
  };

  const handleResetPriceRange = () => {
    dispatch(resetPriceRange());
  };

  return (
    <div className={isOpen ? "w-full" : "border-b border-gray-200"}>
      <Accordion
        isOpen={isOpen}
        toggleAccordion={toggleAccordion}
        title="Price Range"
        resetPriceRange={isPriceRangeChanged} // 👈 теперь корректно
        onDelete={handleResetPriceRange}
      >
        <div className="py-4">
          <PriceRangeSlider
            min={priceBounds.min}
            max={priceBounds.max}
            initialMin={currentRange.min}
            initialMax={currentRange.max}
            onChange={handleRangeChange}
            currencyText="$"
            rangeColor="#3b82f6"
            trackColor="#e5e7eb"
          />
        </div>
      </Accordion>
    </div>
  );
};

export default FilterPriceRange;
