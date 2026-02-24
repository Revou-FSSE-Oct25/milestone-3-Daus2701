import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

function validateProduct(body: any) {
  const title = String(body?.title ?? "").trim();
  const price = Number(body?.price);
  const description = String(body?.description ?? "").trim();
  const categoryId = Number(body?.categoryId);

  if (title.length < 3) return "Title must be at least 3 characters";
  if (!Number.isFinite(price) || price <= 0) return "Price must be a positive number";
  if (description.length < 10) return "Description must be at least 10 characters";
  if (!Number.isFinite(categoryId) || categoryId <= 0) return "Category is required";

  return null;
}

async function requireAdmin() {
  const session = await auth();
  const role = (session as any)?.role;
  if (!session || role !== "admin") return null;
  return session;
}

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;

  const res = await fetch(`${process.env.PLATZI_API}/products/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.ok ? 200 : 404 });
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const body = await req.json();

  const error = validateProduct(body);
  if (error) return NextResponse.json({ message: error }, { status: 400 });

  const payload = {
    title: body.title,
    price: Number(body.price),
    description: body.description,
    categoryId: Number(body.categoryId),
    images: Array.isArray(body.images) && body.images.length > 0
      ? body.images
      : ["https://placehold.co/600x400/png"],
  };

  const res = await fetch(`${process.env.PLATZI_API}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.ok ? 200 : 400 });
}

export async function DELETE(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;

  const res = await fetch(`${process.env.PLATZI_API}/products/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.ok ? 200 : 400 });
}