// components/GuestRoute.tsx

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../lib/hooks/reduxHooks";

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // редирект на главную
    }
  }, [status, router]);

  if (status === "authenticated") {
    return null;
  }

  return <>{children}</>;
};

export default GuestRoute;
