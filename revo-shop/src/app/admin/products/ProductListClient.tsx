"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

type Product = {
  id: number;
  title: string;
};

export default function ProductListClient({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title?.toLowerCase().includes(q));
  }, [products, debouncedSearch]);

  return (
    <main className="p-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Manage Products</h1>

        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-64 rounded border border-white/10 bg-black/40 p-2 text-sm text-white outline-none"
          />

          <Link
            href="/admin/products/new"
            className="rounded border px-3 py-1 hover:bg-white/10"
          >
            + New Product
          </Link>
        </div>
      </div>

      <p className="mt-2 text-sm text-white/60">
        Showing {filtered.length} / {products.length}
      </p>

      <div className="mt-6 space-y-3">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded border p-3"
          >
            <span>{p.title}</span>

            <Link
              href={`/admin/products/${p.id}`}
              className="text-sm underline"
            >
              Edit
            </Link>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-white/70">No products found.</p>
        )}
      </div>
    </main>
  );
}