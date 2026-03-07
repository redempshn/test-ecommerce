import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoPackage } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { LuTag } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};
type SidebarProps = {
  activePage: string;
  onNavigate: (page: string) => void;
};
const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LuLayoutDashboard className="h-5 w-5" />,
  },
  {
    id: "products",
    label: "Products",
    icon: <GoPackage className="h-5 w-5" />,
  },
  {
    id: "orders",
    label: "Orders",
    icon: <FiShoppingCart className="h-5 w-5" />,
  },
  {
    id: "categories",
    label: "Categories",
    icon: <LuTag className="h-5 w-5" />,
  },
  {
    id: "users",
    label: "Users",
    icon: <FiUsers className="h-5 w-5" />,
  },
];
// { activePage, onNavigate }: SidebarProps
export function Sidebar() {
  return (
    <aside className="flex flex-col w-64 min-h-screen bg-primary text-primary-foreground shrink-0">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-primary-foreground/10">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary-foreground/15">
          <LuLayoutDashboard className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight">AdminPanel</span>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 px-3 py-4 space-y-1"
        aria-label="Sidebar navigation"
      >
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left ${isActive ? "bg-primary-foreground/15 text-primary-foreground" : "text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground"}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={
                  isActive
                    ? "text-primary-foreground"
                    : "text-primary-foreground/60"
                }
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-primary-foreground/10">
        <p className="text-xs text-primary-foreground/40">v1.0.0</p>
      </div>
    </aside>
  );
}
