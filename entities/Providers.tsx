"use client";

import { useAppDispatch } from "@/shared/lib/hooks/reduxHooks";
import { restoreSession } from "@/shared/lib/redux/auth/authThunk";
import { store } from "@/shared/lib/redux/store/store";
import { useEffect } from "react";
import { Provider } from "react-redux";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
