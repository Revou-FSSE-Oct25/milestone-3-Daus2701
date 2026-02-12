import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

const FALLBACK_IMG = "https://placehold.co/800x800/png?text=No+Image"; // png avoids svg warning

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </main>
    );
  }

  const product: Product = await res.json();
  const image = product.images?.[0] || FALLBACK_IMG;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="mt-2 text-gray-300">${product.price}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg bg-white/5">
          <Image
            src={image}
            alt={product.title}
            width={800}
            height={800}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="mt-2 text-gray-300">{product.description}</p>

          <AddToCartButton
            id={product.id}
            title={product.title}
            price={product.price}
            image={image}
          />
        </div>
      </div>
    </main>
  );
}
