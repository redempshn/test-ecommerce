"use client";

import { useAppDispatch } from "@/shared/lib/hooks/reduxHooks";
import {
  RegisterPayload,
  registerUser,
} from "@/shared/lib/redux/auth/authThunk";
import Divider from "@/shared/ui/Divider";
import GuestRoute from "@/shared/ui/GuestRoute";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: RegisterPayload) => {
    try {
      await dispatch(registerUser(data)).unwrap();

      router.push("/signin");
    } catch (error) {
      console.error("sign up failed:", error);
    }
  };

  return (
    <GuestRoute>
      <div className="w-full max-w-xl mx-auto">
        <div className="border border-gray-200 rounded-2xl shadow-2xl mt-10">
          <div className="w-full flex itens-center justify-center mb-6 border-b border-b-gray-200 p-4">
            <h2 className="text-lg">Sign up</h2>
          </div>

          <div className="w-full px-5">
            <div className="flex gap-5">
              {/* Google */}
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                <FcGoogle size={22} />
                <span className="font-medium text-gray-700">
                  Sign up with Google
                </span>
              </button>

              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
                <FaFacebook size={22} />
                <span className="font-medium">Sign up with Facebook</span>
              </button>
            </div>

            <Divider />

            <div className="px-4 mb-4">
              <form
                className="flex flex-col mb-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Общая ошибка от сервера
                {serverError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{serverError}</p>
                  </div>
                )} */}

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
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Name must contain only letters",
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
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
                  {isSubmitting ? "Signing up..." : "Sign up"}
                </button>
              </form>

              <div className="flex flex-col mb-4">
                <p className="text-sm text-gray-600 text-center">
                  Already have account?{" "}
                  <Link
                    href={"/signin"}
                    className="text-blue-400 hover:text-blue-500 transition"
                  >
                    Sign in
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
        </div>
      </div>
    </GuestRoute>
  );
};
export default SignUpPage;
