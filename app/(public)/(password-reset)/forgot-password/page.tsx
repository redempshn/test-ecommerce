"use client";

import { useAppDispatch } from "@/shared/lib/hooks/reduxHooks";
import { requestPasswordReset } from "@/shared/lib/redux/auth/authThunk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ResetPasswordPayload {
  email: string;
}

export default function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordPayload>();

  const onSubmit = async (data: ResetPasswordPayload) => {
    try {
      setServerError(null);
      await dispatch(requestPasswordReset(data)).unwrap();

      router.push("/success");
      toast.success("Check your email");
    } catch (error) {
      console.error("Reset password failed:", error);
      setServerError(error as string);
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col text-center mt-5">
      <h3 className="text-xl font-bold">Forgot your password?</h3>
      <p className="text-base text-gray-500 mb-5">
        Enter your email and we&apos;ll send you reset instruction.
      </p>
      <form className="flex flex-col mb-5" onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
            <p className="text-sm text-red-600">{serverError}</p>
          </div>
        )}

        <div className="flex flex-row items-center mb-5">
          <label
            htmlFor="email"
            className="block text-base font-medium text-gray-700 mr-5"
          >
            Email
          </label>
          <div className="flex flex-col w-full">
            <input
              id="email"
              type="email"
              {...register("email", {
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
              <p className="mt-1 ml-4text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex itemc-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-40 py-3 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
