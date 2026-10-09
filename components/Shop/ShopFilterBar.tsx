"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { PRICE_MIN, type FilterOptions } from "@/lib/product";
import PriceRangeSlider from "../Common/PriceRangeSlider";
import type { ShopFilters } from "./ShopSidebar";

type FilterKey = "category" | "color" | "size" | "price";

type ShopFilterBarProps = {
  filters: ShopFilters;
  onChange: (filters: ShopFilters) => void;
  options: FilterOptions;
};

export default function ShopFilterBar({ filters, onChange, options }: ShopFilterBarProps) {
  const { categories, colors, sizes, priceMax } = options;

  const [open, setOpen] = useState<Record<FilterKey, boolean>>({
    category: false,
    color: false,
    size: false,
    price: false,
  });
  const [minPrice, setMinPrice] = useState(PRICE_MIN);

  // Only offer filters that actually have options.
  const filterKeys: { key: FilterKey; label: string }[] = [
    ...(categories.length ? [{ key: "category" as const, label: "Category" }] : []),
    ...(colors.length ? [{ key: "color" as const, label: "Colors" }] : []),
    ...(sizes.length ? [{ key: "size" as const, label: "Size" }] : []),
    { key: "price" as const, label: "Price" },
  ];

  const anyOpen = Object.values(open).some(Boolean);

  function toggle(key: FilterKey) {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function clearAll() {
    onChange({ category: null, color: null, size: null, maxPrice: priceMax });
    setMinPrice(PRICE_MIN);
    setOpen({ category: false, color: false, size: false, price: false });
  }

  function isActive(key: FilterKey) {
    if (key === "category") return !!filters.category;
    if (key === "color") return !!filters.color;
    if (key === "size") return !!filters.size;
    return filters.maxPrice < priceMax || minPrice > PRICE_MIN;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="dropdown-text flex items-center gap-2">
          <SlidersHorizontal size={16} />
          {anyOpen ? "Filter Option" : "Filter"}
        </span>
        {anyOpen && (
          <button type="button" onClick={clearAll} className="dropdown-text underline underline-offset-2">
            Clear all
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {filterKeys
          .filter(({ key }) => !open[key])
          .map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              className={`box-text flex items-center gap-1.5 rounded-lg border px-4 py-2 transition-colors ${
                isActive(key) ? "border-[#0E1422] text-[#0E1422]" : "border-[#E6E7E8]"
              }`}
            >
              {label}
              <ChevronDown size={12} aria-hidden />
            </button>
          ))}
      </div>

      {open.category && (
        <FilterSection label="Category" onCollapse={() => toggle("category")}>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.category === category}
                  onChange={() =>
                    onChange({ ...filters, category: filters.category === category ? null : category })
                  }
                  className="h-4 w-4 accent-blue"
                />
                <span className="dropdown-text">{category}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {open.color && (
        <FilterSection label="Colors" onCollapse={() => toggle("color")}>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {colors.map((color) => (
              <label key={color.name} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.color === color.name}
                  onChange={() =>
                    onChange({ ...filters, color: filters.color === color.name ? null : color.name })
                  }
                  className="h-4 w-4 accent-blue"
                />
                <span
                  aria-hidden
                  className="h-3.5 w-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="dropdown-text">{color.name}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {open.size && (
        <FilterSection label="Size" onCollapse={() => toggle("size")}>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const active = filters.size === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onChange({ ...filters, size: active ? null : size })}
                  className={`box-text flex h-9 min-w-9 items-center justify-center rounded-md border px-2 transition-colors ${
                    active
                      ? "border-[#0E1422] text-[#0E1422] ring-1 ring-[#0E1422]"
                      : "border-[#E6E7E8] hover:border-[#0E1422]"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </FilterSection>
      )}

      {open.price && (
        <FilterSection label="Price" onCollapse={() => toggle("price")}>
          <PriceRangeSlider
            min={PRICE_MIN}
            max={priceMax}
            minValue={minPrice}
            maxValue={filters.maxPrice}
            onMinChange={setMinPrice}
            onMaxChange={(next) => onChange({ ...filters, maxPrice: next })}
          />
        </FilterSection>
      )}
    </div>
  );
}

function FilterSection({
  label,
  onCollapse,
  children,
}: {
  label: string;
  onCollapse: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 border-t border-[#E9E9EB] pt-6">
      <div className="flex items-center justify-between">
        <p className="sidebar-black font-medium">{label}</p>
        <button type="button" onClick={onCollapse} aria-label={`Collapse ${label} filter`}>
          <ChevronUp size={16} className="text-[#5C5F6A]" />
        </button>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}