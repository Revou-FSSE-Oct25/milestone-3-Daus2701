"use client";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col">
      <img src={product.images[0]} className="w-full h-40 object-cover rounded" />

      <h3 className="font-semibold mt-2 line-clamp-1">{product.title}</h3>
      <p className="text-blue-600 font-bold">${product.price}</p>

      <div className="mt-auto flex gap-2 pt-3">
        <a
          href={`/product/${product.id}`}
          className="flex-1 px-3 py-2 text-center border rounded hover:bg-gray-100 transition"
        >
          View
        </a>
        <button
          onClick={() => alert("🛒 Added to cart!")}
          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}