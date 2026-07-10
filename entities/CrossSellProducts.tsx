"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { addToCart } from "@/shared/lib/redux/cart/cartSlice";
import { fetchCrossSellProducts } from "@/shared/lib/redux/products/productThunk";

import { Product } from "@/shared/types/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { toast } from "sonner";

interface CrossSellProductsProps {
  productId: number;
}

const CrossSellProducts = ({ productId }: CrossSellProductsProps) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.crossSellProducts);

  useEffect(() => {
    if (!productId) return;
    dispatch(fetchCrossSellProducts({ productId }));
  }, [dispatch, productId]);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product,
  ) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success("Product was added to cart.");
  };

  return (
    <div className="border border-gray-200 rounded bg-white p-3">
      <p className="text-xl text-black mb-5">
        Customers who bought this product also bought:
      </p>

      <ul className="flex flex-col gap-2">
        {products.map((product) => (
          <li
            key={product.title}
            className="w-full flex items-center justify-between rounded-2xl"
          >
            <div className="relative w-14 h-14 shrink-0 mr-4">
              <Image
                src={product.images[0].url}
                alt={`${product.title} image`}
                className="absolute inset-0 object-contain w-full h-full"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0 mr-6">
              <Link
                href={`/products/item/${product.slug}`}
                className="cursor-pointer block relative"
              >
                <p className="text-base font-medium truncate mb-1 hover:underline">
                  {product.title}
                </p>
              </Link>
              <p className="text-lg text-red-500">${product.price}</p>
            </div>

            <button
              onClick={() => handleAddToCart}
              className="p-2 border text-blue-500 border-blue-500 transition cursor-pointer rounded hover:bg-blue-500 hover:text-white"
            >
              <IoBagHandleOutline size={19} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrossSellProducts;
