"use client";

import { GoPackageDependents } from "react-icons/go";
import { HiOutlineTruck } from "react-icons/hi2";
import { PiMoney } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Product } from "@/shared/types/product";
import QuantityControl from "@/shared/ui/QunatityControl";
import ProductDetails from "./ProductDetails";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/reduxHooks";
import { selectCartItemByProductId } from "@/shared/lib/redux/cart/cart.selectors";
import { addToCart, decrementItem } from "@/shared/lib/redux/cart/cartSlice";
import { AiFillHeart } from "react-icons/ai";
import { selectIsLiked } from "@/shared/lib/redux/favorites/like.selector";
import {
  AddProductToFavorites,
  DeleteFromFavorites,
} from "@/shared/lib/redux/favorites/likeThunk";
import { toast } from "sonner";
import Link from "next/link";
import CrossSellProducts from "@/entities/CrossSellProducts";

interface ProductDetailsProps {
  product: Product;
}
const ProductInfo = ({ product }: ProductDetailsProps) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectCartItemByProductId(product.id));

  const isLiked = useAppSelector((state) => selectIsLiked(state, product.id));

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

  const handleClick = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col bg-white  p-4 rounded-2xl">
        <div className="w-full flex items-center justify-between mb-5">
          {/* не работает, нужно достать с бд количество - {product.stock}*/}
          <div className="text-sm">
            <span className="text-blue-500">6</span> in stock
          </div>
          <p className="text-sm">SKU: ASYD100</p>
        </div>

        {/* тут нужно будет отобразать кол-во отзывов. и состояния юзера, чтобы он мог оставлять отзыв */}
        <div className="flex items-center mb-4 font-light  self-start p-1 rounded-lg bg-[#f6f8fd]">
          <FaStar size={20} className="fill-blue-500 mr-1" />
          {/* кол-во отзывов */}
          <span className="text-base">6</span>
          {/* или сделать оценку звездами */}
          <GoDotFill size={10} className="mx-2" />

          <Link
            href={"/signin"}
            className="uppercase text-sm tracking-tight hover:text-blue-300 transition"
          >
            Sign in to rate
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-1 first-letter:uppercase">
          {product.title}
        </h2>
        <span className="text-3xl font-bold mb-4">${product.price}</span>
        <div className="flex items-center mb-5">
          {cartItem ? (
            <QuantityControl
              value={cartItem?.quantity}
              onIncrement={() => dispatch(addToCart(product))}
              onDecrement={() => dispatch(decrementItem(product.id))}
            />
          ) : (
            <button
              onClick={handleClick}
              className="cursor-pointer border border-blue-500 py-2 px-4 rounded text-base text-blue-500 hover:border-white hover:bg-blue-500 hover:text-white transition"
            >
              Add to cart
            </button>
          )}

          <button
            onClick={handleToggleFavorite}
            className="p-2.5 transition cursor-pointer rounded ml-3 border border-blue-500 text-blue-500 hover:border-white group hover:bg-blue-500"
          >
            {isLiked ? (
              <AiFillHeart size={20} className="fill-red-500" />
            ) : (
              <AiFillHeart size={20} className=" group-hover:fill-white" />
            )}
          </button>
        </div>

        <ul className="flex flex-col">
          <li className="flex items-cemter mb-2">
            <GoPackageDependents size={25} />
            <p className="block text-base ml-4">International delivery.</p>
          </li>

          <li className="flex items-cemter mb-2">
            <HiOutlineTruck size={25} />
            <p className="block text-base ml-4">
              Delivery within 1-3 days — &quot;YOUR POST OFFICE&quot;.
            </p>
          </li>

          <li className="flex items-cemter">
            <PiMoney size={25} />
            <p className="block text-base ml-4">
              Cash, Non-cash payment, Postpaid in post office.
            </p>
          </li>
        </ul>
      </div>

      {product && <CrossSellProducts productId={product.id} />}

      <ProductDetails product={product} />
    </div>
  );
};

export default ProductInfo;
