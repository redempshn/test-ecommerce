"use client";

import { PiBagLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectCartUniqueItemsCount } from "@/shared/lib/redux/cart/cart.selectors";
import Badge from "@/shared/ui/Badge";
import Search from "./Search";
import AccountTool from "./AccountTool";

const HeaderTools = () => {
  const router = useRouter();
  const totalUniqueItems = useAppSelector(selectCartUniqueItemsCount);

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Search in whole site */}
      <Search />

      {/* user profile */}
      <AccountTool />

      {/* Cart */}
      <div
        className="text-xl text-muted-foreground list-none relative cursor-pointer"
        onClick={() => router.push("/cart")}
      >
        <PiBagLight size={25} className="hover:fill-blue-500 transition" />
        {totalUniqueItems > 0 && <Badge totalUniqueItems={totalUniqueItems} />}
      </div>
    </div>
  );
};

export default HeaderTools;
