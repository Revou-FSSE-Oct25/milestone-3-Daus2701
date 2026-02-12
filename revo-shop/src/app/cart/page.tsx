"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const FALLBACK_IMG = "https://placehold.co/200x200/png?text=No+Image";

export default function CartPage() {
  const { items, totalItems, totalPrice, inc, dec, removeItem, clear } = useCart();

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="text-white/70">{totalItems} item(s)</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/80">Cart is empty.</p>
          <Link
            className="mt-3 inline-block rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
            href="/"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="h-20 w-20 overflow-hidden rounded-lg bg-white/5">
                  <Image
                    src={item.image || FALLBACK_IMG}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-white/70 text-sm">${item.price}</p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-red-300 hover:text-red-200"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/5">
                      <button className="px-3 py-1 hover:bg-white/10" onClick={() => dec(item.id)}>
                        -
                      </button>
                      <span className="px-3 py-1">{item.qty}</span>
                      <button className="px-3 py-1 hover:bg-white/10" onClick={() => inc(item.id)}>
                        +
                      </button>
                    </div>

                    <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 h-fit">
            <h2 className="text-xl font-semibold">Summary</h2>
            <div className="mt-4 flex justify-between text-white/80">
              <span>Total</span>
              <span className="font-semibold text-white">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              className="mt-4 w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
              onClick={() => alert("Checkout later 😄")}
            >
              Checkout
            </button>

            <button
              className="mt-2 w-full rounded-lg border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
              onClick={clear}
            >
              Clear cart
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
