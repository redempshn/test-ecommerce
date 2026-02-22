import SignInForm from "@/shared/ui/SignInForm";

const SignInPage = () => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="border border-gray-200 rounded-2xl shadow-2xl mt-10">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
