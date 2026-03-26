"use client";

import { useFilterParams } from "@/shared/lib/hooks/useFilterParams";
import { useParams } from "next/navigation";
import { IoClose } from "react-icons/io5";

const Activefilters = () => {
  const { slug } = useParams();
  const slugString = Array.isArray(slug) ? slug[0] : (slug ?? "");

  const { toggleFilter, activeAttributes } = useFilterParams(slugString);

  return (
    <div className="w-full border-t border-b border-gray-200 flex items-center py-4">
      <p className="">You choose:</p>

      <div className="flex items-center flex-wrap px-4">
        {activeAttributes.map((attr) => {
          const split = attr.split(":");

          const name = split[0];
          const value = split[1];

          return (
            <div
              key={attr}
              className="py-1 px-2 bg-gray-200 rounded-2xl flex items-center border border-gray-200 hover:border hover:border-gray-300"
            >
              <span className="text-md">{value}</span>
              <button
                onClick={() => toggleFilter(name, value)}
                className="underline text-base ml-1 cursor-pointer"
              >
                <IoClose size={20} />
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {}}
        className="underline text-base mr-5 cursor-pointer"
      >
        clear all
      </button>
    </div>
  );
};

export default Activefilters;
