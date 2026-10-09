"use client";

import { useState } from "react";
import { PRICE_MIN, type FilterOptions } from "@/lib/product";
import PriceRangeSlider from "../Common/PriceRangeSlider";

export type ShopFilters = {
  category: string | null;
  color: string | null;
  size: string | null;
  maxPrice: number;
};

type ShopSidebarProps = {
  filters: ShopFilters;
  onChange: (filters: ShopFilters) => void;
  options: FilterOptions;
};

export default function ShopSidebar({ filters, onChange, options }: ShopSidebarProps) {
  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const { categories, colors, sizes, priceMax } = options;

  return (
    <aside className="flex w-[248px] h-fit shrink-0 flex-col gap-10 rounded-[6px] border border-[#E6E7E8] pb-8 pl-4 pr-3 pt-6">
      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="sidebar-black">Categories</h3>
          <ul className="mt-4">
            {categories.map((category, i) => {
              const isActive = filters.category === category;
              return (
                <li
                  key={category}
                  className={`flex h-[49px] w-full items-center gap-2 py-3 pl-1 pr-1 ${
                    i < categories.length - 1 ? "border-b border-[#E9E9EB]" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      onChange({ ...filters, category: isActive ? null : category })
                    }
                    className="flex w-full items-center gap-2 text-left"
                  >
                    <span
                      aria-hidden
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                        isActive ? "border-[#3355CC] bg-[#3355CC]" : "border-[#E6E7E8] bg-white"
                      }`}
                    >
                      {isActive && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span
                      className={`sort-by transition-colors hover:text-black ${
                        isActive ? "font-medium text-black" : ""
                      }`}
                    >
                      {category}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Color */}
      {colors.length > 0 && (
        <div>
          <h3 className="sidebar-black">Color</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {colors.map((color) => {
              const isActive = filters.color === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  aria-label={color.name}
                  title={color.name}
                  aria-pressed={isActive}
                  onClick={() => onChange({ ...filters, color: isActive ? null : color.name })}
                  className="h-6 w-6 rounded-full transition-shadow"
                  style={{
                    backgroundColor: color.hex,
                    boxShadow: isActive ? `0 0 0 2px #ffffff, 0 0 0 3.5px #000000` : "none",
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Size */}
      {sizes.length > 0 && (
        <div>
          <h3 className="sidebar-black">Size</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {sizes.map((size) => {
              const isActive = filters.size === size;
              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onChange({ ...filters, size: isActive ? null : size })}
                  className={`sort-text flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm font-dm-sans transition-colors ${
                    isActive
                      ? "border-[#0E1422] text-[#0E1422] outline-none ring-1 ring-[#0E1422]"
                      : "border-[#E6E7E8] hover:border-[#0E1422]"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Price */}
      <div>
        <h3 className="sidebar-black">Price</h3>
        <PriceRangeSlider
          min={PRICE_MIN}
          max={priceMax}
          minValue={minPrice}
          maxValue={filters.maxPrice}
          onMinChange={setMinPrice}
          onMaxChange={(next) => onChange({ ...filters, maxPrice: next })}
        />
      </div>
    </aside>
  );
}