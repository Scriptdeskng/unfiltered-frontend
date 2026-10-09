import { formatPrice } from "@/lib/format";
import type { ShippingMethod as ShippingMethodType } from "@/lib/types";

type ShippingMethodProps = {
  methods: ShippingMethodType[]; 
  selected: string | null;
  onChange: (id: string) => void;
  loading?: boolean;
  error?: string | null;
};

export default function ShippingMethod({
  methods,
  selected,
  onChange,
  loading = false,
  error = null,
}: ShippingMethodProps) {
  return (
    <div>
      <h2 className="sub-header">Shipping Method</h2>

      <div className="mt-4 space-y-3">
        {loading && <p className="sort-text !text-[#5C5F6A]">Calculating shipping…</p>}

        {!loading && error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && methods.length === 0 && (
          <p className="sort-text !text-[#5C5F6A]">
            Complete your address above to see delivery options.
          </p>
        )}

        {!loading &&
          !error &&
          methods.map((method) => (
            <label
              key={method.id}
              className="bg-[#F9FAFC] flex cursor-pointer items-center justify-between rounded-md px-4 py-3 transition-colors"
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping-method"
                  checked={selected === method.id}
                  onChange={() => onChange(method.id)}
                  className="h-4 w-4 accent-[#D9D9D9]"
                />
                <span className="flex flex-col gap-2">
                  <span className="shipping-method-text">{method.label}</span>
                  {method.eta && (
                    <span className="sort-text !text-[#5C5F6A] text-[#514F4F] ">{method.eta}</span>
                  )}
                </span>
              </span>
              <span className="sort-text !text-[#000000]">{formatPrice(method.price)}</span>
            </label>
          ))}
      </div>
    </div>
  );
}