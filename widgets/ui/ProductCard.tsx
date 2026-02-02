"use client";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { selectCartItemByProductId } from "@/shared/redux/selectors/cart.selectors";
import { addToCart } from "@/shared/redux/slises/cartSlice";
import { Product } from "@/shared/types/product";
import Button from "@/shared/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectCartItemByProductId(product.id));

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success("Product was added to cart.");
  };

  return (
    <Link href={`/${product.id}`} className="cursor-pointer block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out p-3">
        <div className="relative aspect-4/3 mb-2">
          <Image
            src={product.images[0]}
            alt={`${product.title} image`}
            className="absolute inset-0 h-full w-full object-contain"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-2xl">${product.price}</span>
          <span className="text-base truncate mb-4">{product.title}</span>

          <div className="flex justify-between items-center">
            <Button
              onClick={handleAddToCart}
              label={cartItem ? "Added" : "Add"}
              className={
                cartItem
                  ? "px-4 py-2 border rounded-xl bg-white text-black"
                  : "px-4 py-2 border rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              }
            />
            <div className="flex flex-col">
              <p className="text-sm">rating: {product.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
