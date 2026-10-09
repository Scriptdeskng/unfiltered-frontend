"use client";

import { useMemo, useState } from "react";
import { Heart, Share2 } from "lucide-react";
import type { Product, ProductColor, ProductVariant } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "../Common/CartContext";

const NO_COLOR: ProductColor = { name: "Default", hex: "#CCCCCC" };
const purchasable = (v: ProductVariant) => v.stock > 0 || v.allowBackorders;

export default function ProductInfo({ product }: { product: Product }) {
  const hasColors = product.colors.length > 0;
  const hasSizes = product.sizes.length > 0;

  const [color, setColor] = useState<ProductColor | undefined>(product.colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart, openCart } = useCart();

  // The exact SKU for the current color + size selection.
  const variant = useMemo(
    () =>
      product.variants.find(
        (v) =>
          (!hasColors || v.color === color?.name) && (!hasSizes || v.size === size)
      ),
    [product.variants, hasColors, hasSizes, color, size]
  );

  function sizeAvailable(s: string) {
    return product.variants.some(
      (v) => v.size === s && (!hasColors || v.color === color?.name) && purchasable(v)
    );
  }

  const displayPrice = variant?.price ?? product.price;
  const outOfStock = !!variant && !purchasable(variant);

  function handleAddToCart() {
    if (hasSizes && !size) {
      setSizeError(true);
      return;
    }
    if (!variant || outOfStock) return;

    addToCart({
      variantId: variant.id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: variant.image || product.images[0],
      price: variant.price,
      color: color ?? NO_COLOR,
      size: size ?? "One size",
      quantity,
    });
    openCart();
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mt-2">
        <h1 className="detail-boldtext">{product.name}</h1>
        <button type="button" aria-label="Share product" className="text-[#4C4C4C] hover:text-black">
          <Share2 size={20} />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <p className="text-[#0E1422] text-lg md:text-2xl font-semibold font-dm-sans">
          {formatPrice(displayPrice)}
        </p>
        {product.inStock && !outOfStock && (
          <span className="inline-block rounded-full border border-[1px] border-[#3D8F2D] bg-[#F6FFF5] px-3 py-1 text-xs uppercase font-normal font-dm-sans text-[#3D8F2D]">
            In stock
          </span>
        )}
        {outOfStock && (
          <span className="inline-block rounded-full border border-[#B42318] bg-[#FEF3F2] px-3 py-1 text-xs uppercase font-normal font-dm-sans text-[#B42318]">
            Out of stock
          </span>
        )}
      </div>

      {hasColors && (
        <div className="mt-4 md:mt-8">
          <p className="sort-available uppercase tracking-wide">Available colors</p>
          <div className="mt-3 flex gap-3">
            {product.colors.map((c) => {
              const isActive = c.name === color?.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  aria-pressed={isActive}
                  onClick={() => {
                    setColor(c);
                    setSize(null); 
                  }}
                  className="h-7 w-7 rounded-full transition-shadow"
                  style={{
                    backgroundColor: c.hex,
                    boxShadow: isActive ? `0 0 0 2px white, 0 0 0 4px ${c.hex}` : "none",
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {hasSizes && (
        <div className="mt-4 md:mt-8">
          <p className="sort-available uppercase tracking-wide">Select size</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const isActive = s === size;
              const available = sizeAvailable(s);
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={isActive}
                  disabled={!available}
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  className={`sort-text flex h-9 w-9 items-center justify-center rounded-md border text-sm font-dm-sans transition-colors ${
                    !available
                      ? "cursor-not-allowed border-[#E6E7E8] text-[#B5B7BC] line-through"
                      : isActive
                        ? "border-[#0E1422] text-[#0E1422] outline-none ring-1 ring-[#0E1422]"
                        : "border-[#E6E7E8] hover:border-[#0E1422]"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          {sizeError && <p className="mt-2 text-sm text-red-600">Pick a size to continue.</p>}
        </div>
      )}

      <div className="mt-4 md:mt-8">
        <p className="sort-available uppercase tracking-wide">Quantity</p>
        <div className="mt-3 inline-flex items-center gap-6 rounded-md border border-black/15 px-6 py-1">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-lg text-[#4C4C4C] hover:text-black"
          >
            −
          </button>
          <span className="w-4 text-center font-dm-sans">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() =>
              setQuantity((q) =>
                // cap at stock unless backorders are allowed
                variant && !variant.allowBackorders ? Math.min(variant.stock, q + 1) : q + 1
              )
            }
            className="text-lg text-[#4C4C4C] hover:text-black"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock || product.variants.length === 0}
          className="w-full max-w-sm rounded-md bg-tabs-btn px-6 py-3.5 font-dm-sans text-xs font-normal text-[#FFFFFF] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        >
          {outOfStock ? "Out of stock" : "Add to cart"}
        </button>
        <button
          type="button"
          aria-label="Add to wishlist"
          aria-pressed={wishlisted}
          onClick={() => setWishlisted((w) => !w)}
          className="flex h-[50px] w-[50px] items-center justify-center rounded-md border border-black/15 text-[#4C4C4C] hover:border-black/30"
        >
          <Heart size={18} fill={wishlisted ? "black" : "none"} />
        </button>
      </div>
    </div>
  );
}