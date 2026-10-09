import type { Product, ProductVariant } from "../lib/types";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.kalonnbloom.com";

const UNFILTERED_PRODUCTS = "/api/products/categories/unfiltered/products/";
export const PLACEHOLDER_IMAGE = "/products/classic.svg"; 


interface ApiVariant {
  id: number;
  image: string | null;
  color: { id: number; name: string; hex_code: string } | null;
  size: { id: number; name: string } | null;
  stock: number;
  allow_backorders: boolean;
  current_price: string;
}

interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  category: { name: string } | null;
  description: string;
  care_description: string;
  sustainability_description: string;
  dimensions: string;
  min_price: string;
  usd_price: string;
  ngn_price: string;
  created_at: string;
  is_in_stock: boolean;
  images: { image: string; is_featured: boolean }[];
  variants: ApiVariant[];
}

interface Paginated<T> {
  next: string | null;
  results: T[];
}

// helpers
export function absUrl(u?: string | null): string {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  return `${API_BASE}${u.startsWith("/") ? "" : "/"}${u}`;
}

const num = (v: string | number | null | undefined) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export function toProduct(p: ApiProduct): Product {
  const basePrice = num(p.min_price) || num(p.ngn_price) || num(p.usd_price);

  const colors = new Map<string, { name: string; hex: string }>();
  const sizes = new Set<string>();
  for (const v of p.variants ?? []) {
    if (v.color) colors.set(v.color.name, { name: v.color.name, hex: v.color.hex_code });
    if (v.size) sizes.add(v.size.name);
  }

  const variants: ProductVariant[] = (p.variants ?? []).map((v) => ({
    id: v.id,
    color: v.color?.name ?? null,
    size: v.size?.name ?? null,
    stock: v.stock,
    allowBackorders: v.allow_backorders,
    price: num(v.current_price) || basePrice,
    image: absUrl(v.image),
  }));

  const images = [...(p.images ?? [])]
    .sort((a, b) => Number(b.is_featured) - Number(a.is_featured))
    .map((i) => absUrl(i.image))
    .filter(Boolean);

  const specs = [
    p.dimensions && `Dimensions: ${p.dimensions}`,
    p.care_description && `Care: ${p.care_description}`,
    p.sustainability_description && `Sustainability: ${p.sustainability_description}`,
  ].filter(Boolean) as string[];

  return {
    id: String(p.id),
    slug: p.slug,
    name: p.name,
    category: p.category?.name ?? "",
    price: basePrice,
    images: images.length ? images : [PLACEHOLDER_IMAGE],
    colors: [...colors.values()],
    sizes: [...sizes],
    description: p.description,
    specs,
    inStock: p.is_in_stock,
    createdAt: p.created_at,
    variants,
  };
}

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url.startsWith("http") ? url : `${API_BASE}${url}`, {
    headers: { Accept: "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status} for ${url}`);
  return res.json() as Promise<T>;
}

export async function fetchAllProducts(init?: RequestInit): Promise<Product[]> {
  const out: ApiProduct[] = [];
  let url: string | null = UNFILTERED_PRODUCTS;
  while (url) {
    const page: Paginated<ApiProduct> = await getJson(url, init);
    out.push(...page.results);
    url = page.next;
  }
  return out.map(toProduct);
}

export async function fetchProductBySlug(
  slug: string,
  init?: RequestInit
): Promise<Product | null> {
  try {
    const all = await fetchAllProducts(init);
    return all.find((p) => p.slug === slug) ?? null;
  } catch {
    return null;
  }
}