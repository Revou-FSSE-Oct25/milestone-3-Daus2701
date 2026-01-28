"use client";

import ProductCard from "./ProductCard";

export default function ProductList({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}