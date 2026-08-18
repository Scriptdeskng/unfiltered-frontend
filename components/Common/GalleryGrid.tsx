"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export type GalleryItem = {
  src: string;
  alt: string;
  aspect?: string;
};

export type GalleryRow = {
  cols: 2 | 3;
  items: GalleryItem[];
};

type GalleryGridProps = {
  rows: GalleryRow[];
};

export default function GalleryGrid({ rows }: GalleryGridProps) {
  return (
    <div className="mt-10 md:mt-12">
      {/* Desktop / tablet — stacked rows */}
      <div className="hidden space-y-4 md:block md:space-y-5">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid gap-4 md:gap-5 ${
              row.cols === 2 ? "grid-cols-2" : "grid-cols-3"
            }`}
          >
            {row.items.map((item) => (
              <div
                key={item.src}
                className={`relative w-full overflow-hidden ${
                  item.aspect ?? (row.cols === 2 ? "aspect-[4/5]" : "aspect-[4/3]")
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={row.cols === 2 ? "50vw" : "33vw"}
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile — one horizontal rail per row */}
      <div className="space-y-8 md:hidden">
        {rows.map((row, i) => (
          <MobileRail key={i} row={row} />
        ))}
      </div>
    </div>
  );
}

function MobileRail({ row }: { row: GalleryRow }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / (el.clientWidth * 0.82));
    setActive(Math.min(index, row.items.length - 1));
  };

  const scrollTo = (index: number) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={railRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {row.items.map((item) => (
          <div
            key={item.src}
            className={`relative w-[82%] shrink-0 snap-start overflow-hidden ${
              item.aspect ?? "aspect-[4/5]"
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="82vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="mt-4 flex justify-center gap-2">
        {row.items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-black" : "w-1.5 bg-black/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}