"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Category = { id: number; name: string };

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(1);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);

  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setError("Failed to load categories"));
  }, []);

  async function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    await api.post("/products", {
      title,
      price,
      description,
      categoryId,
      images: ["https://placehold.co/600x400/png"],
    });

    toast.success("Product created successfully!");
    router.push("/admin/products");
    router.refresh();
  } catch (err: any) {
    const msg = err?.response?.data?.message ?? "Failed to create product";
    toast.error(msg);
    setError(msg);
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold">New Product</h1>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input
          className="w-full rounded border p-2 bg-transparent"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full rounded border p-2 bg-transparent"
          placeholder="Price"
          type="number"
          min={1}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <textarea
          className="w-full rounded border p-2 bg-transparent"
          placeholder="Description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full rounded border p-2 bg-black"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          <option value={0}>Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          className="rounded border px-4 py-2 hover:bg-white/10"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}