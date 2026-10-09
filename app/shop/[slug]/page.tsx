import Link from "next/link";
import { notFound } from "next/navigation";
import LayoutWrap from "@/components/Layout/LayoutWrap";
import ProductGallery from "@/components/Product/ProductGallery";
import ProductInfo from "@/components/Product/ProductInfo";
import RelatedProducts, { ProductDescription } from "@/components/Product/RelatedProducts";
import PageHeader from "@/components/Common/PageHeader";
import { fetchAllProducts, fetchProductBySlug } from "@/http_instance/api";

// Refresh data every 60s instead of baking it in at build time.
export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const all = await fetchAllProducts();
    return all.map((p) => ({ slug: p.slug }));
  } catch {
    return []; // pages will be rendered on demand
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug, { next: { revalidate: 60 } });
  if (!product) notFound();

  let related: Awaited<ReturnType<typeof fetchAllProducts>> = [];
  try {
    const all = await fetchAllProducts({ next: { revalidate: 60 } });
    related = all.filter((p) => p.slug !== product.slug).slice(0, 4);
  } catch {
    /* related products are optional */
  }

  return (
    <LayoutWrap hasHero={false} topbarVariant="dark">
      <PageHeader
        title="Shop"
        subtitle="Explore the official UNFILTERED collection inspired by Chapter One: Beyond the Skin."
        hideSubtitleOnMobile
      />

      <div className="md:hidden mx-auto max-w-[1440px] px-6 pt-4 md:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="dropdown-text flex items-center gap-1.5 !text-[#5C5F6A]">
          <Link href="/shop" className="hover:text-black">Shop</Link>
          <span aria-hidden>/</span>
          <span className="!text-[#0E1422]">Product Detail</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-6 md:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>
          <ProductInfo product={product} />
        </div>
        <ProductDescription product={product} />
        <RelatedProducts products={related} />
      </div>
    </LayoutWrap>
  );
}