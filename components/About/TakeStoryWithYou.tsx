import Link from "next/link";
import ProductCard from "@/components/Shop/ProductCard";
import { fetchAllProducts } from "@/http_instance/api";
import type { Product } from "@/lib/types";

export default async function TakeStoryWithYou() {
  let featuredProducts: Product[] = [];

  try {
    const all = await fetchAllProducts({ next: { revalidate: 60 } });
    featuredProducts = [...all]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 4);
  } catch {
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
      <h2 className="font-fraunces text-3xl font-normal text-black md:text-4xl lg:text-5xl">
        Take the story with you
      </h2>

      <p className="small-sub mx-auto mt-4 max-w-xl">
        Explore the official UNFILTERED collection, created to celebrate the
        stories, ideas, and conversations behind Beyond the Skin
      </p>

      {/* Product grid only appears when there are products, the text and button always show. */}
      {featuredProducts.length > 0 && (
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}

      <Link
        href="/shop"
        className="mt-14 inline-flex items-center justify-center rounded-md bg-black px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 md:text-base"
      >
        Shop the collection
      </Link>
    </section>
  );
}