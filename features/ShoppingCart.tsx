"use client";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import {
  selectCartItems,
  selectCartUniqueItemsCount,
} from "@/shared/redux/selectors/cart.selectors";
import ShoppingCartItem from "../entities/ShopppingCartItem";
import Link from "next/link";
import { clearCart } from "@/shared/redux/slises/cartSlice";
import Button from "@/shared/ui/Button";
import ShoppingCartInfo from "@/entities/ShoppingCartInfo";
import { toast } from "sonner";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const totalUniqueItems = useAppSelector(selectCartUniqueItemsCount);
  const totalItems = useAppSelector(selectCartItems);

  const handleDeleteAll = () => {
    dispatch(clearCart());
    toast.success("Deleted succefully.");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-5">Shopping cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {totalItems.length > 0 ? (
            <>
              {totalItems.map((item) => (
                <ShoppingCartItem key={item.product.id} item={item} />
              ))}
              <div className="flex justify-end">
                <Button
                  onClick={handleDeleteAll}
                  label="Delete all"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                />
              </div>
            </>
          ) : (
            <div className="mt-5 text-center text-gray-500">
              <p className="mb-2">Your shopping cart is empty.</p>
              <p>
                Choose something for you{" "}
                <Link href="/" className="text-blue-600">
                  here
                </Link>
                .
              </p>
            </div>
          )}
        </div>

        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {totalUniqueItems > 0 ? (
            <ShoppingCartInfo />
          ) : (
            <p className="text-gray-500 text-center">
              You didnt add any product to cart.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;
