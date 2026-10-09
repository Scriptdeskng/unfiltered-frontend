export interface PaystackTransaction {
  id: number;
  reference: string;
  message: string;
}

export interface PaystackCallbacks {
  onLoad?: (response: { id: number; customer: unknown; accessCode: string }) => void;
  onSuccess?: (transaction: PaystackTransaction) => void | Promise<void>;
  onCancel?: () => void;
  onError?: (error: { message: string }) => void;
}

export async function resumePaystackTransaction(
  accessCode: string,
  callbacks: PaystackCallbacks,
) {
  if (typeof window === "undefined") {
    throw new Error("Paystack checkout can only be opened in the browser.");
  }
  const { default: PaystackPop } = await import("@paystack/inline-js");
  const popup = new PaystackPop();
  return popup.resumeTransaction(accessCode, callbacks);
}