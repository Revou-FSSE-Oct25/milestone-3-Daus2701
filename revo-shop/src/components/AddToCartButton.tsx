"use client";

import { useCart } from "@/context/CartContext";

type Props = {
  id: number;
  title: string;
  price: number;
  image?: string;
};

export default function AddToCartButton({ id, title, price, image }: Props) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart({ id, title, price, image }, 1)}
      className="rounded-md bg-white text-black px-4 py-2 font-semibold hover:opacity-90"
    >
      Add to Cart
    </button>
  );
}
