import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { selectActiveFilters } from "@/shared/redux/selectors/filters.selector";
import {
  resetFilters,
  resetPriceRange,
  toggleBrand,
  toggleCategory,
} from "@/shared/redux/slises/filtersSlice";
import { IoClose } from "react-icons/io5";

const Activefilters = () => {
  const dispatch = useAppDispatch();
  const activeFilters = useAppSelector(selectActiveFilters);

  const handleClearSelectedFilters = () => {
    dispatch(resetFilters());
  };

  // Удаление конкретного фильтра
  const handleRemoveFilter = (filter: (typeof activeFilters)[0]) => {
    switch (filter.type) {
      case "category":
        dispatch(toggleCategory(filter.value));
        break;
      case "brand":
        dispatch(toggleBrand(filter.value));
        break;
      case "price":
        dispatch(resetPriceRange());
        break;
    }
  };

  return (
    <div className="w-full border-b border-gray-200 flex flex-col px-4 pt-4">
      <div className="flex justify-between items-center mb-4">
        <p className="">You choose</p>
        <button
          onClick={handleClearSelectedFilters}
          className="underline text-base text-gray-500 mr-3 cursor-pointer"
        >
          clear all
        </button>
      </div>
      <div className="flex items-center flex-wrap">
        {activeFilters.map((filter) => (
          <div
            key={filter.id}
            className="px-3 py-1 border border-gray-300 rounded-2xl flex items-center mr-2 mb-2"
          >
            <span className="text-md text-gray-500">{filter.label}</span>
            <button
              onClick={() => handleRemoveFilter(filter)}
              className="underline text-base text-gray-500 ml-1 cursor-pointer"
            >
              <IoClose size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activefilters;
