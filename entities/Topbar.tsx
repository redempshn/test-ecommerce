"use client";

import { IoSearchOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectUser } from "@/shared/lib/redux/auth/auth.selectors";
import { logoutUser } from "@/shared/lib/redux/auth/authThunk";
import { useRouter } from "next/navigation";

export function TopBar() {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const dispatch = useAppDispatch();

  console.log(user);

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();

    router.push("/");
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-card border-b border-b-gray-200 shrink-0">
      <div className="relative w-full max-w-sm">
        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          placeholder="Search..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-muted border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
          aria-label="Search"
        />
      </div>

      <div className="flex items-center gap-4 ml-4">
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Notifications"
        >
          <FaRegBell className="h-5 w-5" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"
            aria-hidden="true"
          />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-foreground leading-tight">
              Admin
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              {/* need add user email if logged in with OAUTH */}
              {user?.email}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors cursor-pointer"
          aria-label="Logout"
        >
          <IoLogOutOutline className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
