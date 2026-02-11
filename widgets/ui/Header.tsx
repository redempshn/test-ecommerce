"use client";

import HeaderTools from "@/entities/HeaderTools";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header className="w-full p-4 border-b border-b-gray-200 bg-white ">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex">
          <li
            className="text-xl text-muted-foreground list-none cursor-pointer mr-6"
            onClick={() => router.push("/")}
          >
            Home
          </li>
          <li
            className="text-xl text-muted-foreground list-none cursor-pointer"
            onClick={() => router.push("/products")}
          >
            Products
          </li>
        </div>

        <HeaderTools />
      </nav>
    </header>
  );
};

export default Header;
