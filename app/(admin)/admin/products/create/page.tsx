// Как это работает:
// Сценарий 1: Создание продукта
// /admin/products → Клик "Add Product"
//   ↓
// /admin/products/create
//   ↓
// <ProductForm mode="create" />
//   ↓
// Пустые поля
//   ↓
// Submit → POST /api/admin/products
//   ↓
// Редирект → /admin/products

// Сценарий 2: Редактирование продукта
// /admin/products → Клик "Edit" на продукте #5
//   ↓
// /admin/products/5/edit
//   ↓
// <ProductForm mode="edit" productId={5} />
//   ↓
// Загрузить product #5 из Redux/API
//   ↓
// Заполнить поля данными продукта
//   ↓
// Submit → PUT /api/admin/products/5
//   ↓
// Редирект → /admin/products

// import { useRouter, useSearchParams } from "next/navigation";

// export default function AdminProductsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Обновить query параметры
//   const updateParams = (key: string, value: string) => {
//     const params = new URLSearchParams(searchParams);

//     if (value) {
//       params.set(key, value);
//     } else {
//       params.delete(key);
//     }

//     router.push(`/admin/products?${params.toString()}`);
//   };

//   // Фильтры отправляются в URL
//   // GET запрос автоматически включает эти параметры!

//   return (
//     <div>
//       {/* Search */}
//       <input onChange={(e) => updateParams("search", e.target.value)} />

//       {/* Category */}
//       <select onChange={(e) => updateParams("category", e.target.value)}>
//         {/* options */}
//       </select>

//       {/* Sort */}
//       <select onChange={(e) => updateParams("sort", e.target.value)}>
//         {/* options */}
//       </select>
//     </div>
//   );
// }

"use client";

import ProductForm from "@/features/admin/dashboard/products/ProductForm";
import { useRouter } from "next/navigation";

const ProductCreatePage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Create New Product
            </h1>
          </div>
        </header>
        <ProductForm
          mode="create"
          onSuccess={() => router.push("/admin/products")}
        />
      </div>
    </div>
  );
};

export default ProductCreatePage;
