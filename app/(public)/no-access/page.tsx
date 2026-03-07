import { MdOutlineNoEncryptionGmailerrorred } from "react-icons/md";

export default function NoAccessPage() {
  return (
        <div className="max-w-lg mx-auto mt-5 text-center">
      <div className="flex flex-col justify-center items-center">
        <MdOutlineNoEncryptionGmailerrorred size={40} className="mb-4" />
        <p className="text-gray-500 text-base mb-5">
          You have no access to this page.
        </p>

      </div>
    </div>
  );
}
