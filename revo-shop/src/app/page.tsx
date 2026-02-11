"use client";

import ProductGrid from "./about/components/ProductGrid";
import { useProducts } from "../hooks/useProducts";

export default function Home() {
  const { products, loading, error, refetch } = useProducts();

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Revo Shop</h1>
        <p className="mt-1 text-white/70">Browse products from the API.</p>
      </div>

      {loading && <p className="text-white/70">Loading products...</p>}

      {!loading && error && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4">
          <p className="font-semibold text-red-200">Failed to load products</p>
          <p className="mt-1 text-red-200/80">{error}</p>
          <button
            onClick={refetch}
            className="mt-3 rounded-md bg-white/10 px-3 py-2 hover:bg-white/20"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && <ProductGrid products={products} />}
    </main>
  );
}
