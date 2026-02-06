import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/60">
          © {year} Revo Shop. Built with Next.js + TypeScript.
        </p>

        <nav className="flex gap-4 text-sm">
          <Link href="/" className="text-white/70 hover:text-white hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-white/70 hover:text-white hover:underline">
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
