"use client";

import { FaChevronDown } from "react-icons/fa";
import DropdownMenu from "@/entities/DropdownMenu";
import HeaderTools from "@/entities/HeaderTools";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Overlay from "@/entities/Overlay";

const Header = () => {
  const router = useRouter();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownVisible(true);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => {
      setDropdownVisible(false);
    }, 200);
  };

  const forceClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownVisible(false);
  };

  return (
    <>
      <header className="w-full border-b border-gray-200 bg-white relative z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <ul className="flex">
            <li
              className="text-xl text-muted-foreground cursor-pointer mr-6 pr-4 py-4 hover:text-blue-500 transition"
              onClick={() => router.push("/")}
            >
              Home
            </li>

            <li className="text-xl text-muted-foreground p-4">
              <div
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <button
                  className="cursor-pointer flex items-center hover:text-blue-500 transition"
                  onClick={() => router.push("/products")}
                >
                  Catalog
                  <FaChevronDown
                    size={15}
                    className={`ml-2 transform ${isDropdownVisible ? "rotate-180 transition duration-200" : "rotate-0 transition duration-200"}`}
                  />
                </button>

                <DropdownMenu
                  isOpen={isDropdownVisible}
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                />
              </div>
            </li>
          </ul>

          <HeaderTools />
        </nav>
      </header>

      <Overlay visible={isDropdownVisible} onClick={forceClose} />
    </>
  );
};

export default Header;
