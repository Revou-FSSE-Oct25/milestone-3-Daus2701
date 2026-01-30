import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

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
  const image =
    product.images && product.images.length > 0
    ? product.images[0]
    : null;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="mt-2 text-gray-300">${product.price}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
                src={image || "https://placehold.co/800x800?text=No+Image"}
                alt={product.title}
                width={800}
                height={800}
                className="h-full w-full object-cover"
            />
        </div>

        <div>
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="mt-2 text-gray-300">{product.description}</p>
        </div>
      </div>
    </main>
  );
}