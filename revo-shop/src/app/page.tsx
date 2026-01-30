"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

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

        if (!res.ok) {
          throw new Error(`Failed to fetch products (${res.status})`);
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        // Ignore abort errors (happens on fast refresh)
        if (err instanceof DOMException && err.name === "AbortError") return;

        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

  return (
    <main className="p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Revo Shop</h1>
        <p className="mt-2 text-gray-600">Browse products from the API.</p>
      </header>

      {loading && <p>Loading products...</p>}

      {!loading && error && (
        <p className="text-red-400">
          Error: {error}
        </p>
      )}

      {!loading && !error && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 20).map((p) => {
            const image = p.images?.[0] ?? "";
            return (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="rounded-lg border border-white/10 p-4 hover:border-white/20"
              >
                <div className="aspect-square w-full overflow-hidden rounded-md bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={p.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // fallback if image URL is broken
                      e.currentTarget.src =
                        "https://placehold.co/600x600?text=No+Image";
                    }}
                  />
                </div>

                <h2 className="mt-3 line-clamp-2 font-semibold">{p.title}</h2>
                <p className="mt-1 text-gray-300">${p.price}</p>
              </Link>
            );
          })}
        </section>
      )}
    </main>
  );
}