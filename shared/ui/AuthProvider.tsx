"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../lib/hooks/reduxHooks";
import { restoreSession } from "../lib/redux/auth/authThunk";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("AuthProvider: restoring session");
    dispatch(restoreSession());
  }, [dispatch]);

  return <>{children}</>;
}
