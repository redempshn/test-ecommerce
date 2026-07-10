"use client";

import "./globals.css";
import Header from "@/widgets/ui/Header";
import { Toaster } from "sonner";
import Footer from "@/widgets/ui/Footer";
import SearchModal from "@/features/modal/SearchModal";
import LoginModal from "@/features/modal/LogInModal";
import { AuthProvider } from "@/shared/ui/AuthProvider";
import Drawer from "@/entities/Drawer";
import FavoritesList from "@/features/favorites/FavoritesList";
import ReviewModal from "@/features/modal/ReviewModal";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthProvider>
        <Toaster />
        <SearchModal />
        <LoginModal />
        <ReviewModal />
        <Drawer title="Favorites">
          <FavoritesList />
        </Drawer>
        <div className="min-h-screen flex flex-col relative">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </AuthProvider>
    </div>
  );
}
