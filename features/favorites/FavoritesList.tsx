"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { addToCart } from "@/shared/lib/redux/cart/cartSlice";
import {
  selectFavoritesProducts,
  selectFavoritesTotalPrice,
} from "@/shared/lib/redux/favorites/like.selector";
import {
  DeleteFromFavorites,
  fetchLikedProduct,
} from "@/shared/lib/redux/favorites/likeThunk";
import { Product } from "@/shared/types/product";
import Button from "@/shared/ui/Button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";
import { toast } from "sonner";

const FavoritesList = () => {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(selectFavoritesTotalPrice);
  const likedProducts = useAppSelector(selectFavoritesProducts);

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  useEffect(() => {
    dispatch(fetchLikedProduct({ page, limit }));
  }, [dispatch]);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product,
  ) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success("Product was added to cart.");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="grow overflow-y-auto">
        <ul className="flex flex-col gap-2 p-4">
          {likedProducts.map((product) => (
            <li
              key={product.id}
              className="w-120 flex items-center justify-between p-2 rounded-2xl"
            >
              <button
                onClick={() =>
                  dispatch(DeleteFromFavorites({ productId: product.id }))
                }
                aria-label="Remove item"
                className="cursor-pointer mr-4"
              >
                <RiDeleteBin7Line size={20} />
              </button>
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
                <p className="text-base font-medium truncate mb-1">
                  {product.title}
                </p>
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
      <div className="p-4 border-t border-gray-200 shrink-0 ">
        <div className="flex">
          <Button
            onClick={() => {}}
            label="Add all to cart"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          />

          <div className="flex ml-5">
            <p className="text-base">
              total price:{" "}
              <span className="text-lg font-medium text-red-500">
                ${totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;
