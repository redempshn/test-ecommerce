import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../lib/hooks/reduxHooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("user" | "admin" | "guest")[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const router = useRouter();
  const { status, role } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (status === "idle") {
      router.push("/login");
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      router.push("/"); // или 403 страница
    }
  }, [status, role, router, allowedRoles]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status !== "authenticated") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
