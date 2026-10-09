import type { Product } from "@/lib/types";
import ProductCard from "@/components/Shop/ProductCard";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <div className="w-full mt-6">
      <h2 className="text-[#0E1422] text-lg md:text-xl font-normal font-dm-sans leading-[100%]">Description</h2>
      <p className="sort-by mt-3">{product.description}</p>
      <ul className="mt-4 space-y-1.5">
        {product.specs.map((spec) => (
          <li key={spec} className="sort-by">
            • {spec}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div className="mt-20">
      <h2 className="detail-boldtext">You might also like</h2>
      <p className="sort-text !text-[#878A92] mt-1">Similar products</p>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}