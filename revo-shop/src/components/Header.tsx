"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold">
          Revo Shop
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>

          <Link href="/cart" className="relative">
            Cart
            {totalItems > 0 && (
              <span className="ml-2 inline-flex min-w-[20px] h-5 items-center justify-center rounded-full bg-white text-black text-xs px-2">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
