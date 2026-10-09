"use client";

import { useState, useRef, useEffect } from "react";

export type SortOption = "featured" | "newest" | "price-asc" | "price-desc" | "alpha";

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price, Low to High" },
  { value: "price-desc", label: "Price, High to Low" },
  { value: "alpha", label: "Alphabetically, A-Z" },
];

// "Alphabetically, A-Z" is deliberately shortened to "A-Z" rather than left to
// truncate — everything else relies on CSS ellipsis inside the fixed-width button.
function displayLabel(value: SortOption, label: string) {
  return value === "alpha" ? "A-Z" : label;
}

type ShopSortProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
  resultCount: number;
  currentPage: number;
  pageSize: number;
};

export default function ShopSort({
  value,
  onChange,
  resultCount,
  currentPage,
  pageSize,
}: ShopSortProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0];

  const rangeStart = resultCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, resultCount);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between gap-4">
      <p className="sort-text whitespace-nowrap">
        Showing {rangeStart}–{rangeEnd} of {resultCount} results
      </p>

      <div className="flex items-center gap-3">
        <span className="sort-by whitespace-nowrap">Sort by:</span>

        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="box-text flex w-[92px] items-center justify-between gap-1.5 rounded-md border border-black/15 bg-white px-3 py-2 text-left text-sm"
          >
            <span className="truncate">{displayLabel(value, current.label)}</span>
            <span aria-hidden className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>
              ⌄
            </span>
          </button>

          {open && (
            <ul
              role="listbox"
              className="absolute right-0 z-20 mt-2 w-[190px] rounded-md border border-black/10 bg-white py-2 shadow-lg"
            >
              {OPTIONS.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={option.value === value}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`dropdown-text block w-full px-4 py-2 text-left text-sm hover:bg-black/5 ${
                      option.value === value ? "text-black" : "text-[#474B57]"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}