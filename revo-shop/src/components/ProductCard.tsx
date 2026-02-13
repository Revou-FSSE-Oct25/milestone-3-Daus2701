import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "@/hooks/useProducts";

const FALLBACK_IMG = "https://placehold.co/300x300/png";

function getSafeImageUrl(images: string[] | undefined): string {
  const raw = images?.[0];
  if (!raw) return FALLBACK_IMG;

  const cleaned = raw.trim().replace(/^"+|"+$/g, "");
  if (!/^https?:\/\//.test(cleaned)) return FALLBACK_IMG;

  const isImageFile = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(cleaned);
  return isImageFile ? cleaned : FALLBACK_IMG;
}

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = getSafeImageUrl(product.images);

  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
      <Link
        href={`/products/${product.id}`}
        className="group block outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-lg"
      >
        <div className="relative aspect-square overflow-hidden rounded-lg bg-white/5">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover transition group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        <div className="mt-3">
          <h3 className="line-clamp-2 font-semibold">{product.title}</h3>
          <p className="mt-1 text-sm text-white/70">${product.price}</p>
        </div>
      </Link>

      <div className="mt-3">
        <AddToCartButton
          product={{
            id: product.id,
            title: product.title,
            price: product.price,
            image: imageUrl,
          }}
        />
      </div>
    </div>
  );
}
