import { FaFacebook } from "react-icons/fa";

const FacebookButton = () => {
  return (
    <a
      href="/api/auth/oauth/facebook"
      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
    >
      <FaFacebook size={22} />
      <span className="font-medium">Continue with Facebook</span>
    </a>
  );
};

export default FacebookButton;
