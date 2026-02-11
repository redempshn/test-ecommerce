import LoginPage from "@/entities/LoginPage";
import GuestRoute from "@/shared/ui/GuestRoute";

const login = () => {
  return (
    <GuestRoute>
      <LoginPage />
    </GuestRoute>
  );
};
export default login;
