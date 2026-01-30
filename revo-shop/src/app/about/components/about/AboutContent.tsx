export default function AboutContent() {
  return (
    <>
      <h1 className="text-3xl font-bold">About Revo Shop</h1>

      <p className="mt-2 text-gray-400">
        Revo Shop is a simple Next.js + TypeScript project that demonstrates
        SSG, SSR, and client-side data fetching.
      </p>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">What this project includes</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-1">
          <li>Product listing from API</li>
          <li>Dynamic routing with App Router</li>
          <li>Server-side product detail page</li>
          <li>Client-side navigation</li>
        </ul>
      </section>
    </>
  );
}