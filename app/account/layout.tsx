"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import { IoMdPerson } from "react-icons/io";
import { MdShoppingCart } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { TbBoxOff } from "react-icons/tb";
import { IoMdEye } from "react-icons/io";
import { FaGripfire } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { logoutUser } from "@/shared/lib/redux/auth/authThunk";
import { selectUser } from "@/shared/lib/redux/auth/auth.selectors";

interface AccountMenuItem {
  id: number;
  label: string;
  href: string;
  icon: IconType;
}

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const router = useRouter();

  const accountSidebarMenu: AccountMenuItem[] = [
    {
      id: 1,
      label: "Personal Information",
      href: "/account",
      icon: IoMdPerson,
    },
    {
      id: 2,
      label: "My orders",
      href: "/account/orders",
      icon: MdShoppingCart,
    },
    {
      id: 3,
      label: "Favorites",
      href: "/account/favorites",
      icon: FaHeart,
    },
    {
      id: 4,
      label: "Returns",
      href: "/account/returns",
      icon: TbBoxOff,
    },
    {
      id: 5,
      label: "Viewed products",
      href: "/account/viewed",
      icon: IoMdEye,
    },
    {
      id: 6,
      label: "My bonus",
      href: "/account/bonus",
      icon: FaGripfire,
    },
  ];

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();

    router.push("/signin");
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-row mt-5">
        <div className="flex flex-col basis-1/4">
          <div className="flex flex-col bg-gray-100 p-3 mb-2 rounded-2xl">
            <span className="text-xl mb-2">{user?.name}</span>
            <span className="text-sm text-gray-400">{user?.email}</span>
          </div>

          {accountSidebarMenu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={
                  isActive
                    ? "flex items-center transition text-white bg-blue-400 hover:text-black p-3 hover:bg-gray-100 rounded"
                    : "flex items-center transition text-black hover:text-blue-400 p-3 hover:bg-gray-100 rounded"
                }
              >
                <Icon size={21} />
                <span className="text-base ml-2">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex items-center p-3 transition text-black hover:text-blue-400 hover:bg-gray-100 cursor-pointer"
          >
            <RiLogoutBoxRLine size={21} />
            <span className="text-base ml-2">Log out</span>
          </button>
        </div>

        <div className="border border-gray-100 mx-4"></div>

        {children}
      </div>
    </div>
  );
};

export default AccountLayout;
