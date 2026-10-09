"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, ProductColor } from "@/lib/types";

type CartContextValue = {
  lines: CartLine[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (productId: string, size: string, color: ProductColor, quantity: number) => void;
  removeLine: (productId: string, size: string, color: ProductColor) => void;
  clearCart: () => void;
  subtotal: number;
  shipping: number;
  setShipping: (amount: number) => void;
  tax: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const TAX_RATE = 0.075; 
const STORAGE_KEY = "kb_cart";

function sameLine(a: { productId: string; size: string; color: ProductColor }, b: typeof a) {
  return a.productId === b.productId && a.size === b.size && a.color.name === b.color.name;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [shipping, setShipping] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Load the saved cart once, after mount (avoids server/client hydration mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        // Ignore carts saved before variantId existed — they can't be ordered.
        if (Array.isArray(saved)) setLines(saved.filter((l) => typeof l.variantId === "number"));
      }
    } catch {
      /* corrupted or unavailable storage — start with an empty cart */
    }
    setHydrated(true);
  }, []);

  // Save on every change (but only after the initial load, so we don't overwrite it with []).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage full or blocked — cart still works for this session */
    }
  }, [lines, hydrated]);

  const addToCart = useCallback<CartContextValue["addToCart"]>((line) => {
    setLines((prev) => {
      const qty = line.quantity ?? 1;
      const existing = prev.find((l) => sameLine(l, line));
      if (existing) {
        return prev.map((l) => (sameLine(l, line) ? { ...l, quantity: l.quantity + qty } : l));
      }
      return [...prev, { ...line, quantity: qty }];
    });
    setCartOpen(true);
  }, []);

  const updateQuantity = useCallback<CartContextValue["updateQuantity"]>(
    (productId, size, color, quantity) => {
      setLines((prev) =>
        prev
          .map((l) =>
            sameLine(l, { productId, size, color })
              ? { ...l, quantity: Math.max(1, quantity) }
              : l
          )
          .filter((l) => l.quantity > 0)
      );
    },
    []
  );

  const removeLine = useCallback<CartContextValue["removeLine"]>((productId, size, color) => {
    setLines((prev) => prev.filter((l) => !sameLine(l, { productId, size, color })));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
    setShipping(0);
  }, []);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [lines]
  );
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  const value: CartContextValue = {
    lines,
    isCartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    addToCart,
    updateQuantity,
    removeLine,
    clearCart,
    subtotal,
    shipping,
    setShipping,
    tax,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}