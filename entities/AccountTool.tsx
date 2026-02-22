import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import {
  selectIsAuthenticated,
  selectUser,
} from "@/shared/lib/redux/auth/auth.selectors";
import { logoutUser } from "@/shared/lib/redux/auth/authThunk";
import { openLoginModal } from "@/shared/lib/redux/ui/uiSlice";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { VscAccount } from "react-icons/vsc";

const AccountTool = () => {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log(user);
  console.log(isAuthenticated);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    if (isAuthenticated) {
      setIsOpen(!isOpen);
    }

    if (!isAuthenticated) {
      dispatch(openLoginModal());
    }
  };

  return (
    <div ref={dropdownRef} className="relative mt-2">
      {/* Кнопка */}
      <button className="cursor-pointer" onClick={handleClick}>
        <VscAccount
          size={21}
          className={`transition ${isOpen ? "fill-blue-500" : "hover:fill-blue-500"}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && isAuthenticated && user && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          {/* Account */}
          <Link
            href="/account"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <VscAccount size={16} className="text-gray-500" />
            <span>Account</span>
          </Link>

          {/* Order History */}
          <Link
            href="/orders"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {/* иконка заказов */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>Order History</span>
          </Link>

          {/* Divider */}
          <div className="h-px bg-gray-100 mx-3" />

          {/* Logout */}
          <button
            onClick={() => {
              setIsOpen(false);
              dispatch(logoutUser());
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            {/* иконка выхода */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountTool;
