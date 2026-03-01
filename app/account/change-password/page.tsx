"use client";

import { useAppDispatch } from "@/shared/lib/hooks/reduxHooks";
import { logout } from "@/shared/lib/redux/auth/authSlice";
import { changePassword} from "@/shared/lib/redux/auth/authThunk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordPayload) => {
    try {
      setServerError(null);
      await dispatch(
        changePassword({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      ).unwrap();

      dispatch(logout());
      router.push("/signin");
      toast.success("Password changed.");
    } catch (error) {
      console.error("Change password failed:", error);
      setServerError(error as string);
    }
  };
  return (
    <div className="w-full mx-auto flex flex-col">
      <h3 className="text-xl font-bold mb-5">Reset password</h3>
      <div className="w-full">
        <form className="flex flex-col mb-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Общая ошибка от сервера */}
          {serverError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          <div className="flex flex-row items-center mb-5">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700 basis-1/5 ml-5"
            >
              Current password
            </label>
            <div className="flex flex-col w-full">
              <input
                id="password"
                type="password"
                {...register("oldPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.oldPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter current password"
              />
              {errors.oldPassword && (
                <p className="ml-4 mt-1 text-sm text-red-500">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center mb-5">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700 basis-1/5 ml-5"
            >
              New password
            </label>
            <div className="flex flex-col w-full">
              <input
                id="password"
                type="password"
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.newPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <p className="ml-4 mt-1 text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center mb-5">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700 basis-1/5 ml-5"
            >
              Confirm password
            </label>
            <div className="flex flex-col w-full">
              <input
                id="password"
                type="password"
                {...register("confirmPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: (value) =>
                    value === getValues("newPassword") ||
                    "Passwords do not match",
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && (
                <p className="ml-4 mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
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
              {isSubmitting ? "Changing..." : "Change"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
