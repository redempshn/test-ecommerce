"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectAllCategories } from "@/shared/lib/redux/categories/categoriesSlice";
import { fetchCategories } from "@/shared/lib/redux/categories/categoriesThunk";
import ProductList from "@/widgets/ui/AllProducts";
import Link from "next/link";
import { useEffect } from "react";

export default function Products() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAllCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <div className="bg-zinc-100">
        <div className="max-w-7xl mx-auto pb-5">
          <h3 className="text-lg uppercase py-5">Catalog of products</h3>

          <ul className="flex flec-row py-4">
            {categories.map((category) => (
              <li key={category.id} className="mr-4 last:mr-0">
                <Link
                  href={`/products/category/${category.slug}`}
                  className="p-4 bg-white border border-white rounded-2xl hover:bg-blue-500 hover:text-white transition "
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto">
          <ProductList />
        </div>
      </div>
    </>
  );
}
