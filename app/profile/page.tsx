import ProfilePage from "@/entities/ProfilePage";
import ProtectedRoute from "@/shared/ui/ProtectedRoute";

const Profile = () => {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  );
};

export default Profile;
