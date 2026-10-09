import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block text-left">
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-lg bg-transparent">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 300px, 45vw"
          className="object-contain p-8 transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <p className="shop-name">{product.name}</p>
      </div>
      <p className="shop-price">{formatPrice(product.price)}</p>
    </Link>
  );
}