"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LayoutWrap from "@/components/Layout/LayoutWrap";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import ShippingMethod from "@/components/Checkout/ShippingMethod";
import PaymentMethod from "@/components/Checkout/PaymentMethod";
import OrderSummary from "@/components/Checkout/OrderSummary";
import OrderConfirmedModal from "@/components/Checkout/OrderConfirmedModal";
import { useCart } from "@/components/Common/CartContext";
import {
  createOrder,
  getShippingRates,
  initializePayment,
  verifyPayment,
  type ShippingRate,
} from "@/lib/orders";
import { resumePaystackTransaction } from "@/lib/paystack";
import type { CartLine, ShippingInfo, ShippingMethod as ShippingMethodType } from "@/lib/types";

const EMPTY_INFO: ShippingInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "Nigeria",
};

const REQUIRED: (keyof ShippingInfo)[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "street",
  "city",
  "state",
  "zip",
  "country",
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function CheckoutPage() {
  const { lines, setShipping, clearCart } = useCart();
  const router = useRouter();

  const [info, setInfo] = useState<ShippingInfo>(EMPTY_INFO);
  const [createAccount, setCreateAccount] = useState(false);
  const [paymentId, setPaymentId] = useState("novac-pay");

  // Shipping rates from the backend
  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState<string | null>(null);
  const rateRequestRef = useRef(0);

  const [submitting, setSubmitting] = useState(false);
  const [awaitingPayment, setAwaitingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedLines, setConfirmedLines] = useState<CartLine[] | null>(null);

  const addressComplete = REQUIRED.every((k) => info[k].trim());
  const itemsKey = lines.map((l) => `${l.variantId}:${l.quantity}`).join(",");
  const selectedRate = rates.find((r) => r.courier_id === selectedRateId) ?? null;

  const shippingMethods: ShippingMethodType[] = useMemo(
    () =>
      rates.map((r) => ({
        id: r.courier_id,
        label: r.courier_name,
        eta: r.estimated_days,
        price: r.rate,
      })),
    [rates]
  );

  // Fetch rates (debounced) whenever the address or cart changes.
  useEffect(() => {
    if (!addressComplete || lines.length === 0) {
      rateRequestRef.current += 1;
      setRates([]);
      setSelectedRateId(null);
      setShipping(0);
      setShippingError(null);
      setShippingLoading(false);
      return;
    }

    const requestId = ++rateRequestRef.current;
    setShippingLoading(true);
    setShippingError(null);

    const timer = setTimeout(async () => {
      try {
        const result = await getShippingRates(info, lines);
        if (rateRequestRef.current !== requestId) return;
        setRates(result);
        setSelectedRateId(result[0].courier_id); // cheapest first
        setShipping(result[0].rate);
      } catch (e) {
        if (rateRequestRef.current !== requestId) return;
        setRates([]);
        setSelectedRateId(null);
        setShipping(0);
        setShippingError(e instanceof Error ? e.message : "Could not calculate shipping.");
      } finally {
        if (rateRequestRef.current === requestId) setShippingLoading(false);
      }
    }, 600);

    return () => {
      clearTimeout(timer);
      rateRequestRef.current += 1;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    addressComplete,
    itemsKey,
    info.firstName,
    info.lastName,
    info.phone,
    info.email,
    info.street,
    info.city,
    info.state,
    info.zip,
    info.country,
  ]);

  function handleFieldChange(name: keyof ShippingInfo, value: string) {
    setInfo((prev) => ({ ...prev, [name]: value }));
  }

  function handleShippingChange(id: string) {
    setSelectedRateId(id);
    const rate = rates.find((r) => r.courier_id === id);
    setShipping(rate?.rate ?? 0);
  }

  function finishSuccess() {
    setConfirmedLines(lines); // keep a copy for the modal
    clearCart();
    setAwaitingPayment(false);
    setSubmitting(false);
  }

  // The popup can return before the backend has marked the payment as paid, so check a few times.
  async function confirmPayment(reference: string) {
    for (let attempt = 0; attempt < 5; attempt++) {
      const result = await verifyPayment(reference);
      if (result.payment_status === "successful") return true;
      await sleep(2000);
    }
    return false;
  }

  async function handleCheckout() {
    setError(null);

    if (!REQUIRED.every((k) => info[k].trim())) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!selectedRate) {
      setError("Please wait for shipping to be calculated.");
      return;
    }

    setSubmitting(true);
    try {
      const order = await createOrder({ lines, info, rate: selectedRate, paymentId });
      const payment = await initializePayment(order.id, info.email.trim(), paymentId);

      // Already paid (e.g. retry of a paid order)
      if (!payment.access_code && payment.successful_reference) {
        finishSuccess();
        return;
      }
      if (!payment.access_code || !payment.reference) {
        throw new Error("Payment could not be initialised. Please try again.");
      }

      setAwaitingPayment(true);
      await resumePaystackTransaction(payment.access_code, {
        onLoad: () => setSubmitting(false),
        onSuccess: async (transaction) => {
          try {
            const paid = await confirmPayment(transaction.reference || payment.reference!);
            if (paid) {
              finishSuccess();
            } else {
              setAwaitingPayment(false);
              setError(
                "We haven't received confirmation of your payment yet. If you were charged, please contact support with your order number."
              );
            }
          } catch {
            setAwaitingPayment(false);
            setError("Could not verify payment status. Please contact support.");
          }
        },
        onCancel: () => {
          setAwaitingPayment(false);
          setSubmitting(false);
          setError("Payment was cancelled. You can try again.");
        },
        onError: (e) => {
          setAwaitingPayment(false);
          setSubmitting(false);
          setError(e.message || "Unable to open the payment window.");
        },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setAwaitingPayment(false);
      setSubmitting(false);
    }
  }

  function handleCloseConfirmation() {
    setConfirmedLines(null);
    router.push("/shop");
  }

  const busy = submitting || awaitingPayment;

  return (
    <LayoutWrap hasHero={false} topbarVariant="dark">
      <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-20 md:px-8 lg:px-10">
        <h1 className="header">Checkout</h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="order-2 rounded-lg border border-[#616161]/38 px-10 py-12 lg:order-1">
            <div className="space-y-10">
              <CheckoutForm
                info={info}
                onChange={handleFieldChange}
                createAccount={createAccount}
                onCreateAccountChange={setCreateAccount}
              />
              <ShippingMethod
                methods={shippingMethods}
                selected={selectedRateId}
                onChange={handleShippingChange}
                loading={shippingLoading}
                error={shippingError}
              />
              <PaymentMethod selected={paymentId} onChange={setPaymentId} />

              {error && (
                <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleCheckout}
                disabled={lines.length === 0 || busy || shippingLoading || !selectedRate}
                className="w-full rounded-md bg-[#000000] px-6 py-3.5 font-dm-sans text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              >
                {awaitingPayment
                  ? "Waiting for payment…"
                  : submitting
                    ? "Processing…"
                    : shippingLoading
                      ? "Calculating shipping…"
                      : !selectedRate
                        ? "Complete address to continue"
                        : "Checkout"}
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <OrderSummary />
          </div>
        </div>
      </div>

      {confirmedLines && (
        <OrderConfirmedModal lines={confirmedLines} onClose={handleCloseConfirmation} />
      )}
    </LayoutWrap>
  );
}