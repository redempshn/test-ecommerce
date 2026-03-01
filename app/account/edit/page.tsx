"use client";

import { useAppDispatch } from "@/shared/lib/hooks/reduxHooks";
import { updateProfile } from "@/shared/lib/redux/auth/authThunk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface ProfileEditPayload {
  name: string;
  email: string;
}

export default function EditPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileEditPayload>();

  const onSubmit = async (data: ProfileEditPayload) => {
    try {
      setServerError(null);
      await dispatch(updateProfile(data)).unwrap();

      router.push("/account");
      toast.success("Profile information updated");
    } catch (error) {
      console.error("Login failed:", error);
      setServerError(error as string);
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col">
      <h3 className="text-xl font-bold mb-5">Change profile information</h3>

      <div className="w-full">
        <form className="flex flex-col mb-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Общая ошибка от сервера */}
          {serverError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-5">
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          <div className="flex flex-row items-center mb-5">
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700 basis-1/5 ml-5"
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
                placeholder="Enter new email"
              />
              {errors.email && (
                <p className="mt-1 ml-4text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 basis-1/5 ml-5"
            >
              Name
            </label>
            <div className="flex flex-col w-full">
              <input
                id="name"
                type="text"
                {...register("name", {
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
                placeholder="Enter new name"
              />
              {errors.name && (
                <p className="mt-1 ml-4 text-sm text-red-500">
                  {errors.name.message}
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
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
