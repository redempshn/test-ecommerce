"use client";

import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  return (
    <a
      href="/api/auth/oauth/google"
      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
    >
      <FcGoogle size={22} />
      <span className="font-medium text-gray-700">Sign up with Google</span>
    </a>
  );
}
