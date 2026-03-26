"use client";

import { useFilterParams } from "@/shared/lib/hooks/useFilterParams";
import Checkbox from "@/shared/ui/CheckBox";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface FitlerDropDownProps {
  name: string;
  values: string[];
}

const FilterDropDown = ({ name, values }: FitlerDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { slug } = useParams();
  const slugString = Array.isArray(slug) ? slug[0] : (slug ?? "");

  const { toggleFilter, activeAttributes } = useFilterParams(slugString);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className="relative mt-2">
      <div className="">
        <button
          className="cursor-pointer bg-white hover:bg-gray-200 flex items-center p-2 rounded-2xl"
          onClick={handleClick}
        >
          {name}
          <FaChevronDown
            size={15}
            className={`ml-2 transform ${isOpen ? "rotate-180 transition duration-200" : "rotate-0 transition duration-200"}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          {values.map((value) => {
            const isChecked = activeAttributes.includes(`${name}:${value}`);

            return (
              <Checkbox
                key={value}
                label={value}
                checked={isChecked}
                onChange={() => toggleFilter(name, value)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
