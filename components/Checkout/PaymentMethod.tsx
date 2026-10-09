const PAYMENT_METHODS = [{ id: "Paystack", label: "Paystack" }];

type PaymentMethodProps = {
  selected: string;
  onChange: (id: string) => void;
};

export default function PaymentMethod({ selected, onChange }: PaymentMethodProps) {
  return (
    <div>
      <h2 className="sub-header">Payment</h2>
      <p className="shipping-method-text !font-medium font-normal  mt-2">Choose a payment method</p>

      <div className="bg-[#F9FAFC] p-3 mt-4 space-y-3">
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.id}
            className={`flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 transition-colors ${
              selected === method.id ? "border-black" : "border-black/15"
            }`}
          >
            <input
              type="radio"
              name="payment-method"
              checked={selected === method.id}
              onChange={() => onChange(method.id)}
              className="h-4 w-4 accent-black"
            />
            <span className="shipping-method-text  !text-sm font-medium">{method.label}</span>
          </label>
        ))}
      </div>

      <p className="shipping-method-text mt-10 !font-light max-w-3xl">
        Your personal data will be used to process your order, support your experience throughout
        this website, and for other purposes described in our privacy policy.
      </p>
    </div>
  );
}
