"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectAllCategories } from "@/shared/lib/redux/categories/categoriesSlice";
import { fetchCategories } from "@/shared/lib/redux/categories/categoriesThunk";
import Link from "next/link";
import { useEffect } from "react";

interface DropdownMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const DropdownMenu = ({
  onMouseEnter,
  onMouseLeave,
  isOpen,
}: DropdownMenuProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAllCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute top-full left-0 w-fit bg-white border border-gray-200 shadow-md transition-all duration-200 ease-out z-50
    ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
  `}
    >
      <ul className="flex flex-col">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/products/category/${category.slug}`}
              className="block w-full text-base whitespace-nowrap px-4 py-2 hover:text-blue-500 hover:bg-gray-100 transition"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
