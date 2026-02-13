"use client";

import { useCart } from "@/context/CartContext";

type Props = {
  product: {
    id: number;
    title: string;
    price: number;
    image?: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, 1);
      }}
      className="mt-3 w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
    >
      Add to cart
    </button>
  );
}
