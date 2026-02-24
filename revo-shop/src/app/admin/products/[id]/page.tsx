"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

type Category = { id: number; name: string };

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(1);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);

  useEffect(() => {
    async function load() {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get("/categories"),
        ]);

        const p = prodRes.data;
        setTitle(p.title ?? "");
        setPrice(Number(p.price ?? 1));
        setDescription(p.description ?? "");
        setCategoryId(Number(p.category?.id ?? 0));
        setCategories(catRes.data ?? []);
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await api.put(`/products/${id}`, {
        title,
        price,
        description,
        categoryId,
        images: ["https://placehold.co/600x400/png"],
      });

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Failed to delete product");
    }
  }

  if (loading) return <main className="p-6">Loading...</main>;

  return (
    <main className="p-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Product</h1>

        <button
          onClick={onDelete}
          className="rounded border px-3 py-1 text-red-400 hover:bg-white/10"
          type="button"
        >
          Delete
        </button>
      </div>

      <form onSubmit={onSave} className="mt-4 space-y-3">
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
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}