import Image from "next/image";
import { X } from "lucide-react";
import { useCart } from "../Common/CartContext";
import { formatPrice } from "@/lib/format";

export default function OrderSummary() {
  const { lines, removeLine, subtotal, shipping, tax, total } = useCart();

  return (
    <div className="rounded-lg border border-[#616161]/38 p-6">
      <h2 className="sidebar-black">Order Summary</h2>

      <div className="mt-5 space-y-4">
        {lines.map((line) => (
          <div key={`${line.productId}-${line.size}-${line.color.name}`} className="flex gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#EDEDED]">
              <Image src={line.image} alt={line.name} fill sizes="56px" className="object-contain p-1.5" />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <p className="img-headtext !text-sm">{line.name}</p>
                <button
                  type="button"
                  aria-label={`Remove ${line.name}`}
                  onClick={() => removeLine(line.productId, line.size, line.color)}
                  className="bg-[#F6F6F6] p-2 rounded-md text-[#9c9ca6] hover:text-black"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="sort-by">Color</span>
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: line.color.hex }} />
                <span className="sort-by">— {line.size}</span>
              </div>
              <p className="sub-textblack mt-1 !text-sm">{formatPrice(line.price * line.quantity)}</p>
            </div>
          </div>
        ))}
      </div>

      <dl className="mt-6 space-y-4 border-t border-black/10 pt-4">
        <div className="flex justify-between">
          <dt className="sort-by">Subtotal</dt>
          <dd className="sidebar-black !text-sm">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="sort-by">Shipping</dt>
          <dd className="sub-textblack !text-sm">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="sort-by">Tax</dt>
          <dd className="sub-textblack !text-sm">{formatPrice(tax)}</dd>
        </div>
        <div className="flex justify-between border-t border-black/10 pt-4">
          <dt className="shop-name !leading-[175%]">Total</dt>
          <dd className="shop-name !leading-[100%]">{formatPrice(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
