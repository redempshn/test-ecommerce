"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { closeDrawer, toggleDrawer } from "@/shared/lib/redux/ui/uiSlice";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface DrawerProps {
  title?: string;
  children?: React.ReactNode;
}

const Drawer = ({ title, children }: DrawerProps) => {
  const isOpen = useAppSelector((state) => state.ui.isOpenDrawer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
          onClick={() => dispatch(toggleDrawer())}
        />
      )}
      <div
        className={
          isOpen
            ? "max-w-150 max-h-screen bg-white flex flex-col absolute top-0 right-0 bottom-0 z-100 border-l border-l-gray-200"
            : "hidden"
        }
      >
        <div className="flex justify-between items-center p-4 border-b-gray-300 shadow-sm mb-1">
          <p className="text-2xl font-bold">{title}</p>
          <button
            onClick={() => dispatch(closeDrawer())}
            className="cursor-pointer"
          >
            <IoClose size={30} />
          </button>
        </div>

        <div className="h-full min-h-0">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
