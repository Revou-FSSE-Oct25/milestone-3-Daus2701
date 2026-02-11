"use client";

import { useEffect, useState } from "react";
import ProductGrid from "./about/components/ProductGrid";
import type { Product } from "./about/components/ProductCard";



export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("https://api.escuelajs.co/api/v1/products", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        setError(err?.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Revo Shop</h1>
      <p className="mt-2 text-white/70">Browse products from the API.</p>

      {loading && <p className="mt-6 text-white/70">Loading products…</p>}
      {error && <p className="mt-6 text-red-400">{error}</p>}

      {!loading && !error && <ProductGrid products={products} />}
    </main>
  );
}
