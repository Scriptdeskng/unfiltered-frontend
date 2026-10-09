"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { useCart } from "@/components/Common/CartContext";
import { formatPrice } from "@/lib/format";
import CartItem from "./CartItem";

export default function CartModal() {
  const { isCartOpen, closeCart, lines, subtotal, tax, total } = useCart();
  const router = useRouter();

  if (!isCartOpen) return null;

  function handleCheckout() {
    closeCart();
    router.push("/checkout");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 md:px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Your cart"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
    >
      <div className="flex h-full w-full flex-col overflow-y-auto bg-white p-5 sm:p-6 md:h-auto md:max-h-[90vh] md:max-w-[1159px] md:rounded-[10px]  md:p-8 md:shadow-xl">
        <button
          type="button"
          onClick={closeCart}
          className="dropdown-text mb-4 flex items-center gap-2 md:hidden"
        >
          <ArrowLeft size={18} />
          Shop
        </button>
        <div className="mb-4 border-b border-[#E9E9EB] md:hidden" />

        <div className="flex items-center justify-between">
          <h2 className="header">Your cart</h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="rounded-md bg-[#F6F6F6] p-2 text-[#9c9ca6] hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        {lines.length === 0 ? (
          <p className="sidebar-black mt-10 text-center">Your cart is empty.</p>
        ) : (
          <div className="mt-6 flex flex-1 flex-col gap-8 md:flex-row md:gap-10">
            <div className="flex-1">
              <div className="hidden border-t border-[#E9E9EB] md:block" />
              <div className="space-y-4 md:mt-6 md:space-y-8">
                {lines.map((line) => (
                  <CartItem key={`${line.productId}-${line.size}-${line.color.name}`} line={line} />
                ))}
              </div>
            </div>

            <div className="flex flex-col md:w-[339px] md:shrink-0">
              <div className="md:min-h-[373px] rounded-[4px] border border-[#E6E7E8] p-6">
                <h3 className="sidebar-black font-medium">Order Summary</h3>
                <dl className="mt-4 space-y-3">
                  <div className="flex justify-between">
                    <dt className="sort-by">Subtotal</dt>
                    <dd className="sidebar-black">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="sort-by">Shipping</dt>
                    <dd className="sidebar-black font-medium !text-[#3D8F2D]">FREE</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="sort-by">Tax</dt>
                    <dd className="sidebar-black">{formatPrice(tax)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-[#E9E9EB] pt-3">
                    <dt className="detail-boldtext !text-base">Total</dt>
                    <dd className="detail-boldtext !text-base">{formatPrice(total)}</dd>
                  </div>
                  <button
                type="button"
                onClick={handleCheckout}
                className="mt-6 w-full rounded-md bg-[#0E1422] px-6 py-3.5 font-dm-sans text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Proceed to Checkout
              </button>
              <button
                type="button"
                onClick={closeCart}
                className="sort-text mt-3 block w-full text-center !text-[#0E1422] underline underline-offset-2"
              >
                Continue Shopping
              </button>
                </dl>
              </div>

              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}