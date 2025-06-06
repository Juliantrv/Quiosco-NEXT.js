import { XCircleIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { OrderItem } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { useStore } from "@/src/store";
import { useMemo } from "react";

type ProductDetilsProps = {
  item: OrderItem;
};

const MAX_ITEMS = 5

export default function ProductDetils({ item }: Readonly<ProductDetilsProps>) {
  const increaseQuantity = useStore( state => state.increaseQuantity)
  const decreaseQuantity = useStore( state => state.decreaseQuantity)
  const removeItem = useStore( state => state.removeItem)
  const disableIncreaseButton = useMemo(() => item.quantity === MAX_ITEMS,[item])
  return (
    <div className="shadow p-4 bg-white border-t border-gray-200 rounded-sm">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => removeItem(item.id)}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">{ formatCurrency(item.price)}</p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button type="button" onClick={() =>item.quantity == 1 ? removeItem(item.id) : decreaseQuantity(item.id)}>
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button 
            type="button"
            disabled={disableIncreaseButton}
            onClick={() => increaseQuantity(item.id)}
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatCurrency(item.subTotal)}</span>
        </p>
      </div>
    </div>
  );
}
