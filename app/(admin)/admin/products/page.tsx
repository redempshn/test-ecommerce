"use client";

import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import {
  deleteProduct,
  fetchAdminProducts,
} from "@/shared/lib/redux/admin/AdminProductsThunk";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { selectAllProducts } from "@/shared/lib/redux/products/products.selector";

export default function AdminProductsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const products = useAppSelector(selectAllProducts);
  const { status, error, pagination } = useAppSelector(
    (state) => state.products,
  );

  // Получаем параметры из URL
  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;
  const status_filter = (searchParams.get("status") as any) || undefined;
  const sort = searchParams.get("sort") || undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // Загружаем продукты при изменении параметров
  useEffect(() => {
    dispatch(
      fetchAdminProducts({
        search,
        category,
        status: status_filter,
        sort,
        page,
        limit,
      }),
    );
  }, [dispatch, search, category, status_filter, sort, page, limit]);

  // Функция для обновления параметров
  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Сбрасываем страницу при изменении фильтров
    if (key !== "page") {
      params.set("page", "1");
    }

    router.push(`/admin/products?${params.toString()}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (id: number) => {
    if (confirm("Delete product?")) {
      await dispatch(deleteProduct(id)).unwrap();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => router.push("/admin/products/create")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add Product
        </button>
      </div>

      {/* Фильтры */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          defaultValue={search}
          onChange={(e) => {
            const timer = setTimeout(() => {
              updateParams("search", e.target.value);
            }, 500);
            return () => clearTimeout(timer);
          }}
          className="px-4 py-2 border rounded-lg"
        />

        {/* Category */}
        <select
          value={category || ""}
          onChange={(e) => updateParams("category", e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="apparel">Apparel</option>
        </select>

        {/* Status */}
        <select
          value={status_filter || "all"}
          onChange={(e) => updateParams("status", e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="DRAFT">Draft</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        {/* Sort */}
        <select
          value={sort || ""}
          onChange={(e) => updateParams("sort", e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Sort by</option>
          <option value="created_desc">Newest first</option>
          <option value="created_asc">Oldest first</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A-Z</option>
          <option value="name_desc">Name: Z-A</option>
        </select>
      </div>

      {/* Таблица продуктов */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {/* {product.images?.[0] && (
                      <img
                        src={product.images[0].url}
                        alt={product.title}
                        className="w-10 h-10 rounded object-cover mr-3"
                      />
                    )} */}
                    <div>
                      <div className="font-medium text-slate-900">
                        {product.title}
                      </div>
                      <div className="text-sm text-slate-500">
                        {product.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">
                  {product.category?.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">
                  ${product.price}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">
                  {product.stock}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : product.status === "DRAFT"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() =>
                      router.push(`/admin/products/${product.id}/edit`)
                    }
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      {pagination && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-slate-700">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} results
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => updateParams("page", (page - 1).toString())}
              disabled={page === 1}
              className="px-4 py-2 border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => updateParams("page", pageNum.toString())}
                  className={`px-4 py-2 border rounded-lg ${
                    pageNum === page
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => updateParams("page", (page + 1).toString())}
              disabled={page === pagination.totalPages}
              className="px-4 py-2 border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
