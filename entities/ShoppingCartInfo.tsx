import { useAppSelector } from "@/shared/hooks/reduxHooks";
import {
  selectCartUniqueItemsCount,
  selectedCartTotalPrice,
} from "@/shared/redux/selectors/cart.selectors";
import Button from "@/shared/ui/Button";

const ShoppingCartInfo = () => {
  const totalPrice = useAppSelector(selectedCartTotalPrice);
  const totalUniqueItems = useAppSelector(selectCartUniqueItemsCount);

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500">
          You have {totalUniqueItems} products in cart
        </p>

        <div className="flex justify-between items-center">
          <span className="text-base font-medium">Total</span>
          <span className="text-2xl font-bold">{totalPrice.toFixed(2)} $</span>
        </div>

        <Button
          onClick={() => {}}
          label="Checkout"
          className="mt-4 rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition"
        />
      </div>
    </>
  );
};

export default ShoppingCartInfo;
