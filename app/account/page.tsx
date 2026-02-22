"use client";

import { useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectUser } from "@/shared/lib/redux/auth/auth.selectors";

export default function UserAccount() {
  const user = useAppSelector(selectUser);

  return (
    <div className="w-full mx-auto flex flex-col">
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl">Personal information</h3>
          <button className="text-sm text-black cursor-pointer hover:underline">
            edit
          </button>
        </div>
        <div className="border border-gray-100 p-4 rounded-2xl">
          <ul className="grid grid-cols-3 grid-rows-2 gap-4">
            <li className="flex flex-col">
              <span className="text-sm text-gray-400">Your name</span>
              <span className="text-base text-black">{user?.name}</span>
            </li>
            <li className="flex flex-col">
              <span className="text-sm text-gray-400">Your second name</span>
              <span className="text-base text-black">-</span>
            </li>
            <li className="flex flex-col">
              <span className="text-sm text-gray-400">Your email</span>
              <span className="text-base text-black">{user?.email}</span>
            </li>
            <li className="flex flex-col">
              <span className="text-sm text-gray-400">Your phone number</span>
              <span className="text-base text-black">-</span>
            </li>
            <li className="flex flex-col">
              <span className="text-sm text-gray-400">Your birth date</span>
              <span className="text-base text-black">-</span>
            </li>
            <li className="flex flex-col">
              <span className="text-sm text-gray-400">Your sex</span>
              <span className="text-base text-black">-</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl">Email and password</h3>
          <button className="text-sm text-black cursor-pointer hover:underline">
            edit
          </button>
        </div>
        <div className="border border-gray-100 p-4 rounded-2xl">
          <ul className="grid grid-cols-2 grid-rows-1 gap-4">
            <li className="flex flex-col">
              <span className="text-sm text-gray-400">Your email (log in)</span>
              <span className="text-base text-black">{user?.email}</span>
            </li>
            <li className="flex flex-col">
              <span className="text-sm text-gray-400">Your password</span>
              <span className="text-base text-black">***********</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
