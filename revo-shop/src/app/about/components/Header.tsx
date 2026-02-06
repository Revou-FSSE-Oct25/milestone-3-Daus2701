"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "text-sm transition",
        isActive ? "text-white font-semibold" : "text-white/70 hover:text-white",
      ].join(" ")}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Revo Shop
        </Link>

        <nav className="flex gap-4">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
        </nav>
      </div>
    </header>
  );
}
