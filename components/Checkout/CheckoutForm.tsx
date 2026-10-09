import type { ShippingInfo } from "@/lib/types";

export type FieldErrors = Partial<Record<keyof ShippingInfo, string>>;

type FieldProps = {
  label: string;
  name: keyof ShippingInfo;
  value: string;
  onChange: (name: keyof ShippingInfo, value: string) => void;
  type?: string;
  autoComplete?: string;
  error?: string;
};

function Field({ label, name, value, onChange, type = "text", autoComplete, error }: FieldProps) {
  return (
    <label className="block">
      <span className="checkout-input mb-1.5 block">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        onChange={(e) => onChange(name, e.target.value)}
        className={`checkout-input w-full rounded-md border bg-white px-3.5 py-2.5 focus:outline-none ${
          error ? "border-red-500 focus:border-red-500" : "border-black/15 focus:border-black"
        }`}
      />
      {error && (
        <span role="alert" className="mt-1.5 block text-xs text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

type CheckoutFormProps = {
  info: ShippingInfo;
  onChange: (name: keyof ShippingInfo, value: string) => void;
  createAccount: boolean;
  onCreateAccountChange: (checked: boolean) => void;
  errors?: FieldErrors;
};

export default function CheckoutForm({
  info,
  onChange,
  createAccount,
  onCreateAccountChange,
  errors = {},
}: CheckoutFormProps) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="sub-header">Personal Information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="First Name" name="firstName" value={info.firstName} onChange={onChange} error={errors.firstName} />
          <Field label="Last Name" name="lastName" value={info.lastName} onChange={onChange} error={errors.lastName} />
          <Field
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={info.email}
            onChange={onChange}
            error={errors.email}
          />
          <Field
            label="Phone Number"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={info.phone}
            onChange={onChange}
            error={errors.phone}
          />
        </div>
      </div>

      <div>
        <h2 className="sub-header">Shipping Address</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Street Address" name="street" value={info.street} onChange={onChange} error={errors.street} />
          </div>
          <Field label="City" name="city" value={info.city} onChange={onChange} error={errors.city} />
          <Field label="State" name="state" value={info.state} onChange={onChange} error={errors.state} />
          <Field label="Zip Code" name="zip" value={info.zip} onChange={onChange} error={errors.zip} />
          <Field label="Country" name="country" value={info.country} onChange={onChange} error={errors.country} />
        </div>
      </div>

      {/* <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={createAccount}
          onChange={(e) => onCreateAccountChange(e.target.checked)}
          className="h-4 w-4 accent-black"
        />
        <span className="sidebar-black !text-[#0E1422] text-[#000000]">Create an account?</span>
      </label> */}
    </div>
  );
}