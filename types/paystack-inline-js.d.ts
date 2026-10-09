/* eslint-disable @typescript-eslint/no-explicit-any */
// Type declaration for @paystack/inline-js, which doesn't ship its own types.
declare module "@paystack/inline-js" {
  export interface PaystackPopCallbacks {
    onLoad?: (response: any) => void;
    onSuccess?: (transaction: any) => void | Promise<void>;
    onCancel?: () => void;
    onError?: (error: { message: string }) => void;
  }

  export default class PaystackPop {
    constructor();
    resumeTransaction(accessCode: string, callbacks?: PaystackPopCallbacks): unknown;
  }
}