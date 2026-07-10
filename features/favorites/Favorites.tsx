"use client";

import { useAppDispatch } from "@/shared/lib/hooks/reduxHooks";
import { openDrawer } from "@/shared/lib/redux/ui/uiSlice";
import { IoIosHeartEmpty } from "react-icons/io";

const Favorites = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <button className="cursor-pointer" onClick={() => dispatch(openDrawer())}>
        <IoIosHeartEmpty size={24} className="hover:fill-blue-500 transition" />
      </button>
    </>
  );
};

export default Favorites;
