"use client";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm">
      <h1 className="text-xl font-bold">RevoShop</h1>

      <nav className="flex gap-4 text-sm">
        <a href="/" className="hover:underline">Home</a>
        <a href="/products" className="hover:underline">Products</a>
        <a href="/about" className="hover:underline">About</a>
      </nav>
    </header>
  );
}

export function HeaderCompact() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm">
      <h1 className="text-xl font-bold">RevoShop</h1>

      <nav className="flex gap-4 text-sm">
        <a href="/" className="hover:underline">Home</a>
        <a href="/products" className="hover:underline">Products</a>
        <a href="/about" className="hover:underline">About</a>
      </nav>
    </header>
  );
}