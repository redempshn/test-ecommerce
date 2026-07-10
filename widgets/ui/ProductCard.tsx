"use client";

import { CiHeart } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { IoBagHandleOutline, IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { addToCart } from "@/shared/lib/redux/cart/cartSlice";
import { Product } from "@/shared/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  AddProductToFavorites,
  DeleteFromFavorites,
} from "@/shared/lib/redux/favorites/likeThunk";
import { selectIsLiked } from "@/shared/lib/redux/favorites/like.selector";

interface ProductCardProps {
  showRemove?: boolean;
  product: Product;
}

const ProductCard = ({ product, showRemove }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const isLiked = useAppSelector((state) => selectIsLiked(state, product.id));

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success("Product was added to cart.");
  };

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLiked) {
      dispatch(DeleteFromFavorites({ productId: product.id }));
      toast.success("Product was deleted from favorites.");
    } else {
      dispatch(AddProductToFavorites({ productId: product.id }));
      toast.success("Product was added to favorites.");
    }
  };

  return (
    <Link
      href={`/products/item/${product.slug}`}
      className="cursor-pointer block relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-white rounded-xl shadow-lg border border-white overflow-hidden hover:shadow-2xl hover:border-gray-100 transition duration-300 ease-in-out p-3">
        <div className="relative aspect-4/3 mb-4">
          <Image
            src={product.images[0]?.url}
            alt={`${product.title} image`}
            className="absolute inset-0 h-full w-full object-contain"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-zinc-700 truncate mb-3">
            {product.title}
          </span>
          <span className="font-medium text-lg text-red-500">
            ${product.price}
          </span>
        </div>

        {isHovered && (
          <div className="absolute top-3 right-3 bottom-3">
            <div className="flex flex-col h-full justify-between">
              <button
                onClick={handleToggleFavorite}
                className="p-2 hover:bg-gray-100 transition cursor-pointer rounded text-black"
              >
                {isLiked ? (
                  <AiFillHeart size={20} className="fill-red-500" />
                ) : (
                  <CiHeart size={20} />
                )}
              </button>

              {showRemove ? (
                <button
                  onClick={handleToggleFavorite}
                  className="p-2 border text-blue-500 border-blue-500 transition cursor-pointer rounded hover:bg-blue-500 hover:text-white"
                >
                  <IoClose size={22} />
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="p-2 border text-blue-500 border-blue-500 transition cursor-pointer rounded hover:bg-blue-500 hover:text-white"
                >
                  <IoBagHandleOutline size={19} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
