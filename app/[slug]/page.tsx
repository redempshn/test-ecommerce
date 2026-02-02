"use client";

import Carousel from "@/features/Carourel";
import ProductDetails from "@/entities/ProductDetails";
import ErrorState from "@/shared/ui/Error";
import { use, useEffect } from "react";
import ProductDetailsSkeleton from "@/shared/ui/ProductDetailsSkeleton";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { fetchProductById } from "@/shared/redux/productThunk";
import {
  selectProductById,
  selectProductsStatus,
} from "@/shared/redux/selectors/products.selector";

interface ProductProps {
  params: Promise<{ slug: number }>;
}

export default function ProductPage({ params }: ProductProps) {
  const { slug } = use(params);

  const productId = slug;
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectProductsStatus);
  const product = useAppSelector((state) =>
    selectProductById(state, productId),
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductById(slug));
    }
  }, [dispatch, status, slug]);

  if (status === "idle" || status === "loading") {
    return <ProductDetailsSkeleton />;
  }

  if (status === "failed") {
    return <ErrorState />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-3 mb-4">Breadcrumbs....</div>
      <div className="flex justify-between gap-4">
        <div className="basis-3/5 bg-[#f6f8fd] p-4 rounded-2xl">
          <Carousel product={product} />
        </div>
        <div className="basis-2/5">
          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  );
}
