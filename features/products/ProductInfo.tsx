"use client";

import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Product } from "@/shared/types/product";
import Button from "@/shared/ui/Button";
import QuantityControl from "@/shared/ui/QunatityControl";
import Link from "next/link";
import ProductDetails from "./ProductDetails";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectCartItemByProductId } from "@/shared/lib/redux/cart/cart.selectors";
import { addToCart, decrementItem } from "@/shared/lib/redux/cart/cartSlice";

interface ProductDetailsProps {
  product: Product;
}
const ProductInfo = ({ product }: ProductDetailsProps) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectCartItemByProductId(product.id));

  const handleClick = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col bg-white  p-4 rounded-2xl">
        <h2 className="text-3xl font-bold mb-2">{product.title}</h2>

        <div className="flex items-center mb-4 font-light  self-start p-1 rounded-lg bg-[#f6f8fd]">
          <FaStar size={20} className="fill-blue-500 mr-1" />
          <span className="text-base">{product.rating}</span>
          <GoDotFill size={10} className="mx-2" />
          <Link
            href={"/"}
            className="uppercase text-sm tracking-tight hover:text-blue-300 transition"
          >
            Sign in to rate
          </Link>
        </div>

        <div className="flex justify-between items-center bg-white">
          <span className="text-3xl font-bold">${product.price}</span>
          {cartItem ? (
            <QuantityControl
              value={cartItem?.quantity}
              onIncrement={() => dispatch(addToCart(product))}
              onDecrement={() => dispatch(decrementItem(product.id))}
            />
          ) : (
            <Button
              onClick={handleClick}
              label="Add to cart"
              className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer uppercase"
            />
          )}
        </div>
      </div>

      <ProductDetails product={product} />
    </div>
  );
};

export default ProductInfo;
