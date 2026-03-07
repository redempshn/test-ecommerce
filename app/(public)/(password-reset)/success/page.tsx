"use client";

import Link from "next/link";
import { TfiEmail } from "react-icons/tfi";

export default function SuccessPage() {
  return (
    <div className="max-w-lg mx-auto mt-5 text-center">
      <div className="flex flex-col justify-center items-center">
        <TfiEmail size={40} className="mb-4" />
        <p className="text-gray-500 text-base mb-5">
          If this email exists, you will receive reset instructions.
        </p>

        <Link
          href="/"
          className="w-20 py-3 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Okey
        </Link>
      </div>
    </div>
  );
}
