import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

const FALLBACK_IMG = "https://placehold.co/800x800/png?text=No+Image";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-gray-600">Could not load product with id: {id}</p>
      </main>
    );
  }

  const product: Product = await res.json();
  const image = product.images?.[0] ?? FALLBACK_IMG;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="mt-2 text-gray-300">${product.price}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-white/5">
          <Image
            src={image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="mt-2 text-white/70">{product.description}</p>

          <div className="mt-4 max-w-sm">
            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                image,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
