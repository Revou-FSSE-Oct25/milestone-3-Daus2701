"use client";

interface Product {
  title: string;
  description: string;
  price: number;
  images: string[];
}

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="p-6 flex flex-col md:flex-row gap-8">
      <img src={product.images[0]} className="w-full md:w-96 rounded shadow" />

      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-3xl text-blue-600 font-bold mt-4">${product.price}</p>

        <button
          onClick={() => alert("🛒 Added to cart!")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}