"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../lib/hooks/reduxHooks";
import { currentRole, currentStatus } from "../lib/redux/auth/auth.selectors";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("user" | "admin" | "guest")[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const router = useRouter();
  const status = useAppSelector(currentStatus);
  const role = useAppSelector(currentRole);

  useEffect(() => {
    if (status === "idle") {
      router.push("/signin");
    }

    if (allowedRoles && !allowedRoles.includes("guest")) {
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
