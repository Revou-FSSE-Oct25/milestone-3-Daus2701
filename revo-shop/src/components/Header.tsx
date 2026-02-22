"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { data: session } = useSession();

  const role = (session as any)?.role;

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="font-semibold text-white">
          Revo Shop
        </Link>

        <nav className="flex items-center gap-4 text-sm text-white/80">
          <Link className={isActive("/") ? "text-white" : ""} href="/">
            Home
          </Link>
          <Link className={isActive("/about") ? "text-white" : ""} href="/about">
            About
          </Link>

          <Link className={isActive("/cart") ? "text-white" : ""} href="/cart">
            Cart
            {totalItems > 0 && (
              <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* AUTH SECTION */}
          {!session ? (
            <Link href="/login" className="hover:text-white">
              Login
            </Link>
          ) : (
            <>
              <span className="text-xs text-white/70">
                {session.user?.email} ({role})
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hover:text-white"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}