"use client";
import { Product } from "@/app/generated/prisma";
import { useStore } from "@/src/store";

type AddProductButtonProps = {
  product: Product;
};

export default function AddProductButton({ product }: Readonly<AddProductButtonProps>) {
  const addCard = useStore((state) => state.addToCard);
  return (
    <button
      type="button"
      className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-sm"
      onClick={() => addCard(product)}
    >
      Agregar
    </button>
  );
}
