"use client";

import { useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectUser } from "@/shared/lib/redux/auth/auth.selectors";
import ProtectedRoute from "@/shared/ui/ProtectedRoute";

const Profile = () => {
  const user = useAppSelector(selectUser);

  return (
    <ProtectedRoute>
      <div className="w-full max-w-7xl mx-auto"></div>
    </ProtectedRoute>
  );
};

export default Profile;
