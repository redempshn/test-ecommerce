"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/widgets/ui/Header";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import Footer from "@/widgets/ui/Footer";
import { store } from "@/shared/lib/redux/store/store";
import SearchModal from "@/features/modal/SearchModal";
import LoginModal from "@/features/modal/LogInModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <Toaster />
          <SearchModal />
          <LoginModal />
          <div className="min-h-screen flex flex-col relative">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
