"use client";

import Image from "next/image";
import { X } from "lucide-react";
import type { CartLine } from "@/lib/types";
import { formatPrice } from "@/lib/format";

type OrderConfirmedModalProps = {
  lines: CartLine[];
  onClose: () => void;
};

export default function OrderConfirmedModal({ lines, onClose }: OrderConfirmedModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Order confirmed"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[888px] min-h-[466px] rounded-[10px] bg-white p-6 text-center shadow-xl sm:p-8">
        <div className="flex justify-end">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="bg-[#F6F6F6] p-2 rounded-md text-[#9c9ca6] hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        <h2 className="header !font-dm-sans !text-[#0E1422] !lg:text-3xl uppercase">Order Confirmed</h2>
        <div className="border-t border-[1px] border-[#E9E9EB] mt-6 md:w-lg mx-auto"></div>
        <p className="sub-header !text-2xl !font-medium mt-14">Thank you for carrying the story forward.</p>
        <p className="confirmed-description md:w-xl mx-auto mt-4">
          Your order has been successfully placed and a confirmation has been sent to your email.
        </p>

        <div className="mt-6 space-y-3 text-left">
          {lines.map((line) => (
            <div
              key={`${line.productId}-${line.size}-${line.color.name}`}
              className="flex items-center gap-3 rounded-md border border-black/10 p-3"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[#EDEDED]">
                <Image src={line.image} alt={line.name} fill sizes="48px" className="object-contain p-1" />
              </div>
              <div className="flex-1">
                <p className="sidebar-black">{line.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className="sort-by">Color: </span>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: line.color.hex }} />
                  <span className="sort-by">— Size: {line.size}</span>
                </div>
              </div>
              <p className="sidebar-black">{formatPrice(line.price * line.quantity)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
