"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { fetchRelatedProducts } from "@/shared/lib/redux/products/productThunk";
import ProductCard from "@/widgets/ui/ProductCard";
import { useEffect } from "react";

interface RelatedProductsProps {
  productId: number;
}

const RelatedProducts = ({ productId }: RelatedProductsProps) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.relatedProducts);

  useEffect(() => {
    if (!productId) return;
    dispatch(fetchRelatedProducts({ productId }));
  }, [dispatch, productId]);

  return (
    <div className="border border-gray-200 rounded bg-white p-3 mt-4">
      <p className="text-xl text-black mb-5">Related Products:</p>
      <ul className="h-full grid grid-cols-5 gap-4 self-start mb-5">
        {products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default RelatedProducts;
