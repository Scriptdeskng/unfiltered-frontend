"use client";

import { formatPrice } from "@/lib/format";

type PriceRangeSliderProps = {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  step?: number;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

export default function PriceRangeSlider({
  min,
  max,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  step,
}: PriceRangeSliderProps) {
  // Bigger steps for bigger price ranges (e.g. naira), unless a step is passed in.
  const stepSize = step ?? (max >= 10000 ? 100 : max >= 1000 ? 10 : 1);

  // Keep values inside the track even if the filter state is briefly out of range
  // (e.g. before products load, or if the API fails).
  const safeMin = clamp(minValue, min, max);
  const safeMax = clamp(maxValue, min, max);
  const range = Math.max(max - min, 1); // avoids dividing by zero

  const minPercent = ((safeMin - min) / range) * 100;
  const maxPercent = ((safeMax - min) / range) * 100;

  return (
    <div className="relative mt-10 h-3 px-1">
      {/* full track */}
      <div className="absolute left-1 right-1 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#E6E7E8]" />

      {/* selected-range track */}
      <div
        className="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#0E1422]"
        style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
      />

      {/* max-value tooltip, with a small triangle pointer resting on the thumb */}
      <div
        className="pointer-events-none absolute top-7 z-40 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0E1422] px-3 py-1.5 text-xs text-white"
        style={{ left: `${maxPercent}%` }}
      >
        {formatPrice(safeMax)}
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#0E1422]" />
      </div>

      {/* min handle */}
      <input
        type="range"
        min={min}
        max={max}
        step={stepSize}
        value={safeMin}
        aria-label="Minimum price"
        onChange={(e) => onMinChange(Math.min(Number(e.target.value), safeMax - stepSize))}
        className="range-thumb-only accent-[#0E1422] absolute left-0 top-1/2 z-20 h-3 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent"
      />

      {/* max handle */}
      <input
        type="range"
        min={min}
        max={max}
        step={stepSize}
        value={safeMax}
        aria-label="Maximum price"
        onChange={(e) => onMaxChange(Math.max(Number(e.target.value), safeMin + stepSize))}
        className="range-thumb-only accent-[#0E1422] absolute left-0 top-1/2 z-30 h-3 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent"
      />
    </div>
  );
}