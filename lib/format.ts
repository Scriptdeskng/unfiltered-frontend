const CURRENCY: "NGN" | "USD" = "NGN";

export function formatPrice(amount: number): string {
  if (CURRENCY === "NGN") {
    return `₦${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }
  return `$${amount.toFixed(2)}`;
}


// const CURRENCY = "NGN" as const;

// export function formatPrice(amount: number): string {
//   if (CURRENCY === "NGN") {
//     return `₦${amount.toLocaleString("en-NG")}`;
//   }
//   return `$${amount.toFixed(2)}`;
// }

/**
 * Central place for price formatting. Prices come from the backend
 * (product `min_price` / variant `current_price`), which are in NGN.
 * To switch currency later, change CURRENCY below.
 */
