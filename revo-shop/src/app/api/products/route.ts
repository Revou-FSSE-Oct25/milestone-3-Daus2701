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

export async function GET() {
  const res = await fetch(`${process.env.PLATZI_API}/products`, {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  // Security: admin only
  const session = await auth();
  const role = (session as any)?.role;
  if (!session || role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const error = validateProduct(body);

  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const payload = {
    title: body.title,
    price: Number(body.price),
    description: body.description,
    categoryId: Number(body.categoryId),
    images: Array.isArray(body.images) && body.images.length > 0
      ? body.images
      : ["https://placehold.co/600x400/png"],
  };

  const res = await fetch(`${process.env.PLATZI_API}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.ok ? 201 : 400 });
}