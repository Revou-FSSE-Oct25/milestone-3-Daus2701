"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, subtotal, inc, dec, removeFromCart, clear } = useCart();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
          >
            Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/70">Cart is empty.</p>
          <Link className="inline-block mt-4 underline" href="/">
            Go shopping →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-semibold truncate">{item.title}</p>
                <p className="text-white/70 text-sm">${item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dec(item.id)}
                  className="w-9 h-9 rounded-md border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  −
                </button>
                <span className="w-10 text-center">{item.quantity}</span>
                <button
                  onClick={() => inc(item.id)}
                  className="w-9 h-9 rounded-md border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 hover:bg-red-500/20"
                >
                  Remove
                </button>
              </div>

              <div className="text-right min-w-[100px]">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-white/60 text-xs">line total</p>
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
            <div>
              <p className="text-white/70">Subtotal</p>
              <p className="text-2xl font-bold">${subtotal.toFixed(2)}</p>
            </div>

            {/* We'll protect this later with middleware */}
            <Link
              href="/checkout"
              className="rounded-md bg-white text-black px-4 py-2 font-semibold hover:opacity-90"
            >
              Checkout →
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
