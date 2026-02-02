"use client";

import Dashboard from "@/features/Dashboard";
import Drawer from "@/features/Drawer";
import ProductList from "@/widgets/ui/ProductList";
import { useState } from "react";

export default function Home() {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <Dashboard onToggle={toggleActive} />
      <Drawer onToggle={toggleActive} currentStatus={isActive} />
      <ProductList />
    </>
  );
}
