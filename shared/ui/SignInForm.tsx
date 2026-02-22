"use client";

import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Divider from "./Divider";
import { useForm } from "react-hook-form";
import { LoginPayload, loginUser } from "../lib/redux/auth/authThunk";
import { useAppDispatch } from "../lib/hooks/reduxHooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { closeLoginModal } from "../lib/redux/ui/uiSlice";
import { toast } from "sonner";

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>();

  const onSubmit = (data: LoginPayload) => {
    try {
      setServerError(null);
      const result = dispatch(loginUser(data)).unwrap();

      console.log("Login success:", result);
      dispatch(closeLoginModal());
      router.push("/");
      toast.success("You successfully signed in, Welcome!");
    } catch (error) {
      console.error("Login failed:", error);
      setServerError(error as string);
    }
  };

  return (
    <div className="flex flex-col relative">
      <div className="w-full flex justify-center mb-6 border-b border-b-gray-200 p-4">
        <h2 className="text-lg">Log in</h2>
      </div>
      <div className="w-full px-5">
        <div className="flex gap-5">
          {/* Google */}
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <FcGoogle size={22} />
            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>

          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
            <FaFacebook size={22} />
            <span className="font-medium">Continue with Facebook</span>
          </button>
        </div>
      </div>

      <Divider />

      <div className="px-4 mb-4">
        <form className="flex flex-col mb-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Общая ошибка от сервера */}
          {serverError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Loggin in..." : "Log in"}
          </button>
        </form>

        <div className="flex flex-col mb-4">
          <p className="text-sm text-gray-600 text-center mb-4">
            Forgot{" "}
            <Link
              href={"/"}
              className="text-blue-400 hover:text-blue-500 transition"
            >
              Password
            </Link>
            ?
          </p>

          <p className="text-sm text-gray-600 text-center">
            Don&apos;t have an account?{" "}
            <Link
              href={"/signup"}
              onClick={() => dispatch(closeLoginModal())}
              className="text-blue-400 hover:text-blue-500 transition"
            >
              Sign up
            </Link>
          </p>
        </div>

        <p className="text-sm text-gray-600 text-center">
          By continuing, you confirm that you agree to{" "}
          <Link
            href={"/"}
            className="text-blue-400 hover:text-blue-500 transition"
          >
            the privacy policy.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
