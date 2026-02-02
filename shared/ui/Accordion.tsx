"use client";

import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";

interface AccordionProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  toggleAccordion: () => void;
  showDetails?: number;
  onDelete?: () => void;
  resetPriceRange?: boolean;
}

const Accordion = ({
  isOpen,
  toggleAccordion,
  children,
  title,
  showDetails = 0,
  onDelete,
  resetPriceRange,
}: AccordionProps) => {
  return (
    <>
      <div
        className="flex justify-between items-center w-full p-4 text-left focus:outline-none bg-white transition duration-150 ease-in-out relative"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-800">{title}</span>

        {showDetails > 0 && onDelete && (
          <div className="absolute top-1/2 right-0  -translate-y-1/2 -translate-x-15 flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="underline text-base text-gray-500 mr-3 cursor-pointer"
            >
              delete
            </button>

            <div className=" bg-blue-500 text-white rounded-full h-5 w-5 text-center text-sm">
              <p>{showDetails}</p>
            </div>
          </div>
        )}

        {resetPriceRange && onDelete && (
          <div className="absolute top-1/2 right-0  -translate-y-1/2 -translate-x-15 flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="underline text-base text-gray-500 mr-3 cursor-pointer"
            >
              reset
            </button>
          </div>
        )}

        {isOpen ? (
          <FaChevronDown className="w-5 h-5 text-gray-600" />
        ) : (
          <FaChevronUp className="w-5 h-5 text-gray-600" />
        )}
      </div>
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="overflow-hidden p-4 bg-white text-gray-600">
          {children}
        </div>
      </div>
    </>
  );
};

export default Accordion;
