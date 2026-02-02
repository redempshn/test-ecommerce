import { RiDeleteBin7Line } from "react-icons/ri";
import {
  addToCart,
  CartItem,
  decrementItem,
  removeFromCart,
} from "@/shared/redux/slises/cartSlice";
import Image from "next/image";
import QuantityControl from "@/shared/ui/QunatityControl";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { toast } from "sonner";

interface ShoppingCartItemProps {
  item: CartItem;
}

const ShoppingCartItem = ({ item }: ShoppingCartItemProps) => {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  const totalPriceUniqueItem = product.price * quantity;

  const handleDeleteProduct = () => {
    dispatch(removeFromCart(product.id));
    toast.success("Product was deleted from cart.");
  };

  return (
    <div className="flex items-center justify-around bg-[#f6f8fd] p-4 rounded-2xl mb-4">
      <button
        onClick={handleDeleteProduct}
        aria-label="Remove item"
        className="cursor-pointer mr-8"
      >
        <RiDeleteBin7Line size={20} />
      </button>
      <div className="relative w-20 h-20 shrink-0 mr-8">
        <Image
          src={product.images[0]}
          alt={`${product.title} image`}
          className="absolute inset-0 object-contain w-full h-full"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <p className="text-sm font-medium truncate mb-2">{product.title}</p>
        <p className="text-base text-gray-600">
          ${totalPriceUniqueItem.toFixed(2)}
        </p>
      </div>

      <QuantityControl
        value={quantity}
        onIncrement={() => dispatch(addToCart(product))}
        onDecrement={() => dispatch(decrementItem(product.id))}
      />
    </div>
  );
};
export default ShoppingCartItem;
