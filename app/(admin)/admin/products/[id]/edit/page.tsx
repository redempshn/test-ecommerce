"use client";
import ProductForm from "@/features/admin/dashboard/products/ProductForm";
import { useRouter } from "next/navigation";
import { use } from "react";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

const ProductEditPage = ({ params }: EditProductPageProps) => {
  const router = useRouter();
  const { id } = use(params);
  const productId = parseInt(id);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit product</h1>
          </div>
        </header>
        <ProductForm
          mode="edit"
          productId={productId}
          onSuccess={() => router.push("/admin/products")}
        />
      </div>
    </div>
  );
};

export default ProductEditPage;
