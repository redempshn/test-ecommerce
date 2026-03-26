"use client";
import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import {
  deleteProduct,
  fetchAdminProducts,
} from "@/shared/lib/redux/admin/AdminProductsThunk";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { selectAdminAllProducts } from "@/shared/lib/redux/admin/AdminProducts.selectors";
import Loader from "@/shared/ui/Loader";
import { selectAllCategories } from "@/shared/lib/redux/categories/categoriesSlice";
import { fetchCategories } from "@/shared/lib/redux/categories/categoriesThunk";

export default function AdminProductsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = useAppSelector(selectAllCategories);

  const products = useAppSelector(selectAdminAllProducts);

  const { status, error, pagination } = useAppSelector(
    (state) => state.adminProducts,
  );

  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;
  const status_filter =
    (searchParams.get("status") as
      | "DRAFT"
      | "ACTIVE"
      | "INACTIVE"
      | "all"
      | undefined) || undefined;
  const sort = searchParams.get("sort") || undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const created = searchParams.get("created") || undefined;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAdminProducts({
        search,
        category,
        status: status_filter,
        sort,
        page,
        limit,
        created,
      }),
    );
  }, [dispatch, search, category, status_filter, sort, page, limit, created]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") {
      params.set("page", "1");
    }

    router.push(`/admin/products?${params.toString()}`);
  };

  if (status === "loading") {
    return <Loader />;
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
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-gray-200 hover:text-black"
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
          className="px-4 py-2 border rounded-lg border-slate-200"
        />

        {/* Category */}
        <select
          value={category || ""}
          onChange={(e) => updateParams("category", e.target.value)}
          className="px-4 py-2 border rounded-lg border-slate-200 cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={status_filter || "all"}
          onChange={(e) => updateParams("status", e.target.value)}
          className="px-4 py-2 border rounded-lg border-slate-200 cursor-pointer"
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
          className="px-4 py-2 border rounded-lg border-slate-200 cursor-pointer"
        >
          <option value="">Sort by</option>
          <option value="created_desc">Newest first</option>
          <option value="created_asc">Oldest first</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A-Z</option>
          <option value="name_desc">Name: Z-A</option>
          <option value="stock_desc">Stock: From More</option>
          <option value="stock_asc">Stock: From Less</option>
        </select>
      </div>

      {/* Таблица продуктов */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          {products.length === 0 && (
            <tbody>
              <tr>
                <td colSpan={100} className="text-center text-base p-8">
                  No products that fit your parameters
                </td>
              </tr>
            </tbody>
          )}

          <tbody className="divide-y divide-slate-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium text-slate-900">
                        {product.title}
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
                <td className="px-6 py-4 text-sm text-slate-900">
                  {new Date(product.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() =>
                      router.push(`/admin/products/${product.id}/edit`)
                    }
                    className="cursor-pointer rounded text-blue-500 p-1.5 hover:text-black mr-4 hover:bg-gray-200 transition"
                  >
                    <FaPencil size={14} />
                  </button>

                  <button
                    onClick={() => router.push(`/products/${product.id}`)}
                    className="cursor-pointer rounded text-blue-500 p-1.5 hover:text-black mr-4 hover:bg-gray-200 transition"
                  >
                    <FaEye size={14} />
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="cursor-pointer rounded text-red-600 p-1.5 hover:bg-red-100 transition"
                  >
                    <FaRegTrashAlt size={14} />
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
              <FaChevronLeft />
            </button>

            <div className="flex items-center gap-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => updateParams("page", pageNum.toString())}
                  className={`cursor-pointer px-4 py-2 border rounded-lg ${
                    pageNum === page
                      ? "bg-blue-500 text-white"
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
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
