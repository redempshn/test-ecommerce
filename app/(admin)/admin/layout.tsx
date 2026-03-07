"use client";

import "../../(public)/globals.css";
import type { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import { LuLayoutDashboard, LuTag } from "react-icons/lu";
import { GoPackage } from "react-icons/go";
import { FiShoppingCart, FiUsers } from "react-icons/fi";
import Link from "next/link";
import { TopBar } from "@/entities/Topbar";

interface AdminMenuItem {
  id: number;
  label: string;
  href: string;
  icon: IconType;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const adminSidebarMenu: AdminMenuItem[] = [
    {
      id: 1,
      label: "Dashboard",
      href: "/admin",
      icon: LuLayoutDashboard,
    },
    {
      id: 2,
      label: "Products",
      href: "/admin/products",
      icon: GoPackage,
    },
    {
      id: 3,
      label: "Orders",
      href: "/admin/orders",
      icon: FiShoppingCart,
    },
    {
      id: 4,
      label: "Categories",
      href: "/admin/categories",
      icon: LuTag,
    },
    {
      id: 5,
      label: "Users",
      href: "/admin/users",
      icon: FiUsers,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="flex flex-col min-h-screen">
        {/* Main Area */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 border-r border-gray-200 flex flex-col ">
            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200">
                <LuLayoutDashboard className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                AdminPanel
              </span>
            </div>

            <nav className="flex flex-col p-4 gap-2">
              {adminSidebarMenu.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={
                      isActive
                        ? "flex items-center gap-2 p-3 rounded bg-blue-500 text-white"
                        : "flex items-center gap-2 p-3 rounded hover:bg-gray-100 transition"
                    }
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 bg-gray-50 overflow-auto">
            {/* TopBar */}
            <TopBar />
            <div className="p-5">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
