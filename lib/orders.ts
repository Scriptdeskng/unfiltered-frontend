import { API_BASE } from "../http_instance/api";
import type { CartLine, ShippingInfo } from "./types";

export type ShippingRate = {
  rate: number;
  courier_id: string;
  courier_name: string;
  estimated_days: string;
};

type ShippingRatesResponse = {
  success?: boolean;
  rates?: ShippingRate[];
  error?: string;
};

export type PaymentInit = {
  access_code?: string;
  reference?: string;
  successful_reference?: string;
};

// only available payment method on the api is paystack, need to confirm with backend
const PAYMENT_METHOD_MAP: Record<string, string> = {
  "novac-pay": "paystack",
  paystack: "paystack",
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    ...init,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(extractError(data) || `Request failed (${res.status})`);
  return data as T;
}

// turns the backend's error shapes into one readable string. 
function extractError(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const d = data as Record<string, unknown>;
  if (typeof d.error === "string") return d.error;
  if (typeof d.detail === "string") return d.detail;
  return Object.entries(d)
    .map(([k, v]) => {
      const msg = Array.isArray(v) ? v.join(", ") : typeof v === "object" ? extractError(v) : String(v);
      return `${k}: ${msg}`;
    })
    .join(" • ");
}

const toItems = (lines: CartLine[]) =>
  lines.map((l) => ({ variant_id: l.variantId, quantity: l.quantity }));

// courier rates 
export async function getShippingRates(info: ShippingInfo, lines: CartLine[]): Promise<ShippingRate[]> {
  const res = await request<ShippingRatesResponse>("/api/orders/get_shipping_rates/", {
    method: "POST",
    body: JSON.stringify({
      shipping_address: {
        name: `${info.firstName.trim()} ${info.lastName.trim()}`.trim(),
        phone: info.phone.trim(),
        email: info.email.trim(),
        address: info.street.trim(),
        city: info.city.trim(),
        state: info.state.trim(),
        country: info.country.trim(),
      },
      items: toItems(lines),
    }),
  });

  const rates = [...(res.rates ?? [])].sort((a, b) => a.rate - b.rate);
  if (res.success === false || rates.length === 0) {
    throw new Error(res.error || "Could not calculate shipping for this address.");
  }
  return rates;
}

export async function createOrder(args: {
  lines: CartLine[];
  info: ShippingInfo;
  rate: ShippingRate;
  paymentId: string;
}): Promise<{ id: number }> {
  const { lines, info, rate, paymentId } = args;

  const order = await request<{ id: number }>("/api/orders/", {
    method: "POST",
    body: JSON.stringify({
      payment_method: PAYMENT_METHOD_MAP[paymentId] ?? paymentId,
      email: info.email.trim(),
      shipping_address: {
        first_name: info.firstName,
        last_name: info.lastName,
        address_line1: info.street,
        city: info.city,
        state: info.state,
        postal_code: info.zip,
        country: info.country,
        phone: info.phone,
      },
      shipping_fee: rate.rate,
      shipping_rate_id: rate.courier_id,
      items: toItems(lines),
    }),
  });

  if (!order?.id) throw new Error("Order was created but no order id was returned.");
  return order;
}

export async function initializePayment(orderId: number, email: string, paymentId: string): Promise<PaymentInit> {
  const res = await request<{ data?: PaymentInit } & PaymentInit>("/api/payment/payment/initialize/", {
    method: "POST",
    body: JSON.stringify({
      order_id: orderId,
      email,
      payment_method: PAYMENT_METHOD_MAP[paymentId] ?? paymentId,
    }),
  });
  return res.data ?? res;
}

export async function verifyPayment(reference: string): Promise<{ payment_status?: string }> {
  return request(`/api/payment/payment/verify/?reference=${encodeURIComponent(reference)}`);
}