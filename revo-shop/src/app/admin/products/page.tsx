import ProductListClient from "./ProductListClient";

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

  return <ProductListClient products={products} />;
}