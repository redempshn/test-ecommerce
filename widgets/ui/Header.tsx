"use client";

import Badge from "@/shared/ui/Badge";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { selectCartUniqueItemsCount } from "@/shared/redux/selectors/cart.selectors";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const totalUniqueItems = useAppSelector(selectCartUniqueItemsCount);

  return (
    <header className="w-full p-4 mb-4 border-b-gray-300  bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <li
          className="text-xl text-muted-foreground list-none"
          onClick={() => router.push("/")}
        >
          Product list
        </li>
        <li
          className="text-xl text-muted-foreground list-none relative"
          onClick={() => router.push("/cart")}
        >
          Shopping cart
          {totalUniqueItems > 0 && (
            <Badge totalUniqueItems={totalUniqueItems} />
          )}
        </li>
      </nav>
    </header>
  );
};

export default Header;
