"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const FALLBACK_IMG = "https://placehold.co/200x200/png?text=No+Image";

export default function CartPage() {
  const { items, inc, dec, remove, clear, totalItems, totalPrice } = useCart();

  return (
    <main className="p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Cart</h1>
          <p className="mt-1 text-white/70">{totalItems} item(s)</p>
        </div>

        {items.length > 0 && (
          <button onClick={clear} className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15">
            Clear cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/80">Cart is empty.</p>
          <Link className="mt-3 inline-block rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15" href="/">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="h-20 w-20 overflow-hidden rounded-lg bg-white/5">
                  <Image
                    src={item.image ?? FALLBACK_IMG}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-white/70">${item.price}</p>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dec(item.id)}
                        className="h-8 w-8 rounded-md bg-white/10 text-white hover:bg-white/15"
                      >
                        -
                      </button>
                      <span className="min-w-[2ch] text-center text-white">{item.qty}</span>
                      <button
                        onClick={() => inc(item.id)}
                        className="h-8 w-8 rounded-md bg-white/10 text-white hover:bg-white/15"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="text-white">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                      <button onClick={() => remove(item.id)} className="text-sm text-red-300 hover:text-red-200">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-lg font-semibold text-white">Summary</h2>
            <div className="mt-3 flex justify-between text-white/80">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="mt-2 flex justify-between text-white/80">
              <span>Total</span>
              <span className="text-white font-semibold">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              className="mt-4 w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
              onClick={() => alert("Checkout page next 👀")}
            >
              Checkout
            </button>

            <p className="mt-3 text-xs text-white/50">
              (Checkout will be protected later with auth + middleware)
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
