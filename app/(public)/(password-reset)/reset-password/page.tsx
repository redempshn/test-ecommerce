import ResetPasswordForm from "@/entities/ResetPasswordForm";
import Link from "next/link";
import { MdErrorOutline } from "react-icons/md";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return     <div className="max-w-lg mx-auto mt-5 text-center">
      <div className="flex flex-col justify-center items-center">
        <MdErrorOutline size={40} className="mb-4" />
        <p className="text-gray-500 text-base mb-5">
          Invalid reset link.
        </p>

        <Link
          href="/signin"
          className="w-40 py-3 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back to sign in
        </Link>
      </div>
    </div>;
  }

  

  return <ResetPasswordForm token={token} />;
}