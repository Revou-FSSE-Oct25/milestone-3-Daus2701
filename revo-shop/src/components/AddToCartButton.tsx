"use client";

import { useCart } from "@/context/CartContext";

type Props = {
  product: {
    id: number;
    title: string;
    price: number;
    image?: string | null;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() =>
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image ?? undefined,
        })
      }
      className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
    >
      Add to cart
    </button>
  );
}
