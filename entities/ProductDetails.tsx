"use client";

import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { selectCartItemByProductId } from "@/shared/redux/selectors/cart.selectors";
import { addToCart, decrementItem } from "@/shared/redux/slises/cartSlice";
import { Product } from "@/shared/types/product";
import Button from "@/shared/ui/Button";
import QuantityControl from "@/shared/ui/QunatityControl";

interface ProductDetailsProps {
  product: Product;
}
const ProductDetails = ({ product }: ProductDetailsProps) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectCartItemByProductId(product.id));

  const handleClick = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col bg-[#f6f8fd] p-4 rounded-2xl">
        <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
        <div className="flex flex-col mb-4 font-light">
          <p className="">{product.sku}</p>
          <span className="text-base">rate: {product.rating}</span>
          {/* <p className="text-base">total reviews: {product.rating}</p> */}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold">{product.price}</span>
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
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer uppercase"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col bg-[#f6f8fd] p-4 rounded-2xl">
        <p className="text-medium text-center uppercase mb-4">Description</p>
        <div className="flex mb-4">
          <p className="text-base font-light">{product.description}</p>
        </div>

        <p className="text-base font-light mb-4">
          Category: {product.category}
        </p>

        <div className="flex flex-col font-light">
          <span className="text-base">rate: {product.rating}</span>
          <p className="text-base">total reviews: {product.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
