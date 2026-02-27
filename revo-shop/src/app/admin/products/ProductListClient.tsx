"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

type Product = {
  id: number;
  title: string;
  price: number;
};

type SortKey = "title_asc" | "title_desc" | "price_asc" | "price_desc";

export default function ProductListClient({ products }: { products: Product[] }) {
  // Search
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  // Sorting
  const [sort, setSort] = useState<SortKey>("title_asc");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when query/pageSize changes
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, pageSize, sort]);

  const filteredAndSorted = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    const filtered = !q
      ? products
      : products.filter((p) => p.title.toLowerCase().includes(q));

    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case "title_asc":
          return a.title.localeCompare(b.title);
        case "title_desc":
          return b.title.localeCompare(a.title);
        case "price_asc":
          return (a.price ?? 0) - (b.price ?? 0);
        case "price_desc":
          return (b.price ?? 0) - (a.price ?? 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, debouncedQuery, sort]);

  const total = filteredAndSorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Clamp page if total pages shrink
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paged = filteredAndSorted.slice(start, end);

  return (
    <main className="p-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Manage Products</h1>

        <Link
          href="/admin/products/new"
          className="rounded border px-3 py-1 hover:bg-white/10"
        >
          + New Product
        </Link>
      </div>

      {/* Search + count */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md rounded border bg-transparent p-2"
        />

        <div className="text-sm opacity-70">
          {total} result{total !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Sort + page size */}
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          className="w-full sm:w-56 rounded border bg-black p-2"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
        >
          <option value="title_asc">Title (A → Z)</option>
          <option value="title_desc">Title (Z → A)</option>
          <option value="price_asc">Price (Low → High)</option>
          <option value="price_desc">Price (High → Low)</option>
        </select>

        <select
          className="w-full sm:w-44 rounded border bg-black p-2"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>

      {/* List */}
      <div className="mt-6 space-y-3">
        {paged.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded border p-3"
          >
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-sm opacity-70">${p.price}</div>
            </div>

            <Link
              href={`/admin/products/${p.id}`}
              className="text-sm underline hover:opacity-80"
            >
              Edit
            </Link>
          </div>
        ))}

        {total === 0 && (
          <div className="rounded border p-4 opacity-70">
            No products match “{debouncedQuery}”.
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {total > 0 && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm opacity-70">
            Showing {Math.min(start + 1, total)}–{Math.min(end, total)} of {total}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded border px-3 py-1 hover:bg-white/10 disabled:opacity-50"
              onClick={() => setPage(1)}
              disabled={page === 1}
              type="button"
            >
              First
            </button>

            <button
              className="rounded border px-3 py-1 hover:bg-white/10 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              type="button"
            >
              Prev
            </button>

            <div className="px-2 text-sm">
              Page <span className="font-medium">{page}</span> / {totalPages}
            </div>

            <button
              className="rounded border px-3 py-1 hover:bg-white/10 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              type="button"
            >
              Next
            </button>

            <button
              className="rounded border px-3 py-1 hover:bg-white/10 disabled:opacity-50"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              type="button"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </main>
  );
}