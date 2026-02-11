"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectedSortBy } from "@/shared/lib/redux/sort/sort.selector";
import { setSortBy, SortType } from "@/shared/lib/redux/sort/sortSlice";
import Button from "@/shared/ui/Button";
import Select from "@/shared/ui/Select";
import { BsFilterLeft } from "react-icons/bs";
import { IoMdOptions } from "react-icons/io";

interface DashboardProps {
  onToggle: () => void;
}

const Dashboard = ({ onToggle }: DashboardProps) => {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(selectedSortBy);

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "ratedBy", label: "Highest Rated" },
    { value: "alphabetAsc", label: "Name: A-Z" },
    { value: "alphabetDesc", label: "Name: Z-A" },
    { value: "priceDesc", label: "Price: High to Low" },
    { value: "priceAsc", label: "Price: Low to High" },
  ];

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value as SortType));
  };

  return (
    <div className="max-w-7xl mx-auto my-4">
      <div className="">{/* блок с подкатегориями или подобным */}</div>

      <div className="flex justify-between items-center">
        <Button
          onClick={onToggle}
          className="flex items-center bg-white hover:border-blue-500 hover:shadow-sm border rounded-lg"
        >
          <IoMdOptions size={20} className="mr-2" />
          <span className="text-base">Filter</span>
        </Button>

        <Select
          label={<BsFilterLeft size={25} />}
          options={sortOptions}
          defaultValue={currentSort}
          onChange={handleSortChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
