"use client";

import ErrorState from "@/shared/ui/Error";
import { use, useEffect } from "react";
import ProductDetailsSkeleton from "@/shared/ui/ProductDetailsSkeleton";
import ProductInfo from "@/features/products/ProductInfo";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { fetchProductBySlug } from "@/shared/lib/redux/products/productThunk";
import { selectProductBySlug } from "@/shared/lib/redux/products/products.selector";
import Galery from "@/entities/Galery";
import RelatedProducts from "@/entities/RelatedProducts";
import Reviews from "@/features/reviews/Reviews";

interface ProductProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductProps) {
  const { slug } = use(params);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.products);

  const product = useAppSelector((state) => selectProductBySlug(state, slug));

  useEffect(() => {
    dispatch(fetchProductBySlug({ slug }));
  }, [dispatch, slug]);

  if (status === "loading" || !product) {
    return <ProductDetailsSkeleton />;
  }

  if (status === "failed") {
    return <ErrorState />;
  }

  return (
    <div className="bg-[#f6f8fd] w-full h-full pb-4">
      <div className="max-w-7xl mx-auto">
        <div className="pt-2 mb-2">
          <button
            className="flex items-center mb-2 text-gray-400 cursor-pointer underline decoration-transparent decoration-1 underline-offset-2 transition-all duration-200 hover:text-blue-400 hover:decoration-blue-400"
            onClick={() => router.back()}
          >
            <IoIosArrowRoundBack size={17} />
            Back
          </button>
        </div>
        <div className="flex justify-between gap-4">
          <div className="basis-1/2 bg-[#f6f8fd] rounded-2xl">
            <Galery product={product} />

            <div className=""></div>
          </div>
          <div className="basis-1/2">
            <ProductInfo product={product} />
          </div>
        </div>

        <RelatedProducts productId={product.id} />

        <Reviews />
        {/* БЛОК С РЕВЬЮ */}

        {/* состояние клинта для отзыва*/}
        {/* <Link
        href={"/signin"}
        className="uppercase text-sm tracking-tight hover:text-blue-300 transition"
      >
        Sign in to rate
      </Link> */}
      </div>
    </div>
  );
}
