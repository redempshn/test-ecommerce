"use client";

import Dashboard from "@/entities/Dashboard";
import Drawer from "@/entities/Drawer";
import ProductList from "@/widgets/ui/ProductList";
import { useState } from "react";

export default function Products() {
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
