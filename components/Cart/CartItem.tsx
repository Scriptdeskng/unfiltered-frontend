import Image from "next/image";
import { X } from "lucide-react";
import type { CartLine } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/Common/CartContext";

export default function CartItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeLine } = useCart();

  return (
    <>
      {/* Mobile: boxed card */}
      <div className="rounded-lg border border-[#E6E7E8] p-4 md:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#EDEDED]">
              <Image src={line.image} alt={line.name} fill sizes="56px" className="object-contain p-1.5" />
            </div>
            <div>
              <p className="img-headtext !text-sm">{line.name}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="sort-by">Color:</span>
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: line.color.hex }}
                  aria-hidden
                />
                <span className="sort-by">— Size: {line.size}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            aria-label={`Remove ${line.name} from cart`}
            onClick={() => removeLine(line.productId, line.size, line.color)}
            className="text-[#9c9ca6] hover:text-black"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-md border border-black/15 px-2.5 py-1">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(line.productId, line.size, line.color, line.quantity - 1)}
              className="text-[#4C4C4C] hover:text-black"
            >
              −
            </button>
            <span className="w-3 text-center text-sm font-dm-sans">{line.quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => updateQuantity(line.productId, line.size, line.color, line.quantity + 1)}
              className="text-[#4C4C4C] hover:text-black"
            >
              +
            </button>
          </div>
          <p className="sub-textblack !text-sm font-medium">{formatPrice(line.price * line.quantity)}</p>
        </div>
      </div>

      {/* Desktop: horizontal row */}
      <div className="hidden items-center justify-between gap-4 md:flex">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-[#EDEDED]">
            <Image src={line.image} alt={line.name} fill sizes="64px" className="object-contain p-2" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="img-headtext !text-sm">{line.name}</p>
            <div className="flex items-center gap-1.5">
              <span className="sort-by">Color:</span>
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: line.color.hex }}
                aria-hidden
              />
              <span className="sort-by">— Size: {line.size}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-6">
          <p className="sub-textblack !text-sm">{formatPrice(line.price * line.quantity)}</p>
          <div className="flex items-center gap-3 rounded-md border border-black/15 px-2.5 py-1">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(line.productId, line.size, line.color, line.quantity - 1)}
              className="text-[#4C4C4C] hover:text-black"
            >
              −
            </button>
            <span className="w-3 text-center text-sm font-dm-sans">{line.quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => updateQuantity(line.productId, line.size, line.color, line.quantity + 1)}
              className="text-[#4C4C4C] hover:text-black"
            >
              +
            </button>
          </div>
          <button
            type="button"
            aria-label={`Remove ${line.name} from cart`}
            onClick={() => removeLine(line.productId, line.size, line.color)}
            className="rounded-md bg-[#F6F6F6] p-2 text-[#9c9ca6] hover:text-black"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </>
  );
}