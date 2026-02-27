"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Category = { id: number; name: string };

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images?: string[];
  category?: { id: number };
};

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(1);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string>(""); // string so "Select category" works
  const [imagesText, setImagesText] = useState(""); // comma-separated input

  const imagesArray = useMemo(() => {
    const arr = imagesText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    return arr.length > 0 ? arr : ["https://placehold.co/600x400/png"];
  }, [imagesText]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get("/categories"),
        ]);

        if (!mounted) return;

        const product: Product = prodRes.data;
        const list = Array.isArray(catRes.data) ? catRes.data : [];

        setCategories(list);

        setTitle(product.title ?? "");
        setPrice(Number(product.price ?? 1));
        setDescription(product.description ?? "");

        // Keep Select category correct:
        // - if product has category, use it
        // - otherwise keep "" so user must choose
        const cid = product.category?.id;
        setCategoryId(cid ? String(cid) : "");

        // Images input
        const imgs = Array.isArray(product.images) ? product.images : [];
        setImagesText(imgs.join(", "));
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [id]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Validate category
    const isValidCategory = categories.some((c) => c.id === Number(categoryId));
    if (!isValidCategory) {
      const msg = "Please select a valid category";
      toast.error(msg);
      setError(msg);
      setSaving(false);
      return;
    }

    const toastId = toast.loading("Updating product...");

    try {
      const payload = {
        title: title.trim(),
        price: Number(price),
        description: description.trim(),
        categoryId: Number(categoryId),
        images: imagesArray,
      };

      await api.put(`/products/${id}`, payload);

      toast.success("Product updated successfully!", { id: toastId });
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Failed to update product";
      toast.error(msg, { id: toastId });
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const toastId = toast.loading("Deleting product...");

    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted!", { id: toastId });
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Failed to delete product";
      toast.error(msg, { id: toastId });
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
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled>
            Select category
          </option>

          {categories.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          className="w-full rounded border p-2 bg-transparent"
          placeholder="Images (comma-separated URLs)"
          value={imagesText}
          onChange={(e) => setImagesText(e.target.value)}
        />

        <button
          className="rounded border px-4 py-2 hover:bg-white/10 disabled:opacity-50"
          disabled={saving || categoryId === ""}
        >
          {saving ? "Saving..." : "Save"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}