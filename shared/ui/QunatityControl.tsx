import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";

interface QuantityControlProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  disabled?: boolean;
}

const QuantityControl = ({
  value,
  onIncrement,
  onDecrement,
  min = 1,
  disabled = false,
}: QuantityControlProps) => {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={onDecrement}
        disabled={disabled || value <= min}
        className="cursor-pointer"
      >
        <LuMinus />
      </button>

      <span className="border rounded px-3 py-1">{value}</span>

      <button
        type="button"
        onClick={onIncrement}
        disabled={disabled}
        className="cursor-pointer"
      >
        <LuPlus />
      </button>
    </div>
  );
};

export default QuantityControl;
