"use client";

import { useEffect, useMemo, useState } from "react";
import LayoutWrap from "@/components/Layout/LayoutWrap";
import PageHeader from "@/components/Common/PageHeader";
import ShopSidebar, { type ShopFilters } from "@/components/Shop/ShopSidebar";
import ShopFilterBar from "@/components/Shop/ShopFilterBar";
import ShopSort, { type SortOption } from "@/components/Shop/ShopSort";
import ProductGrid from "@/components/Shop/ProductGrid";
import BePart from "@/components/About/BePart";
import Pagination from "@/components/Shop/Pagination";
import { fetchAllProducts } from "@/http_instance/api";
import type { Product } from "@/lib/types";
import { buildFilterOptions } from "@/lib/product";

const PAGE_SIZE = 9;

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<ShopFilters>({
    category: null,
    color: null,
    size: null,
    maxPrice: 890,
  });
  const [sort, setSort] = useState<SortOption>("alpha");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    fetchAllProducts({ signal: controller.signal })
      .then((list) => {
        setProducts(list);
        // Start the price filter at the highest real price so nothing is hidden by default.
        setFilters((f) => ({ ...f, maxPrice: buildFilterOptions(list).priceMax }));
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError("We couldn't load products. Please try again.");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const options = useMemo(() => buildFilterOptions(products), [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (p.price > filters.maxPrice) return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.color && !p.colors.some((c) => c.name === filters.color)) return false;
      if (filters.size && !p.sizes.includes(filters.size)) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "alpha":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [products, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilterChange(next: ShopFilters) {
    setFilters(next);
    setPage(1);
  }

  return (
    <LayoutWrap hasHero={false} topbarVariant="dark">
      <div className="bg-[#F5F5F5]">
        <PageHeader
          title="Shop"
          subtitle="Explore the official UNFILTERED collection inspired by Chapter One: Beyond the Skin."
        />

        <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-10 md:px-8">
          <div className="mb-6 md:hidden">
            <ShopFilterBar filters={filters} onChange={handleFilterChange} options={options} />
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:gap-12">
            <div className="hidden md:block">
              <ShopSidebar filters={filters} onChange={handleFilterChange} options={options} />
            </div>

            <div className="flex-1">
              <div className="mb-8">
                <ShopSort
                  value={sort}
                  onChange={setSort}
                  resultCount={filtered.length}
                  currentPage={page}
                  pageSize={PAGE_SIZE}
                />
              </div>

              {loading ? (
                <p className="py-20 text-center text-sm text-[#5C5F6A]">Loading products…</p>
              ) : error ? (
                <p className="py-20 text-center text-sm text-red-600">{error}</p>
              ) : filtered.length === 0 ? (
                <p className="py-20 text-center text-sm text-[#5C5F6A]">
                  No products found.
                </p>
              ) : (
                <>
                  <ProductGrid products={pageItems} />
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <BePart />
    </LayoutWrap>
  );
}