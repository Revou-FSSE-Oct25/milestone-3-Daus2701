"use client";

import { useCart } from "@/context/CartContext";

type Props = {
  id: number;
  title: string;
  price: number;
  image?: string;
};

export default function AddToCartButton({ id, title, price, image }: Props) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ id, title, price, image })}
      className="mt-4 inline-flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
    >
      + Add to cart
    </button>
  );
}
