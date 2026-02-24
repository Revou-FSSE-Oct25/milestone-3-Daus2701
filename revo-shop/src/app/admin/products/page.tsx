import Link from "next/link";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Products</h1>

        <Link
          href="/admin/products/new"
          className="rounded border px-3 py-1 hover:bg-white/10"
        >
          + New Product
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {products.map((p: any) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded border p-3"
          >
            <span>{p.title}</span>

            <Link
              href={`/admin/products/${p.id}`}
              className="text-sm underline"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}