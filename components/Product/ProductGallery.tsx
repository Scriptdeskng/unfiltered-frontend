"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="overflow-hidden rounded-lg bg-[#EDEDED]">
      <div className="relative aspect-square">
        <Image
          src={images[active]}
          alt={name}
          fill
          sizes="(min-width: 668px) 580px, 70vw"
          className="object-contain px-10"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-3 p-4">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white transition-opacity ${
                i === active ? "ring-2 ring-black" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}